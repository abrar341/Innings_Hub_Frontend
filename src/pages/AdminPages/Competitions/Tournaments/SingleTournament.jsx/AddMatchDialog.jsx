import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../../../../../components/ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../../../components/Input";
import { useGetTeamsInTournamentQuery } from "../../../../../slices/tournament/tournamentApiSlice";
import { useCreateMatchMutation } from "../../../../../slices/match/matchApiSlice";

// Validation schema and react-hook-form setup
const CreateMatchDialog = ({ tournamentId }) => {
    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: 'onChange',
    });
    const [teams, setTeams] = useState([]);
    const [venues, setVenues] = useState(["sda"]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(tournamentId);

    const { data, isLoading, isError, error, refetch } = useGetTeamsInTournamentQuery(tournamentId);
    const [createMatch] = useCreateMatchMutation()


    useEffect(() => {
        if (isDialogOpen) {
            refetch(); // Trigger API call to fetch players
        }
    }, [isDialogOpen, refetch]);

    // Set players when data is fetched
    useEffect(() => {
        if (data) {
            setTeams(data?.data.teams || []); // Set players list
            setVenues(data?.data.venues || []); // Set players list
        }
    }, [data]);

    const navigate = useNavigate();

    const handleSelectTeam = (teamId, setTeam) => setTeam(teamId);

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const { selectedTeam1, selectedTeam2, venue = "kljlj", overs, date, time } = data;
            // API call to create match
            await createMatch({
                selectedTeam1,
                selectedTeam2,
                venue,
                overs,
                date,
                time,
                tournamentId
            }).unwrap();

            toast.dismiss();
            toast.success("Match created successfully!");

            // Reset form fields
            reset();
            setIsDialogOpen(false);
        } catch (err) {
            toast.dismiss();
            toast.error(err?.data?.message || "Error occurred");
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200">
                    <FaPlus className="mr-2" />
                    Create Match
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl ">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Create Match
                </DialogTitle>
                <p className="text-center text-gray-300 mb-6">
                    Select teams, venue, and set match details.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Team 1 Selection */}
                        <div>
                            <Controller
                                name="selectedTeam1"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full bg-gray-700 text-white p-3 rounded-lg"
                                    >
                                        <option value="">Select Team 1</option>
                                        {teams
                                            .filter((team) => team._id !== watch('selectedTeam2')) // Exclude the team selected for Team 2
                                            .map((team) => (
                                                <option key={team._id} value={team._id}>
                                                    {team.teamName}
                                                </option>
                                            ))}
                                    </select>
                                )}
                            />
                            {errors.selectedTeam1 && <p className="text-red-500">{errors.selectedTeam1.message}</p>}
                        </div>

                        {/* Team 2 Selection */}
                        <div>
                            <Controller
                                name="selectedTeam2"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full bg-gray-700 text-white p-3 rounded-lg"
                                    >
                                        <option value="">Select Team 2</option>
                                        {teams
                                            .filter((team) => team._id !== watch('selectedTeam1')) // Exclude the team selected for Team 1
                                            .map((team) => (
                                                <option key={team._id} value={team._id}>
                                                    {team.teamName}
                                                </option>
                                            ))}
                                    </select>
                                )}
                            />
                            {errors.selectedTeam2 && <p className="text-red-500">{errors.selectedTeam2.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">


                        {/* Venue Input */}
                        <Controller
                            name="venue"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="w-full h-10 bg-gray-700 text-white px-3 rounded-lg"
                                >
                                    <option value="">Select Venue</option>
                                    {venues.map((venue) => (
                                        <option key={venue._id} value={venue._id}>
                                            {venue.venueName}ds
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.venue && <p className="text-red-500">{errors.venue.message}</p>}

                        {errors.venue && <p className="text-red-500">{errors.venue.message}</p>}


                        {/* Overs Input */}
                        <Controller
                            name="overs"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Overs"
                                    error={errors.overs?.message}
                                />
                            )}
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Date Input */}
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="date"
                                    placeholder="Date"
                                    error={errors.date?.message}
                                />
                            )}
                        />

                        {/* Time Dropdown */}
                        <Controller
                            name="time"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="time"
                                    className="w-full h-10 px-4 bg-gray-700 text-white rounded-lg"
                                />
                            )}
                        />

                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Create Match
                    </motion.button>
                </form>

                <DialogClose asChild></DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default CreateMatchDialog;
