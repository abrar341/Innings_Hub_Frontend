import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../../components/ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useGetAvailablePlayersForTeamQuery } from "../../slices/player/playerApiSlice";
import { useAddPlayerToTeamMutation } from "../../slices/team/teamApiSlice";

const AddPlayersToTeamDialog = ({ clubId, teamId }) => {
    console.log(clubId, teamId);

    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, isLoading: playerLoading, isError, error, refetch } = useGetAvailablePlayersForTeamQuery(clubId);
    console.log(data);

    const [addPlayerToTeam, { isLoading: createLoading }] = useAddPlayerToTeamMutation();

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
    const handleSelectAll = () => {
        if (selectedPlayers.length === players.length) {
            setSelectedPlayers([]);
        } else {
            setSelectedPlayers(players.map((player) => player._id));
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

            <DialogContent className="hide-scrollbar max-w-2xl w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-green-400 via-emerald-500 to-purple-400 text-green-500 bg-clip-text mb-4">
                    Add Players to Team
                </DialogTitle>
                <p className="text-center text-gray-300 mb-6">
                    Select the player(s) to add to the team.
                </p>

                {
                    playerLoading ? <div>Loading...</div> :

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-end mb-4">
                                <button
                                    type="button"
                                    onClick={handleSelectAll}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                                >
                                    {selectedPlayers.length === players.length ? "Deselect All" : "Select All"}
                                </button>
                            </div>
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
                                                className={`flex items-center justify-start mb-1 p-4 rounded-lg cursor-pointer transition-colors duration-200 ${isSelected
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    }`}
                                            >
                                                <div className="flex min-h-15 items-center">
                                                    <div>
                                                        <h5 className={`text-base font-semibold `}>
                                                            {player.playerName}
                                                        </h5>
                                                        <p className={`text-xs `}>
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
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default AddPlayersToTeamDialog;
