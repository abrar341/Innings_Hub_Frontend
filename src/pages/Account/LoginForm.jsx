import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ username: email, password }).unwrap();
            console.log(res)
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            console.log(err)
        }
    };

    return (
        <div className="flex justify-center items-center my-2">
            <div className="p-8 rounded w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-customDarkBlue">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" name="rememberMe" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                        <label className="ml-2 text-gray-700 text-sm">Remember Me</label>
                    </div>

                    {/* Forgot Password */}
                    <div className="mb-4 text-right">
                        <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button disabled={isLoading} type="submit" className="border border-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {isLoading ? "Logging" : "login"}
                        </button>
                        {/* {isLoading && <Loader />} */}

                    </div>
                </form>

                {/* Create an Account */}
                <div className="mt-4 text-center">
                    <span className="text-gray-700">Don't have an account? </span>
                    <Link to="/signup" className="text-blue-500 hover:underline">Create an Account</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
