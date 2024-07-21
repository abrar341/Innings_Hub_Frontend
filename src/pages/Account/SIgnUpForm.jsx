import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted');
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-8 lg:mx-20  sm:max-w-x lg:max-w-xmlns  my-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-customDarkBlue">Sign Up</h2>
                <form className='grid grid-cols-1 md:grid-cols-2  gap-4' onSubmit={handleSubmit}>


                    {/* Trade Role */}
                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Please select trade role</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input type="radio" name="bizRole" value="buyer" className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                                <span className="ml-2 text-gray-700">Buyer</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="bizRole" value="supplier" className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                                <span className="ml-2 text-gray-700">Seller</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="bizRole" value="both" className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                                <span className="ml-2 text-gray-700">Both</span>
                            </label>
                        </div>
                    </div> */}

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" placeholder="Please set the email as the login name." name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Login Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"> Password</label>
                        <input type="password" placeholder="Set the login password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input type="password" placeholder="Enter the login password again" name="confirmPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Full name</label>
                        <div className="flex space-x-2">
                            <input type="text" placeholder="Please enter your first name" name="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <input type="text" placeholder="Please enter your last name" name="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Agree to Terms</label>
                        <div className="flex items-center">
                            <input type="checkbox" name="memberAgreement" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                            <span className="ml-2 text-gray-700">
                                I agree to (a) <a href="https://rulechannel.alibaba.com/icbu?type=detail&ruleId=2042&cId=1303#/rule/detail?cId=1303&ruleId=2042" target="_blank" className="text-blue-500">Free Membership Agreement</a>, (b) <a href="https://rulechannel.alibaba.com/icbu?type=detail&ruleId=2041&cId=1307#/rule/detail?cId=1307&ruleId=2041" target="_blank" className="text-blue-500">Terms of Use</a>, and (c) <a href="https://rulechannel.alibaba.com/icbu?type=detail&ruleId=2034&cId=1306#/rule/detail?ruleId=2034&cId=1306" target="_blank" className="text-blue-500">Privacy Policy</a>.
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Link to={"/verification"} className="flex  md:col-span-2 justify-end ">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-h-[50px]">
                            Agree and Register
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
