import React from 'react';
import FollowUserComponent from "../../components/display-users/FollowUserComponent";
// import { useGlobalContext } from '../../hooks/use-global';
// import axios from 'axios';
// import { baseUrl } from '../../lib/base-url';
// import { useNavigate } from 'react-router-dom';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    // const token = localStorage.getItem("token");
    // const navigate = useNavigate();

    // const { setAuth, setUser, auth, loading } = useGlobalContext();

    // useEffect(() => {
    //     if (token) {

    //         const fetchUser = async () => {
    //             try {
    //                 const res = await axios.get(`${baseUrl}user/profile`, {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 });

    //                 // console.log("Auth: ", res.data);


    //                 if (res.data.success) {
    //                     setAuth(true);
    //                     setUser(res.data.data);
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching user data:", error);
    //                 localStorage.removeItem("token");
    //                 setAuth(false);
    //                 setUser(undefined);
    //                 navigate("/sign-in");
    //             }
    //         };

    //         fetchUser();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [token, auth, loading]);

    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-10'>
            <div className='hidden lg:block lg:col-span-2'></div>
            <div className='col-span-1 md:col-span-3'>
                <div className='max-w-[470px] w-full mx-auto'>
                    {children}
                </div>
            </div>
            <div className='hidden md:block md:col-span-2'>
                <div className='sticky top-24'>
                    <FollowUserComponent />
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
