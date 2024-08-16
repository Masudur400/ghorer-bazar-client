import { useQuery } from "@tanstack/react-query";  
import {  useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SingleProduct from "./SingleProduct";
import { IoIosArrowDown } from "react-icons/io";


const AllProduct = () => {

    const axiosSecure = useAxiosSecure()
    const [products, setProducts] = useState([]);
    const [sortPrice, setSortPrice] = useState('Default');
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)

    const { data: allData = [], isPending, refetch } = useQuery({
        queryKey: ['products', axiosSecure, search], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/pp?search=${search}`)
            return res.data
        }
    })

     

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
                <div>
                    <div className="flex gap-[2px] justify-center items-center text-xs font-medium">
                        <span>Sort By :</span>
                        <button onClick={() => setOpen(!open)} className="flex justify-center items-center gap-1 bg-gray-100 rounded-sm px-2 py-1">  {sortPrice}<IoIosArrowDown></IoIosArrowDown></button>
                    </div>
                    {
                        open ?
                            <ul className="flex flex-col z-[999] absolute bg-gray-50 p-2">
                                <li><button onClick={() => handleYesNo('default')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Default</button></li>
                                <li><button onClick={() => handleYesNo('low')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Price(Low - High)</button></li>
                                <li><button onClick={() => handleYesNo('high')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Price(High - low)</button></li>
                            </ul> : ''
                    }
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 my-10">
            {
                products.length?
                products.map(data => <SingleProduct key={data._id} data={data} refetch={refetch}></SingleProduct>)
                : allData.map(data => <SingleProduct key={data._id} data={data} refetch={refetch}></SingleProduct>)
            }
            </div>
        </div>
    );
};

export default AllProduct;