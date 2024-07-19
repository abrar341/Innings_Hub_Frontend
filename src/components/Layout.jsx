import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './MainNavbar'

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout
