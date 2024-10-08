import { useState } from 'react';
import { io } from 'socket.io-client';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useInitializePlayersMutation } from "../../slices/match/matchApiSlice";

// Connect to the backend socket server
const socket = io('http://localhost:8000');

const InningsEndedDialog = ({ matchInfo, remainingWickets, remainRuns, winingTeam, matchId, result }) => {

    if (result) {
        console.log("match ended")
        console.log(winingTeam?.teamName, "");
    }
    console.log(remainRuns);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();


    const onSubmit = () => {
        console.log(matchId);
        socket.emit('joinMatch', matchId);
        socket.emit('startNewInnings', { matchId });

    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {/* Dialog Trigger and Content */}
            <DialogTrigger className='' asChild>
                <button className="flex items-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                    <FaPlus className="mr-2" />
                    {matchInfo?.result?.winner || matchInfo?.result?.isTie === true ? "Match Ended" : "Start New Innings"}
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl">
                {matchInfo?.result?.winner || matchInfo?.result?.isTie === true ? "" : <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                    Innings Ended
                </DialogTitle>}

                {/* {result && <p className='uppercase text-center p-3 my-3 text-xl text-white font-bold tracking-normal	'>{`${winingTeam?.teamName} WON BY ${remainRuns ? `${remainRuns} RUNS` : `${remainingWickets} WICKETS`}`}</p>} */}
                {matchInfo?.result?.winner ? <p className='uppercase text-center p-3 my-3 text-xl text-white font-bold tracking-normal	'>{matchInfo?.result?.winner?.teamName} WON BY {matchInfo?.result?.margin}</p> : matchInfo?.result?.isTie ? <><p className='uppercase text-center p-3 my-3 text-xl text-white font-bold tracking-normal	'> Match Tie </p></> : ""}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {matchInfo?.result?.winner || matchInfo?.result?.isTie === true ? "" : <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {result ? "Submit Result" : "Start Second Innings"}
                    </motion.button>}
                </form>

                <DialogClose asChild></DialogClose>
            </DialogContent>
        </Dialog>
    );
};



export default InningsEndedDialog;
