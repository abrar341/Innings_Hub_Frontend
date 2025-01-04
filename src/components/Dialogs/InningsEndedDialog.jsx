import { useState } from 'react';
import { io } from 'socket.io-client';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useInitializePlayersMutation, useUpdatePointsTableMutation } from "../../slices/match/matchApiSlice";
import ScoreCard from '../../pages/Match/ScoreCard/ScoreCard';
import { useUpdatePlayerStatsMutation } from '../../slices/player/playerApiSlice';
import toast from 'react-hot-toast';
import { useUpdateTeamStatsMutation } from '../../slices/team/teamApiSlice';

// Connect to the backend socket server
const socket = io('http://localhost:8000');

const InningsEndedDialog = ({ matchInfo, remainingWickets, remainRuns, winingTeam, matchId, result }) => {
    const [updatePointsTable, { isLoading: pointtableisLoading, isSuccess: pointtableisSuccess, error }] = useUpdatePointsTableMutation();

    console.log(matchInfo.teams);

    if (result) {
        console.log("match ended")
    }
    console.log(remainRuns);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const [updatePlayerStats, { isLoading, isSuccess, isError }] = useUpdatePlayerStatsMutation();
    const [updateTeamStats, { isLoading: updateteamLoading }] = useUpdateTeamStatsMutation();


    const onSubmit = () => {
        console.log(matchId);
        socket.emit('joinMatch', matchId);
        socket.emit('startNewInnings', { matchId });
    }

    const handleUpdatePoints = async () => {
        try {
            // Define the parameters you want to send in the request
            const roundId = matchInfo?.round;
            // const teamIds = ['team1', 'team2'];
            const teamIds = matchInfo.teams.map(team => team._id);
            // Trigger the mutation
            await updatePointsTable({ roundId, teamIds });
            toast.success('points table updated successfully')
        } catch (err) {
            console.error('Failed to update points table:', err);
        }
    };

    const handleUpdateStats = async () => {
        try {
            await updatePlayerStats({ matchId });
            toast.success("Player stats updated successfully.");
        } catch (error) {
            console.error("Failed to update player stats:", error);
        }
    };

    const handleUpdateTeamStats = async () => {
        try {
            await updateTeamStats({ matchId });
            toast.success("Team stats updated successfully.");
        } catch (error) {
            console.error("Failed to update team stats:", error);
        }
    };


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {/* Dialog Trigger and Content */}
            <DialogTrigger className='' asChild>
                <button className="flex items-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                    <FaPlus className="mr-2" />
                    {matchInfo?.result?.winner || matchInfo?.result?.isTie === true ? "Match Ended" : "Start New Innings"}
                </button>
            </DialogTrigger>

            <DialogContent className="hide-scrollbar max-w-2xl w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">

                {matchInfo?.result?.winner || matchInfo?.result?.isTie === true ? "" :
                    <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-8">
                        Innings Ended
                    </DialogTitle>}

                {/* {result && <p className='uppercase text-center p-3 my-3 text-xl text-white font-bold tracking-normal	'>{`${winingTeam?.teamName} WON BY ${remainRuns ? `${remainRuns} RUNS` : `${remainingWickets} WICKETS`}`}</p>} */}
                {matchInfo?.result?.winner ?
                    <>
                        <p className='uppercase text-center p-3 my-3 text-xl text-white font-bold tracking-normal	'>
                            {matchInfo?.result?.winner?.teamName} WON BY {matchInfo?.result?.margin}
                        </p>
                        {matchInfo?.status === 'completed' || matchInfo?.result?.isTie === true ?
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>

                                {
                                    matchInfo?.playerStats ?
                                        <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            PlayerStats Updated
                                        </div> : <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            onClick={handleUpdateStats}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Updating..." : "Update Player Stats"}
                                        </button>
                                }
                                {
                                    matchInfo?.teamStats ?
                                        <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            teamStats Updated
                                        </div> : <button
                                            onClick={handleUpdateTeamStats}
                                            disabled={updateteamLoading}
                                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">

                                            {updateteamLoading ? "Updating..." : "Update Team Stats"}

                                        </button>
                                }

                                <div>
                                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleUpdatePoints} disabled={pointtableisLoading}>
                                        {pointtableisLoading ? 'Updating...' : 'Update Points Table'}
                                    </button>


                                </div>
                            </div> : ""}
                    </>
                    : matchInfo?.result?.isTie ? <><p className='uppercase text-center p-3 my-3 text-xl text-white font-bold tracking-normal	'> Match Tie </p></> : ""}

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
