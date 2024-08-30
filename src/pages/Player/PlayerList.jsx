import React from 'react';
import { useNavigate } from 'react-router-dom';
// import players from '../../data/players';
import UserPlayerCard from './UserPlayerCard';
import AdminPlayerCard from '../AdminPages/Players/AdminPlayerCard';
import { useSelector } from 'react-redux';


const PlayerList = ({ isAdmin, data }) => {

    const players = useSelector((state) => state.players.players);

    const navigate = useNavigate()

    const handleClick = (name) => {
        navigate(`/player/${name}`);
    };

    if (players.length === 0) {
        return <div>No player found</div>
    }
    return (
        <div className="grid gap-4 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
            {players?.map((player, index) => (
                isAdmin ? <AdminPlayerCard key={index} player={player} onClick={handleClick} /> :
                    <UserPlayerCard key={index} player={player} onClick={handleClick} />
            ))}
        </div>
    );
};

export default PlayerList;
