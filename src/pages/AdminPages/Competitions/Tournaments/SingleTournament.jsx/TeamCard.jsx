import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React, { useState } from 'react';
import { getRoleImageUrl } from '../../../../../utils/getRoleImageUrl';
// import players from '../../../../../data/players';
const TeamCard = ({ squad }) => {


    const [isOpen, setIsOpen] = useState(false);

    console.log(squad);
    const { name, players, team } = squad;
    return (
        <div className="card  p-4 border-y mb-2">
            <div
                className="flex justify-between items-center p-4"
                id={`team-${3}`}
            >
                <div className="flex justify-between items-center cursor-pointer text-dark">
                    <img
                        className="rounded-lg mr-3"
                        height="60"
                        width="60"
                        src={team?.teamLogo}
                        alt={team?.teamName}
                    />
                    <div className="text-left">
                        <h5 className="text-lg font-semibold">{team?.teamName}</h5>
                    </div>
                </div>

                {!isOpen ? <IoIosArrowDown onClick={() => setIsOpen(!isOpen)} className="cursor-pointer"
                /> : <IoIosArrowUp onClick={() => setIsOpen(!isOpen)} className="cursor-pointer"
                />}
            </div>

            {isOpen && (
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {players.length === 0 ? <div className="text-2xl ">No Players Added Yet</div> : players.map((player) => (
                        <div key={player.id} className="p-2 border rounded-lg">
                            <div className="flex justify-between items-center align-items-center">
                                <img
                                    className=" mr-3 h-10 w-10 rounded-full"
                                    src={player.profilePicture}
                                    alt={player.playerName}
                                />
                                <div className="media-body">
                                    <h5 className="m-0 text-sm font-semibold">{player.playerName}</h5>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <img
                                            className="w-4 h-4"
                                            src={getRoleImageUrl(player.role)}
                                            alt={player.role}
                                        />
                                        <p className="mb-0 text-sm mt-1">
                                            {player.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamCard;
