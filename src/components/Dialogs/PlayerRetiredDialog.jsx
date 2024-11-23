import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "../ui/dialog";
import toast from "react-hot-toast";
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const PlayerRetiredDialog = ({
    open,
    matchInfo,
    setPlayerRetired,
    wicketType,
    matchId
}) => {
    console.log(wicketType);
    const currentInning1 = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const lastOverIndex = currentInning1?.overs?.length ? currentInning1.overs.length - 1 : 0;
    const lastOver = currentInning1?.overs?.[lastOverIndex];
    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;
    const currentInning = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const [retiringPlayer, setRetiringPlayer] = useState("");

    const handleRetireSubmit = (e) => {
        e.preventDefault();

        if (!retiringPlayer) {
            toast.error("Please select a player to retire.");
            return;
        }

        const dataToEmit = {
            isOut: wicketType === 'Rt-Out' ? true : wicketType === 'Rt-Hurt' ? false : undefined,
            matchId,
            retiringPlayer,
            nonStrikerbatsmanId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.nonStriker?._id,
            StrikerbatsmanId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.currentStriker?._id,
            ballNumber: lastBallNumber,
            overNumber: lastOver?.overNumber || 0
        };



        socket.emit('PlayerRetired', dataToEmit);
        toast.success("Player retired successfully!");
        setRetiringPlayer("");
        setPlayerRetired(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setPlayerRetired}>
                <DialogContent className="hide-scrollbar max-w-xl w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                    <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-green-400 bg-clip-text mb-4">
                        Retire Player
                    </DialogTitle>
                    <form onSubmit={handleRetireSubmit} className="space-y-6">

                        {/* Retiring Player Selection */}
                        <div className="flex flex-col">
                            <label className="text-white font-semibold mb-2">Select Player to Retire:</label>
                            <div className="flex space-x-4">
                                {['striker', 'non-striker'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setRetiringPlayer(type)}
                                        className={`py-2 px-4 rounded-lg text-sm font-semibold text-white ${retiringPlayer === type ? 'bg-green-600' : 'bg-gray-700'}`}
                                    >
                                        {type === "striker" ? `${currentInning?.currentStriker?.playerName}` : `${currentInning?.nonStriker?.playerName}`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            Confirm Retirement
                        </motion.button>
                    </form>

                    <DialogClose asChild></DialogClose>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PlayerRetiredDialog;
