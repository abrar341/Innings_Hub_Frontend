import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AlertNote from '../../../components/AlertNote';
import { useDeletePlayerMutation } from '../../../slices/player/playerApiSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { delete_Player } from '../../../slices/player/playerSlice';
import CreatePlayerDialog from './CreatePlayerDialog';
import { formatDateToYMD } from '../../../utils/dateUtils';

const AdminPlayerCard = ({ player, onClick }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deletePlayer, { isLoading }] = useDeletePlayerMutation();
    const dispatch = useDispatch();
    const getRoleImageUrl = (role) => {
        const normalizedRole = role.toLowerCase().replace(" ", "-");
        return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
    };
    const handleDeleteClick = () => {
        setIsAlertOpen(true);
    };

    const handleConfirmDelete = async (id) => {
        try {
            const response = await deletePlayer(id);
            toast.success(response.message);
            setIsAlertOpen(false);
            dispatch(delete_Player(id));
        } catch (error) {
            toast.error(error?.data?.message || "Error deleting player");
        }
    };

    const handleEditClick = () => {
        setIsDialogOpen(true);
    };



    return (
        <>
            <tr className="text-gray-700">
                <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src={player.profilePicture}
                                alt={player.playerName}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                            <p className="font-semibold">{player.playerName}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{player.role}</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm">{player.role}</td>
                <td className="px-4 py-3 text-xs">
                    <span
                        className={`px-2 py-1 font-semibold leading-tight rounded-full ${`bg-green-100`}`}
                    >
                        Active
                    </span>
                </td>
                <td className="px-4 py-3 text-sm">{formatDateToYMD(player.DOB)}</td>
                <td className="px-4 py-3 text-sm"><div className="flex mt-4 justify-center items-center space-x-4">
                    <button
                    >
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
                </div></td>
            </tr>
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

export default AdminPlayerCard;
