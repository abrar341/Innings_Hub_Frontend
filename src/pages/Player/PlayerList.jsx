import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserPlayerCard from './UserPlayerCard';
import { useAllPlayersQuery } from '../../slices/player/playerApiSlice';

const PlayerList = ({ searchQuery }) => {
    const { data, isLoading, isError, error } = useAllPlayersQuery();
    const players = data?.data || []; // Extract players with a fallback to an empty array
    console.log(players);

    const navigate = useNavigate();

    const handleClick = (name) => {
        navigate(`/player/${name}`);
    };

    // Filter players based on the search query
    const filteredPlayers = players.filter((player) =>
        player.playerName?.includes(searchQuery)
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (filteredPlayers.length === 0) {
        return <div>No players found</div>;
    }

    return (
        <div className="grid gap-4 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
            {filteredPlayers.map((player, index) => (
                <UserPlayerCard key={index} player={player} onClick={handleClick} />
            ))}
        </div>
    );
};

export default PlayerList;
