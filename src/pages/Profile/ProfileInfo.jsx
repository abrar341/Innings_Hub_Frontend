import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, Mail } from "lucide-react";
import Input from "../../components/Input";
import { useSelector } from "react-redux";

// Validation schema for Profile Info
const profileSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});

const ProfileInfo = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(profileSchema),
        mode: 'onChange',
        defaultValues: {
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            username: userInfo?.username || '',
        },
    });

    const onSubmit = (data) => {
        console.log("Profile Info Submitted", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Name"
                            {...field}
                            disabled

                            error={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Username"
                            {...field}
                            disabled

                            error={errors.username?.message}
                        />
                    )}
                />
            </div>

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        {...field}
                        disabled

                        error={errors.email?.message}
                    />
                )}
            />





            {/* <button
                className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 outline-none"
                type="submit"
            // disabled={isLoading}
            >
                {/* {isLoading ? "Updating..." : "Update Profile"} */}
            {/* Update Profile */}
            {/* </button> */}
        </form>
    );
};

export default ProfileInfo;
