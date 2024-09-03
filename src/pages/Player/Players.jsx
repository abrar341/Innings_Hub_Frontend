import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import PlayerList from '../Player/PlayerList';

const Players = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };
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
                <form onSubmit={handleSearchSubmit} className="order-last sm:col-span-2 lg:col-span-1 lg:order-none">
                    <div className="relative w-full">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={handleInputChange} // Step 2: Handle input change
                            className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-700 bg-gray-50 rounded-e-lg border border-gray-400 rounded-s-lg"
                            placeholder="Search players by name..."
                            required
                        />
                        {/* <button
                            type="submit"
                            className="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-gray-700 rounded-e-lg"
                        >
                            <FaSearch className="w-4 h-4" />
                        </button> */}
                    </div>
                </form >
            </div >
            <PlayerList searchQuery={searchQuery} /> {/* Step 4: Pass the searchQuery as a prop */}
        </>
    );
}

export default Players;
