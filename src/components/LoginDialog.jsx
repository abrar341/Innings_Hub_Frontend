import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "../components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/auth/usersApiSlice";
import { setCredentials } from "../slices/auth/authSlice";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

// Validation schema
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginDialog = () => {
    const { control, handleSubmit, formState: { errors, touchedFields, isDirty } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const onSubmit = async (data) => {
        try {
            const res = await login(data).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(`/${res.data.user.role}`);
            toast.success(res.message);
        } catch (err) {
            toast.dismiss();
            toast.error(err?.data?.message || "Error Occurred");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="px-4 py-1  text-black border border-black rounded-lg hover:bg-">
                    Login
                </button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
                <DialogTitle className="text-2xl font-semibold text-center mb-6">LOGIN</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div className="relative">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        ${errors.email ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
                                    type="email"
                                    placeholder="Email"
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    {/* Password */}
                    <div>
                        <div className="relative flex items-center">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                        ${errors.password ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        {...field}
                                    />
                                )}
                            />
                            <button
                                className="absolute right-0 px-4 text-gray-600 hover:text-gray-900 flex items-center"
                                type="button"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>


                    {/* Forgot Password */}
                    <p className="text-right text-sm">
                        <Link to="/forgot-password" className="text-indigo-600 hover:underline">
                            Forgot your password?
                        </Link>
                    </p>
                    {/* Submit Button */}
                    <button
                        disabled={isLoading}
                        className={`w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 flex justify-center
                            ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "LOGIN"}
                    </button>
                </form>
                <p className="text-center">OR</p>
                <div className="space-y-2">
                    <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        <span className="fab fa-google"></span> Continue with Google
                    </button>
                </div>
                <DialogClose asChild>
                    <button aria-label="Close" className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none" />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
