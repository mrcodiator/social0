import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PostLoading() {
    return (
        <Card className=" border-none shadow-none p-2">
            <CardHeader className="flex flex-row items-center px-0">
                <div>
                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                </div>
                <div className="w-full">
                    <Skeleton className="w-1/4 h-4 mb-2" />
                    <Skeleton className="w-1/2 h-4" />
                </div>
            </CardHeader>

            <CardContent className="px-0">
                <Skeleton className="h-[400px] w-full rounded-lg border" />
            </CardContent>

            <CardContent className="px-0">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 mt-4 w-full" />
            </CardContent>

            <CardFooter className="px-0">
                <Skeleton className="h-6 w-full" />
            </CardFooter>
        </Card>
    )
} 