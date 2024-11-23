import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDropdown from './userDropdown';
import { ThemeContext } from './ThemeContext';
import NotificationBell from './Notification/NotificationBell';

const MainNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const notifications = useSelector((state) => state.socket.notifications);
    const unreadNotifications = notifications.filter((notif) => !notif.isRead);

    const unreadCount = unreadNotifications.length;

    useEffect(() => {
        if (isMenuOpen) {
            const timer = setTimeout(() => setIsMenuOpen(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    const navLinkClass = ({ isActive }) =>
        `flex items-center font-semibold text-xs tracking-wide px-3 py-1 transition-all duration-300 ease-in-out rounded-md 
        ${isActive ? 'bg-blue-700 text-white dark:bg-blue-500' : 'text-white dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-700'}`;

    const links = [
        // { to: '/', label: 'Home' },
        { to: '/all-matches', label: 'Live' },
        { to: '/team', label: 'Teams' },
        { to: '/series', label: 'Competitions' },
        { to: '/players', label: 'Players' },
        { to: '/gallery', label: 'Gallery' },
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
        <nav className="bg-blue-500 px-4 py-2 sticky top-0 z-30 shadow-md transition-shadow duration-300 dark:bg-gray-900 dark:border-t border-gray-500">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold px-2 py-1 tracking-wide text-white dark:text-gray-200"
                >
                    Innings_Hub
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6">{renderNavLinks()}</div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    {isAuthenticated && (
                        <div className="relative">
                            <NotificationBell textColor={'text-white'} onClose={() => setIsMenuOpen(false)} />
                        </div>
                    )}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-blue-600 focus:outline-none text-white dark:text-gray-300"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="currentColor"
                            >
                                <path d="M21.75 15a9 9 0 11-9.75-12A7.5 7.5 0 0021.75 15z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
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

                    {/* Login/Profile */}
                    {isAuthenticated ? (
                        <UserDropdown profile="/club-manager/profile" />
                    ) : (
                        <Link
                            to="/account/login"
                            className="border border-white px-3 py-1 rounded-md text-white hover:bg-blue-600 dark:border-gray-400 dark:hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white dark:text-gray-300 focus:outline-none"
                >
                    {isMenuOpen ? (
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 p-4 bg-blue-600 rounded-md shadow-lg dark:bg-gray-800">
                    {renderNavLinks(true)}
                </div>
            )}
        </nav>
    );
};

export default MainNavbar;
