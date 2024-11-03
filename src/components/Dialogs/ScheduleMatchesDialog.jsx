import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { io } from 'socket.io-client';
import { Tooltip } from "react-tooltip";
import { useScheduleMatchesMutation } from '../../slices/tournament/tournamentApiSlice';
import toast from 'react-hot-toast';

const socket = io('http://localhost:8000');

const ScheduleMatchesDialog = ({ tournamentId, round, groups }) => {
    console.log(tournamentId, round, groups);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [scheduleMatches, { isLoading, isError, isSuccess }] = useScheduleMatchesMutation();


    const matchesPerDay = watch("matchesPerDay");

    const onSubmit = async (data) => {
        console.log(data);
        // Adding additional required fields
        const requestData = {
            ...data,
            venues: 'Venue1,Venue2',
            tournamentId, // add tournamentId prop
            round,        // add round prop
            groups        // add groups prop
        };
        console.log(requestData);
        try {
            // Call the mutation
            await scheduleMatches(requestData).unwrap();
            toast.success("Matches scheduled successfully.");
        } catch (error) {
            console.error("Failed to schedule matches:", error);
            toast.error(error?.data.error);
        }

        reset();

        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                    <FaPlus className="mr-2" />
                    Schedule Matches
                </motion.button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl hide-scrollbar w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-8">
                    Schedule Matches
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* <div className="relative">
                        <Controller
                            name="venues"
                            control={control}
                            rules={{ required: "Venues are required" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Enter Venues (Comma-separated)"
                                    className={`w-full p-3 rounded-lg bg-gray-800 text-white border ${errors.venues ? 'border-red-500' : 'border-transparent'} focus:border-blue-500 focus:outline-none transition-all`}
                                />
                            )}
                        />
                        {errors.venues && <p className="text-red-500 text-sm mt-1">{errors.venues.message}</p>}
                    </div> */}

                    <div className="relative">
                        <Controller
                            name="overs"
                            control={control}
                            rules={{
                                required: "Overs are required",
                                min: { value: 1, message: "Overs must be greater than 0" }
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    placeholder="Enter Overs"
                                    className={`w-full p-3 rounded-lg bg-gray-800 text-white border ${errors.overs ? 'border-red-500' : 'border-transparent'} focus:border-blue-500 focus:outline-none transition-all`}
                                />
                            )}
                        />
                        {errors.overs && <p className="text-red-500 text-sm mt-1">{errors.overs.message}</p>}
                    </div>

                    <div className="relative">
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{
                                required: "Start date is required",
                                validate: value => new Date(value) >= new Date().setHours(0, 0, 0, 0) || "Start date cannot be in the past"
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="date"
                                    className={`w-full p-3 rounded-lg bg-gray-800 text-white border ${errors.startDate ? 'border-red-500' : 'border-transparent'} focus:border-blue-500 focus:outline-none transition-all`}
                                />
                            )}
                        />
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                    </div>

                    <div className="relative">
                        <Controller
                            name="matchesPerDay"
                            control={control}
                            rules={{ required: "Matches per day is required" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    placeholder="Enter Matches Per Day"
                                    className={`w-full p-3 rounded-lg bg-gray-800 text-white border ${errors.matchesPerDay ? 'border-red-500' : 'border-transparent'} focus:border-blue-500 focus:outline-none transition-all`}
                                />
                            )}
                        />
                        {errors.matchesPerDay && <p className="text-red-500 text-sm mt-1">{errors.matchesPerDay.message}</p>}
                    </div>
                    <div className='grid gap-4 grid-cols-2'>

                        {Array.from({ length: matchesPerDay || 0 }).map((_, index) => (
                            <div className="relative" key={index}>
                                <Controller
                                    name={`matchTimes[${index}]`}
                                    control={control}
                                    rules={{ required: `Match time for match ${index + 1} is required` }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="time"
                                            placeholder={`Enter Match Time ${index + 1}`}
                                            className={`w-full p-3 rounded-lg bg-gray-800 text-white border ${errors.matchTimes && errors.matchTimes[index] ? 'border-red-500' : 'border-transparent'} focus:border-blue-500 focus:outline-none transition-all`}
                                        />
                                    )}
                                />
                                {errors.matchTimes && errors.matchTimes[index] && (
                                    <p className="text-red-500 text-sm mt-1">{errors.matchTimes[index].message}</p>
                                )}
                            </div>
                        ))}

                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Schedule Matches
                    </motion.button>
                </form>

                <DialogClose asChild />
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleMatchesDialog;
