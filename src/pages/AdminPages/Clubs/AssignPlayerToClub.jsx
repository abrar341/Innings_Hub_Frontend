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
                    <button
                        className=" p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                    >
                        <FaPlus className="text-gray-600" />
                    </button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-6 border border-gray-300">
                    <DialogTitle className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                        Assign Player to Club
                    </DialogTitle>

                    <div className="space-y-6">
                        <div className="text-lg font-semibold text-gray-700 text-center">Select a club to assign the player:</div>

                        <div className="gap-4 grid grid-cols-2">
                            {clubData?.map((club) => (
                                <div
                                    key={club._id}
                                    className={`flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer border ${selectedClub === club._id ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'}`}
                                    onClick={() => setSelectedClub(club._id)}
                                >
                                    <span className="text-gray-800">{club?.clubName}</span>
                                    <span className="text-gray-500 text-sm">
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
                            className={`w-full py-2 font-semibold rounded-lg shadow-md transition-all duration-200 ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
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
