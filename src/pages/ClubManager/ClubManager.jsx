import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import UserDropdown from '../../components/userDropdown';
import ClubRegistrationForm from '../../components/ClubRegistrationForm';  // Assuming you have this component
import toast from 'react-hot-toast';
import { setCredentials } from '../../slices/auth/authSlice';
import { useGetUserInfoQuery } from '../../slices/auth/usersApiSlice';
import { setPlayers } from '../../slices/clubManager/clubManagerSlice';
import { useGetClubPlayersQuery, useGetClubTeamsQuery } from '../../slices/club/clubApiSlice';
import { set_Team } from '../../slices/team/teamSlice';

const ClubManager = () => {
    const dispatch = useDispatch();
    // Define navigation cards for club manager dashboard
    const { userInfo } = useSelector((state) => state.auth);

    if (userInfo?.club) {
        const id = userInfo?.club._id
        console.log(id);

        const { data, isLoading: isLoadingPlayers } = useGetClubPlayersQuery(id);

        const { data: teams, isLoading, isError, error } = useGetClubTeamsQuery(id);
        console.log(teams);

        useEffect(() => {
            if (data) {
                dispatch(setPlayers({ data: data?.data }));
            }
            if (teams) {
                dispatch(set_Team({ data: teams?.data }));
            }
        }, [dispatch, data, teams, userInfo]);  // Access userInfo from Redux
    }

    const cards = [
        // { to: 'dashboard', icon: 'fa-users', title: `Dashboard` },
        // { to: 'players', icon: 'fa-users', title: `Players` },
        // { to: 'teams', icon: 'fa-group', title: 'Teams' },
        // { to: 'tournaments', icon: 'fa-group', title: 'Tournaments' },
    ];

    // Class for active and inactive NavLink
    const navLinkClass = ({ isActive }) =>
        `px-3 py-1  gap-3 text-sm font-semibold transition-all duration-300 ease-in-out transform
        ${isActive
            ? 'text-white bg-blue-600 rounded  border-blue-600 shadow-lg  '
            : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:scale-105 hover:shadow-md'
        }`;

    // Shared part that should render for everyone
    const sharedHeader = (
        <div >
        </div>
    );

    // Conditional rendering based on club registration status
    if (!userInfo?.club) {
        toast.dismiss();
        toast(
            "Oops! It looks like you haven’t registered a club yet. Please complete the club registration to get started.",
            {
                duration: 5000,
            }
        );
        return (
            < >
                <ClubRegistrationForm />
            </>
        );
    }
    if (userInfo?.club.registrationStatus === 'pending') {
        return (
            <>
                {sharedHeader}
                <div className="flex flex-col items-center justify-center h-[300px]">
                    <h2 className="text-2xl font-bold text-yellow-500 mb-4">
                        Your club registration status is Pending.
                    </h2>
                    <p className="text-gray-600">
                        Please wait for approval from the association before accessing the dashboard.
                    </p>
                </div>
            </>
        );
    }
    if (userInfo?.club.registrationStatus === 'rejected') {
        return (
            <>
                {sharedHeader}
                <div className="flex flex-col items-center justify-center h-[300px]">
                    <h2 className="text-2xl font-bold text-yellow-500 mb-4">
                        Your club registration application is rejected.
                    </h2>
                    <p className="text-gray-600">
                        Please review your application and submit again.
                    </p>
                </div>
            </>
        );
    }

    // Otherwise, render the Club Manager dashboard
    return (
        <>
            {sharedHeader}
            {/* <div className="px-2 py-2 border-b border-gray-300  flex justify-between gap-6 mx-auto my-2">
                <div className="flex justify-center items-center gap-6">
                    {cards.map((card, index) => (
                        <NavLink to={card.to} key={index} className={navLinkClass}>
                            <span className='text-base font-bold transition duration-300 ease-in group-hover:scale-102 group-hover:text-black'>{card.title}</span>
                        </NavLink>
                    ))}
                </div>
            </div> */}
            <Outlet />
        </>
    );
};

export default ClubManager;
