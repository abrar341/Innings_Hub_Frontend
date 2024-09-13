import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import { ArrowRight, ArrowLeft, User, MapPin, Calendar, Phone, Mail, Home, Link, ImageIcon } from "lucide-react";
import { useRegisterClubMutation } from "../slices/club/clubApiSlice";
import { setCredentials } from "../slices/auth/authSlice";
import toast from "react-hot-toast";


// Form Steps
const steps = [
    { label: "Club Details" },
    { label: "Manager Details" },
    { label: "Social Links" },
];

const ClubRegistrationForm = () => {
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm({
        mode: 'onChange',
    });
    const dispatch = useDispatch();

    const [registerClub, { isLoading }] = useRegisterClubMutation();

    const userInfo = useSelector((state) => state.auth.userInfo);
    const [step, setStep] = useState(0);
    const isLastStep = step === steps.length - 1;
    const isFirstStep = step === 0;

    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(125), (val, index) => currentYear - index);



    const [logoPreview, setLogoPreview] = useState(null);

    const handleLogoChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the input
        if (file) {
            setLogoPreview(URL.createObjectURL(file)); // Preview the logo
            setValue("clubLogo", file); // Store the file in form state, not the entire file list
        }
    };




    useEffect(() => {
        if (userInfo) {
            setValue("managerName", userInfo.name);
            setValue("managerEmail", userInfo.email);
        }
    }, [userInfo, setValue]);

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const onSubmit = async (data) => {
        try {
            if (!isLastStep) {
                // If it's not the last step, advance the form
                nextStep();
                return;
            }

            console.log("Form Data: ", data); // Logs the form data

            // Await the API call to register the club
            const res = await registerClub(data).unwrap();
            console.log(res.data?.user);
            const { user } = res?.data;

            // console.log(res.data?.id);
            dispatch(setCredentials({ ...user }));
            toast.success(res.message)

            console.log("Club registered successfully:", res);
        } catch (err) {
            console.error("Error registering club:", err);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen py-2 bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg bg-gray-700 bg-opacity-50 backdrop-blur-xl rounded-xl shadow-xl p-8"
            >
                <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    {steps[step].label}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === 0 && (
                        <>
                            {/* Step 1: Club Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 ">
                                <div>
                                    <Controller
                                        name="clubLogo"
                                        control={control}
                                        render={() => (
                                            <label className="cursor-pointer group">
                                                <div className="relative mx-auto w-32 h-32 rounded-full border-2 border-gray-300 group-hover:border-green-500 transition-colors">
                                                    {logoPreview ? (
                                                        <img
                                                            src={logoPreview}
                                                            alt="Uploaded Logo"
                                                            className="w-full h-full object-cover rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300 group-hover:text-green-500 transition-colors">
                                                            <span className="text-sm font-medium">Upload Logo</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={handleLogoChange}
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-white text-sm font-medium">Change</span>
                                                    </div>
                                                </div>
                                            </label>
                                        )}
                                    />
                                </div>
                                <div className="sm:col-span-2 pt-5"><Controller
                                    name="clubName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            icon={User}
                                            placeholder="Club Name"
                                            {...field}
                                            error={errors.clubName?.message}
                                        />
                                    )}
                                />
                                    <Controller
                                        name="location"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                icon={MapPin}
                                                placeholder="Location"
                                                {...field}
                                                error={errors.location?.message}
                                            />
                                        )}
                                    /></div>

                            </div>


                            <Controller
                                name="yearEstablished"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <select
                                            {...field}
                                            className="w-full px-4 py-2 border bg-gray-800 border-gray-700 rounded-lg shadow-md text-white"
                                        >
                                            <option value="">Year Established</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.year && <span className="text-red-500">{errors.year.message}</span>}
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
                                render={({ field }) => (
                                    <Input
                                        icon={User}
                                        placeholder="Manager Name"
                                        {...field}
                                        error={errors.managerName?.message}
                                        disabled
                                    />
                                )}
                            />
                            <Controller
                                name="managerEmail"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Mail}
                                        placeholder="Manager Email"
                                        type="email"
                                        {...field}
                                        error={errors.managerEmail?.message}
                                        disabled
                                    />
                                )}
                            />
                            <Controller
                                name="managerPhone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Phone}
                                        placeholder="Manager Phone Number"
                                        type="tel"
                                        {...field}
                                        error={errors.managerPhone?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="managerAddress"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Home}
                                        placeholder="Manager Address"
                                        {...field}
                                        error={errors.managerAddress?.message}
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
                                render={({ field }) => (
                                    <Input
                                        icon={Link}
                                        placeholder="Social Links (e.g., Facebook, Twitter)"
                                        {...field}
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
                                className="flex items-center text-gray-300 bg-gray-800 py-2 px-4 rounded-lg shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                Back
                            </motion.button>
                        )}

                        <motion.button
                            type="submit"
                            className="flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLastStep ? "Submit" : "Next"}
                            {!isLastStep && <ArrowRight size={20} className="ml-2" />}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ClubRegistrationForm;
