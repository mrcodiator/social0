import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ProfileCardLoading() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div>
                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                </div>
                <div className="w-full">
                    <Skeleton className="w-1/4 h-4 mb-2" />
                    <Skeleton className="w-1/2 h-4" />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">

                <Skeleton className="w-full h-10" />

                <div className="flex flex-col gap-5 mt-10">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex w-full flex-row items-center">
                            <div className="w-full">
                                <Skeleton className="w-1/4 h-4 mb-4" />
                                <Skeleton className="w-full h-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-around gap-4 mt-5">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </CardFooter>
        </Card>
    )
}