import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import DisplayNotifications from "./DisplayNotifications"
import { NotifyType } from "../../types/notify.type"
import { useFetchData } from "../../hooks/use-fetch-hook"
import { useEffect } from "react"
import { socket } from "../../lib/socket"
import { useGlobalContext } from "../../hooks/use-global"

const NotificationButton = () => {
    const { data: notifications, refetch } = useFetchData<NotifyType[]>("notify");
    const { user } = useGlobalContext();

    const unseenNotifications = notifications?.filter((data) => !data.seen);

    useEffect(() => {
        const notificationSound = new Audio('/sounds/notification.mp3');

        const handleNewNotification = (newNotification: NotifyType) => {
            if (newNotification && newNotification.user === user?._id) {
                notificationSound.play();
                refetch();
            }
        };

        const handleDeleteNotification = () => {
            refetch();
        };

        socket.on('notification', handleNewNotification);
        socket.on('delete-notification', handleDeleteNotification);

        // Cleanup on unmount
        return () => {
            socket.off('notification', handleNewNotification);
            socket.off('delete-notification', handleDeleteNotification);
        };

    }, [refetch, user]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    {unseenNotifications && unseenNotifications.length > 0 ?
                        <Heart className=" h-4 w-4" fill={"#FF0059"} stroke={"#FF0059"} />
                        :
                        <Heart className="h-4 w-4" />
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent align={"end"} className="w-full mx-2 p-0 border-none shadow-none ">
                <div className=" w-80 md:w-96">
                    <DisplayNotifications />
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default NotificationButton;
