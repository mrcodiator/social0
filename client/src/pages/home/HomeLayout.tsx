import React from 'react';
import FollowUserComponent from "../../components/display-users/FollowUserComponent";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {

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
