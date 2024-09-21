import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import AlertNote from '../../../components/AlertNote';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useDeleteTeamMutation } from '../../../slices/team/teamApiSlice';
import { delete_Team } from '../../../slices/team/teamSlice';
import CreateTeamDialog from './CreateTeamDialog';

const ActionButtons = ({ team }) => {
    console.log(team);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [deleteTeam, { isLoading }] = useDeleteTeamMutation();
    const dispatch = useDispatch()
    const handleDeleteClick = () => {
        setIsAlertOpen(true);
    };

    const handleConfirmDelete = async (id) => {
        try {
            const response = await deleteTeam(id);
            toast.success(response.message || "Team Deleted Successfully");
            setIsAlertOpen(false);
            dispatch(delete_Team(id));
        } catch (error) {
            toast.error(error?.data?.message || "Error deleting player");
        }
    };

    return (
        <>
            <div className="flex mt-4 justify-center items-center space-x-4">
                <button onClick={() => setIsDialogOpen(true)}>
                    <CreateTeamDialog
                        open={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        action="edit"
                        teamData={team}
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
                onConfirm={() => handleConfirmDelete(team._id)}
                content="This action cannot be undone. This will permanently delete the player."
                isLoading={isLoading}
            />
        </>
    );
};

export default ActionButtons;
