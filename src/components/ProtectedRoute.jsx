import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmailVerificationDialog from './verifyDialog';
import useDialog from '../hooks/useDialog';
import { useState } from 'react';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, userType, isVerified } = useSelector((state) => state.auth);
    console.log(isVerified);
    console.log(isAuthenticated);


    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page.
        return <Navigate to="/account/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(userType)) {
        return <Navigate to={`/`} replace />;
    }


    return <Outlet />;
};

export default ProtectedRoute;
