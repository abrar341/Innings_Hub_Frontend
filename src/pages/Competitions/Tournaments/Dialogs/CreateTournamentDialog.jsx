import React, { useState } from "react";
import { useCreateTournamentMutation } from "../../../../slices/tournament/tournamentApiSlice";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "../../../../components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import NextStepsDialog from "./NextStepsDialog";
import { useDispatch, useSelector } from 'react-redux';

// Validation schema using yup
const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    short_title: yup
        .string()
        .max(3, "Short Title must be less than 4 characters")
        .required("Short Title is required"),
    season: yup
        .number()
        .typeError("Season must be a number")
        .required("Season is required"),
    type: yup.string().required("Series Type is required"),
    start_date: yup
        .date()
        .required("Start Date is required")
        .nullable(),
    end_date: yup
        .date()
        .required("End Date is required")
        .nullable()
        .min(yup.ref("start_date"), "End Date must be after Start Date"),
    ball_type: yup.string().required("Ball Type is required"),
});

const CreateTournamentDialog = () => {
    const dispatch = useDispatch();
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

    const [selectedBall, setSelectedBall] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [nextStepsOpen, setNextStepsOpen] = useState(false);
    const [createTournament, { isLoading }] = useCreateTournamentMutation();

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                start_date: data.start_date.toISOString(),
                end_date: data.end_date.toISOString(),
            };

            const response = await createTournament(formattedData).unwrap();
            console.log(response.data);


            if (response) {
                toast.success(response.message);
                setIsOpen(false);
                setNextStepsOpen(true);
                resetForm();
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.data?.message || "Error creating tournament");
        }
    };

    const handleBallSelection = (ballType) => {
        setSelectedBall(ballType);
        setValue("ball_type", ballType);
        clearErrors("ball_type");
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
        setSelectedBall(null);
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
                        Add New
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl custom-scrollbar w-full p-8 rounded-lg bg-white shadow-2xl hide-scrollbar">
                    <div className="flex justify-between items-center mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            Create Tournament
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
                                                Upload Logo
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
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <input
                                                className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.title ? "border-red-500" : ""
                                                    }`}
                                                placeholder="Competition Title"
                                                type="text"
                                                {...field}
                                            />
                                            {errors.title && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.title.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="short_title"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <input
                                                    className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.short_title ? "border-red-500" : ""
                                                        }`}
                                                    placeholder="Short Title"
                                                    type="text"
                                                    {...field}
                                                />
                                                {errors.short_title && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.short_title.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />

                                    <Controller
                                        name="season"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <input
                                                    className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.season ? "border-red-500" : ""
                                                        }`}
                                                    placeholder="Season"
                                                    type="text"
                                                    {...field}
                                                />
                                                {errors.season && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.season.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="grid grid-cols-1 gap-2">
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="w-full">
                                            <select
                                                className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.type ? "border-red-500" : ""
                                                    }`}
                                                {...field}
                                            >
                                                <option value="">Select Series Type</option>
                                                <option value="Open">Open</option>
                                                <option value="Club">Club</option>
                                                <option value="School">School</option>
                                            </select>
                                            {errors.type && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.type.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                                <div className="w-full flex space-x-4">
                                    <Controller
                                        name="start_date"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="w-full">
                                                <DatePicker
                                                    className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.start_date ? "border-red-500" : ""
                                                        }`}
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    placeholderText="Start Date"
                                                />
                                                {errors.start_date && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.start_date.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="end_date"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="w-full">
                                                <DatePicker
                                                    className={`form-control w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.end_date ? "border-red-500" : ""
                                                        }`}
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    placeholderText="End Date"
                                                />
                                                {errors.end_date && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.end_date.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                            </div>
                            <Controller
                                name="ball_type"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <div className="grid md:grid-cols-3 grid-cols-3 gap-4">
                                            {[
                                                {
                                                    value: "Leather",
                                                    src: "https://d2l63a9diffym2.cloudfront.net/common/balls/leather.png",
                                                    label: "Leather ",
                                                },
                                                {
                                                    value: "Cork",
                                                    src: "https://d2l63a9diffym2.cloudfront.net/common/balls/crock.png",
                                                    label: "Cork",
                                                },
                                                {
                                                    value: "Tennis",
                                                    src: "https://d2l63a9diffym2.cloudfront.net/common/balls/tennis.png",
                                                    label: "Tennis",
                                                },

                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        handleBallSelection(item.value)
                                                    }
                                                    className={`card picker-card text-center p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer ${selectedBall === item.value
                                                        ? "bg-green-100 border-green-500"
                                                        : ""
                                                        }`}
                                                >
                                                    <img
                                                        src={item.src}
                                                        alt={item.label}
                                                        className="h-10 w-10 mx-auto"
                                                    />
                                                    <p className="mt-2 text-sm font-medium">
                                                        {item.label}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.ball_type && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.ball_type.message}
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
            <NextStepsDialog isOpen={nextStepsOpen} onClose={() => setNextStepsOpen(false)} goToTournamentProfile={() => navigate("/tournament-profile")}
            />
        </>
    );
};

export default CreateTournamentDialog;
