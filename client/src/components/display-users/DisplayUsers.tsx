import { useFetchData } from "../../hooks/use-fetch-hook";
import { User } from "../../types/user.type";
import FollowUserCard from "./FollowUserCard";
import UserCardLoading from "../loading/user-card-loading";
import { useSkeleton } from "../../hooks/use-skeleton";


const DisplayUsers = ({ query = "" }: { query?: string }) => {
    const { data: users } = useFetchData<User[]>("user");
    const { initialLoading } = useSkeleton();


    return (
        <div className=" flex flex-col gap-5">
            {initialLoading && Array.from({ length: 6 }).map((_, i) => (
                <UserCardLoading key={i} />
            ))}
            {!initialLoading && users && users.filter((user) => {
                if (!query && user) return true;
                const username = user?.username?.toLowerCase().includes(query.toLowerCase())
                    || user?.name?.toLowerCase().includes(query.toLowerCase())
                return username
            }).map((user, i) => (
                <FollowUserCard key={i} user={user} />
            ))}
        </div>
    )
}

export default DisplayUsers

