import { useState, useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Header from './MainNavbar';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useGetUserInfoQuery } from '../slices/auth/usersApiSlice';
import { setCredentials } from '../slices/auth/authSlice';



const Layout = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const id = userInfo?._id
    const { data, isLoading, isError, error } = useGetUserInfoQuery(id);
    const user = data?.data;

    useEffect(() => {
        if (user) {
            // Dispatch the action to store the user information in Redux state
            dispatch(setCredentials({ ...user }));
        }
    }, [isLoading, dispatch]);

    const location = useLocation();

    // Array of paths where the navbar should not be displayed
    const noNavbarRoutes = ['/account', '/club-manager', '/admin', '/scorer'];
    const currentPath = location.pathname;

    // Check if the current path contains any of the paths in `noNavbarRoutes`
    const shouldHideNavbar = noNavbarRoutes.some((route) => currentPath.includes(route));

    return (
        <>
            {/* Show Header only if the current path does not match any noNavbarRoutes */}
            {!shouldHideNavbar && <Header />}
            <Toaster />
            <Outlet />
        </>
    );
}

export default Layout;
