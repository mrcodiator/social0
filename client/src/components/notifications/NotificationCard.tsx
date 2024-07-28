import moment from "moment";
import { NotifyType } from "../../types/notify.type";
import { useNotification } from "../../hooks/use-notification";
import { useFetchData } from "../../hooks/use-fetch-hook";
import { User } from "../../types/user.type";
import { Post } from "../../types/post.type";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const NotificationCard = ({ notify }: { notify: NotifyType }) => {
    const { markSeen } = useNotification();

    let fetchUrl = "";
    let linkUrl = "";
    let imageUrl = "";

    if (notify.type === "comment" || notify.type === "like") {
        fetchUrl = `post/${notify.action}`;
        linkUrl = `/post/${notify.action}`;
    } else {
        fetchUrl = `user/${notify.action}`;
        linkUrl = `/user/@${notify.action}`;
    }

    const { data: fetchData } = useFetchData<Post | { user: User; posts: Post[] }>(fetchUrl);

    if (notify.type === "comment" || notify.type === "like") {
        imageUrl = (fetchData as Post)?.media || "";
    } else {
        imageUrl = (fetchData as { user: User; posts: Post[] })?.user?.logo || "";
    }

    const handleClick = () => {
        if (!notify.seen) {
            markSeen(notify._id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`w-full flex items-start gap-4 cursor-pointer hover:bg-muted p-4 rounded-lg ${notify.seen ? "" : "bg-secondary"}`}
        >
            <div>

                <Link to={linkUrl}>
                    <Avatar>
                        <AvatarImage src={imageUrl} className=" object-cover" />
                        <AvatarFallback>N</AvatarFallback>
                    </Avatar>
                </Link>
            </div>

            <div className="w-full flex flex-col gap-2">
                <p className=" text-sm">{notify.message}</p>
                <span className="text-xs text-muted-foreground">{moment(notify.createdAt).fromNow()}</span>
            </div>
        </div>
    );
};

export default NotificationCard;
