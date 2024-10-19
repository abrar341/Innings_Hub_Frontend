import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserPlayerCard from './UserPlayerCard';

// Loading Skeleton Component
const LoadingSkeleton = () => (
    <div className="border rounded-xl border-gray-300 bg-white shadow-md p-5 flex flex-col items-center">
        <div className="animate-pulse flex items-center space-x-4">
            <div className="rounded-full bg-gray-300 h-24 w-24" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
        </div>
        <div className="mt-4 h-4 bg-gray-300 rounded w-1/4" />
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
        return <div className='grid gap-4 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4'>
            <LoadingSkeleton />
        </div>;
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
