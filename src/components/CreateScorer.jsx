import { motion } from "framer-motion";
import Input from "./Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "../slices/auth/usersApiSlice";
import { FaPlus } from "react-icons/fa";

// Validation schema for the scorer registration
const schema = yup.object().shape({
    name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const AdminRegisterScorerDialog = ({ onAddScorer }) => {
    const { control, handleSubmit, formState: { errors, isDirty } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [register, { isLoading }] = useRegisterMutation();

    const onSubmit = async (data) => {
        try {
            const { name, email, username, password, confirmPassword } = data;
            const role = 'scorer';

            const requestData = {
                name,
                email,
                username,
                password,
                confirmPassword,
                role,
            };

            const res = await register(requestData).unwrap();

            setIsDialogOpen(false);

            if (onAddScorer) {
                onAddScorer(res?.data); // Pass the new scorer data to parent
            }

            toast.dismiss();
            toast.success("Scorer Created Successfully");
        } catch (err) {
            toast.dismiss();
            toast.error(err?.data.message);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="fixed bottom-6 right-6 flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-700 dark:to-teal-700 text-white text-base font-medium px-4 py-3 rounded shadow-lg hover:from-green-700 hover:to-teal-700 dark:hover:from-green-800 dark:hover:to-teal-800 transition-all duration-200 z-50">
                    <FaPlus className="mr-2" />
                    Register New Scorer
                </button>
            </DialogTrigger>

            <DialogContent className="hide-scrollbar max-w-lg w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 border border-gray-300 dark:border-gray-600">
                <DialogTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-600 text-transparent bg-clip-text mb-8">
                    Register Scorer
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                icon={User}
                                type='text'
                                placeholder='Full Name'
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                icon={Mail}
                                type='email'
                                placeholder='Email Address'
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <Input
                                icon={User}
                                type='text'
                                placeholder='Username'
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
                                    type='password'
                                    placeholder='Password'
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

                    <motion.button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Register Scorer"}
                    </motion.button>
                </form>

                <DialogClose asChild />
            </DialogContent>
        </Dialog>
    );
};

export default AdminRegisterScorerDialog;
