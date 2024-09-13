import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './MainNavbar';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
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
