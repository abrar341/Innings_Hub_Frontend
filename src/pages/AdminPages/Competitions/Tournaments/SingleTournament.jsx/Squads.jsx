import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Spinner } from 'flowbite-react'; // Optional loading spinner
import AddTeamToTournamentDialog from './AddTeamToTournamentDialog';
import { useOutletContext } from 'react-router-dom';
import AddPlayerToSqaud from './AddPlayerToSqaud';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { useApproveSquadByIdMutation, useGetSingleTournamentSquadsQuery, useRemovePlayerFromSquadMutation, useRemoveTeamFromTournamentMutation } from '../../../../../slices/tournament/tournamentApiSlice';
import { useSelector } from 'react-redux';

const Squads = () => {
    const context = useOutletContext();
    const { isAuthenticated, userType } = useSelector((state) => state.auth);

    let tournament = context;
    const tournamentId = tournament?._id;
    const [removePlayerFromSquad] = useRemovePlayerFromSquadMutation();
    const [approveSquadById, { isLoading: squadApproving }] = useApproveSquadByIdMutation();
    const [removingPlayer, setRemovingPlayer] = useState(null); // Track which player is being removed
    const [filter, setFilter] = useState('all'); // New state for filtering squads
    const handleRemovePlayer = async (playerId, squadId) => {
        setRemovingPlayer(playerId); // Set the specific player being removed
        try {
            await removePlayerFromSquad({ squadId, playerId }).unwrap();
            toast.dismiss();
            toast.success('Player removed successfully');
        } catch (error) {
            console.error('Failed to remove player:', error);
        } finally {
            setRemovingPlayer(null);
        }
    };
    const [squads, setSquads] = useState([]);
    const { data, isLoading, isError, error, refetch } = useGetSingleTournamentSquadsQuery(tournamentId);

    // Trigger refetch whenever the component is mounted or when the tournamentId changes
    useEffect(() => {
        refetch();
    }, [refetch, tournamentId]);

    useEffect(() => {
        if (data) {
            setSquads(data?.data);
        } else {
            setSquads([]);
        }
    }, [data]);

    // Assuming isAuthenticated and userType are passed or available in the context
    const filteredSquads = squads.filter((squad) => {
        if (isAuthenticated && userType === 'admin') {
            // Admin can see all squads
            if (filter === 'all') return true; // 'all' shows everything
            return squad?.status === filter;  // Respect the filter (e.g., approved, pending)
        }
        // Non-admin users only see approved squads
        return squad?.status === 'approved';
    });



    const [removeTeamFromTournament] = useRemoveTeamFromTournamentMutation(); // Initialize mutation
    const [openSquad, setOpenSquad] = useState(null); // State to track which squad is open
    const toggleSquad = (index) => {
        setOpenSquad(openSquad === index ? null : index); // Toggle the squad on click
    };

    const handleRemoveTeam = async (squadId) => {
        try {
            await removeTeamFromTournament({ tournamentId, squadId }).unwrap();
            setOpenSquad(false);
        } catch (error) {
            console.error('Failed to remove the team:', error);
            alert('Error removing team.');
        }
    };
    const handleApproveSquad = async (squadId) => {
        try {
            await approveSquadById(squadId); // Call the mutation
            toast.success('Squad approved successfully');
        } catch (err) {
            console.error('Failed to approve squad:', err);
            toast.error('Failed to approve squad');
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
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Header with Add Team button */}
            {isAuthenticated && userType === "admin" && (<div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Squads</h1>
                <AddTeamToTournamentDialog tournamentId={tournamentId} />
            </div>)}

            {/* Filter buttons */}
            {isAuthenticated && userType === "admin" &&
                <div className="mb-6 flex gap-4">
                    <button
                        className={`inline-flex items-center justify-center whitespace-nowrap py-1 px-3 font-medium rounded transition-colors duration-300 rounded ${filter === 'all' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200'}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`inline-flex items-center justify-center whitespace-nowrap py-1 px-3 font-medium rounded transition-colors duration-300 ${filter === 'approved' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200'}`}
                        onClick={() => setFilter('approved')}
                    >
                        Approved
                    </button>
                    <button
                        className={`inline-flex items-center justify-center whitespace-nowrap py-1 px-3 font-medium rounded transition-colors duration-300 ${filter === 'pending' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200'}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                </div>
            }

            {/* Squads list */}
            {filteredSquads?.length === 0 ? (
                <div className="p-4 text-lg dark:bg-gray-700 text-gray-600">No squads available at the moment.</div>
            ) : (
                filteredSquads?.map((squad, index) => {
                    const { name, players, team, _id: squadId } = squad;
                    const isOpen = openSquad === index;

                    return (
                        <div
                            key={squad?._id}
                            className={`card bg-white p-4 dark:bg-gray-800 dark:text-gray-100 border rounded-lg mb-4 shadow-lg transition-transform duration-300 transform`}
                        >
                            {/* Squad Header */}
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer rounded-lg"
                                id={`team-${index}`}
                            >
                                <div className="flex items-center">
                                    <img
                                        className="rounded-lg mr-4"
                                        height="60"
                                        width="60"
                                        src={team?.teamLogo || 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'} // Default logo if none
                                        alt={team?.teamName}
                                    />
                                    <div className="text-left">
                                        <h2 className="text-lg font-bold ">{team?.teamName}</h2>
                                    </div>
                                </div>

                                {/* Arrow icon changes based on open/close state */}
                                <div className="flex" onClick={() => toggleSquad(index)}>
                                    <span className="text-gray-500 dark:text-gray-100  mr-2 text-sm">Players: {players.length}</span>
                                    {!isOpen ? (
                                        <IoIosArrowDown className="cursor-pointer text-xl" />
                                    ) : (
                                        <IoIosArrowUp className="cursor-pointer text-xl" />
                                    )}
                                </div>

                                {isAuthenticated && userType === "admin" &&
                                    <div className="flex flex items-center gap-5 gap-2">
                                        {squad?.status === 'pending' ? (
                                            <button
                                                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                                                onClick={() => handleApproveSquad(squad._id)} // Call the approve function on click
                                                disabled={squadApproving} // Disable the button if the mutation is in progress
                                            >
                                                {squadApproving ? 'Approving...' : 'Approve'}
                                            </button>
                                        ) : (
                                            <FaCheck className="text-green-600" />
                                        )}
                                        <button
                                            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                                            onClick={() => handleRemoveTeam(squadId)} // Call the remove function
                                        >
                                            Remove
                                        </button>
                                    </div>}
                            </div>

                            {/* Players list */}
                            {isOpen && (
                                <div className="flex items-center flex-col">
                                    {isAuthenticated && userType === "admin" &&
                                        <div className="self-end">
                                            <AddPlayerToSqaud tournamentId={tournamentId} teamId={team?._id} squadId={squadId} />
                                        </div>
                                    }
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        {players.length === 0 ? (
                                            <div className="col-span-full text-base text-gray-500 dark:text-gray-100">No Players Added Yet</div>
                                        ) : (
                                            players.map((player) => (
                                                <div
                                                    key={player?._id}
                                                    className="relative p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:text-gray-100 transition-colors duration-300 shadow-sm"
                                                >
                                                    <div className="flex items-center">
                                                        <img
                                                            className="mr-3 h-10 w-10 rounded-full"
                                                            src={player.profilePicture || 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'} // Default avatar if none
                                                            alt={player.playerName}
                                                        />
                                                        <div>
                                                            <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                                                {player.playerName}
                                                            </h5>
                                                            <p className="text-sm text-gray-500 dark:text-gray-100">{player.role}</p>
                                                        </div>
                                                    </div>

                                                    {/* Cross (X) button on top-right */}
                                                    {isAuthenticated && userType === "admin" &&
                                                        <button
                                                            className="absolute text-sm font-bold top-2 right-2 text-gray-500 hover:text-red-500"
                                                            onClick={() => handleRemovePlayer({ playerId: player?._id, squadId })}
                                                            disabled={removingPlayer === player?._id} // Disable only the button of the player being removed
                                                        >
                                                            {removingPlayer === player?._id ? '...' : '✕'}
                                                        </button>
                                                    }
                                                </div>

                                            ))
                                        )}
                                    </div>
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
