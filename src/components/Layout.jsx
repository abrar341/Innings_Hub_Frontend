import { useState, useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Header from './MainNavbar';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useGetUserInfoQuery } from '../slices/auth/usersApiSlice';
import { setCredentials } from '../slices/auth/authSlice';
import AsideMenu from "./asideMenu/AsideMenu";



const Layout = () => {
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);
    const [isAsideLgActive, setIsAsideLgActive] = useState(false);

    const toggleMobileMenu = () => setIsMobileExpanded(!isMobileExpanded);
    const closeAside = () => setIsAsideLgActive(false);

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
    const noNavbarRoutes = ['/account', '/runner', '/side', '/club-manager', '/admin', '/scorer', '/b'];
    const currentPath = location.pathname;

    // Check if the current path contains any of the paths in `noNavbarRoutes`
    const shouldHideNavbar = noNavbarRoutes.some((route) => currentPath.includes(route));
    const menuAside = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: "mdi-view-dashboard",  // You can replace this with the correct mdi icon path
        },
        {
            label: "Teams",
            icon: "mdi-account-group",
            menu: [
                {
                    label: "Manage Teams",
                    href: "/teams/manage",
                },
                {
                    label: "Create Team",
                    href: "/teams/create",
                },
            ],
        },
        {
            label: "Matches",
            href: "/matches",
            icon: "mdi-cricket",
        },
        {
            label: "Settings",
            href: "/settings",
            icon: "mdi-cog",
        },
    ];

    return (
        <>
            {/* <div>
                <button className="bg-red-100" onClick={toggleMobileMenu}>Toggle</button>
                <AsideMenu
                    menu={menuAside}
                    isAsideMobileExpanded={isMobileExpanded}
                    isAsideLgActive={isAsideLgActive}
                    onAsideLgClose={closeAside}
                />
            </div> */}
            {/* Show Header only if the current path does not match any noNavbarRoutes */}
            {!shouldHideNavbar && <Header />}
            <Toaster />
            <Outlet />

        </>
    );
}

export default Layout;
