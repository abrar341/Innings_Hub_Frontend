import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../../components/ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useGetAvailablePlayersForTeamQuery } from "../../slices/player/playerApiSlice";
import { useAddPlayerToTeamMutation } from "../../slices/team/teamApiSlice";

const AddPlayersToTeamDialog = ({ tournamentId, clubId, teamId, squadId }) => {
    console.log(tournamentId, clubId, teamId, squadId);

    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, isLoading: playerLoading, isError, error, refetch } = useGetAvailablePlayersForTeamQuery(clubId);
    console.log(data);

    const [addPlayerToTeam, { isLoading: createLoading }] = useAddPlayerToTeamMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setPlayers(data?.data);
        }
        refetch()
    }, [data, isDialogOpen]);

    const handleSelectPlayer = (playerId) => {
        setSelectedPlayers((prevSelected) => {
            if (prevSelected.includes(playerId)) {
                return prevSelected.filter((id) => id !== playerId);
            }
            return [...prevSelected, playerId];
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedPlayers);
        try {
            const res = await addPlayerToTeam({
                teamId,
                playerIds: selectedPlayers,
            }).unwrap();

            toast.dismiss();
            toast.success("Player(s) added to Team successfully!");
            setSelectedPlayers([]);
            setIsDialogOpen(false);
            refetch()
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
                    Add Player to Team
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full bg-gray-800 custom-scrollbar bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Add Players to Team
                </DialogTitle>
                <p className="text-center text-gray-300 mb-6">
                    Select the player(s) to add to the team.
                </p>
                {
                    playerLoading ? <div>Loading...</div> :

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {players?.length === 0 ? (
                                    <div className="col-span-full text-base text-gray-500">No Players</div>
                                ) : (
                                    players.map((player) => {
                                        const isSelected = selectedPlayers.includes(player._id);
                                        return (
                                            <div
                                                key={player._id}
                                                onClick={() => handleSelectPlayer(player._id)}
                                                className={`relative p-4 border rounded-lg cursor-pointer transition-colors duration-300 shadow-sm ${isSelected ? "bg-green-500 text-white" : "bg-gray-50 hover:bg-gray-100"
                                                    }`}
                                            >
                                                <div className="flex min-h-15 items-center">
                                                    <div>
                                                        <h5 className={`text-sm font-semibold ${isSelected ? "text-white" : "text-gray-800"}`}>
                                                            {player.playerName}
                                                        </h5>
                                                        <p className={`text-xs ${isSelected ? "text-gray-200" : "text-gray-500"}`}>
                                                            {player.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={createLoading || selectedPlayers.length === 0}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                            >
                                {createLoading ? "Adding Players..." : "Add Players"}
                            </motion.button>
                        </form>}

                <DialogClose asChild>
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                        X
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default AddPlayersToTeamDialog;
