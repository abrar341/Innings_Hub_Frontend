import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import UserDropdown from '../../components/userDropdown';
import ClubRegistrationForm from '../../components/ClubRegistrationForm';  // Assuming you have this component

const ClubManager = () => {
    const { userInfo } = useSelector((state) => state.auth);  // Access userInfo from Redux
    const players = useSelector((state) => state.players.players);
    console.log(userInfo.club);

    // Define navigation cards for club manager dashboard
    const cards = [
        { to: 'dashboard', icon: 'fa-users', title: `Dashboard` },
        { to: 'players', icon: 'fa-users', title: `Players` },
        { to: 'teams', icon: 'fa-group', title: 'Teams' },
    ];

    // Class for active and inactive NavLink
    const navLinkClass = ({ isActive }) =>
        `px-6 py-2 rounded text-sm font-semibold transition-all duration-300 ease-in-out transform
        ${isActive
            ? 'text-white bg-blue-600 shadow-lg scale-105 hover:bg-blue-700'
            : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:scale-105 hover:shadow-md'
        }`;

    // If userInfo's club is null, render the registration form
    if (!userInfo?.club) {
        return <ClubRegistrationForm />;
    }

    // If the club registration status is pending, show a message
    if (userInfo.club.registrationStatus === 'pending') {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">
                    Your club registration status is Pending.
                </h2>
                <p className="text-gray-600">
                    Please wait for approval from the association before accessing the dashboard.
                </p>
            </div>
        );
    }

    // Otherwise, render the Club Manager dashboard
    return (
        <>
            <div className='flex items-center justify-between'>
                <Link to={"/"} className='underline text-blue-500 p-2'>see as regualr user</Link>
                <h2 className='text-3xl mt-6 font-bold mb-6 text-center text-gray-500'>
                    Club Manager
                </h2>
                <div className='z-30'>
                    <UserDropdown />
                </div>
            </div>
            <div className="px-2 flex justify-between gap-6 mx-auto my-5">
                <div className="flex justify-center items-center gap-6">
                    {cards.map((card, index) => (
                        <NavLink to={card.to} key={index} className={navLinkClass}>
                            <span>{card.title}</span>
                        </NavLink>
                    ))}
                </div>

            </div>
            <Outlet />
        </>
    );
};

export default ClubManager;
