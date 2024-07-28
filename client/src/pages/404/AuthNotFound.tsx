import { ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"

const AuthNotFound = () => {
    return (
        <div className=" h-full w-full flex-1  flex flex-col gap-5 items-center justify-center text-center">
            <h1 className=" text-6xl font-bold">Session Not Found</h1>
            <p className=" text-muted-foreground max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur expedita minima voluptate voluptatibus accusamus nam quaerat reprehenderit ad deserunt. Distinctio.</p>

            <div className=" flex gap-2 items-center">
                <Link to={"/sign-in"}>
                    <Button variant={"secondary"} size={"lg"}>
                        Sign In <ArrowRight className=" h-4 w-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default AuthNotFound
