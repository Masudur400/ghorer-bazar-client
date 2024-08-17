import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';


const SingleProduct = ({ data , refetch}) => {

    const { _id, productName, Price, productImage, productDetails, productCategory, productAddDate } = data

    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()



    const handleAddCart = async (singleData) => {

        const data = {
            email: user?.email,
            name: user?.displayName,
            productName: singleData.productName,
            Price: parseInt(singleData.Price),
            quantity: 1,
            productImage: singleData.productImage,
            productDetails: singleData.productDetails,
            productCategory: singleData.productCategory,
            productAddDate: singleData.productAddDate
        }
        const res = await axiosSecure.post('/carts', data)
        if (res.data.insertedId) {
            refetch()
            toast.success('Add cart successful')
        }
    }



    return ( 

        <div className='flex flex-col p-2 shadow-md rounded-md  border group'>
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
                <Link to={`/details/${_id}`}> <button className="w-fit px-2 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium mb-3 text-sm">Details</button></Link>
                    <button onClick={()=>handleAddCart(data)} className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae]0 text-white font-medium text-sm mb-3">AddCart</button>
                </div>
        </div>


    );
};

export default SingleProduct;