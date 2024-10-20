import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "./ui/dialog";
import { motion } from "framer-motion";
import { FaCamera, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from '../slices/admin/adminApiSlice';
import toast from 'react-hot-toast';

const MatchClickDialog = ({ matchId }) => {
    console.log(matchId);

    const [images, setImages] = useState([null]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false); // New state for loading

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [createPost] = useCreatePostMutation();

    // Handle image upload for a specific slot
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedImages = [...images];
            updatedImages[index] = {
                url: URL.createObjectURL(file),
                file: file,
            };
            setImages(updatedImages);
        }
    };

    // Remove image from a specific slot
    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages[index] = null;
        setImages(updatedImages.filter(img => img !== null)); // Remove empty slots

        if (updatedImages.filter(img => img !== null).length === 0) {
            setImages([null]);
        }
    };

    // Automatically adjust textarea height based on content
    const autoResizeTextarea = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    // Submit the form data
    const onSubmit = async (data) => {
        const submittedImages = images
            .filter(image => image)
            .map((image, index) => ({
                file: image.file,
                description: data[`description${index}`],
            }));

        const postData = {
            matchId,
            images: submittedImages,
        };

        try {
            setLoading(true); // Set loading state to true
            const response = await createPost(postData).unwrap();
            console.log('Post successfully created:', response);
            reset();
            setImages([null]);
            setIsDialogOpen(false); // Close the dialog on successful submission
            toast.success(response?.message);
        } catch (error) {
            toast.error(error?.data.message);
            console.error('Error creating post:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="fixed top-6 right-6 flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-600 text-white text-xl font-medium p-4 rounded-full shadow-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 z-50">
                    <FaCamera />
                </button>
            </DialogTrigger>

            <DialogContent className="relative max-w-2xl hide-scrollbar w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl p-6 border border-gray-600">
                <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-transparent bg-clip-text mb-4">
                    Upload Match Clicks
                </DialogTitle>
                <p className="text-center text-gray-300 mb-4">
                    You can upload up to 3 photos, each with its own description.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                className="relative flex flex-row items-center space-x-4"
                                animate={{
                                    scale: image ? 0.85 : 1,
                                    opacity: image ? 0.7 : 1,
                                }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index)}
                                    className="hidden"
                                    id={`upload${index}`}
                                />
                                <label htmlFor={`upload${index}`} className="cursor-pointer">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center justify-center w-40 h-40 bg-gray-700 rounded-lg shadow-lg text-white text-sm"
                                    >
                                        {image ? (
                                            <img src={image.url} alt={`Uploaded ${index}`} className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            `Click to Upload Image ${index + 1}`
                                        )}
                                    </motion.div>
                                </label>

                                {image && (
                                    <div className="flex-grow">
                                        <textarea
                                            {...register(`description${index}`, {
                                                required: "Description is required",
                                                minLength: { value: 10, message: "Minimum 10 characters" },
                                                maxLength: { value: 200, message: "Maximum 200 characters" }
                                            })}
                                            placeholder="Enter a short description"
                                            className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                            rows={1}
                                            onInput={autoResizeTextarea}
                                        />
                                        {errors[`description${index}`] && (
                                            <p className="text-red-500 text-sm">
                                                {errors[`description${index}`].message}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {image && (
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-0 right-0 p-2 bg-gray-500 text-white rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>


                    <button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={!images.some(img => img) || loading} // Disable during loading
                        className={`w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg 
                            ${(!images.some(img => img) || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-teal-700'}`}
                    >
                        {loading ? 'Submitting...' : 'Submit Photos'}
                    </button>
                </form>
                {images.length < 3 && images.some(image => image) && (
                    <button
                        onClick={() => setImages([...images, null])}
                        className="flex mb-2 items-center justify-center w-full p-4 bg-gray-700 text-white text-sm rounded-lg shadow-lg"
                    >
                        <FaPlus className="mr-2" /> Add More Photos
                    </button>
                )}

                <DialogClose asChild />
            </DialogContent>
        </Dialog>
    );
};

export default MatchClickDialog;
