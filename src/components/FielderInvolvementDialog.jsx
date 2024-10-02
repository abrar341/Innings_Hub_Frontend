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
    console.log(batsmanOut)
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
        console.log(dataToEmit);
        socket.emit('ballUpdate', dataToEmit);
        toast.success(`${wicketType} recorded successfully!`);
        setFielder("");
        setRuns(1);
        setBatsmanOut("striker");
        setFielderInvolved(false); // Close the dialog
    };

    return (
        <Dialog open={true}>
            <DialogContent className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Fielder Involvement ({wicketType})
                </DialogTitle>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Fielder dropdown */}
                    <div className="flex flex-col">
                        <label className="text-white font-semibold mb-2">Select Fielder:</label>
                        <select
                            value={fielder}
                            onChange={(e) => setFielder(e.target.value)}
                            className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-2 px-3 focus:border-green-500 focus:outline-none"
                        >
                            <option value="">-- Select Fielder --</option>
                            {fielders?.players?.map((fielder) => (
                                <option key={fielder._id} value={fielder._id}>
                                    {fielder?.PlayerName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Conditional fields for run-out */}
                    {wicketType === "Run Out" && (
                        <>
                            {/* Runs scored before the wicket type */}
                            <div className="flex flex-col">
                                <label className="text-white font-semibold mb-2">Runs Scored:</label>
                                <select
                                    value={runs}
                                    onChange={(e) => setRuns(Number(e.target.value))}
                                    className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-2 px-3 focus:border-green-500 focus:outline-none"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>

                            {/* Radio buttons for Striker or Non-Striker */}
                            <div className="flex justify-center space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="batsmanOut"
                                        value="striker"
                                        checked={batsmanOut === "striker"}
                                        onChange={() => setBatsmanOut("striker")}
                                        className="form-radio h-5 w-5 text-green-500"
                                    />
                                    <span className="text-white">Striker</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="batsmanOut"
                                        value="non-striker"
                                        checked={batsmanOut === "non-striker"}
                                        onChange={() => setBatsmanOut("non-striker")}
                                        className="form-radio h-5 w-5 text-red-500"
                                    />
                                    <span className="text-white">Non-Striker</span>
                                </label>
                            </div>
                        </>
                    )}

                    {/* Submit button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        {wicketType === "run-out" ? "Record Run Out" : wicketType === "caught" ? "Record Catch" : "Record Stumping"}
                    </motion.button>
                </form>

                <DialogClose asChild></DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default FielderInvolvementDialog;
