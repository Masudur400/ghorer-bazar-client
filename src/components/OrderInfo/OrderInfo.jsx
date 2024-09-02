import React, { useState } from 'react';
import useCarts from '../Hooks/useCarts';
import { Helmet } from 'react-helmet';
import useAuth from '../Hooks/useAuth';
import { IoIosArrowDown } from 'react-icons/io';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const OrderInfo = () => {

    const { user } = useAuth()
    const [carts, refetch] = useCarts()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [serviceCharge, setServiceCharge] = useState(0)
    const [location, setLocation] = useState('Service Charge')
    const [open, setOpen] = useState(false)
    const totalPrice = carts.reduce((total, product) => total + product.Price, 0);
    const inTotal = parseInt(totalPrice) + parseInt(serviceCharge)

    

    const handleYesNo = element => {
        if (element === '70') {
            setServiceCharge(70);
            setLocation('In Dhaka City (tk : 70)')
            setOpen(!open)
        }
        else if (element === '120') {
            setServiceCharge(120)
            setLocation('Out of Dhaka City (Tk : 120)')
            setOpen(!open)
        }

    }

    const idCarts = carts?.map(cart => {
        return {
            productName: cart.productName,
            productImage: cart.productImage,
            quantity : cart.quantity,
            image: cart.productImage
        };
    });
    
    

    const handleOrder = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const name = form.get('name')
        const phone = form.get('phone')
        const address = form.get('address')
        const shippingMethod = serviceCharge
        const total = inTotal
        const products = idCarts
        // const products = carts.map(cart => cart.productName)
        const productsIds = carts?.map(cart => cart._id)
        // const images = carts.map(cart => cart.productImage)
        const date = new Date()
 

        try {
            const order = {
                email: user?.email,
                name,
                phone,
                address,
                deliveryCharge: shippingMethod,
                totalPrice: total, 
                products,
                // images,
                productsIds,
                orderDate: date,
                status: 'pending'
            }

            const res = await axiosSecure.post('/orders', order)
            // console.log(res.data)
            if (res.data.orderResult.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Order successful!",
                    icon: "success"
                });
                navigate('/myOrders')
                refetch()
            }
        } catch (error) {
            console.error('Error :', error);
        }
    }

    return (
        <div>
            <div className="lg:w-2/4 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg  shadow-md max-sm:mx-4 ">
                <Helmet>
                    <title>Order</title>
                </Helmet>

                <h3 className="text-3xl font-bold text-center text my-2">Order For <br /> Cash On Delivery</h3>

                <div>
                    <p className="font-semibold text-sm md:text-base"> Service Charge  (select your location) </p>
                    <div className="flex gap-[2px] justify-center items-center text-xs font-medium">

                        <button onClick={() => setOpen(!open)} required className=" flex   items-center gap-1 bg-gray-100 rounded-md px-2 py-[9px] w-full "> {location}  <IoIosArrowDown></IoIosArrowDown></button>
                    </div>
                    {
                        open ?
                            <ul className="flex flex-col z-[999] absolute bg-gray-50 p-2"> 
                                <li><button onClick={() => handleYesNo('70')} className="font-medium mb-1 text-center text-xs border px-2 w-full">In Dhaka City (tk : 70)</button></li>
                                <li><button onClick={() => handleYesNo('120')} className="font-medium mb-1 text-center text-xs border px-2 w-full">Out of Dhaka City (Tk : 120)</button></li>

                            </ul> : ''
                    }
                </div>

                <form onSubmit={handleOrder}> 
                    <div className="">
                        <div>
                            <p className="font-semibold">Your Name</p>
                            <input type="text" required name="name" placeholder="Your Name" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold">Phone Number</p>
                            <input type="text" required name="phone" placeholder="Phone Number" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>

                        <div>
                            <p className="font-semibold text-sm md:text-base">Address</p>
                            <input type="text" required name="address" placeholder="Address" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>

                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    {/* <th></th> */}
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    carts?.map((cart, idx) => <tr key={cart._id}>
                                        {/* <th>{idx+1}</th> */}
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={cart?.productImage}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{cart?.productName}</td>
                                        <td>{cart?.Price} Tk</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="divider my-0"></div>

                    <div className=''>
                        <p className='flex justify-between items-center font-medium'><span>Sub Total :</span><span>{totalPrice} TK</span></p>
                        <p className='flex justify-between items-center font-medium'><span>Service Charge :</span><span>{serviceCharge} Tk</span></p>
                    </div>
                    <div className="divider my-0"></div>
                    <p className='flex justify-between items-center font-medium'><span>Total :</span><span>{inTotal} Tk</span></p>

                    <div className="flex justify-center">
                        <input className="w-fit px-4 py-1 md:py-2 text-center text-lg rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-bold my-3" type="submit" value="Order Now" />

                    </div>
                </form>

            </div>
        </div>
    );
};

export default OrderInfo;