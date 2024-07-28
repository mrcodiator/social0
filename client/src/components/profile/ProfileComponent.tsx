import { useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard'
import ProfilePosts from './ProfilePosts'
import { useFetchData } from '../../hooks/use-fetch-hook';
import { User } from '../../types/user.type';
import { Post } from '../../types/post.type';

interface Props {
    user: User;
    posts: Post[];
}

const ProfileComponent = () => {

    const { username } = useParams();

    const { data } = useFetchData<Props>(`user/${username?.replace('@', '')}`);

    // console.log(data);


    return (
        data &&
        <div className=' flex flex-col gap-5 w-full'>
            <ProfileCard posts={data?.posts} user={data?.user} />
            <ProfilePosts posts={data?.posts} />
        </div>
    )
}

export default ProfileComponent
