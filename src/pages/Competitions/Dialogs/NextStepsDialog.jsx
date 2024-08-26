import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "../../../components/ui/dialog";

const NextStepsDialog = ({ isOpen, onClose, navigateToProfile }) => {
    const handleLetsGo = () => {
        navigateToProfile(); // Redirect to the competition profile
        onClose(); // Close the NextStepsDialog
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg w-full p-6 rounded-lg bg-white shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
                        <svg className="h-9 w-9 border-2 rounded-full border-green-500 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Tournament Created successfully
                    </DialogTitle>


                    {/* <DialogClose asChild>
                        <button onClick={onClose} className="text-gray-600 hover:text-gray-600">
                            &times;
                        </button>
                    </DialogClose> */}
                </div>
                <div className="space-y-4">
                    <p className="text-lg font-medium">
                        Steps below to set up Tournament.
                    </p>
                    <div className="flex flex-col items-start space-y-2">
                        <div className="flex font-semibold items-center space-x-2 text-gray-600 ">
                            <span className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-green-500 ">
                                1
                            </span>
                            <p>Add draws and rounds</p>
                        </div>
                        <div className="flex font-semibold items-center space-x-2 text-gray-600">
                            <span className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-green-500 ">
                                2
                            </span>
                            <p>Add and manage teams</p>
                        </div>
                        <div className="flex font-semibold items-center space-x-2 text-gray-600">
                            <span className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-green-500 ">
                                3
                            </span>
                            <p>Add and manage officials</p>
                        </div>
                        <div className="flex font-semibold items-center space-x-2 text-gray-600">
                            <span className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-green-500 ">
                                4
                            </span>
                            <p>Manage fixtures</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleLetsGo}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                        OK, LET'S GO
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NextStepsDialog;
