import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useAddPlayerToClubMutation } from '../../../slices/player/playerApiSlice';
import toast from 'react-hot-toast';

const AssignPlayerDialog = ({ playerId, setPlayerClub, reqClubs: clubData }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);

    // Initialize the mutation hook
    const [addPlayerToClub, { isLoading }] = useAddPlayerToClubMutation();

    const handleAssignClub = async () => {
        if (!selectedClub) {
            alert("Please select a club to assign the player.");
            return;
        }

        try {
            const result = await addPlayerToClub({ playerId, clubId: selectedClub }).unwrap();
            if (result) {
                setIsDialogOpen(false);
                toast.success("player added")
            }
        } catch (error) {
            console.error("Failed to assign player to club:", error);
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="flex justify-center items-center" asChild>
                    <div className="relative">
                        <button

                            className={`p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 ${clubData?.length > 0
                                ? "bg-gray-100 hover:bg-gray-200"
                                : "bg-gray-300 cursor-not-allowed"
                                }`}
                            disabled={clubData?.length === 0}
                        >
                            <FaPlus
                                className={`text-gray-${clubData?.length > 0 ? "600" : "400"} dark:text-gray-${clubData?.length > 0 ? "300" : "500"}`}
                            />
                        </button>
                        {clubData?.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {clubData.length}
                            </span>
                        )}
                    </div>


                </DialogTrigger>

                <DialogContent className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-300 dark:border-gray-700">
                    <DialogTitle className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-8">
                        Assign Player to Club
                    </DialogTitle>

                    <div className="space-y-6">
                        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
                            Select a club to assign the player:
                        </div>

                        <div className="gap-4 grid grid-cols-2">
                            {clubData?.map((club) => (
                                <div
                                    key={club._id}
                                    className={`flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer border ${selectedClub === club._id
                                        ? 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600'
                                        : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                                        }`}
                                    onClick={() => setSelectedClub(club._id)}
                                >
                                    <span className="text-gray-800 dark:text-gray-100">{club?.clubName}</span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                        {selectedClub === club._id ? 'Selected' : 'Select'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <motion.button
                            type="button"
                            onClick={handleAssignClub}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                            className={`w-full py-2 font-semibold rounded-lg shadow-md transition-all duration-200 ${isLoading
                                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                                : 'bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white'
                                }`}
                        >
                            {isLoading ? 'Assigning...' : 'Assign to Club'}
                        </motion.button>
                    </div>
                </DialogContent>

            </Dialog>
        </>
    );
};

export default AssignPlayerDialog;
