import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const MainNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        let timer;
        if (isMenuOpen) {
            timer = setTimeout(() => setIsMenuOpen(false), 5000); // Auto-close after 5 seconds
        }
        return () => clearTimeout(timer);
    }, [isMenuOpen]);

    return (
        <nav className="bg-customDarkBlue p-4 sticky top-0 z-10 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold tracking-wide">
                    Cricket App
                </div>
                <div className="hidden md:flex space-x-8">
                    <NavLink to="/" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`
                    }>
                        Home
                    </NavLink>
                    <NavLink
                        to="all-matches"
                        className={({ isActive }) =>
                            `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                            }`
                        }
                    >
                        Live Scores
                    </NavLink>
                    <NavLink to="/team" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`
                    }>
                        Teams
                    </NavLink>
                    <NavLink to="/series" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`
                    }>
                        Competitions
                    </NavLink>
                    <NavLink to="/players" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`
                    }>
                        Players
                    </NavLink>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <div className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="flex flex-col space-y-2 mt-4">
                    <NavLink to="/" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`} onClick={() => setIsMenuOpen(false)}>

                        Home
                    </NavLink>
                    <NavLink to="/matches" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`} onClick={() => setIsMenuOpen(false)}>
                        Matches
                    </NavLink>
                    <NavLink to="/team" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`} onClick={() => setIsMenuOpen(false)}>
                        Teams
                    </NavLink>
                    <NavLink to="/series" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`} onClick={() => setIsMenuOpen(false)}>
                        Competitions
                    </NavLink>
                    <NavLink to="/players" className={({ isActive }) =>
                        `font-bold text-gray-300 text-sm hover:text-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out ${isActive ? "bg-red-500" : ""
                        }`} onClick={() => setIsMenuOpen(false)}>
                        Players
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default MainNavbar;
