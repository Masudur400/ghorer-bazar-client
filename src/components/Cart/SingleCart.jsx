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
                                title: "Deleted!",
                                text: `cart item has been deleted.`,
                                icon: "success"
                            }); 
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="md:flex gap-3 justify-center items-center lg:w-2/3 mx-auto bg-gradient-to-r from-orange-100 to-red-100 rounded-md shadow-md p-1 mb-5 mt-10 group">
                <div className="flex-none">
                    <img src={productImage} alt="image" className="w-52 md:w-60 mx-auto group-hover:scale-105" />
                </div>
                <div className='space-y-1 my-3 flex-grow'>
                    <p className='font-bold'>{productName}</p>
                    <p className='text-sm text-orange-500 font-medium '>{Price} Tk</p> 
                    <p>Quantity : {quantity}</p>
                    <p className="">{productDetails}</p>
                    <div className="flex justify-end items-center px-2"> 
                        <button onClick={()=>handleDelete(cart)} className="w-fit px-4 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium text-sm my-3 mr-7">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCart;