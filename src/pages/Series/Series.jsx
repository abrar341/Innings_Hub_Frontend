import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UsersTournamentCard from '../AdminPages/Competitions/Tournaments/UsersTournamentCard';
import { useGetAllTournamentsQuery } from '../../slices/tournament/tournamentApiSlice';

const Series = () => {
    const { data, isLoading, isError, error } = useGetAllTournamentsQuery();
    const tournaments = data?.data || []; // Fallback to empty array
    const [filterType, setFilterType] = useState('all'); // 'all', 'ongoing', 'upcoming', 'concluded'
    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const [filteredTournaments, setFilteredTournaments] = useState([]);

    // Utility to get today's date in the format YYYY-MM-DD
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // YYYY-MM-DD
    };

    // Function to handle search filtering (case-insensitive)
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to reset all filters and show all tournaments
    const resetFilters = () => {
        setFilterType('all');
        setSearchQuery('');
    };

    // Filter tournaments based on the filter type and search query
    useEffect(() => {
        const today = getCurrentDate();

        const filtered = tournaments.filter((tournament) => {
            const startDate = tournament.startDate; // use startDate
            const endDate = tournament.endDate;     // use endDate

            // Filter based on the search query (case-insensitive)
            const matchesSearchQuery =
                tournament?.name.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearchQuery) return false;

            // Filter based on the type (ongoing, upcoming, concluded, or all)
            if (filterType === 'ongoing') {
                return today >= startDate && today <= endDate;
            } else if (filterType === 'upcoming') {
                return today < startDate;
            } else if (filterType === 'concluded') {
                return today > endDate;
            } else if (filterType === 'all') {
                return true; // Show all tournaments
            }

            return false;
        });

        setFilteredTournaments(filtered);
    }, [filterType, searchQuery, tournaments]);

    return (
        <>
            {/* Filter and Search Section */}
            <div className="container bg-gray-100 dark:bg-gray-800 dark:text-gray-100 mx-auto p-4 pb-0 grid-cols-1 md:grid grid-cols-2">
                <div className="flex items-center mb-3 gap-3 md:mb-2">
                    <button
                        onClick={() => setFilterType('all')}
                        className={`${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-400'
                            } text-sm font-medium py-2 px-4 rounded`}
                    >
                        All
                    </button>
                    {/* <button
                        onClick={() => setFilterType('ongoing')}
                        className={`${filterType === 'ongoing' ? 'bg-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-400 '
                            } text-sm font-medium py-2 px-4 rounded`}
                    >
                        Ongoing
                    </button>
                    <button
                        onClick={() => setFilterType('upcoming')}
                        className={`${filterType === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-400'
                            } text-sm font-medium py-2 px-4 rounded`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setFilterType('concluded')}
                        className={`${filterType === 'concluded' ? 'bg-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-400'
                            } text-sm font-medium py-2 px-4 rounded`}
                    >
                        Concluded
                    </button>
                    <button
                        onClick={resetFilters}
                        disabled={filterType === 'all' && searchQuery === ''}
                        className={`ml-4 text-sm font-medium py-2 px-4 rounded ${filterType !== 'all' || searchQuery
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Reset
                    </button> */}
                </div>

                {/* Search Form */}
                <form className="max-w-lg">
                    <div className="relative w-full">
                        <input
                            type="search"
                            className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 dark:text-gray-100 dark:bg-gray-700 rounded-e-lg border border-gray-300 dark:border-gray-600 rounded-s-lg"
                            placeholder="Search teams, tournament name..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button
                            type="submit"
                            className="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-white bg-blue-500 rounded-e-lg"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Tournament Cards Section */}
            <div className="bg-gray-100 dark:bg-gray-800 mx-auto p-4">
                <h2 className="text-xl text-gray-600 dark:text-gray-300 font-bold mb-4 capitalize">
                    {filterType === 'all' ? 'All' : filterType} Tournaments
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        <p className="text-gray-600 dark:text-gray-300">Loading tournaments...</p>
                    ) : isError ? (
                        <p className="text-red-500">Error loading tournaments: {error.message}</p>
                    ) : filteredTournaments.length === 0 ? (
                        <p className="px-1 text-base font-semibold text-gray-500 dark:text-gray-300">
                            No tournaments found
                        </p>
                    ) : (
                        filteredTournaments.map((tournament, index) => (
                            <UsersTournamentCard key={index} tournament={tournament} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Series;
