import p1 from '../../assets/images/banner.jpg'
import p2 from '../../assets/images/banner-2.jpg'
import AllProduct from '../AllProduct/AllProduct';


const Home = () => {
    return (
        <div>
             <div  >
                <img src={p1} alt="" className='w-full mt-5' />
                {/* <p><span className='text-3xl font-bold'>এবার ঘরেই হবে</span> <br /> <span> ঘরের বাজার</span></p> */}
               </div>

               <div className='mt-10'>
                <AllProduct></AllProduct>
               </div>
        </div>
    );
};

export default Home;