import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import UserHoverCard from "./UserHoverCard";
import { User } from "../../types/user.type";
import FollowUserAction from "./FollowUserAction";
import { Link } from "react-router-dom";


const FollowUserCard = ({ user }: { user: User }) => {
    return (
        <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-3">
                <Link to={"/user/@" + user?.username}>
                    <Avatar>
                        <AvatarImage src={user?.logo} />
                        <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </Link>
                <div>
                    <UserHoverCard user={user} />
                    <p className=" text-muted-foreground text-xs mt-1">
                        @{user?.username}
                    </p>
                </div>
            </div>
            <div>
                <FollowUserAction user={user} extendButton={false} />
            </div>
        </div>
    );
}

export default FollowUserCard;