import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGetAllSquadsQuery, useGetSingleTournamentSquadsQuery, useRemoveTeamFromTournamentMutation } from '../../../../../slices/tournament/tournamentApiSlice';
import { Spinner } from 'flowbite-react'; // Optional loading spinner
import AddTeamToTournamentDialog from './AddTeamToTournamentDialog';
import { useOutletContext } from 'react-router-dom';
import AddPlayerToSqaud from './AddPlayerToSqaud';

const Squads = () => {
    const context = useOutletContext();
    let tournament = context;
    const [squads, setSquads] = useState([])
    console.log(squads?.length);

    const tournamentId = tournament?._id;
    console.log(tournamentId);


    const { data, isLoading, isError, error, refetch } = useGetSingleTournamentSquadsQuery(tournamentId);
    console.log(data);
    useEffect(() => {
        if (data) {
            setSquads(data?.data);
        }
        if (!data) {
            setSquads([]);
        }
    }, [data]);
    useEffect(() => {
        refetch()
    }, [squads]);
    const [removeTeamFromTournament] = useRemoveTeamFromTournamentMutation(); // Initialize mutation

    const [openSquad, setOpenSquad] = useState(null); // State to track which squad is open

    const toggleSquad = (index) => {
        setOpenSquad(openSquad === index ? null : index); // Toggle the squad on click
    };

    const handleRemoveTeam = async (squadId) => {
        try {
            const res = await removeTeamFromTournament({ tournamentId, squadId }).unwrap();
            setOpenSquad(false)
        } catch (error) {
            console.error('Failed to remove the team:', error);
            alert('Error removing team.');
        }
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
                <AddTeamToTournamentDialog tournamentId={tournamentId} />
            </div>

            {squads?.length === 0 ? (
                <div className="p-4 text-lg text-gray-600">No squads available at the moment.</div>
            ) : (
                squads?.map((squad, index) => {
                    const { name, players, team, _id: squadId } = squad; // Extract squadId
                    const isOpen = openSquad === index;

                    return (
                        <div
                            key={index}
                            className={`card bg-white p-4 border rounded-lg mb-4 shadow-lg transition-transform duration-300 transform `}
                        >
                            {/* Squad Header */}

                            <div
                                className="flex justify-between items-center p-4 cursor-pointer  rounded-lg"
                                id={`team-${index}`}

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
                                <div className="flex" onClick={() => toggleSquad(index)} >
                                    <span className="text-gray-500 mr-2 text-sm">Players: {players.length}</span>
                                    {!isOpen ? (
                                        <IoIosArrowDown className="cursor-pointer text-xl" />
                                    ) : (
                                        <IoIosArrowUp className="cursor-pointer text-xl" />
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    {
                                        !isOpen && (
                                            <AddPlayerToSqaud />

                                        )
                                    }
                                    <button
                                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                                        onClick={() => handleRemoveTeam(squadId)} // Call the remove function
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            {/* Players list */}
                            {
                                isOpen && (
                                    <div className='flex items-center flex-col'>
                                        <div className='self-end'>
                                            <AddPlayerToSqaud />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                            {players.length === 0 ? (
                                                <div className="col-span-full text-base text-gray-500">No Players Added Yet</div>
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

                                    </div>


                                )
                            }


                        </div>
                    );
                })
            )}
        </div >
    );
};

export default Squads;
