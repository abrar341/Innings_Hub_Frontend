import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './MainNavbar'
// import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast';

// import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {

    const location = useLocation();

    // Array of paths where the navbar should not be displayed
    const noNavbarRoutes = ['/account/login', '/account/signup', '/account/verify'];

    // Check if the current path matches any route where the navbar should be hidden
    const shouldHideNavbar = noNavbarRoutes.includes(location.pathname);
    return (
        <>
            {!shouldHideNavbar && <Header />}
            <Toaster
            />
            <Outlet />
        </>
    )
}

export default Layout
