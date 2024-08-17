import React from 'react';
import axios from "axios";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2"; 
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; 
import { FaXmark } from "react-icons/fa6";
import useAxiosSecure from '../Hooks/useAxiosSecure';


const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const ProductUpdate = () => {

    const {id} = useParams()
    const axiosSecure = useAxiosSecure() 
    const navigate = useNavigate()

    const { data: singleData = {}, isPending, refetch } = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`)
            return res.data
        }
    })

    const { _id, productName, Price, productImage, productDetails, productCategory, productAddDate }= singleData

    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const productName = form.get('productName') 
        const Price = form.get('Price')  
        const photoFile = form.get('productImage')
        const productDetails = form.get('productDetails')
        const productCategory = form.get('productCategory')
        const date = new Date()

        // console.log(productName, productBrand, oldPrice, newPrice, productQuantity, photoFile, productDetails)

        try {
            const imageData = new FormData();
            imageData.append('image', photoFile);

            if(photoFile?.name){
                var imageRes = await axios.post(imageHostingApi, imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            const imageUrl = imageRes?.data?.data?.url;

            const updateData = {
                productName, 
                Price: parseInt(Price), 
                productImage: imageUrl || productImage,
                productDetails,
                productCategory,
                productAddDate:date
            } 

            const res = await axiosSecure.patch(`/products/${_id}`, updateData)
                 
                    if (res.data.modifiedCount > 0) {
                        refetch()
                        Swal.fire({
                            title: "Success!",
                            text: "Product update successfully!",
                            icon: "success"
                        });
                         navigate('/allDataTable')
                    } 
                 

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }

    }

    return (
        <div>
        <div className="lg:w-2/4 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg border shadow-md max-sm:mx-4 ">
            <Helmet>
                <title>Update Product</title>
            </Helmet>
            <div className="flex justify-end">
            <Link to='/allDataTable' className="p-1 border-2 border-orange-500 rounded-full"><FaXmark className="md:text-3xl text-[#b7226c] my-0"></FaXmark></Link>
        </div>

            <h3 className="text-3xl font-bold text-center text my-4">Update Product</h3>
            <form onSubmit={handleUpdateProduct}>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                    <div>
                        <p className="font-semibold">Product Name</p>
                        <input type="text" name="productName" defaultValue={productName} id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                    </div> 
                    <div>
                        <p className="font-semibold">Product Category</p>
                        <input type="text" defaultValue={productCategory}  name="productCategory"  id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                    </div>
                    <div>
                        <p className="font-semibold">Price</p>
                        <input type="text" defaultValue={Price} name="Price"  id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                    </div>  
                    <div>
                        <p className="font-semibold text-sm md:text-base">Product Image</p>
                        <input type="file"  name="productImage" id="" className="border-2 rounded-sm md:rounded-md w-full text-sm md:text-base  mb-2 bg-white" />
                    </div>
                <div>
                    <p className="font-semibold text-sm md:text-base">Product Details</p>
                    <textarea name="productDetails" defaultValue={productDetails}  id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2"></textarea>
                </div>
                </div> 

                <div className="flex justify-center">
                    <input className="w-fit px-4 py-1 text-center text-lg rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-bold my-3" type="submit" value="update Product" />

                </div>
            </form>

        </div>
    </div>
    );
};

export default ProductUpdate;