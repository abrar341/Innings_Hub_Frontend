import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, userType, isVerified } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page.
        return <Navigate to="/account/login" replace />;
    }
    if (!isVerified) {
        // If the user is authenticated but not verified, redirect to the verification page.
        return <Navigate to="/account/verify" replace />;
    }
    console.log(allowedRoles);
    console.log(userType);

    if (allowedRoles && !allowedRoles.includes(userType)) {
        // If the user is authenticated but does not have the correct role, redirect to the homepage or an error page.
        return <Navigate to="/" replace />;
    }

    // If the user is authenticated and has the correct role, render the children components.
    return <Outlet />;
};

export default ProtectedRoute;
