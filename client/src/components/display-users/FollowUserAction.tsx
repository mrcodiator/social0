import { UserMinus, UserPlus } from "lucide-react";
import { useFollowHook } from "../../hooks/use-follow";
import { useGlobalContext } from "../../hooks/use-global";
import { Followers, User } from "../../types/user.type";
import { Button } from "../ui/button";
import { useFetchData } from "../../hooks/use-fetch-hook";

const FollowUserAction = ({ user, extendButton = false }: { user: User, extendButton?: boolean }) => {
    const { follow, unfollow } = useFollowHook(user._id)
    const { user: currentUser } = useGlobalContext();
    const { data: followers } = useFetchData<Followers[]>(`user/${user._id}/followers`)


    return (
        <div className=" w-full">
            {followers?.some((follower) => follower.user._id === currentUser?._id) ?
                <Button className=" w-full" variant={"outline"} size={"sm"} onClick={unfollow}>
                    <span className={extendButton ? "" : " hidden lg:block"}>Following</span> <UserMinus className=" h-4 w-4 lg:ml-2" />
                </Button>
                :
                <Button className="w-full" variant={"outline"} size={"sm"} onClick={follow} disabled={user?._id === currentUser?._id}>
                    <span className={extendButton ? "" : " hidden lg:block"}>Follow</span> <UserPlus className=" h-4 w-4 lg:ml-2" />
                </Button>
            }
        </div>
    )
}

export default FollowUserAction
