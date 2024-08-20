import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';
import { setCredentials } from '../../slices/authSlice';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Validation schema
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(1, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
    const { control, handleSubmit, formState: { errors, touchedFields, isDirty } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, []);
    const onSubmit = async (data) => {
        try {
            const res = await login(data).unwrap();
            console.log(res.data.user.role);

            dispatch(setCredentials({ ...res }));
            navigate(`/${res.data.user.role}`);
            toast.success(res.message)
            // navigate('/');
        } catch (err) {
            toast.dismiss();
            toast.error(err?.data?.message || "Error Occured");
            console.log(err);
        }
    };

    const getIconColorClass = (error, touched, isDirty) => {
        if (error) return 'text-gray-500';
        if (touched && isDirty) return 'text-green-500';
        return 'text-gray-400';
    };

    return (
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 p-4 my-10">
            <div></div>
            <div className="py-8 px-10  place-self-center  md:border-l border-gray-400 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-customDarkBlue">Log In</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                        ${errors.email ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
                                    {...field}
                                />
                            )}
                        />
                        <FaCheckCircle
                            className={`absolute ${getIconColorClass(errors.email, touchedFields.email, isDirty)} right-2 top-11 transition-transform transform duration-200 ease-in-out hover:scale-110`}
                            aria-label={errors.email ? "Email is invalid" : "Email is valid"}
                            title={errors.email ? "Email is invalid" : "Email is valid"}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <div className="relative">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className={`appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                                            ${errors.email ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
                                        {...field}
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute font-bold text-gray-600 inset-y-0 right-8 pr-3 flex items-center text-sm leading-5"
                            >
                                {showPassword ? (
                                    "Hide"
                                ) : (
                                    "Show"
                                )}
                            </button>
                            <FaCheckCircle
                                className={`absolute ${getIconColorClass(errors.email, touchedFields.email, isDirty)} right-2 top-4 transition-transform transform duration-200 ease-in-out hover:scale-110`}
                                aria-label={errors.password ? "Password is invalid" : "Password is valid"}
                                title={errors.password ? "Password is invalid" : "Password is valid"}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Remember Me  */}
                    {/* <div className="mb-4 flex items-center">
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                    {...field}
                                />
                            )}
                        />
                        <label className="ml-2 text-gray-700 text-sm" htmlFor="rememberMe">Remember Me</label>
                    </div> */}

                    {/* Forgot Password */}
                    <div className="mb-4 text-right">
                        <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={` appearance-none border rounded-md  py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex
                            ${isLoading ? 'border-gray-300 text-gray-500 bg-gray-100 cursor-not-allowed' : 'border-gray-400'}`}
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" /> {/* Spinner icon */}
                                    Logging
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>

                {/* Create an Account */}
                <div className="mt-4 text-center">
                    <span className="text-gray-700">Don't have an account? </span>
                    <Link to="/account/signup" className="text-blue-500 hover:underline">Create an Account</Link>
                </div>
            </div>
        </div>

        // <div class="relative p-8">
        //     <button class="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-400 text-white transition-colors duration-300 hover:bg-gray-500 hover:text-blue-400 focus:outline-none focus:ring">
        //         <svg width="14" viewBox="0 0 25 25" class="fill-current">
        //             <path d="M22.222 0 25 2.778l-9.723 9.721L25 22.222 22.222 25 12.5 15.277 2.778 25 0 22.222 9.722 12.5 0 2.778 2.778 0 12.5 9.722 22.222 0z" class="fill-current" fill-rule="evenodd"></path>
        //         </svg>
        //     </button>
        //     <form class="space-y-8" autocomplete="off">
        //         <header class="text-center">
        //             <h2 class="text-3xl font-semibold">Log In</h2>
        //         </header>
        //         <div>
        //             <div class="mb-6">
        //                 <label class="block text-xs font-medium text-gray-600 mb-1 pl-1" for="email">Email</label>
        //                 <div class="relative flex items-center bg-gray-700 rounded-md">
        //                     <input id="email" type="text" name="email" class="input text-sm text-white w-full p-2 pr-12 rounded-md bg-gray-700 focus:outline-none" placeholder="Enter Email" required />
        //                     <div class="absolute right-3 flex h-4 w-4 items-center justify-center rounded-full p-1 bg-gray-800">
        //                         <svg width="10" height="8" viewBox="0 0 10 8">
        //                             <path fill="#FFF" fill-rule="evenodd" stroke="#FFF" stroke-width=".728" d="M3.533 5.646l-2.199-2.19c-.195-.194-.488-.194-.684 0-.195.195-.195.487 0 .682l2.883 2.87L9.055 1.51c.195-.194.195-.487 0-.681-.196-.195-.49-.195-.685 0L3.533 5.646z"></path>
        //                         </svg>
        //                     </div>
        //                 </div>
        //                 <p class="mt-2 text-xs text-red-500">The email field must be a valid email address.</p>
        //             </div>
        //             <div class="mb-6">
        //                 <label class="block text-xs font-medium text-gray-600 mb-1 pl-1" for="password">Password</label>
        //                 <div class="relative flex items-center bg-gray-700 rounded-md">
        //                     <input id="password" type="password" name="password" class="input text-sm text-white w-full p-2 pr-12 rounded-md bg-gray-700 focus:outline-none" placeholder="Enter Password" required />
        //                     <div class="absolute right-3 flex h-4 w-4 items-center justify-center rounded-full p-1 bg-blue-500">
        //                         <svg width="10" height="8" viewBox="0 0 10 8">
        //                             <path fill="#FFF" fill-rule="evenodd" stroke="#FFF" stroke-width=".728" d="M3.533 5.646l-2.199-2.19c-.195-.194-.488-.194-.684 0-.195.195-.195.487 0 .682l2.883 2.87L9.055 1.51c.195-.194.195-.487 0-.681-.196-.195-.49-.195-.685 0L3.533 5.646z"></path>
        //                         </svg>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="text-center text-red-500"></div>
        //         </div>
        //         <footer class="flex flex-col space-y-4">
        //             <button class="w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-500">Log In</button>
        //             <a class="w-full py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-center flex items-center justify-center" href="/accounts/provider/redirect">
        //                 <svg viewBox="0 0 30 29" class="mr-2" width="14">
        //                     <path class="fill-current" fill-rule="nonzero" d="M27.959 7.434a14.866 14.866 0 0 0-5.453-5.414C20.21.69 17.703.025 14.984.025c-2.718 0-5.226.665-7.521 1.995A14.864 14.864 0 0 0 2.01 7.434C.67 9.714 0 12.202 0 14.901c0 3.242.953 6.156 2.858 8.746 1.906 2.589 4.367 4.38 7.385 5.375.351.064.611.019.78-.136a.755.755 0 0 0 .254-.58l-.01-1.047c-.007-.658-.01-1.233-.01-1.723l-.448.077a5.765 5.765 0 0 1-1.083.068 8.308 8.308 0 0 1-1.356-.136 3.04 3.04 0 0 1-1.308-.58c-.403-.304-.689-.701-.858-1.192l-.195-.445a4.834 4.834 0 0 0-.614-.988c-.28-.362-.563-.607-.85-.736l-.136-.097a1.428 1.428 0 0 1-.253-.233 1.062 1.062 0 0 1-.176-.271c-.039-.09-.007-.165.098-.223.104-.059.292-.087.566-.087l.39.058c.26.052.582.206.965.465.384.258.7.594.947 1.007.299.53.66.933 1.082 1.21.423.278.85.417 1.278.417.43 0 .8-.032 1.112-.097a3.9 3.9 0 0 0 .878-.29c.117-.866.436-1.53.956-1.996a13.447 13.447 0 0 1-2-.348 7.995 7.995 0 0 1-1.833-.756 5.244 5.244 0 0 1-1.571-1.298c-.416-.516-.758-1.195-1.024-2.034-.267-.84-.4-1.808-.4-2.905 0-1.563.514-2.893 1.541-3.99-.481-1.176-.436-2.493.137-3.952.377-.116.936-.03 1.678.261.741.291 1.284.54 1.629.746.345.207.621.381.83.523a13.948 13.948 0 0 1 3.745-.503c1.288 0 2.537.168 3.747.503l.741-.464c.507-.31 1.106-.595 1.795-.853.69-.258 1.216-.33 1.58-.213.586 1.46.638 2.777.156 3.951 1.028 1.098 1.542 2.428 1.542 3.99 0 1.099-.134 2.07-.4 2.916-.267.846-.611 1.524-1.034 2.034-.423.51-.95.94-1.58 1.288a8.01 8.01 0 0 1-1.834.756c-.592.155-1.259.271-2 .349.676.58 1.014 1.498 1.014 2.75v4.087c0 .232.081.426.244.58.163.155.42.2.77.136 3.019-.994 5.48-2.786 7.386-5.375 1.905-2.59 2.858-5.504 2.858-8.746 0-2.698-.671-5.187-2.01-7.466z"></path>
        //                 </svg>
        //                 Log In With GitHub
        //             </a>
        //             <div class="flex justify-between">
        //                 <button class="text-sm text-gray-600 hover:underline">Forgot Your Password?</button>
        //                 <button class="text-sm text-gray-600 hover:underline">Sign Up!</button>
        //             </div>
        //         </footer>
        //     </form>
        // </div>

        // <div className="grid grid-cols-1 place-items-center md:grid-cols-2 p-4 my-10">
        //     <div></div>
        //     <div className="py-8 px-10 place-self-center md:border-l border-gray-400 w-full max-w-lg">
        //         <h2 className="text-2xl font-bold mb-6 text-center text-customDarkBlue">Log In</h2>
        //         <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        //             {/* Email */}
        //             <div className="mb-4 relative">
        //                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
        //                 <Controller
        //                     name="email"
        //                     control={control}
        //                     render={({ field }) => (
        //                         <div className="relative">
        //                             <input
        //                                 id="email"
        //                                 type="email"
        //                                 placeholder="Enter your email"
        //                                 className={`appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        //         ${errors.email ? 'border-red-500' : 'border-gray-300'} transition duration-300 ease-in-out`}
        //                                 {...field}
        //                             />
        //                             <FaCheckCircle
        //                                 className={`absolute ${getIconColorClass(errors.email, touchedFields.email, isDirty)} right-2 top-2 transition-transform transform duration-200 ease-in-out hover:scale-110`}
        //                                 aria-label={errors.email ? "Email is invalid" : "Email is valid"}
        //                                 title={errors.email ? "Email is invalid" : "Email is valid"}
        //                             />
        //                         </div>
        //                     )}
        //                 />
        //                 {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
        //             </div>

        //             {/* Password */}
        //             <div className="mb-4 relative">
        //                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
        //                 <Controller
        //                     name="password"
        //                     control={control}
        //                     render={({ field }) => (
        //                         <div className="relative">
        //                             <input
        //                                 id="password"
        //                                 type={showPassword ? "text" : "password"}
        //                                 placeholder="Enter your password"
        //                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
        //         ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        //                                 {...field}
        //                             />
        //                             <button
        //                                 type="button"
        //                                 onClick={togglePasswordVisibility}
        //                                 className="absolute font-bold text-gray-600 inset-y-0 right-8 pr-3 flex items-center text-sm leading-5"
        //                             >
        //                                 {showPassword ? "Hide" : "Show"}
        //                             </button>
        //                             <FaCheckCircle
        //                                 className={`absolute ${getIconColorClass(errors.password, touchedFields.password, isDirty)} right-2 top-2 transition-transform transform duration-200 ease-in-out hover:scale-110`}
        //                                 aria-label={errors.password ? "Password is invalid" : "Password is valid"}
        //                                 title={errors.password ? "Password is invalid" : "Password is valid"}
        //                             />
        //                         </div>
        //                     )}
        //                 />
        //                 {errors.password && <p className="text-red-500 text-xs mt-1" role="alert">{errors.password.message}</p>}
        //             </div>

        //             {/* Forgot Password */}
        //             <div className="mb-4 text-right">
        //                 <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
        //             </div>

        //             {/* Submit Button */}
        //             <div className="flex justify-center">
        //                 <button
        //                     disabled={isLoading}
        //                     type="submit"
        //                     className={`border font-bold py-1 px-10 rounded focus:outline-none focus:shadow-outline flex items-center justify-center 
        //   ${isLoading ? 'border-gray-300 text-gray-500 bg-gray-100 cursor-not-allowed' : 'border-gray-400'}`}
        //                 >
        //                     {isLoading ? (
        //                         <>
        //                             <FaSpinner className="animate-spin mr-2" /> {/* Spinner icon */}
        //                             Logging
        //                         </>
        //                     ) : (
        //                         "Login"
        //                     )}
        //                 </button>
        //             </div>
        //         </form>

        //         {/* Alternative Login */}
        //         <div className="mt-4 text-center">
        //             <a className="w-full py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-center flex items-center justify-center mb-4" href="/accounts/provider/redirect">
        //                 <svg viewBox="0 0 30 29" className="mr-2" width="14">
        //                     <path className="fill-current" fillRule="nonzero" d="M27.959 7.434a14.866 14.866 0 0 0-5.453-5.414C20.21.69 17.703.025 14.984.025c-2.718 0-5.226.665-7.521 1.995A14.864 14.864 0 0 0 2.01 7.434C.67 9.714 0 12.202 0 14.901c0 3.242.953 6.156 2.858 8.746 1.906 2.589 4.367 4.38 7.385 5.375.351.064.611.019.78-.136a.755.755 0 0 0 .254-.58l-.01-1.047c-.007-.658-.01-1.233-.01-1.723l-.448.077a5.765 5.765 0 0 1-1.083.068 8.308 8.308 0 0 1-1.356-.136 3.04 3.04 0 0 1-1.308-.58c-.403-.304-.689-.701-.858-1.192l-.195-.445a4.834 4.834 0 0 0-.614-.988c-.28-.362-.563-.607-.85-.736l-.136-.097a1.428 1.428 0 0 1-.253-.233 1.062 1.062 0 0 1-.176-.271c-.039-.09-.007-.165.098-.223.104-.059.292-.087.566-.087l.39.058c.26.052.582.206.965.465.384.258.7.594.947 1.007.299.53.66.933 1.082 1.21.423.278.85.417 1.278.417.43 0 .8-.032 1.112-.097a3.9 3.9 0 0 0 .878-.29c.117-.866.436-1.53.956-1.996a13.447 13.447 0 0 1-2-.348 7.995 7.995 0 0 1-1.833-.756 5.244 5.244 0 0 1-1.571-1.298c-.416-.516-.758-1.195-1.024-2.034-.267-.84-.4-1.808-.4-2.905 0-1.563.514-2.893 1.541-3.99-.481-1.176-.436-2.493.137-3.952.377-.116.936-.03 1.678.261.741.291 1.284.54 1.629.746.345.207.621.381.83.523a13.948 13.948 0 0 1 3.745-.503c1.288 0 2.537.168 3.747.503l.741-.464c.507-.31 1.106-.595 1.795-.853.69-.258 1.216-.33 1.58-.213.586 1.46.638 2.777.156 3.951 1.028 1.098 1.542 2.428 1.542 3.99 0 1.099-.134 2.07-.4 2.916-.267.846-.611 1.524-1.034 2.034-.423.51-.95.94-1.58 1.288a8.01 8.01 0 0 1-1.834.756c-.592.155-1.259.271-2 .349.676.58 1.014 1.498 1.014 2.75v4.087c0 .232.081.426.244.58.163.155.42.2.77.136 3.019-.994 5.48-2.786 7.386-5.375 1.905-2.59 2.858-5.504 2.858-8.746 0-2.698-.671-5.187-2.01-7.466z"></path>
        //                 </svg>
        //                 Log In With GitHub
        //             </a>
        //             <span className="text-gray-700 text-sm">
        //                 Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
        //             </span>
        //         </div>
        //     </div>
        // </div>


    );
};

export default LoginForm;
