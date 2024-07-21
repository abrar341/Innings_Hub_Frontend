import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted');
    };

    const handleGoogleSignIn = () => {
        // Handle Google Sign-In
        console.log('Google Sign-In');
    };

    return (
        <div className="flex justify-center items-center  my-2">
            <div className=" p-8 rounded  w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-customDarkBlue">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" placeholder="Enter your email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" placeholder="Enter your password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Remember Me */}
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" name="rememberMe" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                        <label className="ml-2 text-gray-700 text-sm">Remember Me</label>
                    </div>

                    {/* Forgot Password */}
                    <div className="mb-4 text-right">
                        <Link href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Login
                        </button>
                    </div>
                </form>

                {/* Sign in using Google */}
                <div className="mt-6 flex justify-center">
                    <button onClick={handleGoogleSignIn} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign in using Google
                    </button>
                </div>

                {/* Create an Account */}
                <div className="mt-4 text-center">
                    <span className="text-gray-700">Don't have an account? </span>
                    <Link to={"/signup"} className="text-blue-500 hover:underline">Create an Account</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
