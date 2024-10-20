import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/auth/usersApiSlice';
import { logout } from '../slices/auth/authSlice';
import { toast } from 'react-hot-toast';
import { User, LogOut, ChevronUp, ChevronDown } from 'lucide-react';  // Import the icons from lucide-react
import { clearPlayers } from '../slices/clubManager/clubManagerSlice';
import { clearClubs } from '../slices/admin/adminSlice';

const UserDropdown = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const dropdownRef = useRef(null);

    const logoutHandler = async () => {
        try {
            const res = await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(clearPlayers());
            dispatch(clearClubs());
            setIsOpen(false);
            navigate('/');
            toast.success(res.message);
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
        <div className="z-100 relative inline-block text-left" ref={dropdownRef}>
            <div
                className={`flex items-center gap-2  bg-gray-50 cursor-pointer p-2 hover:bg-gray-300 rounded transition-all duration-300`}
                onClick={toggleDropdown}
            >
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
                    className="h-8 w-8 rounded-full border hover:scale-105 transition-transform duration-300"
                    alt="User Avatar"
                />
                <ChevronDown className={` transition-transform duration-300 h-4 font-bold ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 transform opacity-0 scale-95"
                    style={{ opacity: isOpen ? '1' : '0', transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="username"
                >
                    <div className="py-1" role="none">
                        <Link
                            to={`/${userInfo?.role}/profile`}
                            className="text-gray-700 flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                            role="menuitem"
                        >
                            <User className="h-4 w-4" />  {/* Profile Icon */}
                            Profile
                        </Link>

                        <button
                            type="button"
                            className="text-gray-700 flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                            role="menuitem"
                            onClick={logoutHandler}
                        >
                            <LogOut className="h-4 w-4" />
                            {/* Logout Icon */}
                            Logout
                        </button>

                        {
                            userInfo?.role === 'admin' || userInfo?.role === 'club-manager' && <Link to={"/"} className='text-gray-700 flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200'>See as Normal User</Link>
                        }
                        {
                            userInfo?.role === 'admin' ? <Link to={"/admin"} className='text-gray-700 flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200'>Control Panel</Link> : userInfo?.role === 'club-manager' && <Link to={"/club-manager/dashboard"} className='text-gray-700 flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200'>Control Panel</Link>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
