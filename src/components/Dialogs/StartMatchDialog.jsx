import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useGetSquadPlayersQuery, useInitializePlayersMutation, useStartMatchMutation } from "../../slices/match/matchApiSlice";

// Connect to the backend socket server
const socket = io('http://localhost:8000');

const StartMatchDialog = ({ matchId, matchInfo }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const [tossWinner, setTossWinner] = useState(null); // State to track toss winner
    const [tossDecision, setTossDecision] = useState("bat"); // State to track toss winner
    const [team1Playing11, setTeam1Playing11] = useState([]); // State to track team 1 playing 11
    const [team2Playing11, setTeam2Playing11] = useState([]);
    console.log(team1Playing11);
    console.log(team2Playing11);

    const tournamentId = matchInfo?.tournament;
    console.log(tournamentId);

    const team1 = matchInfo?.teams?.[0]
    const team2 = matchInfo?.teams?.[1]

    const { data: team1data } = useGetSquadPlayersQuery({ tournamentId, teamId: team1?._id })
    const { data: team2data } = useGetSquadPlayersQuery({ tournamentId, teamId: team2?._id })


    const [StartMatch] = useStartMatchMutation()
    const onSubmit = async (data) => {
        const formattedData = {
            matchId,
            tossWinner, // ID of the team that won the toss
            tossDecision, // "bat" or "bowl"
            playing11: [
                {
                    team: team1?._id, // Team 1 ID
                    players: team1Playing11 // Array of player IDs for Team 1
                },
                {
                    team: team2?._id, // Team 2 ID
                    players: team2Playing11// Array of player IDs for Team 2
                }
            ]
        };
        console.log({ formattedData });
        await StartMatch(formattedData)
    };


    const handlePlaying11Change = (team, selectedPlayers) => {
        // Update the selected playing 11 based on the team
        if (team === 'team1') {
            setTeam1Playing11(selectedPlayers);
        } else {
            setTeam2Playing11(selectedPlayers);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            {/* Dialog Trigger and Content */}
            <DialogTrigger asChild>
                <button className="flex items-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                    <FaPlus className="mr-2" />
                    Intilizing Match details
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                    Select Toss Winner & Playing 11
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Toss Winner Selection */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">Who won the toss?</h3>
                        <div className="flex gap-6">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    name="tossWinner"
                                    value={team1?._id}
                                    onChange={(e) => setTossWinner(e.target.value)}
                                    checked={tossWinner === team1?._id}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="text-white">{team1?.teamName}</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    name="tossWinner"
                                    value={team2?._id}
                                    onChange={(e) => setTossWinner(e.target.value)}
                                    checked={tossWinner === team2?._id}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="text-white">{team2?.teamName}</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">What is the toss decision?</h3>
                        <div className="flex gap-6">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    name="tossDecision"
                                    value="bat"
                                    onChange={(e) => setTossDecision(e.target.value)}
                                    checked={tossDecision === "bat"}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="text-white">Bat</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    name="tossDecision"
                                    value="bowl"
                                    onChange={(e) => setTossDecision(e.target.value)}
                                    checked={tossDecision === "bowl"}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="text-white">Bowl</span>
                            </label>
                        </div>
                    </div>



                    <div className='grid grid-cols-2'>
                        {/* Team 1 Playing 11 Selection */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">{team1?.name} - Select Playing 11</h3>
                            {team1data?.data?.[0]?.players.map((player) => (
                                <div key={player?._id} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        value={player?._id}
                                        onChange={(e) => {
                                            const selected = e.target.checked
                                                ? [...team1Playing11, player?._id]
                                                : team1Playing11.filter((id) => id !== player?._id);
                                            handlePlaying11Change('team1', selected);
                                        }}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        checked={team1Playing11.includes(player?._id)}
                                    />
                                    <span className="text-white">{player?.playerName}</span>
                                </div>
                            ))}
                        </div>

                        {/* Team 2 Playing 11 Selection */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">{team2?.name} - Select Playing 11</h3>
                            {team2data?.data?.[0]?.players.map((player) => (
                                <div key={player?._id} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        value={player?._id}
                                        onChange={(e) => {
                                            const selected = e.target.checked
                                                ? [...team2Playing11, player?._id]
                                                : team2Playing11.filter((id) => id !== player?._id);
                                            handlePlaying11Change('team2', selected);
                                        }}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        checked={team2Playing11.includes(player?._id)}
                                    />
                                    <span className="text-white">{player?.playerName}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Update Match Details
                    </motion.button>
                </form>

                <DialogClose asChild></DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default StartMatchDialog;
