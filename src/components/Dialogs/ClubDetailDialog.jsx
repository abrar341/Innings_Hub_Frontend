import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "../ui/dialog";
import { motion } from "framer-motion";
import { FaEye, FaInfoCircle } from "react-icons/fa";

const ClubDetailsDialog = ({ clubInfo }) => {
    console.log(clubInfo?.registrationStatus);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {
                    <button className="flex items-center bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 text-sm font-medium py-2 px-4 rounded-lg shadow-md transition duration-200">
                        <FaInfoCircle className="mr-2 text-gray-600 dark:text-gray-400" />
                        View Club Details
                    </button>

                }

            </DialogTrigger>

            <DialogContent className="max-w-2xl hide-scrollbar w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                <DialogTitle className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-300 mb-4">
                    Club Details
                </DialogTitle>

                <div className="space-y-6">
                    <div className="text-center">
                        <div className='flex gap-4 justify-center items-center mb-4'>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{clubInfo?.clubName}</p>
                            <p className="text-base font-semibold text-gray-500 dark:text-gray-400 self-end">Established: {clubInfo?.yearEstablished}</p>
                        </div>
                        <p className={`text-sm font-semibold ${clubInfo?.registrationStatus === 'approved' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            Status: {clubInfo?.registrationStatus}
                        </p>
                    </div>

                    <div
                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Club Manager</p>
                        <p className="text-gray-600 dark:text-gray-400">Name: {clubInfo?.manager.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">Email: {clubInfo?.manager.email}</p>
                        <p className="text-gray-600 dark:text-gray-400">Phone: 03555463381</p>
                    </div>

                    <div
                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Social Links</p>
                        {clubInfo?.socialLinks ? (
                            <ul className="space-y-2">

                                <li className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition">
                                    <a target="_blank" rel="noopener noreferrer">
                                        {clubInfo?.socialLink}
                                    </a>
                                </li>
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No social links available</p>
                        )}
                    </div>


                </div>
                <DialogClose asChild />
            </DialogContent>
        </Dialog>
    );
};

export default ClubDetailsDialog;
