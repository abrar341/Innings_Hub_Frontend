import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../../components/ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa"; // Importing the close icon
import { useAddTeamsToTournamentsMutation, useGetAvailableTeamsForTournamentQuery, useRegisterTeamsToTournamentMutation } from "../../slices/tournament/tournamentApiSlice";
import { useSelector } from "react-redux";
import { useGetClubTeamsQuery } from "../../slices/club/clubApiSlice";

const RegisterTeamToTournament = ({ tournamentId }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const clubId = userInfo?.club?._id;

    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]); // Array of selected teams
    const [selectedPlayersForTeams, setSelectedPlayersForTeams] = useState({});
    const [registerTeamToTournament, { isLoading: createLoading }] = useRegisterTeamsToTournamentMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPlayerDialogOpen, setIsPlayerDialogOpen] = useState(false);
    const [currentTeam, setCurrentTeam] = useState(null);
    // Fetch data hooks
    const { data, isLoading, refetch } = useGetClubTeamsQuery(clubId);
    const { data: availableTeamsData, isLoading: availableTeamsLoading, isError, error, refetch: refetchAvailableTeams } = useGetAvailableTeamsForTournamentQuery(tournamentId);

    useEffect(() => {
        if (data && availableTeamsData) {
            // Filter the teams that are in both clubTeams and availableTeams
            const filteredTeams = data?.data?.filter(clubTeam =>
                availableTeamsData?.data?.some(availableTeam => availableTeam._id === clubTeam._id)
            );

            // Set the filtered teams in state
            setTeams(filteredTeams);
        }
    }, [data, availableTeamsData]);


    // Fetch teams when the dialog opens
    useEffect(() => {
        if (isDialogOpen) {
            refetch();
        }
    }, [isDialogOpen, refetch]);

    // Filter available teams
    const getFilteredClubTeams = (clubTeams = [], availableTeams = []) => {
        if (!clubTeams.length || !availableTeams.length) {
            return [];
        }
        return clubTeams.filter(clubTeam =>
            availableTeams.some(availableTeam => availableTeam._id === clubTeam._id)
        );
    };

    const filteredClubTeams = getFilteredClubTeams(data?.data, availableTeamsData?.data);

    // Log statements for debugging
    console.log("Tournament ID:", tournamentId);
    console.log("Available Teams:", availableTeamsData?.data || "No available teams");
    console.log("Filtered Club Teams:", filteredClubTeams);

    const handleConfirmSelection = () => {
        // Close the player selection dialog
        setIsPlayerDialogOpen(false);
    };

    const handleTeamClick = (team) => {
        // If clicking on the "X" button, don't open the player dialog, just deselect the team
        if (!selectedTeams.some(selectedTeam => selectedTeam._id === team._id)) {
            // Select the team
            setSelectedTeams([...selectedTeams, team]);
            setSelectedPlayersForTeams(prevState => ({
                ...prevState,
                [team._id]: [] // Initialize an empty array for players of this team
            }));
            // Open the player dialog for the selected team
            setCurrentTeam(team);
            setIsPlayerDialogOpen(true);
        } else {
            // Deselect the team and remove players of that team
            setSelectedTeams(selectedTeams.filter(selectedTeam => selectedTeam._id !== team._id));
            setSelectedPlayersForTeams(prevState => {
                const { [team._id]: removed, ...rest } = prevState; // Remove the team from selected players
                return rest;
            });
        }
    };

    const handlePlayerSelect = (playerId) => {
        setSelectedPlayersForTeams(prevState => {
            const currentPlayers = prevState[currentTeam._id] || [];
            if (currentPlayers.includes(playerId)) {
                // Deselect the player
                return {
                    ...prevState,
                    [currentTeam._id]: currentPlayers.filter(id => id !== playerId)
                };
            } else {
                // Select the player
                if (currentPlayers.length < 15) {
                    return {
                        ...prevState,
                        [currentTeam._id]: [...currentPlayers, playerId]
                    };
                } else {
                    toast.error("You can only select a maximum of 15 players.");
                    return prevState; // Return the previous state if limit is reached
                }
            }
        });
    };
    const handleSelectAll = () => {
        const playerIds = currentTeam?.players.map((player) => player._id);
        setSelectedPlayersForTeams((prev) => ({
            ...prev,
            [currentTeam._id]: playerIds,
        }));
    };

    const handleDeselectAll = () => {
        setSelectedPlayersForTeams((prev) => ({
            ...prev,
            [currentTeam._id]: [],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Arrays to collect validation errors for min and max players
        const minPlayerErrors = [];
        const maxPlayerErrors = [];

        // Validate that each selected team has between 11 and 15 players
        for (const team of selectedTeams) {
            const playerCount = selectedPlayersForTeams[team._id]?.length || 0;

            if (playerCount < 11) {
                minPlayerErrors.push(team.teamName);
            }

            if (playerCount > 15) {
                maxPlayerErrors.push(team.teamName);
            }
        }

        // Build the error message for both min and max errors
        let errorMessage = '';

        if (minPlayerErrors.length > 0) {
            errorMessage += `${minPlayerErrors.join(', ')} should have a minimum of 11 players.\n`;
        }

        if (maxPlayerErrors.length > 0) {
            errorMessage += `${maxPlayerErrors.join(', ')} should have a maximum of 15 players.`;
        }
        // If there are any validation errors, show them in a single toast
        if (errorMessage) {
            toast.error(errorMessage); // Show a single toast with all error messages
            return; // Stop submission if validation fails
        }

        const payload = {
            tournamentId: tournamentId,
            teams: selectedTeams.map(team => ({
                teamId: team._id,
                players: selectedPlayersForTeams[team._id] || []
            }))
        };
        console.log(payload);


        try {
            const response = await registerTeamToTournament(payload).unwrap();
            toast.success("Teams added successfully!");
            setIsDialogOpen(false); // Close the dialog after success
        } catch (err) {
            console.error("Failed to add teams to tournament:", err);
            toast.error("Failed to add teams. Please try again.");
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <button className="flex justify-center mt-2 items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200">
                        <FaPlus className="mr-2" />
                        Register Team
                    </button>
                </DialogTrigger>

                <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                    <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                        Register Teams to Tournament
                    </DialogTitle>
                    <p className="text-center text-gray-300 mb-6">
                        Select the teams to register for the tournament.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="max-h-60 overflow-y-auto grid grid-cols-1 gap-4">
                            {teams.map((team) => (
                                <div
                                    key={team._id}
                                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${selectedTeams.some(t => t._id === team._id) ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
                                        } relative`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleTeamClick(team)} // Open player dialog only when clicking the team
                                >
                                    <h3 className="font-medium justify-start flex items-center gap-6">
                                        {team.teamName}
                                        {selectedPlayersForTeams[team._id]?.length > 0 && (
                                            <span className=" text-sm text-gray-100">({selectedPlayersForTeams[team._id]?.length} players)</span>
                                        )}
                                    </h3>
                                    {selectedTeams.some(t => t._id === team._id) && (
                                        <FaTimes
                                            className="absolute top-2 right-2 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering team click
                                                setSelectedTeams(selectedTeams.filter(selectedTeam => selectedTeam._id !== team._id)); // Deselect the team
                                                setSelectedPlayersForTeams(prevState => {
                                                    const { [team._id]: removed, ...rest } = prevState; // Remove the team from selected players
                                                    return rest;
                                                });
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            disabled={selectedTeams.length === 0} // Disable if no teams are selected
                        >
                            {createLoading ? "Adding Teams..." : "Add Teams"}
                        </button>
                    </form>

                    <DialogClose asChild />
                </DialogContent>
            </Dialog>

            {/* Player Selection Dialog */}
            <Dialog open={isPlayerDialogOpen} onOpenChange={setIsPlayerDialogOpen}>
                <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                    <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                        Select Players for {currentTeam?.teamName}
                    </DialogTitle>
                    <p className="text-center text-gray-300 mb-6">
                        Select players for the team (minimum 11, maximum 15).
                    </p>

                    {/* Select All Button */}
                    <div className="flex justify-between items-center mb-4">
                        <button
                            className="text-sm font-medium px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                            onClick={() => {
                                if (
                                    selectedPlayersForTeams[currentTeam?._id]?.length ===
                                    currentTeam?.players.length
                                ) {
                                    // Deselect all if all are already selected
                                    handleDeselectAll();
                                } else {
                                    // Select all
                                    handleSelectAll();
                                }
                            }}
                        >
                            {selectedPlayersForTeams[currentTeam?._id]?.length ===
                                currentTeam?.players.length
                                ? "Deselect All"
                                : "Select All"}
                        </button>
                    </div>

                    {/* Player List */}
                    <div className="max-h-60 overflow-y-auto custom-scrollbar grid grid-cols-3 gap-4">
                        {currentTeam?.players.map((player) => (
                            <div
                                key={player._id}
                                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${selectedPlayersForTeams[currentTeam._id]?.includes(player._id)
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                                    }`}
                                onClick={() => handlePlayerSelect(player._id)} // Use the actual player ID
                            >
                                <h3 className="font-medium">{player.playerName}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Confirm Button */}
                    <div className="mt-6 text-center">
                        <button
                            className="w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                            onClick={handleConfirmSelection}
                        >
                            Confirm
                        </button>
                    </div>

                    <DialogClose asChild />
                </DialogContent>
            </Dialog>

        </>
    );
};

export default RegisterTeamToTournament;
