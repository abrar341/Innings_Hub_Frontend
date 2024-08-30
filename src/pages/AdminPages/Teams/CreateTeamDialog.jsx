import React, { useState } from "react";
import { useCreateTeamMutation } from "../../../slices/team/teamApiSlice"; // Assuming a slice for teams
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "../../../components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';

// Validation schema using yup
const validationSchema = yup.object().shape({
    teamName: yup.string().required("Team Name is required"),
    shortName: yup
        .string()
        .max(3, "Short Name must be less than 4 characters")
        .required("Short Name is required"),
    teamtype: yup.string().required("Team Type is required"),
    location: yup.string().required("Location is required"),
});

const CreateTeamDialog = () => {
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
    const [logoPreview, setLogoPreview] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [createTeam, { isLoading }] = useCreateTeamMutation();
    const onSubmit = async (data) => {
        console.log(data);

        try {
            const formattedData = { ...data };

            const response = await createTeam(formattedData).unwrap();
            console.log(response.data);

            if (response) {
                toast.success(response.message);
                setIsOpen(false);
                resetForm();
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.data?.message || "Error creating team");
        }
    };

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
            setValue("logo", file);
            clearErrors("logo");
        }
    };

    const resetForm = () => {
        reset();
        setLogoPreview(null);
    };

    const handleDialogClose = () => {
        setIsOpen(false);
        resetForm();
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
                        Add New Team
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl custom-scrollbar w-full p-8 rounded-lg bg-white shadow-2xl hide-scrollbar">
                    <div className="flex justify-between items-center mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            Create Team
                        </DialogTitle>
                        <DialogClose asChild />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label className="cursor-pointer border group">
                                <div className="relative w-full  h-32 rounded-lg border-2 border-gray-300 group-hover:border-green-500 transition-colors">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Uploaded Logo"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 group-hover:text-green-500 transition-colors">
                                            <span className="text-sm font-medium">
                                                Upload Logo (Flag)
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
                            {errors.logo && (
                                <p className="text-red-500 text-xs mt-1">{errors.logo.message}</p>
                            )}
                            <div className="md:col-span-2 grid gap-4 self-end">
                                <Controller
                                    name="teamName"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <input
                                                className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.teamName ? "border-red-500" : ""
                                                    }`}
                                                placeholder="Team Name"
                                                type="text"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                            {errors.teamName && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.teamName.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="shortName"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <input
                                                    className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.shortName ? "border-red-500" : ""
                                                        }`}
                                                    placeholder="Short Name"
                                                    type="text"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                                {errors.shortName && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.shortName.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="location"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <input
                                                    className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.location ? "border-red-500" : ""
                                                        }`}
                                                    placeholder="Location"
                                                    type="text"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                                {errors.location && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.location.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Controller
                                name="teamtype"
                                control={control}
                                render={({ field }) => (
                                    <div className="w-full">
                                        <select
                                            className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.teamtype ? "border-red-500" : ""
                                                }`}
                                            {...field}
                                            value={field.value || ""}
                                        >
                                            <option value="">Select Team Type</option>
                                            <option value="National">National</option>
                                            <option value="Club">Club</option>
                                            <option value="School">School</option>
                                            <option value="Corporate">Corporate</option>
                                        </select>
                                        {errors.teamtype && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.teamtype.message}
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
                                className={`flex self-end justify-center w-full  items-center btn btn-success text-uppercase px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex justify-center ${isLoading
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

export default CreateTeamDialog;
