import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Input"; // Adjust path as needed
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfilePictureMutation } from "../../slices/auth/usersApiSlice";
import { updateCredentials } from "../../slices/auth/authSlice";

// Validation schema
const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});

const UpdateProfile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            username: userInfo?.username || '',
        },
    });
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(userInfo?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Mutation for updating profile picture
    const [updateProfilePicture, { isLoading: isUploading }] = useUpdateProfilePictureMutation();

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleUpload = async () => {
        if (!imageFile) {
            toast.error("Please select an image to upload.");
            return;
        }

        try {
            const response = await updateProfilePicture({
                userId: userInfo?._id, // Assuming `userInfo` contains the current user's ID
                profilePicture: imageFile,
            }).unwrap();
            console.log(response);
            dispatch(updateCredentials({ profilePicture: response?.data?.profilePicture }));


            toast.success("Profile picture updated successfully!");
            setImageFile(null); // Reset the selected image
            setImagePreview(response?.profilePicture || imagePreview); // Update with the new URL
        } catch (error) {
            console.error("Error updating profile picture:", error);
            toast.error(error?.data?.message || "Failed to update profile picture.");
        }
    };


    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const updatedData = { ...data, profilePicture: imagePreview };
            console.log('Profile Data:', updatedData);
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Error updating profile.");
        } finally {
            setIsLoading(false);
        }
    };

    const location = useLocation();
    const parentPath = location.pathname.split('/').slice(0, -1).join('/') || '/';

    const handleGoBack = () => {
        if (parentPath === '/club-manager') {
            navigate('/club-manager/dashboard');
        } else if (parentPath === '/regular-user') {
            navigate('/');
        } else {
            navigate(parentPath);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 min-h-screen py-2">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-700 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-600">
                <div className="p-8">
                    {/* Go Back Button */}
                    <button
                        onClick={handleGoBack}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        <ArrowLeft className="mr-2" size={20} />
                        <span>Go Back</span>
                    </button>

                    <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                        Update Profile
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Profile Image */}
                        <div className="relative flex flex-col justify-center items-center mb-6">
                            <label className="relative cursor-pointer group">
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
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
                            <p className="text-xl font-semibold mt-2 text-gray-700 dark:text-gray-200">{userInfo.username}</p>

                            {/* Upload Button */}
                            {imageFile && (
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className={`mt-4 px-4 py-2 text-white font-semibold rounded-lg transition ${isUploading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600"
                                        }`}
                                >
                                    {isUploading ? "Uploading..." : "Upload"}
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Navigation Tabs */}
                    <nav className="flex justify-center mb-5 mt-5">
                        <NavLink
                            to="profile"
                            className={({ isActive }) =>
                                isActive ? "text-green-600 font-bold" : "dark:text-gray-300 font-semibold hover:text-green-500"
                            }
                        >
                            Profile Information
                        </NavLink>
                        <span className="mx-4">|</span>
                        <NavLink
                            to="password"
                            className={({ isActive }) =>
                                isActive ? "text-green-600 font-bold" : "dark:text-gray-300 font-semibold hover:text-green-500"
                            }
                        >
                            Change Password
                        </NavLink>
                    </nav>

                    {/* Outlet for Nested Routes */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
