import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; 
import SingleUser from './SingleUser';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
     

    const { data: allUser = [], isPending, refetch } = useQuery({
        queryKey: ['users', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })


   

    return (
        <div className='my-10 md:px-6 overflow-x-auto'>
            {
                allUser.length ?
                    allUser?.map((user, idx) => <SingleUser key={user._id} idx={idx} user={user} refetch={refetch}></SingleUser>) :
                    'data not available'
            }
        </div>
        // <div>
        //     <ToastContainer></ToastContainer>
        //     <div className="overflow-x-auto">
        //         <table className="table">
        //             {/* head */}
        //             <thead>
        //                 <tr>
        //                     <th></th>
        //                     <th>Details</th>
        //                     <th>Role</th>
        //                     <th>Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {/* row 1 */}
        //                 {
        //                     allUser.length ?
        //                         allUser.map((user, idx) => <tr key={user?._id}>
        //                             <td>{idx + 1}</td>
        //                             <td>
        //                                 <div className="flex items-center gap-3">
        //                                     <div className="avatar">
        //                                         <div className="mask mask-squircle h-12 w-12">
        //                                             <img
        //                                                 src={user?.photo}
        //                                                 alt="image" />
        //                                         </div>
        //                                     </div>
        //                                     <div>
        //                                         <div className="font-bold">{user?.name}</div>
        //                                         <div className="text-sm opacity-50">{user?.email}</div>
        //                                     </div>
        //                                 </div>
        //                             </td>
        //                             <td>  {user?.role} </td>
        //                             <td>
        //                                 {
        //                                     !open ?
        //                                         <div onClick={() => setCurrentUser(user)} className='w-fit'>
        //                                             <button onClick={() => setOpen(!open)} className='bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium px-2 py-1 rounded-md'>Change Role</button>
        //                                         </div>
        //                                         :
        //                                         <form onSubmit={handleRoleUpdate} className='flex items-center gap-3 my-2'>
        //                                             <select name="role" id="" className="border px-4 py-1 rounded-md">
        //                                                 <option disabled selected>{user?.role}</option>
        //                                                 <option value='Guest'>Guest</option>
        //                                                 <option value='Moderator'>Moderator</option>
        //                                                 <option value='Admin'>Admin</option>
        //                                             </select>
        //                                             <div>
        //                                                 <input type="submit" value="Done" className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-normal text-[10px]" />
        //                                             </div>
        //                                         </form>
        //                                 }  
        //                             </td>

        //                         </tr>)
        //                         : 'no data available'
        //                 }
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
    );
};

export default AllUsers;