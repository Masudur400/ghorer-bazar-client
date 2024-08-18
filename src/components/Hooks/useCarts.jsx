import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCarts = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data : carts = [], isPending, refetch} = useQuery({
        queryKey:['carts', user?.email, axiosSecure],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/carts/${user?.email}`)
            return res.data
        }
    })

    return  [carts,isPending, refetch]
};

export default useCarts;