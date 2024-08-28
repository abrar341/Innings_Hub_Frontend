import React, { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "../../components/ui/dialog";
import { FaPlus, FaSpinner } from "react-icons/fa";

const CreatePlayerDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        // API call or form submission logic here

        // Simulate loading delay
        setTimeout(() => {
            setIsLoading(false);
            setIsOpen(false);
            // Reset form logic here
        }, 2000);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                        <FaPlus className="mr-2" />
                        Add New Player
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl custom-scrollbar w-full p-8 rounded-lg bg-white shadow-2xl ">
                    <div className="flex justify-between items-center mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            Create Player
                        </DialogTitle>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label className="cursor-pointer border group">
                                <div className="relative w-full h-32 rounded-lg border-2 border-gray-300 group-hover:border-green-500 transition-colors">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Uploaded Logo"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 group-hover:text-green-500 transition-colors">
                                            <span className="text-sm font-medium">
                                                Upload Profile Picture
                                            </span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleLogoChange}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-sm font-medium">Change</span>
                                    </div>
                                </div>
                            </label>
                            <div className="md:col-span-2 grid gap-4 self-end">
                                <input
                                    className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Player Name"
                                    type="text"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        placeholder="City"
                                        type="text"
                                    />
                                    <input
                                        className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Phone Number"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Email"
                                type="email"
                            />
                            <input
                                className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Jersey Number"
                                type="text"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Role</option>
                                <option value="Batsman">Batsman</option>
                                <option value="Bowler">Bowler</option>
                                <option value="All-Rounder">All-Rounder</option>
                            </select>
                            <select
                                className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Batting Style</option>
                                <option value="Right-Handed">Right-Handed</option>
                                <option value="Left-Handed">Left-Handed</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Bowling Style</option>
                                <option value="Right-Arm Fast">Right-Arm Fast</option>
                                <option value="Left-Arm Fast">Left-Arm Fast</option>
                                <option value="Right-Arm Spin">Right-Arm Spin</option>
                                <option value="Left-Arm Spin">Left-Arm Spin</option>
                            </select>
                            <input
                                className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Date of Birth"
                                type="date"
                            />
                        </div>

                        <div className="flex flex-col text-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`flex self-end justify-center w-full items-center btn btn-success text-uppercase px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex justify-center ${isLoading
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        Creating
                                    </>
                                ) : (
                                    "Create"
                                )}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreatePlayerDialog;
