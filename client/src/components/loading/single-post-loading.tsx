import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SinglePostLoading() {
    return (
        <Card className="flex-1 max-w-4xl w-full lg:max-h-[800px] mx-auto lg:overflow-hidden flex flex-col">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="h-full w-full bg-slate-900">
                    <Skeleton className=" h-56 lg:h-full w-full" />
                </div>

                <div className="h-full lg:max-h-[800px]">
                    <CardHeader className="flex flex-row items-center">
                        <div>
                            <Skeleton className="w-12 h-12 rounded-full mr-4" />
                        </div>
                        <div className="w-full">
                            <Skeleton className="w-1/4 h-4 mb-2" />
                            <Skeleton className="w-1/2 h-4" />
                        </div>
                    </CardHeader>

                    <CardContent className=" flex flex-col gap-5">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-6 w-full" />

                        <div className=" mt-5">
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-10 mt-5 w-1/4" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex mt-5 flex-col w-full space-y-5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex w-full flex-row items-center">
                                <div>
                                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                                </div>
                                <div className="w-full">
                                    <Skeleton className="w-1/4 h-4 mb-2" />
                                    <Skeleton className="w-full h-4" />
                                </div>
                            </div>
                        ))}
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}

