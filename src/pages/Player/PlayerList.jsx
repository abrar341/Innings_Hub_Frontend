import React from 'react';
import { useNavigate } from 'react-router-dom';
import players from '../../data/players';
import UserPlayerCard from './UserPlayerCard';
import AdminPlayerCard from './AdminPlayerCard';


const PlayerList = () => {
    const navigate = useNavigate()

    const handleClick = (name) => {
        navigate(`/player/${name}`);
    };

    return (
        <div className="grid gap-4 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
            {players.map((player, index) => (
                <AdminPlayerCard key={index} player={player} onClick={handleClick} />
            ))}
        </div>
    );
};

export default PlayerList;
