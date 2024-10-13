import { useState } from 'react';
import { io } from 'socket.io-client';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

// Connect to the backend socket server
const socket = io('http://localhost:8000');

const NewBowlerDialog = ({ matchId, matchInfo }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    // Fetch the current inning and bowling team players
    const currentInning = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const previousBowler = currentInning?.previousBowler?._id;
    const battingTeamId = currentInning?.team?._id;
    const bowlingTeam = matchInfo?.playing11?.find((team) => team?.team?._id !== battingTeamId);
    const bowlingTeamPlayers = bowlingTeam?.players;

    // Submit the new bowler
    const onSubmit = (data) => {
        socket.emit('joinMatch', matchId);
        socket.emit('newBowler', { matchId, bowlerId: data.bowler });
        reset();
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                    <FaPlus className="mr-2" />
                    Select New Bowler
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg hide-scrollbar w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4">
                    New Bowler
                </DialogTitle>
                <p className="text-center text-gray-300 mb-4">
                    Select a bowler for the next over
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Controller
                        name="bowler"
                        control={control}
                        rules={{ required: "Please select a bowler" }}
                        render={({ field }) => (
                            <div className="grid grid-cols-3 gap-6">
                                {bowlingTeamPlayers
                                    ?.filter((player) => player._id !== previousBowler)
                                    .map((player) => (
                                        <label
                                            key={player._id}
                                            className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${field.value === player._id
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            onClick={() => field.onChange(player._id)}
                                        >
                                            <input
                                                type="radio"
                                                value={player._id}
                                                checked={field.value === player._id}
                                                onChange={() => field.onChange(player._id)}
                                                className="hidden"
                                            />
                                            <span className="text-center text-lg font-semibold">{player.playerName}</span>
                                        </label>
                                    ))}
                            </div>
                        )}
                    />
                    {errors.bowler && <p className="text-red-500 text-sm">{errors.bowler.message}</p>}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit Bowler
                    </motion.button>
                </form>

                <DialogClose asChild />
            </DialogContent>
        </Dialog>
    );
};

export default NewBowlerDialog;
