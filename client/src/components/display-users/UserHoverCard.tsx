import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card"
import { User } from "../../types/user.type";
import { useFetchData } from "../../hooks/use-fetch-hook";
import { Post } from "../../types/post.type";
import UserDetails from "./UserDetails";

interface Props {
    user: User;
    posts: Post[]
}
const UserHoverCard = ({ user }: { user: User }) => {
    const { data: following } = useFetchData<User[]>(`user/${user._id}/following`);
    const { data: followers } = useFetchData<User[]>(`user/${user._id}/followers`);
    const { data: profile } = useFetchData<Props>(`user/${user.username}`);

    if (!profile) return null;

    return (
        <HoverCard>
            <HoverCardTrigger className="hover:underline text-base font-medium capitalize">{user.name || user.username}</HoverCardTrigger>
            <HoverCardContent className=" max-w-lg w-full m-2 border-none shadow-none p-0">

                <UserDetails
                    user={profile.user}
                    extraInfo={false}
                    followers={followers?.length || 0}
                    following={following?.length || 0}
                    posts={profile.posts.length}
                />
            </HoverCardContent>
        </HoverCard>
    )
}

export default UserHoverCard

