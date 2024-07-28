
import { useFetchData } from '../../hooks/use-fetch-hook';
import { useSkeleton } from '../../hooks/use-skeleton';
import { Post } from '../../types/post.type';
import { User } from '../../types/user.type';
import UserDetails from '../display-users/UserDetails';
import ProfileCardLoading from '../loading/profile-card-loading';




const ProfileCard = ({ user, posts }: { user: User, posts: Post[] }) => {
    const { data: following } = useFetchData<User[]>("user/" + user._id + "/following");
    const { data: followers } = useFetchData<User[]>("user/" + user._id + "/followers");
    const { initialLoading } = useSkeleton()

    return (
        <>
            {initialLoading ?
                (
                    <ProfileCardLoading />
                )
                :
                (
                    <UserDetails
                        user={user}
                        followers={followers?.length || 0}
                        following={following?.length || 0}
                        posts={posts?.length || 0}
                    />
                )
            }
        </>
    )

}

export default ProfileCard;
