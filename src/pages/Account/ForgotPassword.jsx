import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send a password reset email
        console.log('Password reset email sent to:', email);
        setMessage('If the email is registered, a password reset link has been sent.');
    };

    return (
        <div className="flex justify-center items-center  my-4">
            <div className="bg-white p-8 rounded  w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Send Reset Link
                        </button>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className="mt-4 text-center text-green-500">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
