import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CreateRoundDialog from '../../../../../components/Dialogs/CreateRoundDialog';
import { useOutletContext } from 'react-router-dom';
import { useDeleteRoundMutation, useGetRoundsByTournamentIdQuery, useGetSingleTournamentSquadsQuery } from '../../../../../slices/tournament/tournamentApiSlice';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // Arrow Icons
import { FaSpinner } from 'react-icons/fa'; // Spinner icon
import toast from 'react-hot-toast';
import AlertNote from '../../../../../components/AlertNote';

const DrawsAndRounds = () => {
    const context = useOutletContext();
    let tournament = context;
    const tournamentId = tournament?._id;
    const [squads, setSquads] = useState([]);
    const [rounds, setRounds] = useState([]);
    const [activeRound, setActiveRound] = useState(null); // Track the active round for toggle
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleDeleteClick = () => {
        setIsAlertOpen(true);
    };


    const [deleteLoading, setDeleteLoading] = useState(false); // Loading state for delete

    const { data, isLoading, isError, error, refetch } = useGetSingleTournamentSquadsQuery(tournamentId);
    const { data: round, error: getRoundsError, isLoading: gettingRounds } = useGetRoundsByTournamentIdQuery(tournamentId);
    console.log(round);

    const [deleteRound] = useDeleteRoundMutation();


    const handleConfirmDelete = async (roundId) => {
        setDeleteLoading(true);  // Set loading state to true
        try {
            await deleteRound(roundId).unwrap();
            // Remove the deleted round from the rounds array
            setRounds((prevRounds) => prevRounds.filter((round) => round._id !== roundId));
            toast.success("Round deleted successfully");
        } catch (error) {
            console.error('Failed to delete the round:', error);
            toast.error('Failed to delete the round');
        } finally {
            setDeleteLoading(false);  // Reset loading state
        }
    };

    useEffect(() => {
        if (data) {
            setSquads(data?.data);
        } else {
            setSquads([]);
        }

        if (round) {
            setRounds(round?.data);
        } else {
            setRounds([]);
        }
    }, [data, round]);

    // Toggle function to handle round expansion
    const toggleRound = (roundId) => {
        setActiveRound(activeRound === roundId ? null : roundId);
    };

    // Placeholder function for scheduling matches
    const handleScheduleMatches = (roundId) => {
        console.log(`Scheduling matches for round: ${roundId}`);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <CreateRoundDialog tournamentId={tournamentId} confirmedTeams={squads} />

            {/* Show a spinner if loading rounds */}
            {gettingRounds ? (
                <div className="flex justify-center items-center h-40">
                    <FaSpinner className="animate-spin text-3xl text-gray-500" />
                </div>
            ) : rounds.length === 0 ? (
                <div className="text-center text-gray-500">No rounds found</div>
            ) : (
                <div className="space-y-4 mt-6">
                    {rounds?.map((round, index) => (
                        <div
                            key={round?._id}
                            className="bg-white p-4 border rounded-lg mb-4 shadow-lg"
                        >
                            {/* Round Header */}
                            <div className="flex justify-between items-center cursor-pointer p-4 rounded-lg" onClick={() => toggleRound(round._id)}>
                                <div className="flex items-center">
                                    <div className="text-left">
                                        <h2 className="text-2xl font-extrabold text-gray-600">{round?.roundName}</h2>
                                    </div>
                                </div>

                                {/* Arrow icon toggles based on open/close state */}
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-2 text-sm">Groups: {round.groups.length}</span>
                                    {activeRound === round._id ? (
                                        <IoIosArrowUp className="text-xl" />
                                    ) : (
                                        <IoIosArrowDown className="text-xl" />
                                    )}
                                </div>
                                <button
                                    className={`bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 ${deleteLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={handleDeleteClick}
                                    disabled={deleteLoading}  // Disable button when loading
                                >
                                    {deleteLoading ? <FaSpinner className="animate-spin inline-block" /> : 'Delete Round'}
                                </button>
                                <AlertNote
                                    open={isAlertOpen}
                                    setOpen={setIsAlertOpen}
                                    onConfirm={() => handleConfirmDelete(round._id)}
                                    content="This action cannot be undone. This will permanently delete the round."
                                    isLoading={isLoading}
                                />
                            </div>

                            {/* Groups list */}
                            {activeRound === round._id && (
                                <div className="mt-4 space-y-4">
                                    {round.groups?.map((group, idx) => (
                                        <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-300">
                                            <h3 className="text-lg font-bold text-gray-700 mb-3">{group.groupName}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                                {group.teams.map((team) => (
                                                    <div
                                                        key={team._id}
                                                        className="bg-white p-4 border border-gray-200 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
                                                    >
                                                        <div className="flex flex-col items-center">
                                                            {/* Add a placeholder for team logos if available */}
                                                            <img
                                                                className="rounded-full mb-3"
                                                                src={team?.teamLogo || 'https://via.placeholder.com/60'}
                                                                alt={team?.teamName}
                                                                height="60"
                                                                width="60"
                                                            />
                                                            <span className="text-gray-800 font-semibold text-lg">{team.teamName}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Schedule Matches and Delete Round buttons */}
                                    <div className="flex justify-end mt-4 space-x-2">
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                            onClick={() => handleScheduleMatches(round._id)}
                                        >
                                            Schedule Matches
                                        </button>


                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default DrawsAndRounds;
