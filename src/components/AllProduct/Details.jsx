import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"; 
import { Helmet } from "react-helmet"; 
import { useState } from "react";  
import { HiMinus } from "react-icons/hi";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify"; 
import { FiPlus } from "react-icons/fi";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";



const Details = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [count, setCount] = useState(1)
    const {user, loading} = useAuth()

    // data load for details
    const { data: singleData = {}, isPending , refetch} = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`)
            return res.data
        }
    })

    const {_id, productName, Price, productImage, productDetails, productCategory, productAddDate } = singleData 
     

    // minus count 
    const handleMinus = () => {
        if(count === 1){
            return
        }
        setCount(count - 1)
    }
    
    // plus count 
    const handlePlus = () => {
        setCount(count + 1) 
    }

    const handleAddCart = async (singleData) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName : singleData.productName, 
            Price : parseInt(singleData.Price) * count, 
            quantity: count,
            productImage : singleData.productImage,
            productDetails : singleData.productDetails, 
            productCategory:singleData.productCategory,
            productAddDate : singleData.productAddDate
        }
        const res = await axiosSecure.post('/carts', data)
        if (res.data.insertedId) {
            refetch()
            toast.success('Add cart successful')
        }
    }

     

    return (
        <div className="my-10">
            <Helmet>
                <title>{productName}</title>
            </Helmet>
            <ToastContainer></ToastContainer>

            <div className="md:flex gap-3 justify-center items-center lg:w-2/3 mx-auto bg-gradient-to-r from-[#f0d3e2] to-[#dbbbcb] rounded-md shadow-md p-1">
                <div className="flex-none">
                    <img src={productImage} alt="image" className="w-52 md:w-72 mx-auto" />
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                <p className='text-base md:text-lg font-bold'>{productName}</p> 
                <p className='text-sm text-orange-500 font-medium '>{Price} Tk</p> 
                    <p className="">{productDetails}</p>
                    <div className="flex justify-between items-center px-2">
                        <div className="flex gap-1">
                            <button onClick={handleMinus} className="px-1 flex justify-center items-center"><HiMinus></HiMinus></button>
                            <p className="font-medium bg-slate-50 px-4">{count}</p>
                            <button onClick={handlePlus} className="px-1 flex justify-center items-center"><FiPlus></FiPlus></button>
                        </div>
                        <button onClick={()=>handleAddCart(singleData)} className="w-fit px-4 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium text-sm my-3 mr-7">Add Cart</button>
                    </div>
                </div>
            </div> 

        </div>
    );
};

export default Details;