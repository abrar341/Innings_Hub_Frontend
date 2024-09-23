import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import SingleSeriesProfile from './SeriesProfile'
import { useGetSingleTournamentDetailQuery } from '../../slices/tournament/tournamentApiSlice';
import { formatDateToYMD } from '../../utils/dateUtils';
import { formatDate } from '../../utils/dateFormatter';
import { FaCalendarAlt } from 'react-icons/fa';

const SeriesPageLayout = () => {

    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleTournamentDetailQuery(id);
    const tournament = data?.data
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>error...</div>;
    }
    return (
        <>
            <div className="hover:cursor-pointer transition duration-300 ease-in group border-t border-gray-300 overflow-hidden">
                <div className=" container py-3">
                    <div className="flex flex-wrap items-center">
                        <div className="p-4 sm:w-7/12 w-full flex flex-col sm:flex-row  items-center mb-3 sm:mb-0">
                            <img
                                className="rounded-full bg-gray-100 mr-4"
                                height="120"
                                width="120"
                                src="https://d2l63a9diffym2.cloudfront.net/competition-logos/m5cPcc1jaBhvblCerpQeIX6WJ1W78lNicPKLPl2G.jpg"
                                alt="Desert Cricket Champions League Edition-2 2023-2024"
                            />
                            <div className="text-black ">
                                <h3 className="text-left text-2xl font-bold mb-3">
                                    {tournament?.name}
                                </h3>
                                <p className="text-left">
                                    <span className="inline-flex text-sm  items-center">
                                        <FaCalendarAlt className="text-green-500 mr-2" />

                                        {formatDate(tournament?.startDate)} -
                                        <FaCalendarAlt className="text-green-500 mr-2" />

                                        {formatDate(tournament?.endDate)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <div className=" pt-4 sticky top-14 bg-white z-30 border-t flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                    {[
                        { to: 'fixtures', label: 'FIXTURES' },
                        { to: 'point-table', label: 'POINT TABLE' },
                    ].map(({ to, label }) => (
                        <div className="shrink-0  relative group" key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex justify-center pb-1 text-sm font-bold text-base  transition-colors duration-300 ease-in-out justify-end  ${isActive
                                        ? 'text-gray-700 border-b-2  border-customDarkBlue'
                                        : 'text-gray-700 border-b-2  border-transparent'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </div>
                    ))}
                </div>
                <Outlet context={tournament} />
            </div>
        </>
    )
}

export default SeriesPageLayout
