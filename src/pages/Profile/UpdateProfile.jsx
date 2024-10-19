import React, { useState } from "react";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, Mail, Lock, Loader, UserCircle, ImageIcon, ArrowLeft } from "lucide-react"; // Importing ArrowLeft icon for the button
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import Input from "../../components/Input";
import { useSelector } from "react-redux";

// Validation schema
const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    oldPassword: yup.string().when(["password", "confirmPassword"], {
        is: (password, confirmPassword) => password || confirmPassword,
        then: yup.string().required('Old password is required'),
        otherwise: yup.string().notRequired(),
    }),
    password: yup.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const UpdateProfile = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const { control, handleSubmit, formState: { errors, isDirty } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageSelected, setImageSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); // Initializing useNavigate hook

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImageSelected(true);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);

        setIsLoading(true);
        try {
            const updatedData = { ...data, profilePicture: imageSelected ? imagePreview : null };
            console.log('Profile Data:', updatedData);
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Error updating profile.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-900 min-h-screen py-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-2xl w-full bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl border border-gray-600'
            >
                <div className='p-8'>

                    {/* Go Back Button */}
                    <button
                        onClick={() => navigate(-1)} // Go back to the previous page
                        className='flex items-center text-gray-300 hover:text-white'
                    >
                        <ArrowLeft className="mr-2" size={20} />
                        <span>Go Back</span>
                    </button>

                    <h2 className='text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                        {userInfo?.name}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Profile Image */}
                        <div className="relative flex justify-center items-center mb-6">
                            <label className="relative cursor-pointer group">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src="default_image.jpg"
                                        alt="Default Profile"
                                        className="w-32 h-32 border border-gray-600 rounded-full object-cover"
                                    />
                                )}

                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-medium">Change Image</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/jpg, image/jpeg, image/png"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4">
                            {/* Username */}
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={User}
                                        type='text'
                                        placeholder='Name'
                                        value={field.value || userInfo?.name}
                                        onChange={field.onChange}
                                        error={errors.username?.message}
                                    />
                                )}
                            />

                            {/* Email */}
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Mail}
                                        type='email'
                                        placeholder='Email Address'
                                        value={field.value || userInfo?.email}
                                        onChange={field.onChange}
                                        error={errors.email?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4">

                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={UserCircle}
                                        type='text'
                                        placeholder='Username'
                                        value={field.value || userInfo?.username}
                                        onChange={field.onChange}
                                        error={errors.username?.message}
                                    />
                                )}
                            />
                            {/* Old Password */}
                            <Controller
                                name="oldPassword"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Lock}
                                        type='password'
                                        placeholder='Old Password'
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.oldPassword?.message}
                                    />
                                )}
                            />
                        </div>
                        {/* New Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={Lock}
                                        type='password'
                                        placeholder='New Password'
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
                                        type='password'
                                        placeholder='Confirm Password'
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.confirmPassword?.message}
                                    />
                                )}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='mt-2 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700  transition duration-200 outline-none'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Update Profile"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default UpdateProfile;
