import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllProductTable = () => {

    const axiosSecure = useAxiosSecure()
    const [pages, setPages] = useState([])
    const [itemParPage, setItemParPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(0)

    const { data: allData = [], isPending, refetch } = useQuery({
        queryKey: ['products', axiosSecure, currentPage, itemParPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/pagination?page=${currentPage}&size=${itemParPage}`)
            return res.data
        }
    })

    // load product count 
    const { data: count = {}, isPending: isLoading } = useQuery({
        queryKey: ['productsCount', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get('/productsCount')
            return res.data
        }
    })

    useEffect(() => {
        if (count.count) {
            const numberOfPages = Math.ceil(count.count / itemParPage)
            const page = [...Array(numberOfPages).keys()];
            setPages(page)
        }
    }, [itemParPage, count])

    const handleItemParPage = e => {
        const val = parseInt(e.target.value)
        setItemParPage(val)
        setCurrentPage(0)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    if (isPending || isLoading) {
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
                                position: "top-end",
                                icon: "success",
                                title: "product has been deleted.",
                                showConfirmButton: false,
                                timer: 1000
                            }); 
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex gap-1 justify-end items-center mr-4 text-xs font-medium my-5">
                <p className="px-2 py-1 bg-gray-100">Show : </p>
                <select onChange={handleItemParPage} defaultValue={itemParPage} name="" id="" className="border px-2 py-1">
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                </select>
            </div>
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

            <div className="md:w-1/2 mx-auto mt-10 mb-5 text-white">
                <button onClick={handlePrevPage} className="px-3 py-1 font-medium bg-[#c60e6a] hover:bg-[#d04d8f] mr-3 rounded-sm ">Prev</button>
                {
                    pages?.map(page => <button onClick={() => setCurrentPage(page)} key={page} className={currentPage === page ? "px-3 py-1 bg-[#6a0437] hover:bg-[#c60e6a] mr-3 rounded-sm mb-2" : "px-3 py-1 bg-[#c60e6a] hover:bg-[#f650a3] mr-3 rounded-sm mb-2"}>{page + 1}</button>)
                }
                <button onClick={handleNextPage} className="px-3 py-1 font-medium bg-[#c60e6a] hover:bg-[#df4693] mr-3 rounded-sm ">Next</button>
            </div>
        </div>
    );
};

export default AllProductTable;