import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/auth/usersApiSlice";
import { setCredentials } from "../slices/auth/authSlice";
import { toast } from "react-hot-toast";
import ClubDetailsDialog from "./Dialogs/ClubDetailDialog";

// Validation schema
const schema = yup.object().shape({
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup.string().min(5, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage = () => {
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const onSubmit = async (data) => {
		try {
			const res = await login(data).unwrap();
			const { user } = res?.data;
			dispatch(setCredentials({ ...user }));

			const role = res.data.user.role;
			if (role === 'admin' || role === 'club-manager' || role === 'scorer') {
				if (role === 'admin' || role === 'scorer') {
					navigate(`/${role}`);
				} else {
					navigate(`/${role}/dashboard`);
				}
			} else {
				navigate('/');
			}
			toast.dismiss();
			toast.success(res.message);
		} catch (err) {
			toast.dismiss();
			toast.error(err?.data?.message || "Error Occurred");
		}
	};

	return (
		<div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 h-screen">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full bg-white dark:bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-600 
				"
			>
				<div className="p-8">
					<h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
						Welcome Back
					</h2>

					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Email Input */}
						<div className="mb-4">
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Input
										icon={Mail}
										type="email"
										placeholder="Email Address"
										{...field}
										error={errors.email?.message}
									/>
								)}
							/>
						</div>

						{/* Password Input */}
						<div className="mb-4">
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<Input
										icon={Lock}
										type="password"
										placeholder="Password"
										{...field}
										error={errors.password?.message}
									/>
								)}
							/>
						</div>
						<div className='flex items-center mb-6'>
							<Link to='/account/forgot-password' className='text-sm text-green-400 hover:underline'>
								Forgot password?
							</Link>
						</div>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition duration-200"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
						</motion.button>
					</form>
				</div>
				<div className="px-8 py-4 bg-gray-100 dark:bg-gray-900 bg-opacity-50 flex justify-center">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Don't have an account?{" "}
						<Link to="/account/signup" className="text-green-500 hover:underline">
							Sign up
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
