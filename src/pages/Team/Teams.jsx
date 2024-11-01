import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllTeamsQuery } from '../../slices/team/teamApiSlice';

const Teams = () => {
    const { data, isLoading, isError, error } = useGetAllTeamsQuery();

    const teams = data?.data || []; // Fetch all teams
    const clubs = [...new Set(teams.map(team => team.associatedClub?.clubName))]; // Extract unique club names

    const [selectedClub, setSelectedClub] = useState(''); // State for selected club filter
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    // Filter teams based on the selected club and search term
    const filteredTeams = teams.filter(team => {
        const matchesClub = selectedClub ? team.associatedClub?.clubName === selectedClub : true;
        const matchesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesClub && matchesSearch;
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleReset = () => {
        setSelectedClub('');
        setSearchTerm('');
    };

    return (
        <>
            <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-5 place-content-center bg-gray-100 dark:bg-gray-800 mx-auto p-4">
                <form className="col-span-2">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="focus:outline-none block p-3 w-full text-sm text-gray-900 bg-white dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Search team name..."
                        required
                    />
                </form>
                {/* Club filter dropdown */}
                <div className="col-span-2">
                    <select
                        value={selectedClub}
                        onChange={(e) => setSelectedClub(e.target.value)}
                        className="block w-full p-3 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                        <option value="" className="text-gray-500 dark:text-gray-400">Filter by club</option>
                        {clubs.map((club, index) => (
                            <option key={index} value={club} className="text-gray-700 dark:text-gray-300">
                                {club}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Reset button */}
                <div className="col-span-2 w-full sm:col-span-1 place-self-end sm:place-self-start">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="p-2.5 text-sm w-full font-medium text-white bg-red-500 rounded-lg transition-transform duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Team Cards */}
            <div className="grid sm:gap-4 md:gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 p-4">
                {filteredTeams.map((team, index) => (
                    <Link
                        to={`/team/${team._id}/players`}
                        key={index}
                        className="relative rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 hover:shadow-lg transition duration-300 ease-in transform group hover:z-20 hover:scale-110 w-52 h-52 md:w-64 md:h-64">

                        {/* Image as background */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={team.teamLogo}
                                alt={team.teamName}
                                className="w-full h-full object-cover transition duration-300 ease-in group-hover:scale-110"
                            />
                            {/* Stronger overlay for better text contrast */}
                            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-60 transition duration-300 ease-in"></div>
                        </div>

                        {/* Content on top of background */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-white">
                            {/* Text shadow for better readability */}
                            <div className="text-lg font-bold group-hover:scale-110 transition duration-300 ease-in text-white drop-shadow-lg">
                                {team.teamName}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Teams;
