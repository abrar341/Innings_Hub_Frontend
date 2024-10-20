import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from './ui/dialog';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker'; // Assuming you're using a date picker library
import 'react-datepicker/dist/react-datepicker.css'; // Required CSS for DatePicker
import toast from 'react-hot-toast';

const OrganizeMatchesDialog = ({ open, onClose, teams, tournamentInfo, setMatches }) => {
    const [tournamentType, setTournamentType] = useState('Knockout');
    const [matchDate, setMatchDate] = useState(new Date());
    const [venue, setVenue] = useState('');
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [matches, setMatchList] = useState([]);

    const handleTournamentTypeChange = (e) => {
        setTournamentType(e.target.value);
    };
    teams = []
    const handleAddMatch = () => {
        if (selectedTeams.length < 2) {
            toast.error('Please select two teams.');
            return;
        }

        const newMatch = {
            teams: selectedTeams,
            date: matchDate,
            venue: venue,
        };

        setMatchList([...matches, newMatch]);
        setSelectedTeams([]);
        toast.success('Match added successfully!');
    };

    const handleSubmit = () => {
        if (matches.length === 0) {
            toast.error('No matches have been added.');
            return;
        }

        setMatches(matches); // Set matches to parent state
        onClose(); // Close dialog after saving
        toast.success('Matches scheduled successfully!');
    };

    return (
        <Dialog open={true}>
            <DialogContent className="hide-scrollbar max-w-xl w-full bg-gray-800 p-6 rounded-lg">
                <DialogTitle className="text-3xl bg-red-200 font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4">
                    Organize Matches
                </DialogTitle>

                <form className="space-y-6">
                    {/* Select Tournament Type */}
                    <div className="flex flex-col">
                        <label className="text-white font-semibold mb-2">Tournament Type:</label>
                        <select
                            value={tournamentType}
                            onChange={handleTournamentTypeChange}
                            className="w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none"
                        >
                            <option value="Knockout">Knockout</option>
                            <option value="Round-robin">Round-robin</option>
                            <option value="League">League</option>
                        </select>
                    </div>

                    {/* Date & Time Picker */}
                    <div className="flex flex-col">
                        <label className="text-white font-semibold mb-2">Match Date & Time:</label>
                        <DatePicker
                            selected={matchDate}
                            onChange={(date) => setMatchDate(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg shadow-lg focus:outline-none"
                        />
                    </div>

                    {/* Venue Selection */}
                    <div className="flex flex-col">
                        <label className="text-white font-semibold mb-2">Venue:</label>
                        <input
                            type="text"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            placeholder="Enter venue"
                            className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg shadow-lg focus:outline-none"
                        />
                    </div>

                    {/* Team Selection */}
                    <div className="flex flex-col">
                        <label className="text-white font-semibold mb-2">Select Teams:</label>
                        <div className="grid grid-cols-2 gap-4">
                            {teams.map((team) => (
                                <motion.button
                                    key={team._id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => setSelectedTeams([...selectedTeams, team])}
                                    className={`py-2 px-4 rounded-lg font-bold text-white ${selectedTeams.includes(team) ? 'bg-green-600' : 'bg-gray-700'
                                        }`}
                                >
                                    {team.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleAddMatch}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none"
                    >
                        Add Match
                    </motion.button>

                    {/* Submit all matches */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none"
                    >
                        Schedule Matches
                    </motion.button>
                </form>

                <DialogClose asChild></DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default OrganizeMatchesDialog;
