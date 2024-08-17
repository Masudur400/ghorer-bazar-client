import { Helmet } from "react-helmet";   
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import SingleCart from "./SingleCart";
import useCarts from "../Hooks/useCarts";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';



const Cart = () => {

    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()
    const [carts, refetch] = useCarts()

    // const {data : carts = [], isPending, refetch} = useQuery({
    //     queryKey:['carts', user?.email, axiosSecure],
    //     queryFn: async ()=>{
    //         const res = await axiosSecure.get(`/carts/${user?.email}`)
    //         return res.data
    //     }
    // })
    
    const totalPrice = carts.reduce((total, product) => total + product.Price, 0);

 

    return (
        <div>
            <ToastContainer></ToastContainer>
            <Helmet>
                <title>MyCart</title>
            </Helmet> 
            <div className="bg-gradient-to-r from-[#f0d3e2] to-[#dbbbcb] p-4 flex">
                <h2 className="text text-xl md:text-2xl font-bold text-white text-center flex-1">Your Cart</h2>
                <div className="flex justify-end">
                 
                 {
                    carts.length?
                    <Link to='/orderInfo'>
                    <button  className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium">Order Now : {totalPrice} tk</button></Link> :
                    <button onClick={()=>{toast('please add one item cart')}}  className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium">Order Now : {totalPrice} tk</button>
                 }
                  
                </div>
            </div>
            <div>
                {
                    carts.map(cart => <SingleCart key={cart._id} cart={cart} refetch={refetch}></SingleCart>)
                }
            </div>

        </div>
    );
};

export default Cart;