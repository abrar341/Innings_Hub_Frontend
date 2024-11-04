import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDropdown from './userDropdown';
import { ThemeContext } from './ThemeContext';

const MainNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        if (isMenuOpen) {
            const timer = setTimeout(() => setIsMenuOpen(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    const navLinkClass = ({ isActive }) =>
        `flex items-center font-semibold text-sm px-3 py-1 transition duration-300 ease-in-out ${isActive ? 'border-b' : ''
        } dark:text-white text-black dark:border-white border-black`;

    const links = [
        { to: '/', label: 'HOME' },
        { to: '/all-matches', label: 'LIVE' },
        { to: '/team', label: 'TEAMS' },
        { to: '/series', label: 'COMPETITIONS' },
        { to: '/players', label: 'PLAYERS' },
    ];
    const renderNavLinks = (isMobile = false) =>
        links.map((link) => (
            <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
                onClick={() => isMobile && setIsMenuOpen(false)}
            >
                {link.label}
            </NavLink>
        ));

    return (
        <nav className="bg-white dark:bg-gray-800 p-4 md:p-3 sticky top-0 z-10 border-b dark:border-gray-700">
            <div className="container mx-auto flex justify-between gap-3 items-center">
                <h1 class="ml-3 order-1 md:order-0 text-2xl font-extrabold px-2 py-1 border border-transparent rounded-lg shadow-2xl shadow-green-500/40 tracking-wide
           transition-all duration-300 ease-in-out transform scale-110 
           dark:bg-blue-600 text-gray-800 dark:text-gray-200 
           cursor-pointer ">
                    Innings_Hub
                </h1>
                <div className="order-2 flex items-center space-x-4">

                    <button
                        onClick={toggleTheme}
                        className="focus:outline-none dark:text-yellow-400 text-gray-800"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            // Dark mode (on) - solid circle representing "on"
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                {/* Simple Moon Icon */}
                                <path d="M21.75 15a9 9 0 11-9.75-12A7.5 7.5 0 0021.75 15z" />
                            </svg>
                        ) : (
                            // Light mode (off) - outlined sun representing "off"
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </button>




                    {isAuthenticated ? (
                        <UserDropdown profile={"/club-manager/profile"} />
                    ) : (
                        <Link to={'/account/login'} className="border border-gray-600 px-2 py-1 flex items-center dark:text-white dark:border-gray-500">
                            Login
                        </Link>
                    )}
                </div>
                <div className="hidden order-0 md:order-1 md:flex space-x-8">
                    {renderNavLinks()}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-black dark:text-white focus:outline-none">
                        {isMenuOpen ? (
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <div className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="flex flex-col space-y-2 mt-4 dark:text-white text-black">{renderNavLinks(true)}</div>
            </div>
        </nav>
    );
};

export default MainNavbar;
