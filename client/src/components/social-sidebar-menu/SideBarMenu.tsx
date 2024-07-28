import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Heart, Home, PlusSquare, Settings, User, Users2 } from "lucide-react"
import { useGlobalContext } from "../../hooks/use-global"

const SideBarMenu = ({ setState }: { setState: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const { user } = useGlobalContext();

    const handleState = () => {
        if (window.innerWidth <= 1024) {
            setState(false)
        }
    }

    return (
        <div className=' flex flex-col gap-2'>
            <div className="flex flex-col gap-1">
                <Link to={"/"}>
                    <Button
                        variant={"ghost"}
                        className="w-full justify-start"
                        size={"lg"} onClick={handleState}
                    >
                        <Home className=" h-4 w-4 mr-4" />
                        Home
                    </Button>
                </Link>
                <Link to={"/notifications"}>
                    <Button
                        variant={"ghost"}
                        className="w-full justify-start"
                        size={"lg"}
                        onClick={handleState}
                    >
                        <Heart className="h-4 w-4 mr-4" />
                        Notifications
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col gap-1">
                <Link to={"/create-post"}>
                    <Button
                        variant={"ghost"}
                        className="w-full justify-start"
                        size={"lg"}
                        onClick={handleState}
                    >
                        <PlusSquare className="h-4 w-4 mr-4" />
                        Create
                    </Button>
                </Link>
                <Link to={"/find"}>
                    <Button
                        variant={"ghost"}
                        className="w-full justify-start"
                        size={"lg"}
                        onClick={handleState}
                    >
                        <Users2 className="h-4 w-4 mr-4" />
                        Find People
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col gap-1">
                <Link to={"/user/@" + user?.username}>
                    <Button
                        variant={"ghost"}
                        className="w-full justify-start"
                        size={"lg"}
                        onClick={handleState}
                    >
                        <User className="h-4 w-4 mr-4" />
                        Profile
                    </Button>
                </Link>
                <Link to={"/settings"}>
                    <Button
                        variant={"ghost"}
                        className="w-full justify-start"
                        size={"lg"}
                        onClick={handleState}
                    >
                        <Settings className="h-4 w-4 mr-4" />
                        Settings
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SideBarMenu

