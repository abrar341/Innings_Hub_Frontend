import { motion } from "framer-motion";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import { ArrowRight, ArrowLeft, Loader, User, MapPin, Calendar, Phone, Mail, Home, Link } from "lucide-react"; // Import icons

// Form Steps
const steps = [
    { label: "Club Details" },
    { label: "Manager Details" },
    { label: "Social Media Links" },
];

const ClubRegistrationForm = () => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'onChange',
    });

    const [step, setStep] = useState(0);
    const isLastStep = step === steps.length - 1;
    const isFirstStep = step === 0;

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const onSubmit = (data) => {
        if (!isLastStep) return nextStep();
        // Submit data logic here
        console.log("Form Data: ", data);
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
                            <Controller
                                name="clubName"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={User} // Icon for Club Name
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
                                        icon={MapPin} // Icon for Location
                                        placeholder="Location"
                                        {...field}
                                        error={errors.location?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="year"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Calendar} // Icon for Year Established
                                        placeholder="Year Established"
                                        type="number"
                                        {...field}
                                        error={errors.year?.message}
                                    />
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
                                        icon={User} // Icon for Manager Name
                                        placeholder="Manager Name"
                                        {...field}
                                        error={errors.managerName?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="managerEmail"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Mail} // Icon for Manager Email
                                        placeholder="Manager Email"
                                        type="email"
                                        {...field}
                                        error={errors.managerEmail?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="managerPhone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Phone} // Icon for Manager Phone
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
                                        icon={Home} // Icon for Manager Address
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
                            {/* Step 3: Social Media Links */}
                            <Controller
                                name="socialMedia"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Link} // Icon for Social Media Links
                                        placeholder="Social Media Links (e.g., Facebook, Twitter)"
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
