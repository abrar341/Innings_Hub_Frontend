import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUsers, FaTrophy, FaAddressBook } from 'react-icons/fa'; // Import icons
import { Tooltip } from 'react-tooltip'; // For tooltips
import UserDropdown from '../../components/userDropdown';
import { LogOut } from 'lucide-react';
import { useLogoutMutation } from '../../slices/auth/usersApiSlice';
import { logout } from '../../slices/auth/authSlice';
import { clearPlayers } from '../../slices/clubManager/clubManagerSlice';
import { clearClubs } from '../../slices/admin/adminSlice';
import toast from 'react-hot-toast';

const ClubManagerDashboard = () => {
    const [logoutApiCall] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const club = userInfo?.club;
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setOpen(false);
        }
    };

    const logoutHandler = async () => {

        try {
            const res = await logoutApiCall().unwrap();
            console.log(res);

            dispatch(logout());
            dispatch(clearPlayers());
            dispatch(clearClubs());
            navigate('/');
            toast.success(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen">
            <header className="flex items-center justify-between bg-green-600 py-2 ">
                <button
                    className="w-12 z-50 rounded-full text-white"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
                <h2 className="text-3xl text-white font-extrabold text-center">{club?.clubName}</h2>
                <div className='z-30 mr-4 '>
                    <UserDropdown profile={"/club-manager/profile"} />
                </div>

            </header>

            <div className="flex relative">
                <nav
                    className={`flex justify-between max-h-[90vh] flex-col ${open ? 'w-64' : 'w-16'
                        } bg-white  h-screen p-4 overflow-y-auto hide-scrollbar duration-300 fixed md:relative top-15 left-0 z-40`}
                >
                    {window.innerWidth < 768 && open && (
                        <button
                            className="absolute -right-6 top-6 bg-red-200 p-1 rounded-full"
                            onClick={() => setOpen(!open)}
                        >
                            X
                        </button>
                    )}

                    <ul className="space-y-4">
                        {/* <li>
                            <Link
                                to="/club/details"
                                onClick={handleLinkClick}
                                className={`flex ${!open && 'justify-center'} items-center space-x-3 py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md`}
                            >
                                <div className="flex items-center">
                                    <FaAddressBook />

                                </div>
                                {open && <span>Club Details</span>}
                            </Link>
                        </li> */}

                        <li>
                            <Link
                                to="teams"
                                onClick={handleLinkClick}
                                className={`flex ${!open && 'justify-center'} items-center space-x-3 py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md`}                            >
                                <div className="flex items-center">
                                    <FaUsers />
                                </div>
                                {open && <span>Manage Teams</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="players"
                                onClick={handleLinkClick}
                                className={`flex ${!open && 'justify-center'} items-center space-x-3 py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md`}                            >
                                <div className="flex items-center">

                                    <FaTrophy />
                                </div>
                                {open && <span>Manage Players</span>}
                                {!open && (
                                    <Tooltip title="Manage Players" placement="right" />
                                )}
                            </Link>
                        </li>
                    </ul>
                    <button
                        type="button"
                        className={`text-gray-700 flex ${!open && 'justify-center'}  items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200`}
                        role="menuitem"
                        onClick={logoutHandler}
                    >
                        {/* <LogOut className="h-4 w-4" /> */}
                        {/* Logout Icon */}
                        <div className="flex items-center">

                            <LogOut className="h-4 w-4" />
                        </div>
                        {open && <span>Logout</span>}
                        {!open && (
                            <Tooltip title="Manage Players" placement="right" />
                        )}

                    </button>
                </nav>

                <main className="flex-1 border-l overflow-y-auto hide-scrollbar p-6 ml-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ClubManagerDashboard;
