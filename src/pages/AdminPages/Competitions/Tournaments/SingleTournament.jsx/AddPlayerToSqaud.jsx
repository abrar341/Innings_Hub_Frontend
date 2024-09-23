import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../../../../../components/ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAddPlayerToSquadMutation, useGetAvailablePlayersForTournamentQuery } from "../../../../../slices/tournament/tournamentApiSlice";
// import { useAddPlayerToSquadMutation, useGetAvailablePlayersForTournamentQuery } from "../../../../../slices/tournament/tournamentApiSlice";

const AddPlayerToSquad = ({ tournamentId, teamId, squadId }) => {
    const [players, setPlayers] = useState([]); // Update state to hold players instead of teams
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Track selected players
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog state
    const { data, isLoading, isError, error, refetch } = useGetAvailablePlayersForTournamentQuery({ tournamentId, teamId });
    const [addPlayerToSquad, { isLoading: createLoading }] = useAddPlayerToSquadMutation();
    const navigate = useNavigate();
    // Fetch players when the dialog opens
    useEffect(() => {
        if (isDialogOpen) {
            refetch(); // Trigger API call to fetch players
        }
    }, [isDialogOpen, refetch]);

    // Set players when data is fetched
    useEffect(() => {
        if (data) {
            setPlayers(data?.data || []); // Set players list
        }
    }, [data]);

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
        console.log(squadId, selectedPlayers);

        try {
            const res = await addPlayerToSquad({
                squadId,
                playerIds: selectedPlayers, // Send selected players to API
            }).unwrap();

            console.log(res);


            toast.dismiss();
            toast.success("Player(s) added to Squad successfully!");
            setSelectedPlayers([]);
            setIsDialogOpen(false);
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
                    Add Player
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Add Player to Squad
                </DialogTitle>
                <p className="text-center text-gray-300 mb-6">
                    Select the player(s) to add to the squad.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="max-h-60 overflow-y-auto grid grid-cols-1 gap-4">
                        {players.map((player) => (
                            <div key={player.id} className="flex items-center space-x-4">
                                <input
                                    type="checkbox"
                                    id={`player-${player.id}`}
                                    value={player.id}
                                    checked={selectedPlayers.includes(player._id)}
                                    onChange={() => handleSelectPlayer(player._id)}
                                    className="h-5 w-5 text-green-600 bg-gray-700 border-gray-600 rounded-lg focus:ring-green-500"
                                />
                                <label htmlFor={`player-${player._id}`} className="text-gray-300 font-medium">
                                    {player.playerName}
                                </label>
                            </div>
                        ))}
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
                </form>

                <DialogClose asChild>
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                        X
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default AddPlayerToSquad;
