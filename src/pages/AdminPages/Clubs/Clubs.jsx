import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'



const Clubs = () => {

    return (
        <>
            <div className=" bg-gray-100 mx-auto gap-3  p-4 pb-0  bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                <form className="order-last sm:col-span-2 lg:col-span-1 lg:order-none ">
                    <div className="relative w-full">
                        <input type="search" className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 rounded-s-lg " placeholder="Search club by name......" required />
                        <button type="submit" className="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-white bg-blue-500  rounded-e-lg ">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>

                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                    <FaPlus className="mr-2" />
                    Create New Club
                </button>
            </div>
        </>
    )
}

export default Clubs
