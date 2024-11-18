import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the default styles
import {
    ArrowRight,
    ArrowLeftCircle,
    User,
    MapPin,
    Phone,
    Mail,
    Home,
    Link,
    ImageIcon,
} from "lucide-react";
import { useRegisterClubMutation } from "../slices/club/clubApiSlice";
import { setCredentials } from "../slices/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Form Steps
const steps = [
    { label: "Club Details" },
    { label: "Manager Details" },
    { label: "Social Links" },
];

const ClubRegistrationForm = ({ reviewData }) => {
    const { control, handleSubmit, setValue, formState: { errors }, register } = useForm({
        mode: 'onChange',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const reviewData = useSelector((state) => state.auth.reviewData);
    console.log(reviewData);


    const [registerClub, { isLoading }] = useRegisterClubMutation();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [step, setStep] = useState(0);
    let review = false;

    const isLastStep = step === steps.length - 1;
    const isFirstStep = step === 0;

    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(125), (val, index) => currentYear - index);

    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {
        if (reviewData) {
            console.log(reviewData);
            // Set each form field individually with reviewData values
            setValue("clubLogo", reviewData.clubLogo);
            setValue("clubName", reviewData.clubName);
            setValue("location", reviewData.location);
            setValue("yearEstablished", reviewData.yearEstablished);
            setValue("managerName", reviewData.managerName);
            setValue("managerEmail", reviewData.managerEmail);
            setValue("managerPhone", reviewData.manager.phone);
            setValue("managerAddress", reviewData.manager.address);
            setValue("socialLink", reviewData.socialLink);
            review = true;
        }
    }, [reviewData, setValue]);


    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
            setValue("clubLogo", file);
        }
    };

    useEffect(() => {
        if (userInfo) {
            setValue("managerName", userInfo?.name);
            setValue("managerEmail", userInfo?.email);
            setValue("managerPhone", userInfo?.phone);
        }
    }, [userInfo, setValue]);

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const onSubmit = async (data) => {
        try {
            if (!isLastStep) {
                nextStep();
                return;
            }
            if (reviewData) {
                data.review = true;
            } else {
                data.review = false;

            }
            console.log(data);

            const res = await registerClub(data).unwrap();
            console.log(res);
            const { user } = res?.data;
            dispatch(setCredentials({ ...user }));
            toast.success(res?.message);
            navigate('/');
        } catch (err) {
            console.error("Error registering club:", err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full rounded-xl shadow-2xl p-6 border dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600"
            >
                <div className="flex justify-between mb-6">
                    <h2 className="text-3xl font-extrabold text-center dark:text-white text-gray-900">
                        {steps[step].label}
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === 0 && (
                        <>
                            {/* Step 1: Club Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <Controller
                                        name="clubLogo"
                                        control={control}
                                        render={() => (
                                            <label className="cursor-pointer group">
                                                <div className="relative mx-auto w-32 h-32 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-green-500 transition-colors">
                                                    {logoPreview ? (
                                                        <img
                                                            src={logoPreview}
                                                            alt="Uploaded Logo"
                                                            className="w-full h-full object-cover rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-green-500 transition-colors">
                                                            <span className="text-sm font-medium">Upload Logo</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={handleLogoChange}
                                                    />
                                                </div>
                                            </label>
                                        )}
                                    />
                                </div>
                                <div className="sm:col-span-2 pt-5">
                                    <Controller
                                        name="clubName"
                                        control={control}
                                        rules={{ required: "Club name is required" }}
                                        render={({ field }) => (
                                            <Input
                                                icon={User}
                                                placeholder="Club Name"
                                                {...field}
                                                error={errors.clubName?.message}
                                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="location"
                                        control={control}
                                        rules={{ required: "Location is required" }}
                                        render={({ field }) => (
                                            <Input
                                                icon={MapPin}
                                                placeholder="Location"
                                                {...field}
                                                error={errors.location?.message}
                                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <Controller
                                name="yearEstablished"
                                control={control}
                                rules={{ required: "Please select a year" }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <select
                                            {...field}
                                            className="w-full px-4 py-2 border dark:bg-gray-700 bg-white border-gray-300 dark:border-gray-600 rounded-lg shadow-md text-gray-900 dark:text-white"
                                        >
                                            <option value="">Year Established</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.yearEstablished && <span className="text-red-500">{errors.yearEstablished.message}</span>}
                                    </div>
                                )}
                            />
                        </>
                    )}

                    {step === 1 && (
                        <>
                            {/* Step 2: Manager Details */}
                            <Controller
                                name="managerName"
                                control={control}
                                rules={{ required: "Manager name is required" }}
                                render={({ field }) => (
                                    <Input
                                        icon={User}
                                        placeholder="Manager Name"
                                        {...field}
                                        error={errors.managerName?.message}
                                        disabled
                                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                )}
                            />
                            <Controller
                                name="managerEmail"
                                control={control}
                                rules={{
                                    required: "Manager email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter a valid email",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        icon={Mail}
                                        placeholder="Manager Email"
                                        type="email"
                                        {...field}
                                        error={errors.managerEmail?.message}
                                        disabled
                                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                )}
                            />

                            {/* <Controller
                                name="managerPhone"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <PhoneInput
                                            {...field}
                                            country={'pk'} // Default country code as +92 for Pakistan
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            inputProps={{
                                                className: `border w-full outline-none px-12 py-3 rounded-lg transition duration-200
                        ${errors.managerPhone
                                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                        : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:focus:border-green-500 dark:focus:ring-green-500'
                                                    }
                        ${errors.managerPhone
                                                        ? 'dark:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500'
                                                        : 'dark:bg-gray-800 dark:bg-opacity-50'
                                                    }
                        bg-white text-black placeholder-gray-500 dark:text-white dark:placeholder-gray-400`,
                                                placeholder: "Manager Phone Number"
                                            }}
                                        />
                                        {errors.managerPhone && (
                                            <p className="text-red-500 mb-2 px-1 font-semibold text-xs mt-1 dark:text-red-400">
                                                {errors.managerPhone.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            /> */}

                            <Controller
                                name="managerPhone"
                                control={control}
                                rules={{
                                    required: "Manager phone number is required",
                                    pattern: {
                                        value: /^\+?[1-9]\d{1,14}$/, // Allows international format with 1-15 digits
                                        message: "Enter a valid phone number",
                                    },
                                }}

                                render={({ field }) => (
                                    <Input
                                        icon={Phone}
                                        placeholder="Manager Phone Number"
                                        type="tel"
                                        {...field}
                                        error={errors.managerPhone?.message}
                                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                )}
                            />
                            <Controller
                                name="managerAddress"
                                control={control}
                                rules={{ required: "Manager address is required" }}
                                render={({ field }) => (
                                    <Input
                                        icon={Home}
                                        placeholder="Manager Address"
                                        {...field}
                                        error={errors.managerAddress?.message}
                                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                )}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {/* Step 3: Social Links */}
                            <Controller
                                name="socialLink"
                                control={control}
                                rules={{ required: "Please enter at least one social link" }}
                                render={({ field }) => (
                                    <Input
                                        icon={Link}
                                        placeholder="Social Links (e.g., Facebook, Twitter)"
                                        {...field}
                                        error={errors.socialLink?.message}
                                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                )}
                            />
                        </>
                    )}

                    <div className="flex justify-between mt-6">
                        {!isFirstStep && (
                            <motion.button
                                type="button"
                                onClick={prevStep}
                                className="flex items-center text-gray-700 dark:text-white"
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeftCircle className="mr-2" />
                                Previous
                            </motion.button>
                        )}
                        <motion.button
                            type="submit"
                            className="flex items-center px-6 py-2 font-bold text-white bg-blue-600 rounded-full shadow-md dark:bg-green-500"
                            whileTap={{ scale: 0.95 }}
                        >
                            {isLastStep ? "Submit" : "Next"}
                            {!isLastStep && <ArrowRight className="ml-2" />}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ClubRegistrationForm;
