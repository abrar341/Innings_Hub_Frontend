import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import AlertNote from '../../../components/AlertNote';
import { useDeletePlayerMutation } from '../../../slices/player/playerApiSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { delete_Player } from '../../../slices/player/playerSlice';
import CreatePlayerDialog from './CreatePlayerDialog';

const ActionButtons = ({ player }) => {
    console.log(player);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deletePlayer, { isLoading }] = useDeletePlayerMutation();
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
            </div>
            <AlertNote
                open={isAlertOpen}
                setOpen={setIsAlertOpen}
                onConfirm={() => handleConfirmDelete(player._id)}
                content="This action cannot be undone. This will permanently delete the player."
                isLoading={isLoading}
            />
        </>
    );
};

export default ActionButtons;
