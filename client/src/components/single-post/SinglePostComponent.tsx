import { useParams } from "react-router-dom";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import PostMeta from "./PostMeta";
import { useFetchData } from "../../hooks/use-fetch-hook";
import { Post } from "../../types/post.type";
import { useSkeleton } from "../../hooks/use-skeleton";
import SinglePostLoading from "../loading/single-post-loading";

const SinglePostComponent = () => {
    const { id } = useParams();
    const { data } = useFetchData<Post>("post/" + id);

    const { initialLoading } = useSkeleton()

    if (!initialLoading && !data) {
        return <div className=" flex-1 h-full w-full flex flex-col items-center justify-between text-3xl text-muted-foreground">No Post Found!</div>;
    }




    return (
        <>
            {initialLoading ?
                <>
                    <SinglePostLoading />
                </>
                : data &&
                <Card className="flex-1  max-w-4xl w-full lg:max-h-[800px] mx-auto overflow-hidden flex flex-col">
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="h-full w-full bg-slate-900">
                            <img
                                src={data.media}
                                className="h-full w-full object-contain"
                                alt={data._id}
                                loading="lazy" // Added to improve loading performance
                            />
                        </div>

                        <ScrollArea className="h-full lg:max-h-[800px]">
                            <PostMeta post={data} />
                        </ScrollArea>

                    </div>
                </Card>
            }
        </>
    );
};

export default SinglePostComponent;

