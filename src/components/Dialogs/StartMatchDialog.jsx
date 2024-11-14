import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { FaBaseballBatBall } from 'react-icons/fa6';
import { useGetSquadPlayersQuery, useStartMatchMutation } from '../../slices/match/matchApiSlice';

const socket = io('http://localhost:8000');

const StartMatchDialog = ({ setMatchInfo, matchId, matchInfo }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTeam1DialogOpen, setIsTeam1DialogOpen] = useState(false);
    const [isTeam2DialogOpen, setIsTeam2DialogOpen] = useState(false);
    const { handleSubmit } = useForm();
    const [tossWinner, setTossWinner] = useState(matchInfo?.teams?.[0]?._id || null);
    const [tossDecision, setTossDecision] = useState('bat');
    const [team1Playing11, setTeam1Playing11] = useState([]);
    const [team2Playing11, setTeam2Playing11] = useState([]);
    const [error, setError] = useState({
        team1: '',
        team2: '',
        tossWinner: '',
        tossDecision: '',
    });

    const tournamentd = matchInfo?.tournament;
    const team1 = matchInfo?.teams?.[0];
    const team2 = matchInfo?.teams?.[1];
    const tournamentId = tournamentd?._id;
    console.log(tournamentId);

    const { data: team1data } = useGetSquadPlayersQuery({ tournamentId, teamId: team1?._id });
    const { data: team2data } = useGetSquadPlayersQuery({ tournamentId, teamId: team2?._id });
    console.log(team2data);

    const [StartMatch, { isLoading }] = useStartMatchMutation();

    const onSubmit = async () => {
        if (!tossWinner) {
            setError((prevError) => ({
                ...prevError,
                tossWinner: 'Please select a toss winner.',
            }));
            return;
        }
        if (!tossDecision) {
            setError((prevError) => ({
                ...prevError,
                tossDecision: 'Please select a toss decision.',
            }));
            return;
        }
        if (team1Playing11.length !== 11 || team2Playing11.length !== 11) {
            setError({
                team1: team1Playing11.length !== 11 ? 'Team 1 must have 11 players.' : '',
                team2: team2Playing11.length !== 11 ? 'Team 2 must have 11 players.' : '',
            });
            return;
        }
        const formattedData = {
            matchId,
            tossWinner,
            tossDecision,
            playing11: [
                { team: team1?._id, players: team1Playing11 },
                { team: team2?._id, players: team2Playing11 },
            ],
        };

        const match = await StartMatch(formattedData);
        setMatchInfo(match?.data);
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
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="flex justify-center items-center w-full" asChild>
                    <button className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                        <FaPlus className="mr-2" />
                        Toss and Playing 11's
                    </button>
                </DialogTrigger>

                <DialogContent className="max-w-lg w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                    <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-8">
                        Toss & Playing 11
                    </DialogTitle>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Toss Winner Selection */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">Who won the toss?</h3>
                            <div className="flex gap-4">
                                {[team1, team2].map((team) => (
                                    <div
                                        key={team?._id}
                                        className={`flex items-center justify-center py-2 px-4 rounded-lg cursor-pointer ${tossWinner === team?._id ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}


                                        onClick={() => setTossWinner(team?._id)}
                                    >
                                        <span className="text-white">{team?.teamName}</span>
                                    </div>
                                ))}
                            </div>
                            {error.tossWinner && <p className="text-red-500 text-sm">{error.tossWinner}</p>}
                        </div>

                        {/* Toss Decision */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">What is the toss decision?</h3>
                            <div className="flex gap-6">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex justify-center items-center text-white gap-2 px-4 py-2 rounded-lg ${tossDecision === 'bat' ? 'bg-blue-600' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                    onClick={() => setTossDecision('bat')}
                                >
                                    <FaBaseballBatBall className="w-6 h-6" />
                                    <span>Bat</span>
                                </motion.button>
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex justify-center items-center text-white gap-2 px-4 py-2 rounded-lg ${tossDecision === 'bowl' ? 'bg-blue-600' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                    onClick={() => setTossDecision('bowl')}
                                >
                                    <FaBaseballBatBall className="w-6 h-6" />
                                    <span>Bowl</span>
                                </motion.button>
                            </div>
                            {error.tossDecision && <p className="text-red-500 text-sm">{error.tossDecision}</p>}
                        </div>

                        {/* Playing 11 Selection Summary */}
                        <div className="grid grid-cols-2 gap-6">
                            {[{ team: team1, players: team1Playing11 }, { team: team2, players: team2Playing11 }].map(({ team, players }, index) => (
                                <div
                                    key={team?._id}
                                    className="space-y-2 cursor-pointer"
                                    onClick={() => index === 0 ? setIsTeam1DialogOpen(true) : setIsTeam2DialogOpen(true)}
                                >
                                    <h3 className="text-lg font-semibold text-white">{team?.teamName} ({players.length}/11)</h3>
                                    <p className="text-sm text-gray-300">Click to select players</p>
                                    {error[`team${index + 1}`] && <p className="text-red-500 text-sm">{error[`team${index + 1}`]}</p>}
                                </div>
                            ))}
                        </div>
                        {/* Playing 11 Selection Dialogs */}
                        {[isTeam1DialogOpen, isTeam2DialogOpen].map((isOpen, index) => {
                            const team = index === 0 ? team1 : team2;
                            const playersData = index === 0 ? team1data?.data?.[0]?.players : team2data?.data?.[0]?.players;
                            const selectedPlayers = index === 0 ? team1Playing11 : team2Playing11;

                            return (
                                <Dialog
                                    key={index}
                                    open={isOpen}
                                    onOpenChange={index === 0 ? setIsTeam1DialogOpen : setIsTeam2DialogOpen}
                                >
                                    <DialogContent className="max-w-lg hide-scrollbar w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                                        <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-8">
                                            {team?.teamName} Playing XI
                                        </DialogTitle>
                                        {/* Select First 11 Button */}
                                        <div className="flex justify-center mb-4">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                                                onClick={() => {
                                                    const first11 = playersData.slice(0, 11).map(player => player._id);
                                                    handlePlaying11Change(index === 0 ? 'team1' : 'team2', first11);
                                                }}
                                            >
                                                Select First 11
                                            </button>
                                        </div>
                                        <div className="gap-4 grid grid-cols-2">
                                            {playersData?.map((player) => (
                                                <div
                                                    key={player?._id}
                                                    className={`flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer ${selectedPlayers.includes(player?._id) ? 'bg-green-500' : 'bg-gray-700'
                                                        }`}
                                                    onClick={() => {
                                                        const newSelectedPlayers = selectedPlayers.includes(player?._id)
                                                            ? selectedPlayers.filter((id) => id !== player?._id)
                                                            : [...selectedPlayers, player?._id];
                                                        handlePlaying11Change(index === 0 ? 'team1' : 'team2', newSelectedPlayers);
                                                    }}
                                                >
                                                    <span className="text-white">{player?.playerName}</span>
                                                    <span className="text-gray-300 text-sm">
                                                        {selectedPlayers.includes(player?._id) ? 'Selected' : 'Select'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-center mt-6">
                                            <button
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-6 rounded-lg transition-colors duration-200"
                                                onClick={() => {
                                                    if (index === 0) {
                                                        setIsTeam1DialogOpen(false);
                                                    } else {
                                                        setIsTeam2DialogOpen(false);
                                                    }
                                                }}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            );
                        })}
                        {/* Start Match Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                            className={`w-full py-2 font-semibold rounded-lg shadow-md transition-all duration-200 ${isLoading
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                                }`}
                        >
                            {isLoading ? 'Starting...' : 'Start Match'}
                        </motion.button>

                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default StartMatchDialog;
