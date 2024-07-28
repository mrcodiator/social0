import { useEffect, useState } from "react";
import { useFetchData } from "../../hooks/use-fetch-hook";
import { useNotification } from "../../hooks/use-notification";
import { NotifyType } from "../../types/notify.type";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import NotificationCard from "./NotificationCard";
import { ScrollArea } from "../ui/scroll-area";
import { socket } from "../../lib/socket";
import { useGlobalContext } from "../../hooks/use-global";
import { useSkeleton } from "../../hooks/use-skeleton";
import NotificationLoading from "../loading/notification-loading";

const DisplayNotifications = () => {
    const { user } = useGlobalContext()
    const { data: notifications, refetch } = useFetchData<NotifyType[]>("notify");
    const { markAllSeen } = useNotification();
    const [seen, setSeen] = useState(false);
    const { initialLoading } = useSkeleton();

    const handleClick = () => {
        setSeen(!seen);
    };

    useEffect(() => {

        const notificationSound = new Audio('/sounds/notification.mp3');

        const handleNewNotification = (newNotification: NotifyType) => {
            // console.log('New notification:', newNotification);
            if (newNotification) {
                // check the user is same as the logged in user
                if (newNotification.user === user?._id) {
                    notificationSound.play();
                }
                refetch()
            }

        };
        // Listen for real-time notifications
        socket.on('notification', handleNewNotification);

        // Cleanup on unmount
        return () => {
            socket.off('notification', handleNewNotification);
        };

    }, [refetch, user]);

    return (
        <Card className="w-full">
            <CardHeader className="gap-4">
                <CardTitle>Notifications</CardTitle>
                <div className="flex items-center gap-2">
                    <Button onClick={handleClick} className="text-xs py-2 px-3 rounded-sm" variant={"outline"} size={"sm"}>
                        {seen ? "All" : "Unseen"}
                    </Button>
                    <Button onClick={markAllSeen} className="text-xs py-1 px-2 rounded-sm" size={"sm"}>
                        Mark All Seen
                    </Button>
                </div>
                <Separator />
            </CardHeader>
            <CardContent className="px-3">
                <ScrollArea className="h-96 px-3">
                    <div className="flex flex-col gap-4">
                        {initialLoading ?
                            Array.from({ length: 5 }).map((_, i) => <NotificationLoading key={i} />)
                            :
                            notifications && notifications.map((data, i) => (
                                !seen || !data.seen ? <NotificationCard key={i} notify={data} /> : null
                            ))
                        }
                    </div>

                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default DisplayNotifications;
