import { useState, useEffect } from "react";
import { useFetchData } from "../../hooks/use-fetch-hook";
import { Post } from "../../types/post.type";
import PostCard from "../post-card/PostCard";
import { Separator } from "../ui/separator";
import PostLoading from "../loading/post-loading";
import { useSkeleton } from "../../hooks/use-skeleton";
import { Followers } from "../../types/user.type";
import { useGlobalContext } from "../../hooks/use-global";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";

const DisplayPost = () => {
    const { data: posts } = useFetchData<Post[]>("post");
    const { user } = useGlobalContext();
    const { data: following } = useFetchData<Followers[]>(user ? `user/${user._id}/following` : undefined);
    const { initialLoading, setInitialLoading } = useSkeleton();
    const [filter, setFilter] = useState<"All" | "Following" | "Trending">("All");
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts || []);

    useEffect(() => {
        setFilteredPosts(posts || []);
        setTimeout(() => setInitialLoading(false), 1500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts]);

    useEffect(() => {
        if (!filter && !initialLoading) return;

        let filtered = [...posts || []];

        if (filter === "Following" && following) {
            filtered = filtered.filter(post => following.some(f => f._id === post.user._id));
        } else if (filter === "Trending") {
            filtered = filtered.sort((a, b) => b.likes.length - a.likes.length);
        }

        setFilteredPosts(filtered);
        setTimeout(() => setInitialLoading(false), 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, following, posts]);

    const handleFilterChange = (option: "All" | "Following" | "Trending") => {
        setFilter(option);
        setInitialLoading(true);
    };

    return (
        <div>
            <ScrollArea className="w-full whitespace-nowrap mb-2 px-2 py-4">
                <div className="flex w-max space-x-2">
                    {["All", "Following", "Trending"].map((option, i) => (
                        <Button
                            key={i}
                            size={"sm"}
                            onClick={() => handleFilterChange(option as "All" | "Following" | "Trending")}
                            variant={filter === option ? "default" : "secondary"}
                        >
                            {option}
                        </Button>
                    ))}
                    <Button variant={"secondary"}>songs</Button>
                    <Button variant={"secondary"}>movies</Button>
                    <Button variant={"secondary"}>podcasts</Button>
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="flex flex-col gap-4">
                {initialLoading && Array.from({ length: 10 }).map((_, i) => (
                    <PostLoading key={i} />
                ))}

                {!initialLoading && filteredPosts.map((post, i) => (
                    <div key={i}>
                        <PostCard post={post} />
                        {i !== filteredPosts.length - 1 && <Separator />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayPost;

