import { User } from "../../types/user.type"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Briefcase, MapPin, MessageCircle, Notebook, Pencil } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Link } from "react-router-dom";
import FollowUserAction from "./FollowUserAction";
import { useGlobalContext } from "../../hooks/use-global";
import ExpandText from "../expand-text/ExpandText";

interface Props {
    user: User;
    extraInfo?: boolean
    followers?: number
    following?: number
    posts?: number;
}

const UserDetails = ({ user, extraInfo = true, followers, following, posts }: Props) => {
    const { user: currentUser } = useGlobalContext()

    return (
        <Card>
            <Link to={`/user/@${user.username}`}>
                <CardHeader className="flex flex-row items-center">
                    <Avatar className="mr-4">
                        <AvatarImage src={user?.logo} alt="Profile Logo" />
                        <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-xl font-semibold">{user.name || user.username}</CardTitle>
                        <CardDescription>@{user.username}</CardDescription>
                    </div>
                </CardHeader>
            </Link>

            <CardContent className=' flex flex-col space-y-4'>
                <div className="flex justify-around space-x-4  text-left">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium ">Followers</p>
                        <p className="text-lg font-semibold text-muted-foreground">{followers}</p>
                    </div>
                    <div className="border-r border-muted"></div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium ">Following</p>
                        <p className="text-lg font-semibold text-muted-foreground">{following}</p>
                    </div>
                    <div className="border-r border-muted"></div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium ">Posts</p>
                        <p className="text-lg font-semibold text-muted-foreground">{posts}</p>
                    </div>
                </div>


                {extraInfo &&


                    <div className="flex flex-col gap-5">
                        {user.profession &&

                            <div>
                                <Separator className="mb-5" />
                                <CardTitle className=' flex text-base  items-center gap-2'>
                                    <Briefcase className="h-4 w-4 text-primary" />
                                    Work
                                </CardTitle>
                                <CardDescription>{user.profession}</CardDescription>
                            </div>
                        }
                        {user.location &&
                            <div>
                                <CardTitle className=' flex text-base  items-center gap-2'>
                                    <MapPin className="h-4 w-4 text-primary" />
                                    Location
                                </CardTitle>
                                <CardDescription>{user.location}</CardDescription>
                            </div>
                        }
                        {user.bio &&
                            <div>
                                <CardTitle className=' flex text-base  items-center gap-2'>
                                    <Notebook className="h-4 w-4  text-primary" />
                                    Bio
                                </CardTitle>
                                <CardDescription>
                                    <ExpandText text={user.bio} />
                                </CardDescription>
                            </div>}
                        <Separator />
                    </div>
                }



            </CardContent>

            <CardFooter className=" flex justify-around gap-4">
                {currentUser?._id !== user._id ?
                    <Button size={"sm"} className='w-full'>
                        <MessageCircle className='h-4 w-4 mr-2' />
                        Message
                    </Button>
                    :
                    <Link to={'/settings'} className=" w-full">
                        <Button size={"sm"} className='w-full'>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit Profile
                        </Button>
                    </Link>
                }
                <FollowUserAction user={user} extendButton={true} />
            </CardFooter>
        </Card>
    )
}

export default UserDetails
