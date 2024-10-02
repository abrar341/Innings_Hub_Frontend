import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../../components/ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAddTeamsToTournamentsMutation, useGetAvailableTeamsForTournamentQuery } from "../../slices/tournament/tournamentApiSlice";

const RegisterTeamToTournamentDialog = ({ tournamentId }) => {
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [addTeamsToTournament, { isLoading: createLoading }] = useAddTeamsToTournamentsMutation();


    console.log(selectedTeams);

    const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog state

    const { data, isLoading, isError, error, refetch } = useGetAvailableTeamsForTournamentQuery(tournamentId);

    // Fetch teams when the dialog opens
    useEffect(() => {
        if (isDialogOpen) {
            refetch(); // Trigger API call
        }
    }, [isDialogOpen, refetch]);

    // Use useEffect to set teams when the data is fetched successfully
    useEffect(() => {
        if (data) {
            setTeams(data?.data);
        }
    }, [data]);

    const navigate = useNavigate();

    const handleSelectTeam = (teamId) => {
        setSelectedTeams((prevSelected) => {
            if (prevSelected.includes(teamId)) {
                return prevSelected.filter((id) => id !== teamId);
            }
            return [...prevSelected, teamId];
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(tournamentId, selectedTeams);

            const res = await addTeamsToTournament({
                tournamentId,
                teamIds: selectedTeams // Send selected teams
            }).unwrap();

            toast.dismiss();
            toast.success("Teams added successfully!");
            setSelectedTeams([]);
            setIsDialogOpen(false)
        } catch (err) {
            toast.dismiss();
            toast.error(err?.data?.message || "Error occurred");
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200">
                    <FaPlus className="mr-2" />
                    Register Teams to Tournament
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Register Teams to Tournament
                </DialogTitle>
                <p className="text-center text-gray-300 mb-6">
                    Select the teams to register to the tournament.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="max-h-60 overflow-y-auto grid grid-cols-1 gap-4">
                        {teams.map((team) => (
                            <div key={team._id} className="flex items-center space-x-4">
                                <input
                                    type="checkbox"
                                    id={`team-${team.id}`}
                                    value={team.id}
                                    checked={selectedTeams.includes(team._id)}
                                    onChange={() => handleSelectTeam(team._id)}
                                    className="h-5 w-5 text-green-600 bg-gray-700 border-gray-600 rounded-lg focus:ring-green-500"
                                />
                                <label htmlFor={`team-${team.id}`} className="text-gray-300 font-medium">
                                    {team.teamName}
                                </label>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading || selectedTeams.length === 0}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                    >
                        {isLoading ? "Adding Teams..." : "Add Teams"}
                    </motion.button>
                </form>

                <DialogClose asChild>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterTeamToTournamentDialog;
