import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useGetSquadPlayersQuery, useStartMatchMutation } from "../../slices/match/matchApiSlice";

// Connect to the backend socket server
const socket = io('http://localhost:8000');

const StartMatchDialog = ({ setMatchInfo, matchId, matchInfo }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { handleSubmit } = useForm();
    const [tossWinner, setTossWinner] = useState(matchInfo?.teams?.[0]?._id || null); // Set default to the first team
    const [tossDecision, setTossDecision] = useState("bat"); // Set default to "bat"
    const [team1Playing11, setTeam1Playing11] = useState([]);
    const [team2Playing11, setTeam2Playing11] = useState([]);
    const [error, setError] = useState({ team1: '', team2: '', tossWinner: '', tossDecision: '' });

    const tournamentId = matchInfo?.tournament;
    const team1 = matchInfo?.teams?.[0];
    const team2 = matchInfo?.teams?.[1];

    const { data: team1data } = useGetSquadPlayersQuery({ tournamentId, teamId: team1?._id });
    const { data: team2data } = useGetSquadPlayersQuery({ tournamentId, teamId: team2?._id });

    const [StartMatch] = useStartMatchMutation();

    const onSubmit = async (data) => {
        // Validate toss winner, toss decision, and player selection
        if (!tossWinner) {
            setError(prevError => ({ ...prevError, tossWinner: 'Please select a toss winner.' }));
            return;
        }
        if (!tossDecision) {
            setError(prevError => ({ ...prevError, tossDecision: 'Please select a toss decision.' }));
            return;
        }
        if (team1Playing11.length !== 11 || team2Playing11.length !== 11) {
            setError({
                team1: team1Playing11.length !== 11 ? 'Team 1 must have 11 players.' : '',
                team2: team2Playing11.length !== 11 ? 'Team 2 must have 11 players.' : ''
            });
            return;
        }

        const formattedData = {
            matchId,
            tossWinner,
            tossDecision,
            playing11: [
                { team: team1?._id, players: team1Playing11 },
                { team: team2?._id, players: team2Playing11 }
            ]
        };
        const match = await StartMatch(formattedData);
        console.log(match);

        setMatchInfo(match?.data)
    };

    const handlePlaying11Change = (team, selectedPlayers) => {
        if (team === 'team1') {
            if (selectedPlayers.length > 11) {
                setError({ ...error, team1: 'Only 11 players can be selected.' });
            } else {
                setTeam1Playing11(selectedPlayers);
                setError({ ...error, team1: '' });
            }
        } else {
            if (selectedPlayers.length > 11) {
                setError({ ...error, team2: 'Only 11 players can be selected.' });
            } else {
                setTeam2Playing11(selectedPlayers);
                setError({ ...error, team2: '' });
            }
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200">
                    <FaPlus className="mr-2" />
                    Initialize Match Details
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl custom-scrollbar">
                <DialogTitle className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Toss  & Playing 11
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
                                    className="form-radio h-5 w-5 text-green-600"
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
                                    className="form-radio h-5 w-5 text-green-600"
                                />
                                <span className="text-white">{team2?.teamName}</span>
                            </label>
                        </div>
                        {error.tossWinner && <p className="text-red-500 text-sm">{error.tossWinner}</p>}
                    </div>

                    {/* Toss Decision */}
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
                                    className="form-radio h-5 w-5 text-green-600"
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
                                    className="form-radio h-5 w-5 text-green-600"
                                />
                                <span className="text-white">Bowl</span>
                            </label>
                        </div>
                        {error.tossDecision && <p className="text-red-500 text-sm">{error.tossDecision}</p>}
                    </div>

                    {/* Playing 11 Selection */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Team 1 Playing 11 */}
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
                                        className="form-checkbox h-5 w-5 text-green-600"
                                        checked={team1Playing11.includes(player?._id)}
                                    />
                                    <span className="text-white">{player?.playerName}</span>
                                </div>
                            ))}
                            {error.team1 && <p className="text-red-500 text-sm">{error.team1}</p>}
                        </div>

                        {/* Team 2 Playing 11 */}
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
                                        className="form-checkbox h-5 w-5 text-green-600"
                                        checked={team2Playing11.includes(player?._id)}
                                    />
                                    <span className="text-white">{player?.playerName}</span>
                                </div>
                            ))}
                            {error.team2 && <p className="text-red-500 text-sm">{error.team2}</p>}
                        </div>
                    </div>

                    <div className="text-center">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold"
                            type="submit"
                        >
                            Start Match
                        </motion.button>
                    </div>
                </form>

                <DialogClose asChild>
                    <button className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors">
                        <span aria-hidden="true">×</span>
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default StartMatchDialog;
