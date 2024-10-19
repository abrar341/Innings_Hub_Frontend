import React, { useState, useEffect } from "react";
import { useCreateTeamMutation, useUpdateTeamMutation } from "../../../slices/team/teamApiSlice";
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
import { FaEdit, FaPlus, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// Validation schema using yup
const validationSchema = yup.object().shape({
    teamName: yup.string().required("Team Name is required"),
    shortName: yup
        .string()
        .max(3, "Short Name must be less than 4 characters")
        .required("Short Name is required"),
    teamtype: yup.string().required("Team Type is required"),
});

const CreateTeamDialog = ({ open, action, teamData }) => {
    console.log(teamData);

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
    const [createTeam, { isLoading: createLoading }] = useCreateTeamMutation();
    const [updateTeam, { isLoading: updateLoading }] = useUpdateTeamMutation();
    const isEditing = action === "edit";
    const { userInfo } = useSelector((state) => state.auth);
    console.log(userInfo.club?._id);
    const clubId = userInfo.club?._id;

    useEffect(() => {
        if (teamData && isOpen) {
            console.log(teamData);
            setValue("teamName", teamData.teamName);
            setValue("shortName", teamData.shortName);
            setValue("teamtype", teamData.teamtype);
            if (teamData.teamLogo) setLogoPreview(teamData.teamLogo);
        }
    }, [teamData, isOpen, setValue]);

    const onSubmit = async (data) => {
        console.log(data);

        // const formattedData = { ...data };
        try {
            let response;
            const formattedData = {
                ...data,
                clubId, // Add club ID to the data being sent to the backend
            };
            console.log(formattedData);

            if (isEditing) {
                response = await updateTeam({ id: teamData._id, ...formattedData }).unwrap();
                toast.success(response.message || "Team updated successfully");
            } else {
                console.log(clubId);

                response = await createTeam(formattedData).unwrap();
                toast.success(response.message || "Team created successfully");
            }

            if (response) {
                setIsOpen(false);
                resetForm();
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.data?.message || "Error saving team");
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
                            className="flex col-span-3 sm:col-span-2 h-full items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                            <FaPlus className="mr-2" />
                            Add New Team
                        </button>
                    )}
                </DialogTrigger>
                <DialogContent className="hide-scrollbar max-w-2xl w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                    <div className="flex justify-between items-center mb-6">
                        <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-green-400 via-emerald-500 to-purple-400 text-green-500 bg-clip-text mb-4">                               {isEditing ? "Edit Team" : "Create Team"}
                        </DialogTitle>
                        <DialogClose asChild />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label className="cursor-pointer border rounded-lg group">
                                <div className="relative w-full  h-32 rounded-lg  group-hover:border-green-500 transition-colors">
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
                                                className={`w-full outline-none px-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg border ${errors.teamName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500'} text-white placeholder-gray-400 transition duration-200`}
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
                                <Controller
                                    name="shortName"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <input
                                                className={`w-full outline-none px-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg border ${errors.shortName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500'} text-white placeholder-gray-400 transition duration-200`}
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
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <Controller
                                name="teamtype"
                                control={control}
                                render={({ field }) => (
                                    <div className="w-full">
                                        <select
                                            className={`w-full outline-none px-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg border ${errors.teamtype ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500'} text-white placeholder-gray-400 transition duration-200`}
                                            {...field}
                                            value={field.value || ""}
                                        >
                                            <option value="">Select Team Type</option>
                                            <option value="senior">senior</option>
                                            <option value="junior">junior</option>
                                            <option value="other">other</option>
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
                                disabled={createLoading || updateLoading}
                                className={`flex self-end justify-center w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ${createLoading || updateLoading
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

export default CreateTeamDialog;
