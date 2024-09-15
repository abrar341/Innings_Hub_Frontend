import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserInfoQuery } from '../slices/auth/usersApiSlice';
import { useEffect } from 'react';
import { setCredentials } from '../slices/auth/authSlice';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, userType, isVerified } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/account/login" replace />;
    }
    // if (isAuthenticated) {
    //     const dispatch = useDispatch();
    //     const { data, isLoading, isError, error } = useGetUserInfoQuery();
    //     const user = data?.data;
    //     console.log(user);
    //     useEffect(() => {
    //         if (user) {
    //             // Dispatch the action to store the user information in Redux state
    //             dispatch(setCredentials({ ...user }));
    //         }
    //     }, [user, dispatch]);
    // }
    if (allowedRoles && !allowedRoles.includes(userType)) {
        return <Navigate to={`/`} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
