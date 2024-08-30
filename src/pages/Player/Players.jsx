import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import PlayerList from '../Player/PlayerList'

const Players = () => {
    return (
        <>
            <div className="bg-gray-100 mx-auto gap-2 p-4 pb-0 bg-gray-50 grid grid-col-1 sm:grid-cols-2">
                <div className="flex items-center">
                    <Link to='' className="bg-blue-600 rounded-lg text-white hover:text-white text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600">
                        Active
                    </Link>
                    <Link to='' className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600">
                        Inactive
                    </Link>
                </div>
                <form className="order-last sm:col-span-2 lg:col-span-1 lg:order-none">
                    <div className="relative w-full">
                        <input type="search" className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 rounded-s-lg" placeholder="Search players, teams, or names..." required />
                        <button type="submit" className="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-white bg-blue-500 rounded-e-lg">
                            <FaSearch className='className="w-4 h-4"' />
                        </button>
                    </div>
                </form>
            </div>
            <PlayerList isAdmin={false} />
        </>
    );
}

export default Players;
