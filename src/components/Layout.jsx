import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './MainNavbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
    return (
        <>
            <Header />
            <ToastContainer />
            <Outlet />
        </>
    )
}

export default Layout
