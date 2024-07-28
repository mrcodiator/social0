import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useGlobalContext } from "../../hooks/use-global"
import { Link } from "react-router-dom";
import SignOut from "../sign-out/SignOut";


const UserButton = () => {
    const { user } = useGlobalContext();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className=" cursor-pointer h-8 w-8">
                    <AvatarImage src={user?.logo} />
                    <AvatarFallback>{user?.name?.slice(0, 2) || user?.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-5">
                <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/user/@" + user?.username}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link to={"/settings"}>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <SignOut>
                    <DropdownMenuItem>SignOut</DropdownMenuItem>
                </SignOut>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton
