import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SingleCompleteList from './SingleCompleteList';

const CompleteList = () => {

    const axiosSecure = useAxiosSecure()

    const { data: allData = [], isPending, refetch } = useQuery({
        queryKey: ['products', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get(`/completeList`)
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
            <h2 className="text-xl font-bold my-4 text text-center"><span>Total Complete Order :</span> <span>{allData?.length}</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10'>

                {
                    allData.length ?
                        allData?.map(data => <SingleCompleteList key={data._id} data={data} refetch={refetch}></SingleCompleteList>) :
                        'data not available'
                }
            </div>
        </div>
    );
};

export default CompleteList;