import { useState } from "react";
import { GrMenu } from "react-icons/gr";
import { HiOutlineX } from "react-icons/hi"; 
import { TbHomeEco } from "react-icons/tb";
import { Link } from "react-router-dom";

const NavBar = () => {

    const [open, setOpen] = useState(false)

    const routes = <>
        <li> Home </li>
        <li> About </li>
        <li> Contact </li>
        <li> Blogs </li>
        <li> Features </li>
    </>

    return (
        <div className="px-5 py-1 flex justify-between items-center shadow-md h-14">
            {/* dropdown icons  */}
            <div onClick={() => setOpen(!open)} className="lg:hidden text-2xl md:text-3xl">
                {
                    open === true ? <HiOutlineX></HiOutlineX> : <GrMenu></GrMenu>
                }
            </div>

            {/* logo  */}
            <div>
                <h3 className="absolute lg:static max-sm:left-14 max-sm:top-[6px] md:left-20 md:top-[0px] flex gap-1 justify-center items-center"> <TbHomeEco className="text-3xl md:text-5xl text-[#961c59]"></TbHomeEco> <span className="text text-sm md:text-xl font-bold m-0">Ghorer <br/> Bazar</span></h3>
            </div>

            {/* menu / routes  */}
            <ul className={`lg:flex gap-5 left-0 min-w-28  absolute lg:static ${open ? 'top-14 md:top-[58px]' : 'hidden'} bg-gray-50 lg:bg-white p-3 rounded-sm justify-center `}>
                {routes}
            </ul>

            {/* user image & button  */}
            <div className="flex max-sm:gap-2 gap-4 justify-center">
                <div className="avatar">
                    <div className="max-sm:w-8 w-12 rounded-full bg-red-100">
                         <img src="" alt="image" />
                    </div>
                </div>
                <Link to='/login' className="btn font-bold max-sm:btn-sm text-white bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae]">Login</Link>
            </div>
        </div>
    );
};

export default NavBar;