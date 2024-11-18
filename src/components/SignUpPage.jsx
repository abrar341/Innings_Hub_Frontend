import { motion } from "framer-motion";
import Input from "./Input";
import { Loader, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../slices/auth/usersApiSlice";
import { toast } from "react-hot-toast";
import useDialog from "../hooks/useDialog";
import EmailVerificationDialog from "./verifyDialog";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the default styl
// Validation schema
const schema = yup.object().shape({
    name: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces') // Allows only alphabets and spaces
        .required('Full name is required'), email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup
        .string()
        .matches(/[A-Za-z]{3,}/, 'Username must contain at least 3 letters') // At least 3 alphabetic characters
        .required('Username is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    clubManager: yup.boolean(),
    phone: yup
        .string()
        .matches(/^\+?[0-9]\d{1,14}$/, 'Enter a valid phone number') // Must match international format
        .min(11, 'Phone number must be at least 11 digits')
        .max(14, 'Phone number must be at most 14 digits')
        .required('Manager phone number is required'),
});

const SignUpPage = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors, isDirty } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const [register, { isLoading }] = useRegisterMutation();
    const { isVerifyDialogOpen, openVerifyDialog } = useDialog();
    const [email, setEmail] = useState("");

    const onSubmit = async (data) => {
        try {
            const { name, email, username, password, confirmPassword, clubManager, phone } = data;
            const role = clubManager ? 'club-manager' : 'Regular-User';

            const requestData = {
                name,
                email,
                username,
                password,
                confirmPassword,
                role,
                phone
            };

            const res = await register(requestData).unwrap();
            console.log(res);

            setEmail(requestData.email);
            openVerifyDialog();
            toast.dismiss();
            toast.success("verification code send ...");
        } catch (err) {
            toast.dismiss();
            toast.error(err?.data?.message || "Error occurred while creating account");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 py-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full bg-white dark:bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-3xl border border-gray-200 dark:border-gray-600"
            >
                <div className="p-8">
                    <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    icon={User}
                                    type="text"
                                    placeholder="Full Name"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.name?.message}
                                />
                            )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Mail}
                                        type="email"
                                        placeholder="Email Address"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.email?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Phone}
                                        placeholder="Phone Number"
                                        type="tel"
                                        {...field}
                                        error={errors.phone?.message}
                                        onChange={field.onChange}
                                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                )}
                            />
                        </div>

                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    icon={User}
                                    type="text"
                                    placeholder="Username"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.username?.message}
                                />
                            )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Lock}
                                        type="password"
                                        placeholder="Password"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.password?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Lock}
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.confirmPassword?.message}
                                    />
                                )}
                            />
                        </div>

                        <Controller
                            name="clubManager"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center mt-4">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        {...field}
                                    />
                                    <label htmlFor="clubManager" className="text-gray-700 dark:text-gray-300">Sign up as Club Manager</label>
                                </div>
                            )}
                        />

                        <motion.button
                            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
                        </motion.button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-gray-100 dark:bg-gray-900 bg-opacity-50 flex justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link to="/account/login" className="text-green-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>
            <EmailVerificationDialog email={email} setEmail={setEmail} />
        </div>
    );
};

export default SignUpPage;
