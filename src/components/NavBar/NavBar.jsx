import { useState } from "react";
import { GrMenu } from "react-icons/gr";
import { HiOutlineX } from "react-icons/hi";
import { TbHomeEco } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import { GoX } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import useCarts from "../Hooks/useCarts";
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";

const NavBar = () => {

    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState(false)
    const { user, logOut, loading, setLoading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [carts] = useCarts()

    const [isAdmin , isAdminLoading] = useAdmin()
    const [isModerator, isModeratorLoading] = useModerator()

    const { data: users = {}, isPending } = useQuery({
        queryKey: ['users', user?.email, axiosSecure],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    const { photo } = users;

    const handleLogOut = () => {
        logOut()
            .then(
                setLoading(false)
            )
            .catch()
    }

    if (loading || isPending || isAdminLoading || isModeratorLoading) {
        return <div className='flex justify-center items-center '>
            <span className="loading loading-dots loading-xs text-[#c60e6a]"></span>
            {/* <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span> */}
        </div>
    }



    const routes = <>

        {
            isAdmin ?
                <>
                <li><NavLink to='/' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> Home</NavLink> </li>
                    <li><NavLink to='/addProduct' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> AddProduct</NavLink> </li>
                    <li><NavLink to='/allOrders' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}>AllOrders</NavLink> </li>
                    <li><NavLink to='/completeList' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}>CompleteOrders</NavLink> </li>
                    <li><NavLink to='/allDataTable' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> AllProduct </NavLink> </li>
                    <li><NavLink to='/allUsers' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> AllUsers </NavLink> </li></>

                : isModerator ?
                    <>
                    <li><NavLink to='/' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> Home</NavLink> </li>
                        <li><NavLink to='/addProduct' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> AddProduct</NavLink> </li>
                        <li><NavLink to='/allOrders' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}>AllOrders</NavLink> </li>
                        <li><NavLink to='/allDataTable' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> AllProduct </NavLink> </li>
                    </>
                    : <>
                        <li><NavLink to='/' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> Home</NavLink> </li>
                        <li><NavLink to='/cart' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}> Cart <sup className="bg-red-100 p-1 rounded-md">{carts?.length}</sup></NavLink> </li>
                        <li><NavLink to='/myOrders' onClick={() => setOpen(!open)} className={({ isActive }) => isActive ? 'text-[#961c59] underline font-bold' : 'hover:text-[#961c59]'}>MyOrders</NavLink> </li>
                    </>
        }


    </>

    return (
        <div className="container mx-auto px-5 py-1 flex justify-between items-center shadow-md h-14">
            {/* dropdown icons  */}
            <div onClick={() => setOpen(!open)} className="lg:hidden text-2xl md:text-3xl">
                {
                    open === true ? <HiOutlineX></HiOutlineX> : <GrMenu></GrMenu>
                }
            </div>

            {/* logo  */}
            <div>
                <h3 className="absolute lg:static max-sm:left-14 max-sm:top-[6px] md:left-20 md:top-[0px] flex gap-1 justify-center items-center"> <TbHomeEco className="text-3xl md:text-5xl text-[#961c59]"></TbHomeEco> <span className="text text-sm md:text-xl font-bold m-0">Ghorer <br /> Bazar</span></h3>
            </div>

            {/* menu / routes  */}
            <ul className={`lg:flex gap-5 left-0 min-w-28 font-medium absolute lg:static ${open ? 'top-14 md:top-[58px]' : 'hidden'} bg-gray-50 lg:bg-white p-3 rounded-sm justify-center `}>
                {routes}
            </ul>

            {/* user image & button  */}
            {/* user image & button  */}
            {
                user ?
                    <div className="flex max-sm:gap-2 gap-4 justify-center mr-2 lg:mr-6">
                        <div>
                            <div className="avatar">
                                <div className="max-sm:w-8 w-12 rounded-full border">
                                    <img src={photo} alt="user image" onClick={() => setProfile(!profile)} />
                                </div>
                            </div>
                            <ul className={`absolute space-y-5 ${profile ? 'bg-gray-50 md:min-w-32 px-3 py-2 z-[99] font-bold rounded-md right-1 md:right-4' : 'hidden'}`}>
                                <li onClick={() => setProfile(!profile)} className="absolute text-2xl  top-0 right-0"> <GoX className="border border-black rounded-full"></GoX></li>
                                <div>
                                    <li onClick={() => setProfile(!profile)}><Link to='/profile' className="hover:text-[#c60e6a]">Profile</Link></li>
                                    <li onClick={handleLogOut} className="flex gap-1 items-center hover:text-[#c60e6a]">LogOut <MdLogout></MdLogout></li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    : <div>
                        <Link to='/login' className="btn font-bold max-sm:btn-sm text-white bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae]">Login</Link>
                    </div>
            }


            {/* <div className="flex max-sm:gap-2 gap-4 justify-center">
                <div className="avatar">
                    <div className="max-sm:w-8 w-12 rounded-full bg-red-100">
                         <img src="" alt="image" />
                    </div>
                </div>
                <Link to='/login' className="btn font-bold max-sm:btn-sm text-white bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae]">Login</Link>
            </div> */}
        </div>
    );
};

export default NavBar;