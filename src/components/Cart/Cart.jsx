import { Helmet } from "react-helmet";   
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import SingleCart from "./SingleCart";
import useCarts from "../Hooks/useCarts";
import { Link } from "react-router-dom"; 
import Swal from "sweetalert2";
 



const Cart = () => {

    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()
    const [carts,isPending, refetch] = useCarts()

    if (isPending) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }
    
    const totalPrice = carts.reduce((total, product) => total + product.Price, 0);

 

    return (
        <div>
              
            <Helmet>
                <title>MyCart</title>
            </Helmet> 
            <div className="bg-gradient-to-r from-[#f0d3e2] to-[#dbbbcb] p-4 flex ">
                <h2 className="text text-xl md:text-2xl font-bold text-white text-center flex-1">Your Cart</h2>
                <div className="flex justify-end">
                 
                 {
                    carts.length?
                    <Link to='/orderInfo'>
                    <button  className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium">Order Now : {totalPrice} tk</button></Link> :
                    <button onClick={()=>{ Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "No product available in cart",
                        showConfirmButton: false,
                        timer: 500
                      }); }}  className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium">Order Now : {totalPrice} tk</button>
                 }
                  
                </div>
            </div>
            <div className="min-h-screen">
                {
                    carts?.map(cart => <SingleCart key={cart._id} cart={cart} refetch={refetch}></SingleCart>)
                }
            </div>

        </div>
    );
};

export default Cart;