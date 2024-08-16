import { useQuery } from "@tanstack/react-query";  
import {  useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SingleProduct from "./SingleProduct";


const AllProduct = () => {

    const axiosSecure = useAxiosSecure()
    const [pages, setPages] = useState([])
    const [itemParPage, setItemParPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(0)


    const { data: allData = [], isPending, refetch } = useQuery({
        queryKey: ['products', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`)
            return res.data
        }
    })

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 my-10">
            {
                allData.length?
                allData.map(data => <SingleProduct key={data._id} data={data}></SingleProduct>):''
            }
        </div>
    );
};

export default AllProduct;