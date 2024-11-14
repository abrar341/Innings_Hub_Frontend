import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../../../../../components/ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAddPlayerToSquadMutation, useGetAvailablePlayersForTournamentQuery } from "../../../../../slices/tournament/tournamentApiSlice";

const AddPlayerToSquad = ({ tournamentId, teamId, squadId }) => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, isLoading, isError, error, refetch } = useGetAvailablePlayersForTournamentQuery({ tournamentId, teamId });
    const [addPlayerToSquad, { isLoading: createLoading }] = useAddPlayerToSquadMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isDialogOpen) {
            refetch();
        }
    }, [isDialogOpen, refetch]);

    useEffect(() => {
        if (data) {
            setPlayers(data?.data || []);
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

    // Select up to 15 players
    const handleSelectAll = () => {
        const selectablePlayers = players.map((player) => player._id);
        setSelectedPlayers(selectablePlayers.slice(0, 15));
    };

    // Deselect all players
    const handleDeselectAll = () => {
        setSelectedPlayers([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addPlayerToSquad({
                squadId,
                playerIds: selectedPlayers,
            }).unwrap();

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

            <DialogContent className="max-w-lg w-full bg-gray-800 hide-scrollbar bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-y-auto">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Add Player to Squad
                </DialogTitle>
                <p className="text-center text-gray-300 mb-6">
                    Select the player(s) to add to the squad.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between mb-4">
                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Select All
                        </button>
                        <button
                            type="button"
                            onClick={handleDeselectAll}
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Deselect All
                        </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto grid grid-cols-3 gap-4">
                        {players?.map((player) => (
                            <div
                                key={player.id}
                                onClick={() => handleSelectPlayer(player._id)}
                                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${selectedPlayers.includes(player._id)
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                <span className="font-medium">{player.playerName}</span>
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
