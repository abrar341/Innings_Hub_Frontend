import React, { useState, useEffect } from 'react';
import AdminRegisterScorerDialog from '../../../components/CreateScorer';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { useDeleteUserMutation, useGetAllScorersQuery } from '../../../slices/auth/usersApiSlice';
import toast from 'react-hot-toast';
import AlertNote from '../../../components/AlertNote';

const ScorerPage = () => {
    // Fetch scorers data
    const { data, isLoading, isError, refetch } = useGetAllScorersQuery();
    const [scorers, setScorers] = useState([]);
    const [deleteUser] = useDeleteUserMutation();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsAlertOpen(true);
    };

    // Handle delete action
    const handleConfirmDelete = async (userId) => {
        console.log(userId);

        try {
            await deleteUser(userId).unwrap();
            setScorers((prevScorers) => prevScorers.filter((scorer) => scorer._id !== userId));
            setIsAlertOpen(false);
            toast.success("Scorer deleted successfully")
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    // Update scorers state when data is fetched
    useEffect(() => {
        if (data) {
            setScorers(data?.data);
        }
    }, [data]);

    // Add new scorer to the list
    const handleAddScorer = (newScorer) => {
        setScorers((prevScorers) => [...prevScorers, newScorer]);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>There was an error loading the scorers.</p>;

    return (
        <div className='px-4'>
            <AdminRegisterScorerDialog onAddScorer={handleAddScorer} />

            <div className='scorer-list'>
                <h3 className='py-4 text-3xl font-extrabold  text-gray-600 text-'>Scorers</h3>
                {
                    scorers.length === 0 && <div className="text- font-semibold text-lg text-gray-500">No Scorer Register yet</div>
                }
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {scorers.map((scorer) => (
                        <li
                            key={scorer._id}
                            className="p-4 bg-white rounded-md shadow-md border border-gray-200 transition transform hover:shadow-lg hover:bg-gradient-to-r cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-semibold text-gray-800">{scorer.name}</p>
                                <button
                                    onClick={handleDeleteClick}
                                    className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded hover:bg-red-200 transition"
                                >
                                    Delete
                                    <AlertNote
                                        open={isAlertOpen}
                                        setOpen={setIsAlertOpen}
                                        onConfirm={() => handleConfirmDelete(scorer._id)}
                                        content="This action cannot be undone. This will permanently delete Scorer."
                                        isLoading={isLoading}
                                    />
                                </button>
                            </div>
                            <div className="mt-2 space-y-1 text-gray-600">
                                <p className="flex items-center space-x-2">
                                    <FaEnvelope className="text-blue-500" />
                                    <span>{scorer.email}</span>
                                </p>
                                <p className="flex items-center space-x-2">
                                    <FaUser className="text-blue-500" />
                                    <span>{scorer.username}</span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Render the AlertNote component */}

        </div>
    );
};

export default ScorerPage;
