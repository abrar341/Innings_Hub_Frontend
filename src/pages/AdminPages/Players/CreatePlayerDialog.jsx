import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "../../../components/ui/dialog";
import { FaPlus, FaSpinner } from "react-icons/fa";
import validationSchema from "./validationSchema"; // Assuming you've stored the schema in a separate file
import { useCreatePlayerMutation } from "../../../slices/player/playerApiSlice";
import toast from "react-hot-toast";

const CreatePlayerDialog = ({ open }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [createPlayer, { isLoading }] = useCreatePlayerMutation();

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
            setValue("profilePicture", file);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        const formattedData = {
            ...data,
            dob: data.dob.toISOString(),
        };
        const response = await createPlayer(formattedData).unwrap();
        console.log(response.data);
        if (response) {
            toast.success(response.message);
            setIsOpen(false);
            reset();
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {<button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                        <FaPlus className="mr-2" />
                        Add New Player
                    </button>}
                </DialogTrigger>
                <DialogContent className="max-w-2xl custom-scrollbar w-full p-8 rounded-lg bg-white shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            Create Player
                        </DialogTitle>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                {errors.profilePicture && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.profilePicture.message}
                                    </p>
                                )}
                            </label>
                            <div className="md:col-span-2 grid gap-4 self-end">
                                <Controller
                                    name="playerName"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <input
                                                {...field}
                                                value={field.value || ""}
                                                className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Player Name"
                                                type="text"
                                            />
                                            {errors.playerName && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.playerName.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="city"
                                        control={control}
                                        render={({ field }) => (
                                            <div>


                                                <input
                                                    {...field}
                                                    value={field.value || ""}
                                                    className="form-control flex w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="City"
                                                    type="text"
                                                />
                                                {errors.city && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.city.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />

                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <div>


                                                <input
                                                    {...field}
                                                    value={field.value || ""}
                                                    className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="Phone Number"
                                                    type="text"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <div>


                                        <input
                                            {...field}
                                            value={field.value || ""}
                                            className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Email"
                                            type="email"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name="jerseyNumber"
                                control={control}
                                render={({ field }) => (
                                    <div>


                                        <input
                                            {...field}
                                            value={field.value || ""}
                                            className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Jersey Number"
                                            type="text"
                                        />
                                        {errors.jerseyNumber && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.jerseyNumber.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <div>


                                        <select
                                            {...field}
                                            value={field.value || ""}
                                            className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Select Role</option>
                                            <option value="All-Rounder">All-Rounder</option>
                                            <option value="Batsman">Batsman</option>
                                            <option value="Bowler">Bowler</option>
                                            <option value="wicket-keeper">wicket-keeper</option>
                                        </select>
                                        {errors.role && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.role.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name="battingStyle"
                                control={control}
                                render={({ field }) => (
                                    <div>


                                        <select
                                            {...field}
                                            value={field.value || ""}
                                            className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Batting Style</option>
                                            <option value="Right-handed">Right-Handed</option>
                                            <option value="Left-handed">Left-Handed</option>
                                        </select>
                                        {errors.battingStyle && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.battingStyle.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller
                                name="bowlingStyle"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <select
                                            {...field}
                                            value={field.value || ""}
                                            className="form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Bowling Style</option>
                                            <option value="Right-arm fast">Right-Arm Fast</option>
                                            <option value="Left-arm fast">Left-Arm Fast</option>
                                            <option value="Right-arm spin">Right-Arm Spin</option>
                                            <option value="Left-arm spin">Left-Arm Spin</option>
                                        </select>
                                        {errors.bowlingStyle && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.bowlingStyle.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                            <Controller
                                name="dob"
                                control={control}
                                render={({ field }) => (
                                    <div className="w-full">
                                        <DatePicker
                                            className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.start_date ? "border-red-500" : ""
                                                }`}
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            placeholderText="dob"
                                        />
                                        {errors.dob && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.dob.message}
                                            </p>
                                        )}
                                    </div>
                                )}
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
