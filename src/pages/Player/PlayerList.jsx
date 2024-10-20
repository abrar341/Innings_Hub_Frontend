import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserPlayerCard from './UserPlayerCard';

const PlayerCardLoadingSkeleton = () => (
    <div className="border rounded-xl border-gray-300 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out px-2 pt-2 pb-5 cursor-pointer">
        {/* Team Logo and Player Name Skeleton */}
        <div className="flex justify-between items-center p-3 py-2 rounded-t-lg bg-gray-100 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <div className="w-1/3 h-4 bg-gray-300 rounded" />
        </div>

        {/* Player Image Skeleton */}
        <div className="p-2 text-center">
            <div className="h-24 w-24 md:h-28 md:w-28 rounded-full mx-auto bg-gray-300 border-2" />
            <div className="mt-3 flex items-center justify-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded" />
                <div className="w-16 h-4 bg-gray-300 rounded" />
            </div>
        </div>

        {/* Placeholder for Hover Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 pointer-events-none rounded-xl"></div>
    </div>
);



const PlayerList = ({ isLoading, isError, searchQuery, selectedTeam, selectedClub, players }) => {




    // Normalize search query to lowercase for case-insensitive filtering
    const normalizedSearchQuery = searchQuery.toLowerCase();

    // Filter players based on the search query, selected team, and selected club
    const filteredPlayers = players.filter((player) => {
        const matchesSearchQuery = player.playerName?.toLowerCase().includes(normalizedSearchQuery);
        const matchesTeam = selectedTeam ? player.currentTeam?.teamName === selectedTeam : true;
        const matchesClub = selectedClub ? player.associatedClub?.clubName === selectedClub : true;
        return matchesSearchQuery && matchesTeam && matchesClub;
    });

    if (isLoading) {
        return (
            <div className='grid gap-4 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4'>
                {Array.from({ length: 10 }).map((_, index) => (
                    <PlayerCardLoadingSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (isError) {
        return <div>Error: {errors.message}</div>;
    }

    if (filteredPlayers.length === 0) {
        return <div className='text-center p-4 font-semibold'>No players found</div>;
    }

    return (
        <div className="grid gap-4 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
            {filteredPlayers.map((player, index) => (
                <UserPlayerCard key={index} player={player} onClick={() => handleClick(player?._id)} />
            ))}
        </div>
    );
};

export default PlayerList;
