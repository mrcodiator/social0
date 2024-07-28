import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { ModeToggle } from "../ui/mode-toggle"
import SignOut from "../sign-out/SignOut"
import { useGlobalContext } from "../../hooks/use-global"
import { useSkeleton } from "../../hooks/use-skeleton"
import SidebarCardloading from "../loading/sidebar-card-loading"


const SideBarUserCard = () => {
    const { user } = useGlobalContext()
    const { initialLoading } = useSkeleton();

    return (
        <>

            {initialLoading ?
                <SidebarCardloading />
                :
                <div className="flex flex-col  items-center gap-4 justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3 w-full">
                        <Avatar>
                            <AvatarImage src={user?.logo} />
                            <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="font-medium">
                                {user?.name || user?.username}
                            </h1>
                            <p className=" text-muted-foreground text-xs mt-1">
                                @{user?.username}
                            </p>
                        </div>
                        <div className=" mr-0 ml-auto">
                            <ModeToggle />
                        </div>
                    </div>
                    <SignOut>
                        <Button className="w-full" size={"sm"}>
                            Sign Out <LogOut className=" h-4 w-4 ml-3" />
                        </Button>
                    </SignOut>
                </div>
            }
        </>

    )
}

export default SideBarUserCard
