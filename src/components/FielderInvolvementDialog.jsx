import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "./ui/dialog";
import toast from "react-hot-toast";
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const FielderInvolvementDialog = ({
    open,
    wicketType, // 'run-out', 'caught', or 'stumped'
    fielders,
    matchInfo,
    setFielders,
    dataToEmit,
    fielderInvolved,
    setFielderInvolved,
    matchId
}) => {
    const currentInning1 = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const lastOverIndex = currentInning1?.overs?.length ? currentInning1.overs.length - 1 : 0;
    const lastOver = currentInning1?.overs?.[lastOverIndex];
    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;

    const [fielder, setFielder] = useState(""); // Selected fielder
    const [runs, setRuns] = useState(1); // Runs for run-out (1, 2, 3)
    const [batsmanOut, setBatsmanOut] = useState("striker"); // Who's out: striker or non-striker
    const [fielderDialogOpen, setFielderDialogOpen] = useState(false); // Control for fielder selection dialog

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fielder) {
            toast.error("Please select a fielder.");
            return;
        }

        const dataToEmit = {
            matchId,
            fielder,
            RunOutruns: wicketType === "Run Out" ? runs : 0, // Runs only for run-out
            batsmanOut: wicketType === "Run Out" ? batsmanOut : "striker", // Batsman only for run-out
            event: wicketType,
            bowlerId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.currentBowler?._id,
            nonStrikerbatsmanId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.nonStriker?._id,
            batsmanId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.currentStriker?._id,
            ballNumber: lastBallNumber,
            overNumber: lastOver?.overNumber || 0
        };
        socket.emit('ballUpdate', dataToEmit);
        toast.success(`${wicketType} recorded successfully!`);
        setFielder("");
        setRuns(1);
        setBatsmanOut("striker");
        setFielderInvolved(false); // Close the dialog
    };

    const openFielderDialog = () => {
        setFielderDialogOpen(true);
    };

    const closeFielderDialog = () => {
        setFielderDialogOpen(false);
    };

    return (
        <>
            <Dialog open={true}>
                <DialogContent className="hide-scrollbar max-w-xl w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                    <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-green-400 bg-clip-text mb-4">
                        Fielder Involvement ({wicketType})
                    </DialogTitle>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Fielder selection button */}
                        <div className="flex flex-col">
                            <label className="text-white font-semibold mb-2">Select Fielder:</label>
                            <button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={openFielderDialog}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none"
                            >
                                {fielder ? fielders.players.find(f => f._id === fielder)?.playerName : "Select Fielder"} {fielder ? <span className="text-sm">(change)</span> : ""}
                            </button>
                            {fielder && (
                                <p className="text-green-400 font-bold mt-2">
                                    Selected Fielder: {fielders.players.find(f => f._id === fielder)?.playerName}
                                </p>
                            )}
                        </div>

                        {/* Runs scored before the wicket type */}
                        {wicketType === "Run Out" && (
                            <div className="flex flex-col">
                                <label className="text-white font-semibold mb-2">Runs Scored:</label>
                                <div className="flex space-x-4">
                                    {[0, 1, 2, 3].map((r) => (
                                        <button
                                            key={r}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            className={`py-2 px-4 rounded-lg font-bold text-white ${runs === r ? 'bg-green-600' : 'bg-gray-700'}`}
                                            onClick={() => setRuns(r)}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Striker or Non-Striker */}
                        {wicketType === "Run Out" && (
                            <div className="flex flex-col">
                                <label className="text-white font-semibold mb-2">Batsman Out:</label>
                                <div className="flex space-x-4">
                                    {['striker', 'non-striker'].map((type) => (
                                        <button
                                            key={type}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            className={`py-2 px-4 rounded-lg font-bold text-white ${batsmanOut === type ? 'bg-green-600' : 'bg-gray-700'}`}
                                            onClick={() => setBatsmanOut(type)}
                                        >
                                            {type === "striker" ? "Striker" : "Non-Striker"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Submit button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            {wicketType === "Run Out" ? "Record Run Out" : wicketType === "Caught" ? "Record Catch" : "Record Stumping"}
                        </motion.button>
                    </form>

                    <DialogClose asChild></DialogClose>
                </DialogContent>
            </Dialog>

            {/* Fielder Selection Dialog */}
            <Dialog open={fielderDialogOpen} onOpenChange={setFielderDialogOpen}>
                <DialogContent className="hide-scrollbar max-w-xl w-full bg-gray-800 p-6 rounded-lg">
                    <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4">Select Fielder</DialogTitle>
                    <div className="grid py-3 grid-cols-2 gap-4">
                        {fielders?.players?.map((fielder) => (
                            <button
                                key={fielder._id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setFielder(fielder._id);
                                    closeFielderDialog();
                                }}
                                className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${fielder._id === fielder
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            // className={`py-2 px-4 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-green-600 ${fielder._id === fielder ? 'bg-green-600' : ''}`}
                            >
                                {fielder?.playerName}
                            </button>
                        ))}
                    </div>
                    <DialogClose asChild>
                        <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
                        >Close</button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FielderInvolvementDialog;
