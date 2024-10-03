import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";

import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useInitializePlayersMutation } from "../../slices/match/matchApiSlice";

const InitializePlayersDialog = ({ matchInfo, matchId, setCurrentInning, setMatchInfo }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { control, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [initializePlayers] = useInitializePlayersMutation()
  const currentInning = matchInfo?.innings?.[matchInfo?.currentInning - 1];
  console.log("currentInning", currentInning);

  const battingTeamId = currentInning?.team?._id; // Get the team ID for this inning
  const battingPerformances = currentInning?.battingPerformances || [];
  const battingTeam = matchInfo?.playing11?.find((team) => team?.team?._id === battingTeamId);
  const bowlingTeam = matchInfo?.playing11?.find((team) => team?.team?._id !== battingTeamId);
  const playing11 = battingTeam?.players;
  console.log("playing11", playing11);

  const alreadyBattedPlayerIds = battingPerformances.map((performance) => performance.player);
  const alreadyBattedIds = alreadyBattedPlayerIds.map((player) => player._id.toString());
  const playersYetToBat = playing11?.filter((player) => !alreadyBattedIds.includes(player._id.toString()));
  const onSubmit = async (data) => {
    console.log(data);
    const res = await initializePlayers({ data, matchId }).unwrap();
    const matchData = res?.data;
    setCurrentInning(matchData?.innings?.[matchData.currentInning - 1]);
    setMatchInfo(matchData)

  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex mx-auto m-5 w-full items-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
          <FaPlus className="mr-2" />
          Initialize Players
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl">
        <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Initialize Players
        </DialogTitle>
        <p className="text-center text-gray-300 mb-6">
          Select striker, non-striker, and bowler from the respective teams.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Striker Selection - Team A */}
            <Controller
              name="striker"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg"
                >
                  <option value="">Select Striker</option>
                  {playersYetToBat
                    ?.filter((player) => player._id !== watch("nonStriker")) // Exclude the selected non-striker
                    .map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.playerName}
                      </option>
                    ))}
                </select>
              )}
            />
            {errors.striker && <p className="text-red-500">{errors.striker.message}</p>}

            {/* Non-Striker Selection - Team A */}
            <Controller
              name="nonStriker"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg"
                >
                  <option value="">Select Non-Striker</option>
                  {playersYetToBat
                    .filter((player) => player._id !== watch("striker")) // Exclude the selected striker
                    .map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.playerName}
                      </option>
                    ))}
                </select>
              )}
            />
            {errors.nonStriker && <p className="text-red-500">{errors.nonStriker.message}</p>}
          </div>


          {/* Bowler Selection - Team B */}
          <Controller
            name="bowler"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full bg-gray-700 text-white p-3 rounded-lg"
              >
                <option value="">Select Bowler</option>
                {bowlingTeam?.players.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.playerName}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.bowler && <p className="text-red-500">{errors.bowler.message}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Initialize Players
          </motion.button>
        </form>

        <DialogClose asChild></DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default InitializePlayersDialog;
