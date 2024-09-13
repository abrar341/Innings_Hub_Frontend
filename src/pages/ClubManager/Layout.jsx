import React from 'react'
import UserDropdown from '../../components/userDropdown'
import { Outlet } from 'react-router-dom'

const ClubManagerLayout = () => {
    return (
        <>
            <div>
                <h2 className='text-3xl mt-6 font-bold mb-6 text-center text-gray-700'>
                    Club Manager
                </h2>
                <UserDropdown />
            </div>
        </>
    )
}

export default ClubManagerLayout
