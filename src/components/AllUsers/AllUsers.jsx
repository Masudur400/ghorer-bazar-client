import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; 
import SingleUser from './SingleUser';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
     

    const { data: allUser = [], isPending, refetch } = useQuery({
        queryKey: ['users', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const sortedUsers = allUser?.sort((a, b) => {
        if (a.role === 'Admin' && b.role !== 'Admin') return -1;  
        if (a.role !== 'Admin' && b.role === 'Admin') return 1;  
        if (a.role === 'Moderator' && b.role !== 'Moderator') return -1;  
        if (a.role !== 'Moderator' && b.role === 'Moderator') return 1;  
        if (a.role === 'Guest' && b.role !== 'Guest') return 1;  
        if (a.role !== 'Guest' && b.role === 'Guest') return -1;  
        return 0;  
    });

    if (isPending) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }
   

    return (
        <div className='my-10 md:px-6 overflow-x-auto'>
            {
                sortedUsers.length ?
                sortedUsers?.map((user, idx) => <SingleUser key={user._id} idx={idx} user={user} refetch={refetch}></SingleUser>) :
                    'data not available'
            }
        </div> 
    );
};

export default AllUsers;