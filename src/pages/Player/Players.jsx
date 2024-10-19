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

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
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
    };

    return (
        <>
            <div className="bg-gray-100 mx-auto p-4 pb-0 bg-gray-50 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="w-full col-span-1 sm:col-span-1 lg:col-span-1 lg:order-none">
                    <div className="relative w-full">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={handleInputChange}
                            className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-700 bg-gray-50 rounded-lg border bg-white border-gray-300"
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
                        className="block w-full p-2.5 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                        className="block w-full p-2.5 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Filter by club</option>
                        {Array.from(new Set(players.map(player => player.associatedClub?.clubName))).map((clubName, index) => (
                            clubName && <option key={index} value={clubName}>{clubName}</option>
                        ))}
                    </select>
                </div>

                {/* Reset Button */}
                <div className="col-span-1 w-full  sm:col-span-1 lg:col-span-1 flex justify-end lg:justify-start lg:mt-0 w-full">
                    <button
                        type="button"
                        onClick={handleResetFilters}
                        className="bg-red-500  text-white py-1 px-4 rounded-lg hover:bg-red-600 focus:outline-none w-full "
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            <PlayerList
                isError={isError}
                players={players}
                searchQuery={searchQuery}
                selectedTeam={selectedTeam}
                selectedClub={selectedClub}
                isLoading={isLoading}
            />
        </>
    );
}

export default Players;
