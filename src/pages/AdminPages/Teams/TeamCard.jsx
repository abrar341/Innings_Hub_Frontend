import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CreateTeamDialog from "./CreateTeamDialog";
import { useState } from "react";
import { useDeleteTeamMutation } from "../../../slices/team/teamApiSlice";
import AlertNote from "../../../components/AlertNote";
import toast from "react-hot-toast";
import { delete_Team } from "../../../slices/team/teamSlice";
import { useDispatch } from "react-redux";

const TeamCard = ({ team }) => {
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
        <div className=" group rounded-xl hover:cursor-pointer border border-gray-300  transition duration-300 ease-in">
            <div
                className="flex flex-row justify-between items-center p-4 space-x-4"
            >
                <img
                    className="h-10 w-12  group-hover:border-black border-gray-300 object-cover transition duration-300 ease-in group-hover:scale-105"
                    src={team.teamLogo}
                    alt={team.name}
                />
                <div className="flex justify-center items-center">
                    <div className="text-sm font-bold group-hover:scale-105 transition duration-300 ease-in">
                        {team.teamName}
                    </div>
                </div>
                <div className="a flex gap-2">

                    <button className="hover:text-red-700">
                        <CreateTeamDialog open={isDialogOpen}
                            onClose={() => setIsDialogOpen(false)}
                            action="edit"
                            teamData={team} />
                    </button>
                    <button onClick={handleDeleteClick} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none">
                        <FaTrashAlt size={16}
                        />
                    </button>
                    <Link to={`/team/${team.teamName}/players`}
                        className=" hover:text-red-700">
                        View
                    </Link>
                </div>
            </div>

            <AlertNote
                open={isAlertOpen}
                setOpen={setIsAlertOpen}
                onConfirm={() => handleConfirmDelete(team._id)}
                content="This action cannot be undone. This will permanently delete the team."
                isLoading={isLoading}
            />
        </div>
    );
};

export default TeamCard;
