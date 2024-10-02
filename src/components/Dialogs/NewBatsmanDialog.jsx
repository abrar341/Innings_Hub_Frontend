import { useState } from 'react';
import { io } from 'socket.io-client';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useInitializePlayersMutation } from "../../slices/match/matchApiSlice";

// Connect to the backend socket server
const socket = io('http://localhost:8000');

const NewBatsmanDialog = ({ matchId, matchInfo }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const currentInning = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const battingTeamId = currentInning?.team?._id;
    const battingPerformances = currentInning?.battingPerformances || [];

    const battingTeam = matchInfo?.playing11?.find((team) => team?.team?._id === battingTeamId);
    const playing11 = battingTeam?.players;

    const alreadyBattedPlayerIds = battingPerformances.map((performance) => performance.player);
    const alreadyBattedIds = alreadyBattedPlayerIds.map((player) => player._id.toString());
    const playersYetToBat = playing11.filter((player) => !alreadyBattedIds.includes(player._id.toString()));

    const onSubmit = (data) => {
        socket.emit('joinMatch', matchId);
        socket.emit('newBatsman', { matchId, batsmanId: data.batsman });
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {/* Dialog Trigger and Content */}
            <DialogTrigger asChild>
                <button className="flex items-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                    <FaPlus className="mr-2" />
                    Select New Coming Batsman
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                    New Batsman
                </DialogTitle>
                <p className="text-center text-gray-300 mb-6">
                    Select new batsam
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Controller
                        name="batsman"
                        control={control}
                        rules={{ required: "Please select a batsman" }}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full bg-gray-700 text-white p-3 rounded-lg"
                            >
                                <option value="">Select Batsman</option>
                                {playersYetToBat?.map((player) => (
                                    <option key={player._id} value={player._id}>
                                        {player.playerName}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.batsman && <p className="text-red-500">{errors.batsman.message}</p>}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit Batsman
                    </motion.button>
                </form>

                <DialogClose asChild></DialogClose>
            </DialogContent>
        </Dialog>
    );
};



export default NewBatsmanDialog;
