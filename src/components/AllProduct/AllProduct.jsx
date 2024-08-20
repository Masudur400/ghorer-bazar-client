import { useQuery } from "@tanstack/react-query";  
import {  useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SingleProduct from "./SingleProduct";
import { IoIosArrowDown } from "react-icons/io";


const AllProduct = () => {

    const axiosSecure = useAxiosSecure()
    const [products, setProducts] = useState([]);
    const [sortPrice, setSortPrice] = useState('Default');
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [pages, setPages] = useState([])
    const [itemParPage, setItemParPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(0)

    // load all data 
    const { data: allData = [], isPending, refetch } = useQuery({
        queryKey: ['products', axiosSecure, search,currentPage,itemParPage], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/pp?search=${search}&page=${currentPage}&size=${itemParPage}`)
            return res.data
        }
    })

    // load data count 
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

     

    const handleYesNo = element => {
        if (element === 'default') {
            setProducts(allData);
            setSortPrice('Default');
            setOpen(!open)
        }
        else if (element === 'low') {
            const sorted = allData.slice().sort((a, b) => a.Price - b.Price);
            setProducts(sorted);
            // setSortPrice('ascending')
            setSortPrice('Low - High')
            setOpen(!open)
        }
        else if (element === 'high') { 
            const sorted = allData.slice().sort((a, b) => b.Price - a.Price);
            setProducts(sorted);
            // setSortPrice('descending');
            setSortPrice('High - low');
            setOpen(!open)
        }
    }

    const handleSearch = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        // const form = new FormData(e.currentTarget)
        const searchText = form.get('search')
        setSearch(searchText)
    }

    return (
        <div>
             <div className="my-4 md:flex justify-center items-center gap-10">
                <div> 
                <form onSubmit={handleSearch} className="flex justify-center items-center mb-4">
                    <input type="text" name="search" id="" placeholder="Search...." className="px-2 py-1 border border-[#df0974]" />
                    <input type="submit" value="Search" className="px-2 py-1 border border-[#df0974]  bg-[#df0974] text-white" />
                </form>
            </div>
                <div className="flex gap-4 justify-center items-center">
                <div>
                    <div className="flex gap-[2px] justify-center items-center text-xs font-medium">
                        <span>Sort By :</span>
                        <button onClick={() => setOpen(!open)} className="flex justify-center items-center gap-1 bg-gray-100 rounded-sm px-2 py-1">  {sortPrice}<IoIosArrowDown></IoIosArrowDown></button>
                    </div>
                    {
                        open ?
                              
                                <ul className="flex flex-col justify-center items-center w-36 z-[999] absolute bg-gray-50 p-2">
                                <li><button onClick={() => handleYesNo('default')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Default</button></li>
                                <li><button onClick={() => handleYesNo('low')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Price(Low - High)</button></li>
                                <li><button onClick={() => handleYesNo('high')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Price(High - low)</button></li>
                            </ul> 
                              
                            : ''
                    }
                </div>
                <div className="flex gap-1 justify-end items-center mr-4 text-xs font-medium">
                <p className="px-2 py-1 bg-gray-100">Show : </p>
                <select onChange={handleItemParPage} defaultValue={itemParPage} name="" id="" className="border px-2 py-1">
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                </select>
            </div>
                </div>

            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 my-10">
            {
                products.length?
                products?.map(data => <SingleProduct key={data._id} data={data} refetch={refetch}></SingleProduct>)
                : allData?.map(data => <SingleProduct key={data._id} data={data} refetch={refetch}></SingleProduct>)
            }
            </div>

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

export default AllProduct;