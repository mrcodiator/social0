import { Post } from "../../types/post.type"
import CommentCard from "./CommentCard"
import CreateCommentForm from "./CreateCommentForm"

const CommentBox = ({ post }: { post: Post }) => {


    return (
        <div className="w-full">
            <CreateCommentForm id={post._id} />

            <div className=" flex flex-col gap-6 mt-10">
                {post.comments.map((item, i) => (
                    <CommentCard key={i} id={post._id} comment={item} />
                ))}
            </div>
        </div>
    )
}

export default CommentBox
