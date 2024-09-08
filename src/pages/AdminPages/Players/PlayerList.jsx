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
        <div className="w-full mt-6 overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 ">
                            <th className="px-4 py-3">Player</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">DOB</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {players.map((player, index) => (
                            <AdminPlayerCard key={index} player={player} onClick={handleClick} />

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayerList;
