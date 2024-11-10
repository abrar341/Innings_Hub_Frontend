import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Lock } from "lucide-react";
import Input from "../../components/Input";
import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../slices/auth/usersApiSlice";
import toast from "react-hot-toast";

// Validation schema for Password Update
const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required('Old password is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const ChangePassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(passwordSchema),
    });
    const { userInfo } = useSelector((state) => state.auth);

    const [changePassword, { isLoading, isError, isSuccess }] = useChangePasswordMutation();

    const onSubmit = async (data) => {
        try {
            // Attach the user's email from userInfo and prepare the payload
            const payload = {
                email: userInfo.email,
                oldPassword: data.oldPassword,
                newPassword: data.password,
            };

            // Log submission data for debugging purposes
            console.log("Password Change Submitted", payload);

            // Call the changePassword mutation with the payload
            const response = await changePassword(payload).unwrap();
            // Handle success response
            toast.dismiss()
            toast.success(response?.message)
            console.log("Password changed successfully:", response);
        } catch (error) {
            // Handle error response
            toast.dismiss()
            toast.error(error?.data?.message)
            console.error("Failed to change password:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Old Password"
                        {...field}
                        error={errors.oldPassword?.message}
                    />
                )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="New Password"
                            {...field}
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
                            {...field}
                            error={errors.confirmPassword?.message}
                        />
                    )}
                />
            </div>


            <button
                className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 outline-none"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Change Password"}
            </button>
        </form>
    );
};

export default ChangePassword;
