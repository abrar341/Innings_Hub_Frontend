import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { deletePlayer } from '../../../slices/player/playerSlice';
import AlertNote from '../../../components/AlertNote';
import { useDeletePlayerMutation } from '../../../slices/player/playerApiSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { deletePlayerS } from '../../../slices/player/playerSlice'; // Import the action from playerSlice
import CreatePlayerDialog from './CreatePlayerDialog';


const AdminPlayerCard = ({ player, onClick }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [deletePlayer, { isLoading }] = useDeletePlayerMutation();
    const dispatch = useDispatch()
    const getRoleImageUrl = (role) => {
        const normalizedRole = role.toLowerCase().replace(" ", "-");
        return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
    };
    const handleDeleteClick = () => {
        setIsAlertOpen(true);
    };
    const handleConfirmDelete = async (id) => {
        try {
            await deletePlayer(id);
            toast.success("Player deleted successfully!");
            setIsAlertOpen(false);
            dispatch(deletePlayerS(id));
        } catch (error) {
            toast.error(error?.data?.message || "Error deleting player");
        }
    };
    return (
        <div
            className="border  rounded-xl border-gray-300 bg-white shadow-full transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out"
        >
            <div className="flex justify-between items-center p-3 text-white ">
                <img
                    className=" w-6 h-6"
                    src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/381800/381894.png"
                    alt="Country Logo"
                />
                <span className="text-sm text-black font-bold">{player.playerName}</span>
            </div>

            <div className="p-2 border-b text-center group">
                <img
                    className="h-24 w-24 md:h-28 md:w-28 rounded-lg mx-auto border-2 border-customDarkBlue object-cover transition-transform duration-300 ease-in-out group-hover:rounded-lg group-hover:scale-105"
                    src={player.profilePicture}
                    alt={player.name}
                />
                <div className="mt-3 flex items-center justify-center space-x-2">
                    <img
                        className="w-5 h-5"
                        src={getRoleImageUrl(player.role)}
                        alt={player.role}
                    />
                    <span className="text-sm font-semibold">{player.role}</span>
                </div>
                <div className="flex mt-4 justify-center items-center space-x-4">
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={(e) => { e.stopPropagation(); alert('Edit clicked'); }}
                    >
                        <FaEdit className="text-gray-600" />
                    </button>
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={handleDeleteClick}
                    >
                        <FaTrashAlt className="text-gray-600" />
                    </button>
                </div>
            </div>
            <AlertNote
                open={isAlertOpen}
                setOpen={setIsAlertOpen}
                onConfirm={() => handleConfirmDelete(player._id)}
                content="This action cannot be undone. This will permanently delete the player."
                isLoading={isLoading}
            />
        </div>
    );
};

export default AdminPlayerCard;
