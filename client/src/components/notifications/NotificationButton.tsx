
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
    const hasUnseenNotifications = !!unseenNotifications?.length;

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
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    {hasUnseenNotifications ?
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

export default NotificationButton

