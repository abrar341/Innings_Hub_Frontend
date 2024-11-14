import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import PlayerList from '../Player/PlayerList';
import { useAllPlayersQuery } from '../../slices/player/playerApiSlice';

const Players = () => {
    const { data, isLoading, isError, error } = useAllPlayersQuery();
    const players = data?.data || [];
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedClub, setSelectedClub] = useState('');
    const [showInactivePlayers, setShowInactivePlayers] = useState(false);


    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };
    const handleInactiveFilterToggle = () => {
        setShowInactivePlayers((prev) => !prev);
    };
    const handleClubChange = (event) => {
        setSelectedClub(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedTeam('');
        setSelectedClub('');
        setShowInactivePlayers(false)
    };

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-800 mx-auto p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="w-full col-span-1 sm:col-span-1 lg:col-span-1 lg:order-none">
                    <div className="relative w-full">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={handleInputChange}
                            className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                            placeholder="Search players by name..."
                            required
                        />
                    </div>
                </form>

                {/* Team Filter */}
                <div className="col-span-1 sm:col-span-1 lg:col-span-1">
                    <select
                        value={selectedTeam}
                        onChange={handleTeamChange}
                        className="block w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Filter by team</option>
                        {Array.from(new Set(players.map(player => player.currentTeam?.teamName))).map((teamName, index) => (
                            teamName && <option key={index} value={teamName}>{teamName}</option>
                        ))}
                    </select>
                </div>

                {/* Club Filter */}
                <div className="col-span-1 sm:col-span-1 lg:col-span-1">
                    <select
                        value={selectedClub}
                        onChange={handleClubChange}
                        className="block w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Filter by club</option>
                        {Array.from(new Set(players.map(player => player.associatedClub?.clubName))).map((clubName, index) => (
                            clubName && <option key={index} value={clubName}>{clubName}</option>
                        ))}
                    </select>
                </div>


            </div>

            {/* Reset Button */}
            <div className="flex justify-center gap-4 my-2 items-center">


                <button
                    onClick={handleInactiveFilterToggle}
                    className="px-4 py-2 text-white  bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                    {showInactivePlayers ? "Inactive Players ✕" : "Inactive Players"}
                </button>
                <button
                    type="button"
                    onClick={handleResetFilters}
                    className="bg-red-500 text-white dark:bg-red-600 px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none
                     "
                >
                    Reset Filters
                </button>
            </div>

            <PlayerList
                isError={isError}
                players={players}
                searchQuery={searchQuery}
                selectedTeam={selectedTeam}
                selectedClub={selectedClub}
                showInactivePlayers={showInactivePlayers}
                isLoading={isLoading}
            />
        </>
    );
}

export default Players;
