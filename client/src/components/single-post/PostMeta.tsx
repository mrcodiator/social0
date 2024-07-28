import ActionMenu from "../post-card/ActionMenu";
import { CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserHoverCard from "../display-users/UserHoverCard";
import CommentBox from "./CommentBox";
import { Post } from "../../types/post.type";
import moment from "moment";
import LikeAction from "../post-card/LikeAction";
import { useGlobalContext } from "../../hooks/use-global";
import ShareAction from "../post-card/ShareAction";
import ExpandText from "../expand-text/ExpandText";
import { Link } from "react-router-dom";

const PostMeta = ({ post }: { post: Post }) => {


    const { user } = useGlobalContext();

    const checkIsLiked = () => {
        if (!user) {
            return false;
        }

        return post.likes.some(like => like.user?._id === user._id);
    }
    return (
        post &&
        <div>
            <CardHeader className="w-full">
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <Link to={`/user/@` + post.user?.username}>
                            <Avatar>
                                <AvatarImage src={post.user?.logo} />
                                <AvatarFallback>{post.user?.name?.slice(0, 2) || post.user.username.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                        </Link>
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
            <CardContent className="flex flex-col gap-5">
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
                    <ExpandText text={post.content} />
                </CardDescription>
                <div className="w-full flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <LikeAction id={post._id} isLiked={checkIsLiked()} />
                        <ShareAction />
                    </div>
                    <p className="text-muted-foreground text-sm">{moment(post.createdAt).fromNow()}</p>
                </div>
            </CardContent>
            <CardFooter>
                <CommentBox post={post} />
            </CardFooter>
        </div>
    )
}

export default PostMeta
