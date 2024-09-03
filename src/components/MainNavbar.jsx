import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDropdown from './userDropdown';
import LoginDialog from './LoginDialog';

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
        `flex items-center font-semibold  text-black text-sm hover:border-b border-black px-3 py-1  transition duration-300 ease-in-out ${isActive ? 'text-black border-b border-gray-800 ' : ''
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
        <nav className="bg-white p-4 md:p-3 sticky top-0 z-10 shadow-lg">
            <div className="container mx-auto flex justify-between gap-3 items-center">
                <div className="order-1 md:order-0 text-black text-2xl font-semibold tracking-wide">
                    CRICKET
                </div>
                <div className="order-2 flex items-center">
                    {userInfo ? (
                        <UserDropdown />
                    ) : (
                        <div className="relative flex items-center">
                            <LoginDialog />
                        </div>
                    )}
                </div>
                <div className="hidden order-0 md:order-1 md:flex space-x-8">
                    {renderNavLinks()}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-black focus:outline-none">
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
