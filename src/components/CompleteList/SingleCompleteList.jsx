import React from 'react';
import Swal from 'sweetalert2'; 
import useAxiosSecure from '../Hooks/useAxiosSecure';

const SingleCompleteList = ({data, refetch}) => {

    const axiosSecure = useAxiosSecure()

    const { _id, name, email, phone, address, totalPrice, products, orderDate, status, productsIds, deliveryCharge } =data

    const date = new Date(orderDate)
    // const formattedDateOnly = date.toLocaleDateString()
    const formattedDate = date.toLocaleString();

    const handleDelete = _id => {
        console.log(data)
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
                axiosSecure.delete(`/completeList/dd/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: ` product has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
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
        <div className='flex justify-center items-center my-2'>  
            <button onClick={()=>handleDelete(_id)} className='bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium px-2 py-1 rounded-md'>Delete Data</button>
        </div>


    </div> 
    );
};

export default SingleCompleteList;