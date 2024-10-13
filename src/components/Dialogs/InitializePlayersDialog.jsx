import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useInitializePlayersMutation } from "../../slices/match/matchApiSlice";

// Main InitializePlayersDialog component
const InitializePlayersDialog = ({ matchInfo, matchId, setCurrentInning, setMatchInfo }) => {



  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initializePlayers] = useInitializePlayersMutation()
  const currentInning = matchInfo?.innings?.[matchInfo?.currentInning - 1];
  console.log("currentInning", currentInning);

  const battingTeamId = currentInning?.team?._id; // Get the team ID for this inning
  const battingTeam = matchInfo?.playing11?.find((team) => team?.team?._id === battingTeamId);
  const bowlingTeam = matchInfo?.playing11?.find((team) => team?.team?._id !== battingTeamId);
  const playing11 = battingTeam?.players;
  console.log("playing11", playing11);



  const [isSelectionDialogOpen, setIsSelectionDialogOpen] = useState(false);
  const [selectionRole, setSelectionRole] = useState(""); // "striker", "nonStriker", "bowler"
  const [selectedPlayers, setSelectedPlayers] = useState({
    striker: null,
    nonStriker: null,
    bowler: null,
  });



  const bowlingPlayers = bowlingTeam?.players;

  const openPlayerSelectionDialog = (role) => {
    setSelectionRole(role);
    setIsSelectionDialogOpen(true);
  };

  const selectPlayer = (role, player) => {
    setSelectedPlayers((prevState) => ({ ...prevState, [role]: player }));
    setIsSelectionDialogOpen(false);
  };

  const onSubmit = async () => {
    const data = {
      striker: selectedPlayers.striker._id,
      nonStriker: selectedPlayers.nonStriker._id,
      bowler: selectedPlayers.bowler._id,
    };
    // Call mutation to initialize players
    const res = await initializePlayers({ data, matchId }).unwrap();
    const matchData = res?.data;
    setCurrentInning(matchData?.innings?.[matchData.currentInning - 1]);
    setMatchInfo(matchData);
    setIsDialogOpen(false); // Close the main dialog after submit
  };

  // Filter players for striker and non-striker selection
  const availableBattingPlayers = playing11?.filter(
    (player) => player._id !== selectedPlayers.striker?._id && player._id !== selectedPlayers.nonStriker?._id
  );

  // Filter bowlers excluding the currently selected striker or non-striker
  const availableBowlers = bowlingPlayers?.filter(
    (player) => player._id !== selectedPlayers.striker?._id && player._id !== selectedPlayers.nonStriker?._id
  );

  return (
    <>
      {/* Main Initialize Players Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="flex mx-auto m-5 w-full items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium py-3 px-5 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg">
            <FaPlus className="mr-2" />
            Initialize Players
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-xl w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
          <DialogTitle className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Initialize Players
          </DialogTitle>
          <p className="text-center text-gray-400 mb-8 font-light text-lg">
            Select striker, non-striker, and bowler for the match from their respective teams.
          </p>

          <div className="space-y-6">
            {/* Striker Selection */}
            <div className="flex justify-between items-center">
              <p className="text-white font-medium">Striker:</p>
              {selectedPlayers.striker ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedPlayers.striker.profilePicture || "https://via.placeholder.com/150"}
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                    alt={selectedPlayers.striker.playerName}
                  />
                  <span className="text-white font-semibold">{selectedPlayers.striker.playerName}</span>
                  <button
                    onClick={() => openPlayerSelectionDialog("striker")}
                    className="ml-2 text-indigo-400 hover:text-indigo-500 transition-colors duration-200 font-medium"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openPlayerSelectionDialog("striker")}
                  className="text-indigo-400 hover:text-indigo-500 transition-colors duration-200 font-medium"
                >
                  Select Striker
                </button>
              )}
            </div>

            {/* Non-Striker Selection */}
            <div className="flex justify-between items-center">
              <p className="text-white font-medium">Non-Striker:</p>
              {selectedPlayers.nonStriker ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedPlayers.nonStriker.profilePicture || "https://via.placeholder.com/150"}
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                    alt={selectedPlayers.nonStriker.playerName}
                  />
                  <span className="text-white font-semibold">{selectedPlayers.nonStriker.playerName}</span>
                  <button
                    onClick={() => openPlayerSelectionDialog("nonStriker")}
                    className="ml-2 text-indigo-400 hover:text-indigo-500 transition-colors duration-200 font-medium"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openPlayerSelectionDialog("nonStriker")}
                  className="text-indigo-400 hover:text-indigo-500 transition-colors duration-200 font-medium"
                >
                  Select Non-Striker
                </button>
              )}
            </div>

            {/* Bowler Selection */}
            <div className="flex justify-between items-center">
              <p className="text-white font-medium">Bowler:</p>
              {selectedPlayers.bowler ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedPlayers.bowler.profilePicture || "https://via.placeholder.com/150"}
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                    alt={selectedPlayers.bowler.playerName}
                  />
                  <span className="text-white font-semibold">{selectedPlayers.bowler.playerName}</span>
                  <button
                    onClick={() => openPlayerSelectionDialog("bowler")}
                    className="ml-2 text-indigo-400 hover:text-indigo-500 transition-colors duration-200 font-medium"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openPlayerSelectionDialog("bowler")}
                  className="text-indigo-400 hover:text-indigo-500 transition-colors duration-200 font-medium"
                >
                  Select Bowler
                </button>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSubmit}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
          >
            Initialize Players
          </motion.button>

          <DialogClose asChild></DialogClose>
        </DialogContent>
      </Dialog>


      {/* Player Selection Dialog */}
      <Dialog open={isSelectionDialogOpen} onOpenChange={setIsSelectionDialogOpen}>
        <DialogContent className="max-w-xl w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
          <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-8">
            Select {selectionRole === "striker" ? "Striker" : selectionRole === "nonStriker" ? "Non-Striker" : "Bowler"}
          </DialogTitle>

          <div className="grid grid-cols-3 gap-6">
            {(selectionRole === "bowler" ? availableBowlers : availableBattingPlayers)?.map((player) => (
              <div
                key={player._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer p-5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105"
                onClick={() => selectPlayer(selectionRole, player)}
              >
                {/* <img
                  src={player.profilePicture || "https://via.placeholder.com/150"}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-500"
                  alt={player.playerName}
                /> */}
                <p className="text-center text-base font-semibold">{player.playerName}</p>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSelectionDialogOpen(false)}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
          >
            Close
          </motion.button>

          <DialogClose asChild></DialogClose>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default InitializePlayersDialog;
