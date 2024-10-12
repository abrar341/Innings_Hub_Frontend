import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../../components/ui/dialog";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useAddTeamsToTournamentsMutation } from "../../slices/tournament/tournamentApiSlice";
import { useSelector } from "react-redux";
import { useGetClubTeamsQuery } from "../../slices/club/clubApiSlice";

const RegisterTeamToTournament = ({ tournamentId }) => {
    const { userInfo } = useSelector((state) => state.auth);
    tournamentId = "66d34efebd6b2b67fba0a424"; // For testing purposes
    const clubId = userInfo?.club?._id;

    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [addTeamsToTournament, { isLoading: createLoading }] = useAddTeamsToTournamentsMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, isLoading, refetch } = useGetClubTeamsQuery(clubId);

    // Fetch teams when the dialog opens
    useEffect(() => {
        if (isDialogOpen) {
            refetch();
        }
    }, [isDialogOpen, refetch]);

    useEffect(() => {
        if (data) {
            setTeams(data?.data);
            console.log("Fetched Teams:", data?.data);
        }
    }, [data]);
    useEffect(() => {
        console.log(selectedTeams);

    }, [selectedTeams]);

    // Toggle selection of teams
    const handleSelectTeam = (teamId) => {
        setSelectedTeams((prevSelectedTeams) =>
            prevSelectedTeams.includes(teamId)
                ? prevSelectedTeams.filter((id) => id !== teamId) // Deselect if already selected
                : [...prevSelectedTeams, teamId] // Add if not selected
        );
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        console.log("Selected Teams:", selectedTeams);
        e.preventDefault();
        if (selectedTeams.length === 0) {
            toast.error("Please select at least one team!");
            return;
        }


        // try {
        //     // Send selected teams to API
        //     await addTeamsToTournament({ tournamentId, teams: selectedTeams }).unwrap();
        //     toast.success("Teams successfully added to tournament!");
        //     setIsDialogOpen(false); // Close the dialog after successful submission
        // } catch (error) {
        //     console.error("Failed to add teams to tournament:", error);
        //     toast.error("Failed to add teams. Please try again.");
        // }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="flex justify-center mt-2 items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200">
                    <FaPlus className="mr-2" />
                    Register Team
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
                    <div className="max-h-60 overflow-y-auto grid grid-cols-3 gap-4">
                        {teams.map((team) => (
                            <motion.div
                                key={team._id}
                                onClick={() => handleSelectTeam(team._id)}
                                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${selectedTeams.includes(team._id) ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
                                    }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <h3 className="font-medium">{team.teamName}</h3>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        {createLoading ? "Adding Teams..." : "Add Teams"}
                    </motion.button>
                </form>

                <DialogClose asChild />
            </DialogContent>
        </Dialog>
    );
};

export default RegisterTeamToTournament;
