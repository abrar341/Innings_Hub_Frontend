import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { update_Player } from '../../../slices/player/playerSlice';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "../../../components/ui/dialog";
import { FaPlus, FaEdit, FaSpinner } from "react-icons/fa";
import validationSchema from "./validationSchema"; // Assuming you've stored the schema in a separate file
import { useCreatePlayerMutation, useUpdatePlayerMutation } from "../../../slices/player/playerApiSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const CreatePlayerDialog = ({ open, action, playerData }) => {
    const [isOpen, setIsOpen] = useState(open);
    const [logoPreview, setLogoPreview] = useState(null);
    const [createPlayer, { isLoading: createLoading }] = useCreatePlayerMutation();
    const [updatePlayer, { isLoading: updateLoading }] = useUpdatePlayerMutation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    console.log(userInfo.club?._id);

    const isEditing = action === "edit";
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: playerData || {}
    });

    useEffect(() => {
        if (playerData) {
            setLogoPreview(playerData.profilePicture ? playerData.profilePicture : null);
            if (playerData.DOB) {  // Use uppercase 'DOB'
                console.log("Original DOB:", playerData.DOB);
                let dobDate;

                // Directly parse the ISO 8601 string to a Date object
                dobDate = new Date(playerData.DOB);

                // Check if the dobDate is a valid date
                if (!isNaN(dobDate)) {
                    setValue("dob", dobDate);  // Assuming your form field is named 'dob'
                } else {
                    console.error("Invalid date format for DOB:", playerData.DOB);
                }
            }
        }
        if (playerData) {
            setValue("jerseyNumber", playerData.jersyNo);
        }
    }, [playerData, setValue]);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
            setValue("profilePicture", file);
        }
    };
    const clubId = userInfo.club?._id;

    const onSubmit = async (data) => {

        // Include the club ID in the formatted data
        const formattedData = {
            ...data,
            clubId, // Add club ID to the data being sent to the backend
        };
        try {
            if (isEditing) {
                const response = await updatePlayer({ id: playerData._id, ...formattedData }).unwrap();
                console.log(response.data);

                toast.success(response.message);
                dispatch(update_Player({ data: response.data }))
            } else {
                const response = await createPlayer(formattedData).unwrap();
                toast.success("Player created successfully");
            }
            setIsOpen(false);
            reset();
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {isEditing ? (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        >
                            <FaEdit className="text-gray-600" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex col-span-3 sm:col-span-2  w-full items-center bg-green-500 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                            <FaPlus className="mr-2" />
                            Add New Player
                        </button>
                    )}
                </DialogTrigger>
                <DialogContent className="max-w-2xl custom-scrollbar w-full p-8 rounded-lg bg-white shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            {isEditing ? "Edit Player" : "Create Player"}
                        </DialogTitle>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Form Fields */}
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
                                {/* Other Fields */}
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
                                            <option value="wicket-keeper">Wicket-Keeper</option>
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
                                            className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.dob ? "border-red-500" : ""
                                                }`}
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            placeholderText="Date of Birth"
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
                                disabled={createLoading || updateLoading}
                                className={`flex self-end justify-center w-full items-center btn btn-success text-uppercase px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex justify-center ${createLoading || updateLoading
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                                    }`}
                            >
                                {createLoading || updateLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        {isEditing ? "Updating" : "Creating"}
                                    </>
                                ) : (
                                    isEditing ? "Update" : "Create"
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
