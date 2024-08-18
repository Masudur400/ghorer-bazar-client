import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllOrderSingle = ({ order, refetch }) => {

    const axiosSecure = useAxiosSecure()
    const [open, setOpen] = useState(false)

    const { _id, name, email, phone, address, totalPrice, products, orderDate, status, productsIds, deliveryCharge } = order

    const date = new Date(orderDate)
    // const formattedDateOnly = date.toLocaleDateString()
    const formattedDate = date.toLocaleString();



    const handleUpdateStatus = async (e) => {
        e.preventDefault()
        const currentStatus = e.target.status.value
        const data = {
            name,
            email,
            phone,
            address,
            totalPrice,
            products,
            orderDate,
            status: currentStatus,
            deliveryCharge,
            productsIds
        }
        const res = await axiosSecure.patch(`/orders/patch/${_id}`, data)
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "status update",
                showConfirmButton: false,
                timer: 500
            });
            setOpen(!open)
        }
    }

    const handleDelete = order => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete order...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${order?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: ` order has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleCompleteOrderList = async () => {
        const data = {
            name,
            email,
            phone,
            address,
            totalPrice,
            products,
            orderDate,
            status,
            productsIds,
            deliveryCharge
        }
        const res = await axiosSecure.post(`completeList`, data)
        console.log(res.data)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "data send completeList success!",
                showConfirmButton: false,
                timer: 500
            });
        }
    }



    return (
        <div className='flex flex-col  border rounded-md shadow-md p-3'>

            <div>
                <p><span className='font-medium'>Name :</span> {name}</p>
                <p> <span className='font-medium'>Email :</span> {email}</p>
                <p> <span className='font-medium'>Phone :</span> {phone}</p>
                <p> <span className='font-medium'>Address :</span> {address} </p>
                <p> <span className='font-medium'>Order Date :</span> {formattedDate} </p>

                <p> <span className='font-medium'>Order Status :</span> <span className='text-red-500'>{status}</span> </p>
                <p> <span className='font-medium'>Total Price :</span> {totalPrice} tk</p>
                {
                    status === 'complete' ?
                        <button onClick={handleCompleteOrderList} className='bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium px-2 rounded-md my-2'>Move To Complete List</button>
                        : ''
                }
            </div>
            <div className="divider my-0"></div>

            <div className='flex-grow '>
                {
                    products?.map((product, idx) => <div className='flex items-center gap-1 space-y-3 border-b'>
                        <p className='flex justify-center items-center'>{idx + 1} <span>.</span> </p>
                        <img src={product.image} alt="image" className='w-12 h-12' />
                        <p>{product.productName} <span className='ml-2 text-red-500'> ({product.quantity})</span></p>

                    </div>)
                }

            </div>  

            <div className="divider my-0"></div>
            <div className='flex justify-between items-center my-2'>

                {
                    !open ?
                        <button onClick={() => setOpen(!open)} className='bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium px-2 py-1 rounded-md'>Change Status</button> :
                        <form onSubmit={handleUpdateStatus} className='flex items-center gap-3 my-2'>
                            <select name="status" id="" className="border px-4 py-1 rounded-md">
                                <option disabled selected>{status}</option>
                                <option value='pending'>pending</option>
                                <option value='processing'>processing</option>
                                <option value='complete'>complete</option>
                            </select>
                            <div>
                                <input type="submit" value="Done" className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-normal text-[10px]" />
                            </div>
                        </form>
                }


                <button onClick={() => handleDelete(order)} className='bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium px-2 py-1 rounded-md'>Delete Order</button>
            </div>


        </div>

    );
};

export default AllOrderSingle;