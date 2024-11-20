import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useGetSingleTournamentDetailQuery } from '../../slices/tournament/tournamentApiSlice';
import { formatDateToYMD } from '../../utils/dateUtils';
import { formatDate } from '../../utils/dateFormatter';
import { FaCalendarAlt } from 'react-icons/fa';

const SeriesPageLayout = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleTournamentDetailQuery(id);
    const tournament = data?.data;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-lg font-bold text-gray-600 animate-pulse">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-lg font-bold text-red-600">An error occurred. Please try again.</p>
            </div>
        );
    }

    return (
        <>
            {/* Header Section */}
            <div className="hover:cursor-pointer transition  duration-300 ease-in group border-t border-gray-300 overflow-hidden">
                <div className="container py-4">
                    <div className="flex flex-wrap items-center">
                        <div className="p-4 flex justify-between sm:w-7/12 w-full flex-col sm:flex-row items-center mb-3 sm:mb-0">
                            <div className="">
                                <h3 className="text-left text-2xl font-bold mb-3">
                                    {tournament?.name}
                                </h3>
                                <p className="text-left">
                                    <span className="inline-flex text-sm items-center">
                                        <FaCalendarAlt className="text-green-500 mr-2" />
                                        {formatDate(tournament?.startDate)} -
                                        <FaCalendarAlt className="text-green-500 mx-2" />
                                        {formatDate(tournament?.endDate)}
                                    </span>
                                </p>
                            </div>

                            {/* Champion Section */}
                            {tournament?.winner && (
                                <div className="flex  items-center justify-center text-lg font-extrabold uppercase  dark:text-gray-100  p-4 transition-transform duration-300">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={tournament?.winner?.teamLogo || '/default-logo.png'}
                                            alt="Champion Logo"
                                            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                                        />
                                        <div className="flex flex-col items-start ">
                                            <span className="flex items-center gap-2">
                                                <span>🏆</span>
                                                Champion:
                                            </span>
                                            <span className="text-xl font-bold">{tournament?.winner?.teamName}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div>
                <div className="pt-4 sticky top-14 bg-white dark:bg-gray-800 dark:text-gray-100 z-30 border-t flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                    {[
                        { to: 'fixtures', label: 'FIXTURES' },
                        { to: 'point-table', label: 'POINT TABLE' },
                        { to: 'squads', label: 'SQUADS/TEAMS' },
                    ].map(({ to, label }) => (
                        <div className="shrink-0 relative group" key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex justify-center pb-1 text-sm font-bold transition-colors duration-300 ease-in-out ${isActive
                                        ? 'text-gray-700 dark:text-gray-100 border-b-2 border-customDarkBlue dark:border-white'
                                        : 'text-gray-700 dark:text-gray-100 border-b-2 border-transparent'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </div>
                    ))}
                </div>

                {/* Outlet for Nested Routes */}
                <Outlet context={tournament} />
            </div>
        </>
    );
};

export default SeriesPageLayout;
