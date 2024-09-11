import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "../components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "../slices/auth/usersApiSlice";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import EmailVerificationDialog from "./verifyDialog";
import { showVerifyDialog, } from '../slices/dialogbox/dialogSlice'; // Adjust the path
import useDialog from "../hooks/useDialog";


// Validation schema
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const SignUpDialog = () => {
    const { showVerifyDialog } = useDialog();

    const { control, handleSubmit, formState: { errors, isDirty } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const { name, email, username, password, confirmPassword, clubManager } = data;
            const role = clubManager ? 'Club-Manager' : 'Regular-User';

            const requestData = {
                name,
                email,
                username,
                password,
                confirmPassword,
                role,  // Set the role based on the checkbox
            };
            console.log(isverifyDialogOpen);

            showVerifyDialog();
            console.log(isverifyDialogOpen);
            console.log(requestData);

            const res = await register(requestData).unwrap();
            console.log(res);

            toast.success("Account created successfully!");

            if (role === 'Club Manager') {
                toast.info("Your club manager request has been submitted for approval.");
            }
        } catch (err) {
            toast.error(err?.data?.message || "Error occurred while creating account");
        }
    };

    return (
        <>
            <Dialog >
                <DialogTrigger asChild>
                    <button className="px-4 py-1 text-black border border-black rounded-lg">Sign Up</button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-md">
                    <DialogTitle className="text-2xl font-semibold text-center mb-6">SIGN UP</DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                                ${errors.email ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
                                        type="name"
                                        placeholder="Name"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
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

                        <div className="relative">
                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                                ${errors.username ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
                                        type="text"
                                        placeholder="Username"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                        </div>

                        <div className="relative">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                                ${errors.password ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="relative">
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                                ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Club Manager Option */}
                        <div className="relative">
                            <Controller
                                name="clubManager"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            {...field}
                                            className="mr-2"
                                        />
                                        <label htmlFor="clubManager">Sign up as Club Manager</label>
                                    </div>
                                )}
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            className={`w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 flex justify-center
                    ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "SIGN UP"}
                        </button>
                    </form>
                    <DialogClose asChild>
                        <button aria-label="Close" className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none" />
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SignUpDialog;
