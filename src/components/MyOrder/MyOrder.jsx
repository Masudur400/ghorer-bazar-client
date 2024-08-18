import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import SingleOrder from './SingleOrder';

const MyOrder = () => {

    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data : orders=[], isPending, refetch} = useQuery({
        queryKey:['orders',axiosSecure, user?.email],
        queryFn:async ()=>{
            const res = await axiosSecure.get(`/orders/${user?.email}`)
            return res.data
        }
    })

    if (isPending) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 min-h-screen'>
             {
                orders.length?
                orders?.map(order => <SingleOrder key={order._id} order={order} refetch={refetch}></SingleOrder>):
                'no data available'
             }
        </div>
    );
};

export default MyOrder;