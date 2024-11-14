import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoArrowRedoSharp } from "react-icons/io5";

import AlertNote from '../../../components/AlertNote';
import { useDeletePlayerMutation, useReleasePlayerFromClubMutation } from '../../../slices/player/playerApiSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { delete_Player } from '../../../slices/player/playerSlice';
import CreatePlayerDialog from './CreatePlayerDialog';
import { RiAddLargeLine } from "react-icons/ri";
import AssignPlayerDialog from '../Clubs/AssignPlayerToClub';


const ActionButtons = ({ player }) => {
    const { isAuthenticated, userType } = useSelector((state) => state.auth);


    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isReleaseAlertOpen, setIsReleaseAlertOpen] = useState(false); // for release confirmation
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deletePlayer, { isLoading }] = useDeletePlayerMutation();
    const [releasePlayerFromClub, { isLoading: releasing }] = useReleasePlayerFromClubMutation();
    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        setIsAlertOpen(true);
    };

    const handleConfirmDelete = async (id) => {
        try {
            const response = await deletePlayer(id);
            toast.success(response?.data.message);
            setIsAlertOpen(false);
            dispatch(delete_Player(id));
        } catch (error) {
            toast.error(error?.data?.message || 'Error deleting player');
        }
    };

    const handleReleaseClick = () => {
        setIsReleaseAlertOpen(true); // Show release confirmation alert
    };

    const handleConfirmRelease = async (id) => {
        try {
            const response = await releasePlayerFromClub(id);
            toast.success(response?.data.message);
            setIsReleaseAlertOpen(false); // Close the release confirmation
        } catch (error) {
            console.log(error);

            toast.error(error?.data || 'Error releasing player from club');
        }
    };

    return (
        <>
            <div className="flex mt-4 justify-center items-center space-x-4">
                <button onClick={() => setIsDialogOpen(true)}>
                    <CreatePlayerDialog
                        open={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        action="edit"
                        playerData={player}
                    />
                </button>
                <button
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                    onClick={handleDeleteClick}
                >
                    <FaTrashAlt className="text-gray-600" />
                </button>

                {/* Release Player Button */}
                {isAuthenticated && userType === 'club-manager' && (
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={handleReleaseClick} // Handle release click
                    >
                        <IoArrowRedoSharp className="text-gray-600" />
                    </button>
                )}


                {isAuthenticated && userType === 'admin' && (

                    <AssignPlayerDialog reqClubs={player?.requestedClubs} playerId={player?._id} />
                )}
            </div>

            {/* Delete Confirmation Alert */}
            <AlertNote
                open={isAlertOpen}
                setOpen={setIsAlertOpen}
                onConfirm={() => handleConfirmDelete(player._id)}
                content="This action cannot be undone. This will permanently delete the player."
                isLoading={isLoading}
            />

            {/* Release Confirmation Alert */}
            <AlertNote
                open={isReleaseAlertOpen}
                setOpen={setIsReleaseAlertOpen}
                onConfirm={() => handleConfirmRelease(player._id)}
                content="Are you sure you want to release this player from the club?"
                isLoading={releasing}
            />
        </>
    );
};

export default ActionButtons;
