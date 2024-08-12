import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDropdown from './userDropdown';

const MainNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        if (isMenuOpen) {
            const timer = setTimeout(() => setIsMenuOpen(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    const navLinkClass = ({ isActive }) =>
        `flex items-center font-semibold  text-gray-400 text-sm hover:text-gray-100 hover:border-b hover:border-gray-800 hover:rounded hover:shadow hover:shadow-gray-200 hover:text-gray-200 px-3 py-1  transition duration-300 ease-in-out ${isActive ? 'text-white border-b border-gray-800 rounded shadow shadow-gray-200' : ''
        }`;

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
        <nav className="bg-customDarkBlue p-4 md:p-3 sticky top-0 z-10 shadow-lg">
            <div className="container mx-auto flex justify-between gap-3 items-center">
                <div className="order-1 md:order-0 text-white text-2xl font-semibold tracking-wide">
                    CRICKET
                </div>
                <div className="order-2 flex items-center">
                    {userInfo ? (
                        <UserDropdown />
                    ) : (
                        <div className="relative flex items-center">
                            {/* <NavLink className={({ isActive }) =>
                                `flex items-center font-semibold py-1 px-3 text-gray-300  ${isActive ? 'border-b border-gray-500 rounded shadow shadow-gray-200' : ''
                                }`} > Account</NavLink> */}
                            {/* <button
                                onClick={toggleDropdown}
                                className="flex font-semibold text-gray-300 text-sm hover:text-gray-200 px-1 py-2 transition duration-300 ease-in-out focus:outline-none"
                            >
                                Account
                                <svg
                                    className="-mr-1 ml-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                    <NavLink
                                        to="/account/login"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/account/signup"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        SignUp
                                    </NavLink>
                                </div>
                            )} */}
                            <NavLink
                                to="/account/login"
                                className=" px-3 rounded py-1 text-black bg-gray-200"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Login
                            </NavLink>
                        </div>
                    )}
                </div>
                <div className="hidden order-0 md:order-1 md:flex space-x-8">
                    {renderNavLinks()}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
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
            <div
                className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'
                    }`}
            >
                <div className="flex flex-col space-y-2 mt-4">{renderNavLinks(true)}</div>
            </div>
        </nav>
    );
};

export default MainNavbar;
