import p1 from '../../assets/images/banner.jpg'
import p2 from '../../assets/images/admin-banner.png'
import AllProduct from '../AllProduct/AllProduct';
import useAdmin from '../Hooks/useAdmin';
import useModerator from '../Hooks/useModerator';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';


const Home = () => { 
     

    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure() 
    const axiosPublic = useAxiosPublic()

    const { data: users = {}, isPending, refetch } = useQuery({
        queryKey: ['users',user?.email, axiosPublic],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`)
            return res.data
        }
    })
    const {  name, photo, email, role, userCreateTime } = users;

    if (loading || isPending) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }

    return (
        <div>
            {
            role === 'Admin' || role === 'Moderator' ?
            <>
            <div>
                <img src={p2} alt="" className='w-full mt-5 md:w-1/3 mx-auto border' /> 
            </div>
            
            </> 
            :<>
             <div>
                <img src={p1} alt="" className='w-full mt-5' />
            </div>
            <div className='mt-10'>
                <AllProduct></AllProduct>
            </div>
            </>
        }
            
        </div>
    );
};

export default Home;