import { Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { usePostComments } from "../../hooks/use-comments"
import { Comments } from "../../types/post.type"
import moment from "moment"
import { useGlobalContext } from "../../hooks/use-global"

interface CommentCardProps {
    id: string,
    comment: Comments
}

const CommentCard = ({ id, comment }: CommentCardProps) => {
    const { user } = useGlobalContext();

    const { deleteComment } = usePostComments(id);
    return (
        <div className={`w-full flex items-start gap-4 rounded-lg`}  >
            <Avatar className=" h-8 w-8">
                <AvatarImage src={comment.user.logo} />
                <AvatarFallback>{comment.user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className=" w-full flex flex-col gap-2" >
                <p className=" text-muted-foreground text-xs">
                    <b className=" mr-2 text-sm">{comment.user.username}</b> {moment(comment.createdAt).fromNow()}
                </p>

                <span className=" text-xs text-muted-foreground">{comment.text}</span>
            </div>

            {user && user?._id === comment.user._id &&

                <div className=" mr-0 ml-auto">
                    <Button variant={"ghost"} size={"icon"} className="h-7 w-7" onClick={() => deleteComment(comment._id)}>
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            }
        </div>
    )
}

export default CommentCard
