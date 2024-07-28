import { MessageCircle, Share } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "../ui/card"
import ActionMenu from "./ActionMenu"
// import { getRandomImages } from "../../helper/random-image"
import UserHoverCard from "../display-users/UserHoverCard"
import { Post } from "../../types/post.type"
import moment from "moment";
import { Link } from "react-router-dom"
import LikeAction from "./LikeAction"
import { useGlobalContext } from "../../hooks/use-global"

const PostCard = ({ post }: { post: Post }) => {
    const { user } = useGlobalContext();

    const checkIsLiked = () => {
        if (!user) {
            return false;
        }

        return post.likes.some(like => like.user?._id === user._id);
    }



    return (
        <Card className=" w-full border-none shadow-none  p-2">

            <CardHeader className="  w-full px-0">
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={post.user?.logo} />
                            <AvatarFallback>{post.user?.name?.slice(0, 2) || post.user.username.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <UserHoverCard user={post.user} />
                            <p className=" text-muted-foreground text-xs md:text-sm">
                                @{post.user?.username}
                            </p>
                        </div>
                    </div>

                    <ActionMenu post={post} />
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <Link to={`/post/${post._id}`}>
                    <img
                        src={post.media}
                        className=" h-full w-full rounded-lg border "
                        alt="shadcn" />
                </Link>
            </CardContent>
            <CardContent className="px-0">
                <div className=" flex items-center gap-2 justify-between mb-2">
                    {post.likes.length > 0 &&

                        <div className=" flex gap-2 text-sm items-center">
                            <div className=" flex items-center -space-x-3">
                                {post.likes.slice(0, 3).map((item, i) => (
                                    item.user._id !== post.user._id &&
                                    <Avatar key={i} className="h-7 w-7 border">
                                        <AvatarImage src={item.user.logo} />
                                        <AvatarFallback>{item.user.username.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                ))}

                            </div>

                            <div>
                                Liked by <span className=" font-bold ">{post.likes.length} people</span>
                            </div>
                        </div>
                    }

                </div>
                <CardDescription>
                    {post.content.slice(0, 160)}
                    {post.content.length > 160 ? <Link to={`/post/${post._id}`} className=" text-blue-500 mx-2">more...</Link> : ""}
                </CardDescription>
            </CardContent>
            <CardFooter className="px-0">
                <div className=" w-full flex items-center justify-between gap-2">
                    <div className=" flex items-center gap-2">
                        <LikeAction id={post._id} isLiked={checkIsLiked()} />
                        <Link to={`/post/${post._id}`}>
                            <Button variant={"ghost"} size={"icon"}>
                                <MessageCircle className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to={`/post/${post._id}`}>
                            <Button variant={"ghost"} size={"icon"}>
                                <Share className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className=" text-muted-foreground text-sm">
                        {moment(post.createdAt).fromNow()}
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PostCard
