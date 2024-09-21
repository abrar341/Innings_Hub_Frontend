import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import ClubList from './ClubList'



const Clubs = () => {
    return (
        <>
            {/* <div className=" bg-gray-100 mx-auto gap-3 p-4 pb-0  bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                    <FaPlus className="mr-2" />
                    Create New Club
                </button>
            </div> */}
            <ClubList />
        </>
    )
}

export default Clubs
