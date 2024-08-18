import React from 'react';
import useAdmin from '../components/Hooks/useAdmin';
import useModerator from '../components/Hooks/useModerator';
import useAuth from '../components/Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminAndModeratorRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const [isModerator, isModeratorLoading] = useModerator()
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading || isModeratorLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-lg text-[#c60e6a]"></span>
        </div>
    }

    if (user && isAdmin || isModerator) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default AdminAndModeratorRoute;