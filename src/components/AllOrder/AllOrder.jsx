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

    // const handleSearch = e => {
    //     e.preventDefault()
    //     const form = new FormData(e.currentTarget)
    //     // const form = new FormData(e.currentTarget)
    //     const searchText = form.get('search')
    //     setSearch(searchText)
    // }

    return (

        <div>
            {/* <div>
                <form onSubmit={handleSearch} className="flex justify-center items-center my-4">
                    <input type="text" name="search" id="" placeholder="Search...." className="px-2 py-1 border border-[#df0974]" />
                    <input type="submit" value="Search" className="px-2 py-1 border border-[#df0974]  bg-[#df0974] text-white" />
                </form>
            </div> */}
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