
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { ChevronLeft, Menu } from "lucide-react"
import SideBarMenu from "./SideBarMenu"
import SideBarUserCard from "./SideBarUserCard"


const SideBarSheet = () => {
    const [state, setState] = useState(window.innerWidth >= 1024)

    const handleResize = () => {
        setState(window.innerWidth >= 1024)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div>
            <Button onClick={() => setState(!state)} variant={"ghost"} size={"icon"}>
                <Menu className="h-4 w-4" />
            </Button>

            <div className={`fixed z-10 ${state ? "translate-x-0" : "-translate-x-full"} duration-300 ease-in-out  top-0 left-0 h-dvh md:max-w-[300px] w-full bg-background border-r p-2 flex flex-col`}>
                <div className=" flex  justify-between items-center p-2 px-3">
                    <h1 className=" text-3xl font-bold">Social0</h1>

                    <Button onClick={() => setState(!state)} variant={"outline"} size={"icon"}>
                        <ChevronLeft className=" h-4 w-4" />
                    </Button>
                </div>

                <div className=" h-full flex  flex-col gap-2 mt-10">
                    <SideBarMenu setState={setState} />

                    <div className="mb-0 mt-auto">
                        <SideBarUserCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBarSheet
