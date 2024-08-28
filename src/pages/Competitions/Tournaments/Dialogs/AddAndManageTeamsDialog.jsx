import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "../../../components/ui/dialog";

const AddAndManageTeamsDialog = ({ isOpen, onClose, onPrevious }) => {
    const handleSkipOrContinue = () => {
        onClose(); // Close this dialog and move to the next step
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md w-full p-6 rounded-lg bg-white shadow-2xl">
                <DialogTitle className="text-xl font-bold text-gray-800">Add and Manage Teams</DialogTitle>
                <div className="mt-4">
                    {/* Content for adding and managing teams */}
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={onPrevious}
                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                        Previous
                    </button>
                    <div>
                        <button
                            onClick={handleSkipOrContinue}
                            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-200 mr-2"
                        >
                            Skip
                        </button>
                        <button
                            onClick={handleSkipOrContinue}
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                            Create and Continue
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddAndManageTeamsDialog;
