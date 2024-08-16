import { Helmet } from "react-helmet"; 
import { useQuery } from "@tanstack/react-query"; 
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import SingleCart from "./SingleCart";



const Cart = () => {

    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()

    const {data : carts = [], isPending, refetch} = useQuery({
        queryKey:['carts', user?.email, axiosSecure],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/carts/${user?.email}`)
            return res.data
        }
    })

    const totalPrice = carts.reduce((total, product) => total + product.Price, 0);

 

    return (
        <div>
            <Helmet>
                <title>MyCart</title>
            </Helmet> 
            <div className="bg-gradient-to-r from-orange-300 to-red-300 p-4 flex">
                <h2 className="text text-xl md:text-2xl font-bold text-white text-center flex-1">Your Cart</h2>
                <div className="flex justify-end">
                <button  className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium">Pay: {totalPrice} tk</button>
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