import { Link } from "react-router-dom"
import SideBarSheet from "../social-sidebar-menu/SideBarSheet"
import NotificationButton from "../notifications/NotificationButton"
import UserButton from "./UserButton"

const SocialNavbar = () => {
    return (
        <div className=" sticky z-10 bg-background/20 backdrop-blur-lg top-0 border-b w-full">
            <header className=" px-5 lg:px-10 py-3 w-full flex items-center justify-between gap-4">
                <div className=" flex items-center gap-2">
                    <SideBarSheet />
                    <Link to={"/"}><h1 className="text-2xl font-bold">Social0</h1></Link>
                </div>

                <div className=" flex items-center gap-2">
                    <NotificationButton />
                    <UserButton />
                </div>
            </header>
        </div>
    )
}

export default SocialNavbar
