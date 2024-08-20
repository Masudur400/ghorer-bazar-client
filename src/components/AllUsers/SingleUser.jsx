import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure'; 
import Swal from 'sweetalert2';

const SingleUser = ({ user, idx, refetch }) => {

    const [open, setOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const axiosSecure = useAxiosSecure()

    const { _id, name, email, photo, role, userCreateTime } = user

    const handleRoleUpdate = async (e) => {
        e.preventDefault()
        const currentRole = e.target.role.value
        const data = {
            photo,
            email,
            name,
            role: currentRole,
            userCreateTime
        }

        const res = await axiosSecure.patch(`/users/user/${_id}`, data)
        if (res.data.modifiedCount > 0) {
            refetch()
            setOpen(!open)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Role updated",
                showConfirmButton: false,
                timer: 1000
              });
        }
    }


    return (
        <div className='md:flex gap-10 justify-between items-center border-b mb-1 space-y-1'>
            
            <div className='flex flex-1 gap-2 w-full'>
                <div className='flex justify-center items-center mr-3'>
                    <p>{idx + 1}.</p>
                </div>
                <img src={photo} alt="image" className='w-12 h-12' />
                <div>
                    <p className='font-medium'>{name}</p>
                    <p className='opacity-80'>{email}</p>
                </div>
            </div>
            <div className='flex flex-1 justify-center items-center w-full'>
                {
                    role === 'Guest' ?
                        <p><span className='font-medium'>Role :</span> <span className='text-red-500'>{role}</span></p> :
                        role === 'Admin' ?
                            <p><span className='font-medium'>Role :</span> <span className='text-green-500'>{role}</span></p> :
                            <p><span className='font-medium'>Role :</span> <span className='text-sky-500'>{role}</span></p>
                }

            </div>
            <div className=' flex md:flex-1 w-full justify-center items-center'>
                {
                    !open ?
                        <button onClick={() => setOpen(!open)} className='bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-medium px-2 py-1 rounded-md max-sm:mb-3'>Change Role</button>
                        :
                        <form onSubmit={handleRoleUpdate} className='flex items-center gap-3 my-2'>
                            <select name="role" id="" className="border px-4 py-1 rounded-md">
                                <option disabled selected>{user?.role}</option>
                                <option value='Guest'>Guest</option>
                                <option value='Moderator'>Moderator</option>
                                <option value='Admin'>Admin</option>
                            </select>
                            <div>
                                <input type="submit" value="Done" className="w-fit md:px-2 px-1 py-1 text-center rounded-md bg-gradient-to-r from-[#ee57a3] to-[#df0974] hover:from-[#c60e6a] hover:to-[#e775ae] text-white font-normal text-[10px]" />
                            </div>
                        </form>
                }
            </div>
            
        </div>

    );
};

export default SingleUser;