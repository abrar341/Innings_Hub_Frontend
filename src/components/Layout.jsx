import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './MainNavbar'
// import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast';

// import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
    return (
        <>
            <Header />
            <Toaster
            />
            <Outlet />
        </>
    )
}

export default Layout
