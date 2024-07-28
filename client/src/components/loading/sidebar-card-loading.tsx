import { Skeleton } from "../ui/skeleton";

export default function SidebarCardloading() {
    return (
        <div className=" flex flex-col gap-4 rounded-lg border p-2">
            <div className="flex flex-row items-center">
                <div>
                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                </div>
                <div className="w-full">
                    <Skeleton className="w-1/2 h-4 mb-2" />
                    <Skeleton className="w-3/4 h-4" />
                </div>
            </div>

            <div>
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    )
}