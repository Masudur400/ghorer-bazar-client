import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AllOrderSingle from './AllOrderSingle';
import { useQuery } from '@tanstack/react-query';

const AllOrder = () => {

    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState('')


    const { data: orders = [], isPending, refetch } = useQuery({
        queryKey: ['orders', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders`)
            return res.data
        }
    })

    if (isPending) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }

    return (

        <div>
             
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10'>
                {
                    orders.length ?
                        orders?.map(order => <AllOrderSingle key={order._id} order={order} refetch={refetch}></AllOrderSingle>) :
                        'no data available'
                }
            </div>
        </div>
    );
};

export default AllOrder;