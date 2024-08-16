import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';  
import { toast, ToastContainer } from 'react-toastify'; 
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';


const SingleProduct = ({data}) => {

    const {_id,productName, Price, productImage, productDetails, productCategory, productAddDate}=data

      const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()

     

    // const handleAddCart = async (phone) => {

    //     const data = {
    //         email: user?.email,
    //         name: user?.displayName,
    //         productName : phone.productName,
    //         productBrand : phone.productBrand,
    //         oldPrice : phone.oldPrice,
    //         newPrice : phone.newPrice,
    //         quantity:1,
    //         productQuantity : phone.productQuantity,
    //         productImage : phone.productImage,
    //         productDetails : phone.productDetails,
    //         productType : phone.productType,
    //         productAddDate : phone.productAddDate
    //     }
    //     const res = await axiosSecure.post('/carts', data)
    //     if (res.data.insertedId) {
    //         toast.success('Add cart successful')
    //     }
    // }

     

    return (
         
        <div className='flex flex-col p-2 shadow-md rounded-md bg-gradient-to-r from-[#f0d3e2] to-[#dbbbcb] group'>
            <ToastContainer></ToastContainer>
            <div>
                <img src={productImage} alt="" className=' w-40 mx-auto group-hover:scale-105'/>
            </div>
            <div className='space-y-1 my-3 flex-grow'>
                <p className='text-xs font-bold'>{productName}</p> 
                <p className='text-sm text-orange-500 font-medium '>{Price} Tk</p> 
            </div>
            <div className="divider my-1"></div>
            <div className='flex justify-between items-center'>
                <Link to={`/details/${_id}`}> <button className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium mb-3 text-sm">Details</button></Link>
                    <button onClick={()=>handleAddCart(phone)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-400 hover:to-orange-400 text-white font-medium text-sm mb-3">AddCart</button>
                </div>
        </div>
        
    );
};

export default SingleProduct;