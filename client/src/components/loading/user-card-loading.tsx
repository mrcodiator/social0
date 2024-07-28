import { Skeleton } from "../ui/skeleton";

export default function UserCardLoading() {
    return (
        <div className="flex flex-row items-center">
            <div>
                <Skeleton className="w-12 h-12 rounded-full mr-4" />
            </div>
            <div className="w-full">
                <Skeleton className="w-1/4 h-4 mb-2" />
                <Skeleton className="w-1/2 h-4" />
            </div>
        </div>
    )
}