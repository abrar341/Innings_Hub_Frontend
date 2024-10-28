import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const TournamentSetupDialog = ({ allTeams }) => {
    const [confirmedTeams, setConfirmedTeams] = useState([]);
    const [groups, setGroups] = useState({});
    const [matchType, setMatchType] = useState('');
    const [knockoutMatchType, setKnockoutMatchType] = useState('');

    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    // Function for confirming teams
    const handleConfirmTeams = (data) => {
        setConfirmedTeams(data.selectedTeams);
        reset();
    };

    // Function for setting groups
    const handleSetGroups = (data) => {
        setGroups(data.groups);
        reset();
    };

    // Function for setting group match type
    const handleGroupMatchSettings = (data) => {
        setMatchType(data.matchType);
        reset();
    };

    // Function for setting knockout match settings
    const handleKnockoutSettings = (data) => {
        setKnockoutMatchType(data.matchType);
        reset();
    };

    return (
        <div className="space-y-6">
            {/* Step 1: Confirm Teams */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200">
                        <FaCheckCircle className="mr-2" />
                        Confirm Participating Teams
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full bg-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                    <DialogTitle className="text-2xl font-bold text-center mb-6">Confirm Teams</DialogTitle>
                    <form onSubmit={handleSubmit(handleConfirmTeams)} className="space-y-6">
                        <Controller
                            name="selectedTeams"
                            control={control}
                            rules={{ required: "Please select at least one team" }}
                            render={({ field }) => (
                                <div className="grid grid-cols-2 gap-4">
                                    {allTeams?.map((team) => (
                                        <label
                                            key={team._id}
                                            className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${field.value?.includes(team._id)
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-500 text-gray-200 hover:bg-gray-400'
                                                }`}
                                            onClick={() => {
                                                const newValue = field.value ? [...field.value] : [];
                                                if (newValue.includes(team._id)) {
                                                    field.onChange(newValue.filter(id => id !== team._id));
                                                } else {
                                                    field.onChange([...newValue, team._id]);
                                                }
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                value={team._id}
                                                checked={field.value?.includes(team._id)}
                                                className="hidden"
                                            />
                                            {team.teamName}
                                        </label>
                                    ))}
                                </div>
                            )}
                        />
                        {errors.selectedTeams && <p className="text-red-500 text-sm">{errors.selectedTeams.message}</p>}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 rounded-lg"
                        >
                            Confirm Teams
                        </motion.button>
                    </form>
                    <DialogClose asChild />
                </DialogContent>
            </Dialog>

            {/* Step 2: Divide Teams into Groups */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                        Divide Teams into Groups
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full bg-gray-800 rounded-xl p-6">
                    <DialogTitle className="text-2xl font-bold mb-4">Divide Teams into Groups</DialogTitle>
                    <form onSubmit={handleSubmit(handleSetGroups)} className="space-y-6">
                        {['Group A', 'Group B', 'Group C', 'Group D']?.map((groupName, idx) => (
                            <div key={groupName}>
                                <p className="text-lg font-bold text-gray-100">{groupName}</p>
                                <Controller
                                    name={`groups.${idx}`}
                                    control={control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-2 gap-4">
                                            {confirmedTeams?.map((team) => (
                                                <label
                                                    key={team._id}
                                                    className={`p-4 rounded-lg cursor-pointer bg-gray-600 text-white`}
                                                    onClick={() => {
                                                        const newValue = field.value || [];
                                                        if (newValue.includes(team._id)) {
                                                            field.onChange(newValue.filter(id => id !== team._id));
                                                        } else {
                                                            field.onChange([...newValue, team._id]);
                                                        }
                                                    }}
                                                >
                                                    {team.teamName}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                />
                            </div>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg"
                        >
                            Confirm Groups
                        </motion.button>
                    </form>
                    <DialogClose asChild />
                </DialogContent>
            </Dialog>

            {/* Step 3: Set Group Match Scheduling */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg">
                        Set Group Match Scheduling
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-gray-800 rounded-xl p-6">
                    <DialogTitle className="text-2xl font-bold mb-4">Group Stage Match Settings</DialogTitle>
                    <form onSubmit={handleSubmit(handleGroupMatchSettings)}>
                        <Controller
                            name="matchType"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="roundRobin"
                                            checked={field.value === 'roundRobin'}
                                            onChange={field.onChange}
                                            className="mr-2"
                                        />
                                        Round Robin
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="doubleRoundRobin"
                                            checked={field.value === 'doubleRoundRobin'}
                                            onChange={field.onChange}
                                            className="mr-2"
                                        />
                                        Double Round Robin
                                    </label>
                                </div>
                            )}
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-indigo-500 text-white font-bold py-3 rounded-lg"
                        >
                            Confirm Match Settings
                        </motion.button>
                    </form>
                    <DialogClose asChild />
                </DialogContent>
            </Dialog>

            {/* Step 4: Advance Teams to Next Round */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
                        Advance Teams to Knockout Stage
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-gray-800 rounded-xl p-6">
                    <DialogTitle className="text-2xl font-bold mb-4">Advance Teams</DialogTitle>
                    <form onSubmit={handleSubmit(handleSetGroups)} className="space-y-6">
                        {['Team A', 'Team B', 'Team C', 'Team D']?.map((teamName, idx) => (
                            <div key={teamName}>
                                <p className="text-lg font-bold text-gray-100">Knockout Teams</p>
                                <Controller
                                    name={`knockout.${idx}`}
                                    control={control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-2 gap-4">
                                            {confirmedTeams?.map((team) => (
                                                <label
                                                    key={team._id}
                                                    className={`p-4 rounded-lg cursor-pointer bg-gray-600 text-white`}
                                                    onClick={() => {
                                                        const newValue = field.value || [];
                                                        if (newValue.includes(team._id)) {
                                                            field.onChange(newValue.filter(id => id !== team._id));
                                                        } else {
                                                            field.onChange([...newValue, team._id]);
                                                        }
                                                    }}
                                                >
                                                    {team.teamName}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                />
                            </div>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg"
                        >
                            Advance Teams
                        </motion.button>
                    </form>
                    <DialogClose asChild />
                </DialogContent>
            </Dialog>

            {/* Step 5: Knockout Match Settings */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
                        Set Knockout Match Settings
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-gray-800 rounded-xl p-6">
                    <DialogTitle className="text-2xl font-bold mb-4">Knockout Stage Settings</DialogTitle>
                    <form onSubmit={handleSubmit(handleKnockoutSettings)}>
                        <Controller
                            name="knockoutMatchType"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="bestOf1"
                                            checked={field.value === 'bestOf1'}
                                            onChange={field.onChange}
                                            className="mr-2"
                                        />
                                        Best of 1
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="bestOf3"
                                            checked={field.value === 'bestOf3'}
                                            onChange={field.onChange}
                                            className="mr-2"
                                        />
                                        Best of 3
                                    </label>
                                </div>
                            )}
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg"
                        >
                            Confirm Knockout Settings
                        </motion.button>
                    </form>
                    <DialogClose asChild />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TournamentSetupDialog;
