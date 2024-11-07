import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import ActionButtons from "../../pages/AdminPages/Clubs/ActionButtons";
import { useSelector } from "react-redux";
import { User, Mail, Phone } from 'lucide-react';


const ClubDetailsPage = () => {
    const { state } = useLocation();
    const clubInfo = state?.clubInfo;
    const { userType, isAuthenticated } = useSelector((state) => state.auth);

    console.log(clubInfo);

    return (
        <div className="container mx-auto p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 min-h-screen">
            <header className="flex justify-between items-center gap-4 mb-8">

                <h1 className="text-4xl flex items-center gap-2 font-extrabold text-gray-800 dark:text-gray-300">
                    <FaInfoCircle className="text-3xl text-gray-600 dark:text-gray-400" />Club Details</h1>
                {isAuthenticated && userType === "admin" && <ActionButtons club={clubInfo} />}
            </header>
            {/* Render ActionButtons only for authenticated admin users */}
            <section className="space-y-10">
                {/* Club Overview */}
                <div className="text-center bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">{clubInfo?.clubName}</h2>
                    <p className="text-base font-semibold text-gray-500 dark:text-gray-400 mt-2">Established: {clubInfo?.yearEstablished}</p>
                    <p className={`text-lg font-semibold mt-2 ${clubInfo?.registrationStatus === 'approved' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        Status: {clubInfo?.registrationStatus}
                    </p>
                </div>

                {/* Club Manager Info */}
                <motion.div
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-5 flex items-center">
                        <User className="text-indigo-500 mr-3" size={24} />
                        Club Manager
                    </h3>
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                            <User className="text-indigo-400 mr-4" size={20} />
                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                                Name: <span className="font-normal">{clubInfo?.manager?.name || 'N/A'}</span>
                            </p>
                        </div>

                        {/* Email Field */}
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                            <Mail className="text-indigo-400 mr-4" size={20} />
                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                                Email: <span className="font-normal">{clubInfo?.manager?.email || 'N/A'}</span>
                            </p>
                        </div>

                        {/* Phone Field */}
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                            <Phone className="text-indigo-400 mr-4" size={20} />
                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                                Phone: <span className="font-normal">{clubInfo?.manager?.phone || 'N/A'}</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Social Links</h3>
                    {clubInfo?.socialLinks?.length ? (
                        <ul className="space-y-2">
                            {clubInfo.socialLinks.map((link, index) => (
                                <li key={index} className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition">
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No social links available</p>
                    )}
                </motion.div>
            </section>
        </div>
    );
};

export default ClubDetailsPage;
