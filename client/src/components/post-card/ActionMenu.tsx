import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { EllipsisVertical } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Post } from "../../types/post.type"
import { useCreatePost } from "../../hooks/use-create-post"
import { useGlobalContext } from "../../hooks/use-global"

const ActionMenu = ({ post }: { post: Post }) => {

    const { deletePost } = useCreatePost()
    const { user } = useGlobalContext()
    const navigate = useNavigate()

    const handleDelete = () => {
        deletePost(post._id);
        navigate("/")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                    <EllipsisVertical className=" h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" mx-2">
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/post/" + post._id}>
                    <DropdownMenuItem>visit</DropdownMenuItem>
                </Link>
                {user?._id === post.user._id ?
                    <DropdownMenuItem onClick={handleDelete} className=" text-red-500">delete</DropdownMenuItem>
                    :
                    <DropdownMenuItem className=" text-red-500">block</DropdownMenuItem>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionMenu
