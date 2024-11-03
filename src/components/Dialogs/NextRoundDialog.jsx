import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useCreateRoundMutation } from '../../slices/tournament/tournamentApiSlice';
import toast from 'react-hot-toast';

const NextRoundDialog = ({ qualifiedTeams, tournamentId, disabled }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(qualifiedTeams);

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [groups, setGroups] = useState([]);
    const [groupTeams, setGroupTeams] = useState({});
    const [openGroupDialog, setOpenGroupDialog] = useState(null);
    const [createRound] = useCreateRoundMutation();


    // Watch the custom or random group selection
    const groupingType = watch("groupingType");
    const numberOfGroups = watch("numberOfGroups");
    const scheduleType = watch("scheduleType");

    // Handle selecting teams for a specific group
    const handleSelectTeam = (groupId, teamId) => {
        setGroupTeams((prev) => {
            const updated = { ...prev };
            if (!updated[groupId]) updated[groupId] = [];

            // Toggle team selection
            if (updated[groupId].includes(teamId)) {
                updated[groupId] = updated[groupId].filter(id => id !== teamId);
            } else if (updated[groupId]?.length < Math.ceil(qualifiedTeams?.length / groups.length)) {
                updated[groupId].push(teamId);
            }
            return updated;
        });
    };

    // Filter out teams that have already been selected by other groups
    const getAvailableTeams = (groupId) => {
        const selectedTeams = Object.entries(groupTeams)
            .filter(([key]) => key !== groupId)
            .flatMap(([_, teams]) => teams);
        return qualifiedTeams.filter(team => !selectedTeams.includes(team._id));
    };

    const onSubmit = async (data) => {
        const roundDetails = {
            tournamentId,
            roundName: data.roundName,
            groupingType: data.groupingType,
            groups: groupTeams,
            numberOfGroups: data.numberOfGroups,
            scheduleType: data.scheduleType,
            qualifiersPerGroup: data.scheduleType === 'knockout' ? qualifiedTeams?.length / 2 : data.qualifiersPerGroup
        };
        console.log(roundDetails);
        try {
            const response = await createRound(roundDetails).unwrap();
            reset();
            setIsDialogOpen(false);
            toast.success("Next Round Created Successfully");

        } catch (error) {
            console.error("Failed to create round", error);
            toast.error("Error Occurred");
        }
    };

    const generateRandomGroups = (teams, groupCount) => {
        const shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
        const groups = [];
        for (let i = 0; i < groupCount; i++) {
            groups.push(shuffledTeams.splice(0, Math.ceil(shuffledTeams?.length / (groupCount - i))));
        }
        return groups;
    };

    const generateGroups = (count) => {
        const newGroups = [];
        for (let i = 0; i < count; i++) {
            newGroups.push({ groupId: `group${i + 1}`, teams: groupTeams[`group${i + 1}`] || [] });
        }
        setGroups(newGroups);
    };

    useEffect(() => {
        if (groupingType === "random" && numberOfGroups) {
            setGroups(generateRandomGroups(qualifiedTeams, numberOfGroups));
        } else if (groupingType === "custom" && numberOfGroups) {
            generateGroups(numberOfGroups);
        }
        setGroupTeams({});
    }, [groupingType, numberOfGroups, qualifiedTeams]);

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <button
                        className={`flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ${!disabled ? 'hover:from-blue-700 hover:to-indigo-700' : 'opacity-50 cursor-not-allowed'
                            }`}
                        disabled={disabled}
                    >
                        <FaArrowRight className="mr-2" />
                        Next Round
                    </button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl hide-scrollbar w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                    <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-4">
                        Set Up Next Round
                    </DialogTitle>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Controller
                            name="roundName"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Round name is required" }}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <label className="text-lg font-bold text-white">Round Name</label>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Enter next round name"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.roundName && <p className="px-1 text-red-500 text-xs font-semibold">{errors.roundName.message}</p>}
                                </div>
                            )}
                        />

                        <Controller
                            name="groupingType"
                            control={control}
                            defaultValue="custom"
                            rules={{ required: "Please select a group type" }}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <p className="text-lg font-bold text-white">Group Division</p>
                                    <div className="flex space-x-4">
                                        <label className={`p-4 rounded-lg font-semibold text-white cursor-pointer ${field.value === "custom" ? "bg-blue-600" : "bg-gray-700"}`}>
                                            <input type="radio" value="custom" checked={field.value === "custom"} onChange={field.onChange} className="hidden" />
                                            Custom
                                        </label>
                                        <label className={`p-4 rounded-lg font-semibold text-white cursor-pointer ${field.value === "random" ? "bg-blue-600" : "bg-gray-700"}`}>
                                            <input type="radio" value="random" checked={field.value === "random"} onChange={field.onChange} className="hidden" />
                                            Random
                                        </label>
                                    </div>
                                </div>
                            )}
                        />
                        {errors.groupingType && <p className="text-red-500 text-sm">{errors.groupingType.message}</p>}

                        <Controller
                            name="numberOfGroups"
                            control={control}
                            defaultValue=""
                            render={({ field }) => {
                                const totalTeams = qualifiedTeams.length;
                                const possibleGroups = [];
                                let power = 1;

                                // Generate valid group numbers in powers of 2 that divide totalTeams exactly
                                while (power <= Math.floor(totalTeams / 2)) {
                                    if (totalTeams % power === 0) {
                                        possibleGroups.push(power);
                                    }
                                    power *= 2;
                                }

                                return (
                                    <div className="space-y-2">
                                        <p className="text-lg font-bold text-white">Number of Groups</p>
                                        <div className="flex space-x-4 flex-wrap">
                                            {possibleGroups.map(value => (
                                                <label
                                                    key={value}
                                                    className={`p-4 font-semibold text-white rounded-lg cursor-pointer ${field.value == value ? "bg-green-600 text-white" : "bg-gray-700"}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={value}
                                                        checked={field.value == value}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            generateGroups(value);  // Ensure the groups update when selection changes
                                                        }}
                                                        className="hidden"
                                                    />
                                                    {value}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }}
                        />

                        {
                            scheduleType !== 'knockout' &&
                            <Controller
                                name="qualifiersPerGroup"
                                control={control}
                                defaultValue=""
                                render={({ field }) => {
                                    // Check if confirmedTeams and groups are defined and have valid lengths
                                    const teamsPerGroup = qualifiedTeams?.length && groups?.length ? Math.ceil(qualifiedTeams.length / groups.length) : 0;
                                    const possibleQualifiers = [];

                                    // Generate valid qualifiers in powers of 2 up to teamsPerGroup, only if teamsPerGroup is positive
                                    if (teamsPerGroup > 0) {
                                        let power = 1;
                                        while (power <= teamsPerGroup) {
                                            possibleQualifiers.push(power);
                                            power *= 2;
                                        }
                                    }

                                    return (
                                        <div className="space-y-2">
                                            <p className="text-lg font-bold text-white">Number of Qualifiers per Group</p>
                                            <div className="flex space-x-4 flex-wrap">
                                                {possibleQualifiers.map(value => (
                                                    <label
                                                        key={value}
                                                        className={`p-4 font-semibold text-white rounded-lg cursor-pointer ${field.value == value ? "bg-green-600 text-white" : "bg-gray-700"}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            value={value}
                                                            checked={field.value == value}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                updateQualifiers(value);  // Handle any updates needed on selection change
                                                            }}
                                                            className="hidden"
                                                        />
                                                        {value}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }}
                            />
                        }

                        {/* Display Groups */}
                        {groupingType === "custom" && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {groups.map((group, index) => (
                                    <div
                                        key={group.groupId}
                                        className="space-y-1 cursor-pointer"
                                        onClick={() => setOpenGroupDialog(group.groupId)}
                                    >
                                        <h3 className="text-lg font-semibold text-white">
                                            Group {index + 1} ({groupTeams[group.groupId]?.length || 0}/{Math.ceil(qualifiedTeams.length / groups.length)})
                                        </h3>
                                        <p className="text-sm text-gray-300">Click to select teams</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {groupingType === "random" && numberOfGroups > 0 && (
                            <div className="space-y-2">
                                {generateRandomGroups(qualifiedTeams, numberOfGroups).map((group, index) => (
                                    <div key={index} className="space-y-2">
                                        <h3 className="text-lg font-semibold text-white">Group {index + 1}</h3>
                                        <ul className="list-disc list-inside text-white">
                                            {group.map(team => (
                                                <li key={team._id}>{team.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Controller
                            name="scheduleType"
                            control={control}
                            defaultValue="round-robin"
                            rules={{ required: "Please select a schedule type" }}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <p className="text-lg font-bold text-white">Schedule Type</p>
                                    <div className="flex space-x-4">
                                        <label className={`p-4 rounded-lg font-semibold text-white cursor-pointer ${field.value === "round-robin" ? "bg-green-600" : "bg-gray-700"}`}>
                                            <input type="radio" value="round-robin" checked={field.value === "round-robin"} onChange={field.onChange} className="hidden" />
                                            Round Robin
                                        </label>

                                        {numberOfGroups < 2 && <label className={`p-4 rounded-lg font-semibold text-white cursor-pointer ${field.value === "knockout" ? "bg-green-600" : "bg-gray-700"}`}>
                                            <input type="radio" value="knockout" checked={field.value === "knockout"} onChange={field.onChange} className="hidden" />
                                            Knockout
                                        </label>}
                                    </div>
                                </div>
                            )}
                        />
                        <div className="flex justify-end">
                            <button type="submit" className="px-6 py-2 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                                Create Next Round
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {openGroupDialog && (
                <Dialog open={Boolean(openGroupDialog)} onOpenChange={() => setOpenGroupDialog(null)}>
                    <DialogContent className="max-w-lg w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                        <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-green-400 via-teal-400 to-purple-400 text-transparent bg-clip-text mb-4">
                            Select Teams for {openGroupDialog}
                        </DialogTitle>
                        <div className="grid grid-cols-2 gap-4">
                            {getAvailableTeams(openGroupDialog).map((team) => (
                                <div
                                    key={team?._id}
                                    className={`flex items-center font-semibold justify-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${groupTeams[openGroupDialog]?.includes(team?._id) ? 'bg-green-600 text-white ' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} `}


                                    onClick={() => handleSelectTeam(openGroupDialog, team?._id)}
                                >
                                    {team?.teamName}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-4">Select up to {Math.ceil(qualifiedTeams?.length / groups.length)} teams.</p>

                        <div className="flex justify-end space-x-4 mt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setOpenGroupDialog(null)}
                                className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700"
                            >
                                Confirm
                            </motion.button>
                        </div>

                        <DialogClose asChild />
                    </DialogContent>

                </Dialog>
            )}
        </>
    );
};

export default NextRoundDialog;
