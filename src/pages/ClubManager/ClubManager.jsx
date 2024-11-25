import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import ClubRegistrationForm from '../../components/ClubRegistrationForm';  // Assuming you have this component
import toast from 'react-hot-toast';
import { setPlayers } from '../../slices/clubManager/clubManagerSlice';
import { useGetClubPlayersQuery, useGetClubTeamsQuery } from '../../slices/club/clubApiSlice';
import { set_Team } from '../../slices/team/teamSlice';

const ClubManager = () => {
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false); // Control form visibility


    // Get user information from Redux
    const { userInfo } = useSelector((state) => state.auth);
    const clubId = userInfo?.club?._id;
    console.log(userInfo?.club);


    // Fetch players and teams only if clubId exists
    const { data: playersData, isLoading: isLoadingPlayers } = useGetClubPlayersQuery(clubId, { skip: !clubId });
    const { data: teamsData, isLoading: isLoadingTeams } = useGetClubTeamsQuery(clubId, { skip: !clubId });

    // Use effect to dispatch data to the store
    useEffect(() => {
        if (playersData) {
            dispatch(setPlayers({ data: playersData?.data }));
        }
        if (teamsData) {
            dispatch(set_Team({ data: teamsData?.data }));
        }
    }, [dispatch, playersData, teamsData]);

    const handleReviewClick = () => {
        setOpenForm(true);  // Open the form when review button is clicked
        // dispatch(setReviewData(userInfo?.club));
    };
    // Class for active and inactive NavLink
    const navLinkClass = ({ isActive }) =>
        `px-3 py-1 gap-3 text-sm font-semibold transition-all duration-300 ease-in-out transform
        ${isActive
            ? 'text-white bg-blue-600 rounded  border-blue-600 shadow-lg'
            : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:scale-105 hover:shadow-md'
        }`;

    // Shared part that should render for everyone
    const sharedHeader = (
        <div>
            {/* Shared header content */}
        </div>
    );

    // Handle unregistered club
    if (!userInfo?.club || openForm) {
        // {
        //     toast.dismiss();
        // }
        //  toast("Oops! It looks like you haven’t registered a club yet. Please complete the club registration to get started.", {
        //     duration: 5000,
        // });
        return (
            <>
                <ClubRegistrationForm reviewData={userInfo?.club} />
            </>
        );
    }

    // Handle pending club registration status
    // Handle pending club registration status
    if (userInfo?.club.registrationStatus === 'pending' || !userInfo?.club.registrationStatus) {
        return (
            <>
                {sharedHeader}
                <div className="flex flex-col items-center justify-center h-[300px]">
                    <div className="bg-yellow-50 dark:bg-gray-800 shadow-lg border border-yellow-200 dark:border-gray-700 rounded-lg p-6 max-w-lg text-center">
                        <h2 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mb-4">
                            Your club registration status is Pending.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Please wait for approval from the association before accessing the control panel.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Need assistance? Contact support for further information.
                        </p>
                    </div>
                </div>
            </>
        );
    }



    // Handle rejected club registration status
    // Handle rejected club registration status
    // Handle rejected club registration status
    if (userInfo?.club.registrationStatus === 'rejected') {
        return (
            <>
                {sharedHeader}
                <div className="flex flex-col items-center justify-center h-[300px] mt-4">
                    <div className="bg-red-50 dark:bg-gray-800 shadow-md border border-red-300 dark:border-gray-700 rounded-lg p-8 max-w-lg text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-red-500 dark:text-red-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                            Application Rejected
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Unfortunately, your club registration application was rejected.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                            Reason: <span className="font-medium">{userInfo?.club?.rejectionReason}</span>
                        </p>
                        <button
                            onClick={handleReviewClick}
                            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition"
                        >
                            Review and Resubmit
                        </button>
                    </div>
                </div>
            </>
        );
    }



    // else {
    //     navigate('/dashboard');
    // }
    // Otherwise, render the Club Manager dashboard
    return (
        <>

            <Outlet />
        </>
    );
};

export default ClubManager;
