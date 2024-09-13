import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/auth/usersApiSlice';
import { logout } from '../slices/auth/authSlice';
import { toast } from 'react-hot-toast';

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const dropdownRef = useRef(null);

    const logoutHandler = async () => {
        try {
            const res = await logoutApiCall().unwrap();
            dispatch(logout());
            setIsOpen(false);
            toast.success(res.message);
            navigate('/account/login');
        } catch (err) {
            console.error(err);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex  gap-0 cursor-pointer">
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
                    className="h-8 w-8 rounded-full border"
                    alt="User Avatar"
                />
                <button
                    type="button"
                    className="text-sm font-medium text-black focus:outline-none"
                    id="username"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    <svg
                        className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="username"
                >
                    <div className="py-1" role="none">
                        <Link
                            to="/profile"
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                            role="menuitem"
                        >
                            Profile
                        </Link>
                        <button
                            type="button"
                            className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                            role="menuitem"
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
