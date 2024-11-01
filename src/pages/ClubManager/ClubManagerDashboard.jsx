import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Layers, Home } from 'lucide-react'; // Updated icons for Club Manager
import UserDropdown from '../../components/userDropdown';
import { useSelector } from 'react-redux';

const ClubManagerDashboard = () => {
    const cards = [
        { to: 'players', icon: <Users />, title: 'Players' },
        { to: 'teams', icon: <Layers />, title: 'Teams' },
        { to: 'club-detail', icon: <Home />, title: 'Club Details' },
    ];
    const { userInfo } = useSelector((state) => state.auth);
    const club = userInfo?.club;
    const navigate = useNavigate();

    const handleCardClick = (to) => {
        navigate(`${to}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            {/* Header with Profile */}
            <div className="flex justify-center items-center mb-10">
                <h2 className="text-4xl text-gray-700 dark:text-gray-300  uppercase font-extrabold text-center">{club?.clubName}</h2>

            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => handleCardClick(card.to)}
                        className="group relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        {/* Subtle Background Ripple Effect */}
                        <div className="absolute inset-0 rounded-lg bg-green-500 opacity-0 group-hover:opacity-20 transition duration-500"></div>

                        {/* Icon and Title */}
                        <div className="z-10 flex flex-col items-center">
                            <div className="text-5xl text-green-500 mb-4 transition-transform duration-300 group-hover:scale-110">
                                {card.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 group-hover:text-green-600 transition-colors duration-300">
                                {card.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubManagerDashboard;
