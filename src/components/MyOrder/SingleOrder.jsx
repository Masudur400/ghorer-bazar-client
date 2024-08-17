import React from 'react';

const SingleOrder = ({ order }) => {
    const { name, email, phone, address, totalPrice, products, images, orderDate, status } = order

    const date = new Date(orderDate)
    // const formattedDateOnly = date.toLocaleDateString()
    const formattedDate = date.toLocaleString();

    return (
        <div className='flex flex-col  border rounded-md shadow-md p-3'>

            <div>
                <p><span className='font-medium'>Name :</span> {name}</p>
                <p> <span className='font-medium'>Email :</span> {email}</p>
                <p> <span className='font-medium'>Phone :</span> {phone}</p>
                <p> <span className='font-medium'>Address :</span> {address} </p>
                <p> <span className='font-medium'>Order Date :</span> {formattedDate} </p>
                <p> <span className='font-medium'>Order Status :</span> <span className='text-red-500'>{status}</span></p>
                <p> <span className='font-medium'>Total Price :</span> {totalPrice} tk</p>
            </div>
            <div className="divider my-0"></div>
            <div className='space-y-2 flex-grow'>
                <div className='flex gap-1 flex-wrap'>
                    {
                        images.map((image, idx) => <div key={idx} className='flex justify-center items-center gap-1 '>
                            <p>{idx + 1}.</p>
                            <img src={image} alt="image" className='w-12 h-12 border' />
                        </div>)
                    }
                </div>
                <div className='flex flex-col space-y-3 '>
                    {
                        products.map((product, idx) => <div key={idx} className='flex gap-1'>
                            <p>{idx + 1}.</p>
                            <p className='' >{product}</p>
                        </div>)
                    }
                </div>
            </div>
            <div className="divider my-0"></div>
            <div className='flex justify-center items-center my-2'>
            <button className='bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium px-2 py-1 rounded-md'>Order Cancel</button>
            </div>

        </div>
    );
};

export default SingleOrder;