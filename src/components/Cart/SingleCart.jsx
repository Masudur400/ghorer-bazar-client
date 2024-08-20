import Swal from "sweetalert2"; 
import useAxiosSecure from "../Hooks/useAxiosSecure";

 
const SingleCart = ({cart, refetch}) => {

    const axiosSecure = useAxiosSecure()

    const  {_id,productName, Price, productImage, productDetails,quantity, productCategory, productAddDate}= cart

    const handleDelete = data => {
         
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete item...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) { 
                axiosSecure.delete(`/carts/${data?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "cart item has been deleted.",
                                showConfirmButton: false,
                                timer: 1000
                            });  
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="md:flex gap-3  justify-center items-center border lg:w-2/3 mx-auto rounded-md shadow-md py-1 px-2 mb-5 mt-10 group">
                <div className="flex-none">
                    <img src={productImage} alt="image" className="w-52 md:w-56 mx-auto group-hover:scale-105" />
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                    <p className='font-bold'>{productName}</p>
                    <p className='text-sm text-orange-500 font-medium '>{Price} Tk</p> 
                    <p>Quantity : {quantity}</p>
                    <p className="">{productDetails}</p>
                    <div className="flex justify-end items-center px-2"> 
                        <button onClick={()=>handleDelete(cart)} className="w-fit px-4 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium text-sm my-3 mr-7">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCart;