import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from "./ui/dialog";
import toast from "react-hot-toast";

const OrganizeMatchesDialog = ({ open, onClose, teams }) => {
    const [tournamentType, setTournamentType] = useState("round-robin");
    const [matches, setMatches] = useState([]);
    teams = ['teamA', 'teamB', 'teamC', 'teamD', 'teamE', 'teamF']
    const handleTournamentTypeChange = (e) => {
        setTournamentType(e.target.value);
    };

    const generateMatches = () => {
        let matchSchedule;
        if (tournamentType === "round-robin") {
            matchSchedule = generateRoundRobinMatches(teams.map(team => team.name));
        } else if (tournamentType === "knockout") {
            matchSchedule = generateKnockoutMatches(teams.map(team => team.name));
        }

        if (matchSchedule) {
            setMatches(matchSchedule);
            toast.success("Matches scheduled successfully!");
        }
    };

    return (
        <Dialog open={false} onOpenChange={onClose}>
            <DialogContent className="hide-scrollbar max-w-xl w-full bg-gray-800 p-6 rounded-lg">
                <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4">
                    Organize Matches
                </DialogTitle>
                <form className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-white font-semibold mb-2">Tournament Type:</label>
                        <select
                            value={tournamentType}
                            onChange={handleTournamentTypeChange}
                            className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg"
                        >
                            <option value="round-robin">Round Robin</option>
                            <option value="knockout">Knockout</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white font-semibold mb-2">Teams:</label>
                        <ul className="space-y-2">
                            {teams.map((team, idx) => (
                                <li key={idx} className="text-white">
                                    {team}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        type="button"
                        onClick={generateMatches}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
                    >
                        Schedule Matches
                    </button>

                    {matches.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold text-white mb-4">Scheduled Matches:</h3>
                            <ul className="space-y-2">
                                {matches.map((match, idx) => (
                                    <li key={idx} className="text-white">
                                        Match {idx + 1}: {match.team1} vs {match.team2}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>

                <DialogClose asChild>
                    <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
                        Close
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

// Round Robin and Knockout Functions
const generateRoundRobinMatches = (teams) => {
    const matches = [];
    const numberOfTeams = teams.length;

    for (let i = 0; i < numberOfTeams; i++) {
        for (let j = i + 1; j < numberOfTeams; j++) {
            matches.push({ team1: teams[i], team2: teams[j] });
        }
    }

    return matches;
};

const generateKnockoutMatches = (teams) => {
    const matches = [];
    let roundTeams = [...teams];

    while (roundTeams.length > 1) {
        const roundMatches = [];
        for (let i = 0; i < roundTeams.length; i += 2) {
            if (i + 1 < roundTeams.length) {
                roundMatches.push({ team1: roundTeams[i], team2: roundTeams[i + 1] });
            }
        }
        matches.push(roundMatches);
        roundTeams = roundMatches.map(match => match.team1);
    }

    return matches;
};

export default OrganizeMatchesDialog;
