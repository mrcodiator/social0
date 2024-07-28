import { useSkeleton } from "../../hooks/use-skeleton";
import { Post } from "../../types/post.type"
import PostLoading from "../loading/post-loading";
import PostCard from "../post-card/PostCard"
import { Separator } from "../ui/separator";

const ProfilePosts = ({ posts }: { posts: Post[] }) => {
    const { initialLoading } = useSkeleton();
    return (
        <div>
            {initialLoading && Array.from({ length: 10 }).map((_, i) => (
                <PostLoading key={i} />
            ))}
            {!initialLoading && posts && posts.length > 0 && posts.map((post: Post, i: number) => (
                <div key={i}>
                    <PostCard key={i} post={post} />

                    {i !== posts.length - 1 && <Separator />}
                </div>
            ))}
            {!initialLoading && posts.length === 0 && <p className=" text-center text-lg text-muted-foreground font-medium my-20">No posts yet</p>}
        </div>
    )
}

export default ProfilePosts
