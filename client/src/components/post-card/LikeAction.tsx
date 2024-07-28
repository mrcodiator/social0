import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import { useLike } from "../../hooks/use-like"


const LikeAction = ({ id, isLiked }: { id: string, isLiked: boolean }) => {

    const { like, dislike } = useLike(id)

    return (
        <div>
            <Button size={"icon"} variant={"ghost"} onClick={isLiked ? dislike : like}>
                {isLiked ?
                    <Heart className=" h-5 w-5" fill={"#FF0059"} stroke={"#FF0059"} />
                    :
                    <Heart className="h-5 w-5" />
                }
            </Button>
        </div>
    )
}

export default LikeAction
