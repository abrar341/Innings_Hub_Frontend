import React from 'react';
import { useNavigate } from 'react-router-dom';
import players from '../../data/players';


const PlayerList = () => {
    const navigate = useNavigate()

    const handleClick = (name) => {
        navigate(`/player/${name}`);
    };

    return (
        <div className="grid gap-2 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
            {players.map((player, index) => (
                <div
                    key={index}
                    className="rounded-xl hover:border-customDarkBlue hover:cursor-pointer hover:cursor-pointer grid-cols-3 border border-gray-300 overflow-hidden transition duration-300 ease-in group"
                    onClick={() => handleClick(player.name)}>
                    <div className="bg-customDarkBlue flex text-xl font-bold justify-between text-white p-4">
                        <div className="text-sm font-bold text-white ">{player.name}</div>
                        <img
                            className="max-w-8 h-6 group-hover:scale-105 transition duration-300 ease-in"
                            src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/381800/381894.png"
                            alt="India Logo"
                        />

                    </div>

                    <div className="flex flex-col gap-4 justify-center items-center p-4 space-x-4">
                        <img
                            className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-customDarkBlue object-cover transition duration-300 ease-in group-hover:scale-105"
                            src={player.image}
                            alt={player.name}
                        />
                        <div className='flex border-t group-hover:border-black  border-gray-300 pt-4 justify-center items-center gap-2'>
                            <img
                                className="h-6  group-hover:scale-105 transition duration-300 ease-in"
                                src={player.roleImg}
                                alt="India Logo"
                            />
                            <div className="text-sm font-bold group-hover:scale-105 transition duration-300 ease-in">{player.role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlayerList;
