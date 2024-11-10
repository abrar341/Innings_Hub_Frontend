import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetAllMatchesQuery } from "../slices/match/matchApiSlice";
import { convertTo12HourFormat } from "../utils/dateUtils";
import { useGetAllScorersQuery } from "../slices/auth/usersApiSlice";
// import { selectScorers, selectMatches } from "../slices/yourSlice"; // Replace with actual slice
// import { assignMatch } from "../slices/matchesSlice"; // Replace with actual action

const AssignMatchesPage = () => {
    const dispatch = useDispatch();
    const { data } = useGetAllMatchesQuery();
    const matches = data?.data;
    const { data: scorersData, isLoading, isError, refetch } = useGetAllScorersQuery();
    const [scorers, setScorers] = useState([]);
    // Update scorers state when data is fetched
    useEffect(() => {
        if (scorersData) {
            setScorers(scorersData?.data);
        }
    }, [scorersData]);

    // State for selected scorer and match ID
    const [selectedScorer, setSelectedScorer] = useState(null);
    const [selectedMatchId, setSelectedMatchId] = useState(null);

    // Mock scorers list (replace with real data from state or props)
    // const scorers = useSelector((state) => state.yourSlice.scorers);

    // Handle match selection
    const handleSelectMatch = (match) => {
        if (!selectedScorer) {
            toast.error("Please select a scorer first.");
            return;
        }
        setSelectedMatchId(match.id);
        dispatch(assignMatch({ matchId: match.id, scorerId: selectedScorer }));
        toast.success("Match assigned successfully!");
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mt-4 mb-8 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text">
                Assign Matches
            </h2>

            {/* Scorer Dropdown */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Scorer
                </label>
                <select
                    value={selectedScorer}
                    onChange={(e) => setSelectedScorer(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">-- Select a Scorer --</option>
                    {scorers.map((scorer) => (
                        <option key={scorer.id} value={scorer.id}>
                            {scorer.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Match List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches?.map((match) => {
                    const date = new Date(match?.date);
                    const formattedDate = date.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    return (
                        <div key={match.id} className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {match.teams.map((team, index) => (
                                        <span key={team._id}>
                                            {team.teamName}
                                            {index < match.teams.length - 1 && " vs "}
                                        </span>
                                    ))}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {formattedDate} at {convertTo12HourFormat(match?.time)}
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-lg transition duration-200 hover:bg-blue-600"
                                onClick={() => handleSelectMatch(match)}
                            >
                                Select
                            </motion.button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AssignMatchesPage;
