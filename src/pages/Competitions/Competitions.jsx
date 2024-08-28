import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TournamentsList from './Tournaments/TournamentsList'
import CreateTournamentDialog from './Tournaments/Dialogs/CreateTournamentDialog'



const Competitions = () => {

    return (
        <>
            <div className=" bg-gray-100 mx-auto gap-3  p-4 pb-0  bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                <div className=" flex items-center ">
                    <Link to='' className="bg-blue-600 rounded-lg text-white hover:text-white text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600">
                        Ongoing
                    </Link>
                    <Link to='' className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4  hover:text-gray-600">
                        Upcoming
                    </Link>
                    <Link to='' className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4  hover:text-gray-600">
                        Concluded
                    </Link>

                </div>
                <form className="order-last sm:col-span-2 lg:col-span-1 lg:order-none ">
                    <div className="relative w-full">
                        <input type="search" className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 rounded-s-lg " placeholder="Search teams, tournament name......" required />
                        <button type="submit" className="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-white bg-blue-500  rounded-e-lg ">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>

                {/* <AddNewButton handleAddNewClick={handleAddNewClick} /> */}


                <CreateTournamentDialog />
            </div>
            <TournamentsList />
        </>
    )
}

export default Competitions
