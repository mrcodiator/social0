import { Skeleton } from "../ui/skeleton";

export default function NotificationLoading() {
    return (
        <div className="w-full p-4 flex items-start gap-4 " role="status">
            <div>
                <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className=" w-full">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-2/4 mt-2" />
            </div>
        </div>
    )
}