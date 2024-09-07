import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPlayerCard from './AdminPlayerCard';
import { useSelector } from 'react-redux';


const PlayerList = () => {

    const players = useSelector((state) => state.players.players);

    const navigate = useNavigate()

    const handleClick = (name) => {
        navigate(`/player/${name}`);
    };

    if (players.length === 0) {
        return <div>No player found</div>
    }
    return (
        <div className="grid gap-4 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 p-4">
            {players?.map((player, index) => (
                <AdminPlayerCard key={index} player={player} onClick={handleClick} />
            ))}
        </div>
    );
};

export default PlayerList;
