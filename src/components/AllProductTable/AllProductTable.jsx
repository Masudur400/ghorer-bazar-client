import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllProductTable = () => {

    const axiosSecure = useAxiosSecure()

    const { data: allData = [], isPending, refetch } = useQuery({
        queryKey: ['products', axiosSecure], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`)
            return res.data
        }
    })

    if (isPending) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }

    const handleDelete = data => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete product...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${data?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: ` product has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
             {
                allData?.length ?
                    <div className="overflow-x-auto">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className=""></th>
                                        <th className=""></th>
                                        {/* <th></th> */}
                                        <th className="min-w-[300px] lg:w-[60%]"></th>
                                        <th className=""></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        allData?.map((data, idx) => <tr key={data?._id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <div className="">
                                                    <div className="h-16 w-16">
                                                        <img
                                                            src={data?.productImage}
                                                            alt="image" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='text-xs font-bold'>{data?.productName}</p>
                                                 
                                                <p className='flex gap-2 items-center'><span className='text-sm text-orange-500 font-medium'>{data?.Price} Tk</span></p>
                                                
                                                 
                                                <p className="md:text-sm text-xs">{data?.productDetails}</p>
                                            </td>
                                            {/* <td className="md:text-sm text-xs">{data?.productDetails}</td> */}
                                            <td className="flex-col justify-center items-center  ">
                                                <div className="flex flex-col gap-2">
                                                    <Link to={`/updateProduct/${data?._id}`}><button className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-normal text-[10px]">Update</button></Link>
                                                    <button onClick={() => handleDelete(data)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-normal text-[10px]">Delete</button>
                                                </div>
                                            </td> 
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <p>Data is not available</p>
            }
        </div>
    );
};

export default AllProductTable;