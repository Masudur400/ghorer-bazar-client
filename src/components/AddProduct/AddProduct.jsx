import axios from "axios";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";




const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddProduct = () => {

    const axiosSecure = useAxiosSecure()

    const handleAddProduct = async (e) => {
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

            const imageRes = await axios.post(imageHostingApi, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = imageRes.data.data.url;

            const data = {
                productName, 
                Price: parseInt(Price), 
                productImage: imageUrl,
                productDetails,
                productCategory,
                productAddDate:date
            } 

            axiosSecure.post('/products', data)
                .then(res => { 
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Success!",
                            text: "Product added successfully!",
                            icon: "success"
                        }); 
                    } 
                }) 

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }

    }

    return (
        <div>
            <div className="lg:w-2/4 md:w-2/3 mx-auto my-5 md:p-5 p-3 rounded-lg bg-gradient-to-r from-[#e4b4cc] to-[#f0a8cc] shadow-md max-sm:mx-4 ">
                <Helmet>
                    <title>Add Product</title>
                </Helmet>

                <h3 className="text-3xl font-bold text-center text my-4">Add Product</h3>
                <form onSubmit={handleAddProduct}>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                        <div>
                            <p className="font-semibold">Product Name</p>
                            <input type="text" name="productName" placeholder="Product Name" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                        <div>
                            <p className="font-semibold"> Category</p>
                            {/* <input type="text" name="productCategory" placeholder="Product Type" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" /> */}
                            <select name="productCategory" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2">
                                <option disabled selected value="">Select One</option>
                                <option value="SarishaOil">Sarisha Oil</option>
                                <option value="Ghee(ঘি)">Ghee (ঘি)</option>
                                <option value="Dates(খেজুর)">Dates (খেজুর)</option>
                                <option value="Honey">Honey</option>
                                <option value="HoneyNuts">Honey Nuts</option>
                                <option value="Nuts&Seeds(বাদাম এবং বীজ)">Nuts & Seeds (বাদাম এবং বীজ)</option>
                            </select>
                        </div>
                         
                         
                        <div>
                            <p className="font-semibold">Price</p>
                            <input type="text" name="Price" placeholder="New Price" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2" />
                        </div>
                         
                        <div>
                            <p className="font-semibold text-sm md:text-base">Product Image</p>
                            <input type="file" placeholder="" name="productImage" id="" className="border-2 rounded-sm md:rounded-md w-full text-sm md:text-base  mb-2 bg-white" />
                        </div>
                    <div>
                        <p className="font-semibold text-sm md:text-base">Product Details</p>
                        <textarea name="productDetails" placeholder="Product Details" id="" className="border-2 rounded-md w-full text-sm md:text-base px-4 md:py-1 mb-2"></textarea>
                    </div>
                    </div>


                    <div className="flex justify-center">
                        <input className="w-fit px-4 py-1 md:py-2 text-center text-lg rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-bold my-3" type="submit" value="Add Product" />

                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddProduct;