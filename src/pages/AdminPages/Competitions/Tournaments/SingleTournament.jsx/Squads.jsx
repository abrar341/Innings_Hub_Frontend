import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGetAllSquadsQuery } from '../../../../../slices/tournament/tournamentApiSlice';
import { Spinner } from 'flowbite-react'; // Optional loading spinner
import { FaPlus } from 'react-icons/fa'; // Plus icon for the Add Team button
import AddTeamToTournamentDialog from './AddTeamToTournamentDialog';

const Squads = () => {
    const { data, isLoading, isError, error } = useGetAllSquadsQuery();
    const squads = data?.data || []; // Extract squads data

    const [openSquad, setOpenSquad] = useState(null); // State to track which squad is open

    const toggleSquad = (index) => {
        setOpenSquad(openSquad === index ? null : index); // Toggle the squad on click
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" /> {/* Loading spinner */}
            </div>
        );
    }

    if (isError) {
        return <div className="p-4 text-red-500">Error fetching squads: {error?.message}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header with Add Team button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Squads</h1>
                <AddTeamToTournamentDialog />
            </div>

            {squads.length === 0 ? (
                <div className="p-4 text-lg text-gray-600">No squads available at the moment.</div>
            ) : (
                squads.map((squad, index) => {
                    const { name, players, team } = squad;
                    const isOpen = openSquad === index;

                    return (
                        <div
                            key={index}
                            className={`card bg-white p-4 border rounded-lg mb-4 shadow-lg transition-transform duration-300 transform `}
                        >
                            {/* Squad Header */}
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300 rounded-lg"
                                id={`team-${index}`}
                                onClick={() => toggleSquad(index)} // Handle the click to toggle
                            >
                                <div className="flex items-center">
                                    <img
                                        className="rounded-lg mr-4"
                                        height="60"
                                        width="60"
                                        src={team?.teamLogo || 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/381800/381895.png'} // Default logo if none
                                        alt={team?.teamName}
                                    />
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-gray-800">{team?.teamName}</h2>
                                    </div>
                                </div>

                                {/* Arrow icon changes based on open/close state */}
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-2 text-sm">Players: {players.length}</span>
                                    {!isOpen ? (
                                        <IoIosArrowDown className="cursor-pointer text-xl" />
                                    ) : (
                                        <IoIosArrowUp className="cursor-pointer text-xl" />
                                    )}
                                </div>
                            </div>

                            {/* Players list */}
                            {isOpen && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {players.length === 0 ? (
                                        <div className="col-span-full text-xl text-gray-500">No Players Added Yet</div>
                                    ) : (
                                        players.map((player) => (
                                            <div key={player.id} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 shadow-sm">
                                                <div className="flex items-center">
                                                    <img
                                                        className="mr-3 h-12 w-12 rounded-full"
                                                        src={player.profilePicture || '/default-avatar.png'} // Default avatar if none
                                                        alt={player.playerName}
                                                    />
                                                    <div>
                                                        <h5 className="text-md font-semibold text-gray-800">{player.playerName}</h5>
                                                        <p className="text-sm text-gray-500">{player.role}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Optional action buttons */}
                            {isOpen && (
                                <div className="flex justify-end gap-3 mt-4">
                                    <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors duration-300">View Details</button>
                                    <button className="bg-gray-200 text-gray-800 py-1 px-4 rounded hover:bg-gray-300 transition-colors duration-300">Edit Squad</button>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Squads;
