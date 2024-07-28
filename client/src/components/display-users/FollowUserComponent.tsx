import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { User } from "../../types/user.type"
import { useFetchData } from "../../hooks/use-fetch-hook"
import FollowUserCard from "./FollowUserCard"
import { useGlobalContext } from "../../hooks/use-global"
import { useSkeleton } from "../../hooks/use-skeleton"
import UserCardLoading from "../loading/user-card-loading"

const FollowUserComponent = () => {
    const { data: users } = useFetchData<User[]>("user");
    const { user: currentUser } = useGlobalContext();
    const { initialLoading } = useSkeleton();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-sm md:text-lg font-bold flex items-center gap-2 justify-between">
                    Suggested for you! <Link to={"/find"}><Button variant={"link"} size={"sm"}>See All</Button></Link>
                </CardTitle>
            </CardHeader>
            <CardContent className=" flex flex-col gap-5">
                {initialLoading && Array.from({ length: 6 }).map((_, i) => (
                    <UserCardLoading key={i} />
                ))}
                {!initialLoading && users && currentUser && users
                    .sort((a, b) => Number(!!a.followers?.find((follower) => follower.user._id === currentUser._id)) - Number(!!b.followers?.find((follower) => follower.user._id === currentUser._id)))
                    .slice(0, 5)
                    .map((user) => <FollowUserCard key={user._id} user={user} />)}
            </CardContent>
        </Card>
    )
}

export default FollowUserComponent
