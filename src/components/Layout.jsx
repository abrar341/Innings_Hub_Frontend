import { useState, useEffect, useContext } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Header from './MainNavbar';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useGetUserInfoQuery } from '../slices/auth/usersApiSlice';
import { setCredentials } from '../slices/auth/authSlice';
import AsideMenu from "./asideMenu/AsideMenu";
import { ThemeContext } from "./ThemeContext";
import ImageCarousel from "./ImageCrousal";

const Layout = () => {
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);
    const [isAsideLgActive, setIsAsideLgActive] = useState(false);

    const toggleMobileMenu = () => setIsMobileExpanded(!isMobileExpanded);
    const closeAside = () => setIsAsideLgActive(false);

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const id = userInfo?._id;
    const { data, isLoading } = useGetUserInfoQuery(id);
    const user = data?.data;

    useEffect(() => {
        if (user) {
            dispatch(setCredentials({ ...user }));
        }
    }, [isLoading, dispatch]);

    const location = useLocation();
    const noNavbarRoutes = ['/account', '/runner', '/side', '/club-manager', '/admin', '/scorer', '/b', 'profile'];
    const currentPath = location.pathname;
    const shouldHideNavbar = noNavbarRoutes.some((route) => currentPath.includes(route));

    // Get theme from ThemeContext
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen`}>
            <div className="bg-white min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {!shouldHideNavbar && <Header />}
                <Outlet />
                <Toaster />
            </div>
        </div>
    );
}

export default Layout;
