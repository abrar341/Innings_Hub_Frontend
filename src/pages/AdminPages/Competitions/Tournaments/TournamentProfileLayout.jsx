import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useGetSingleTournamentDetailQuery } from '../../../../slices/tournament/tournamentApiSlice'
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import { formatDate } from '../../../../utils/dateFormatter';

const TournamentProfileLayout = () => {
    //single tournament api call

    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleTournamentDetailQuery(id);
    const tournament = data?.data
    console.log(tournament?._id);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>error...</div>;
    }

    return (
        <>
            <div className="container-fluid p-0 m-0 py-5 bg-opacity-75">
                <div className="flex justify-center flex-wrap items-center">
                    <div className="p-4 w-full flex justify-center sm:flex-row  items-center mb-0 border-b border-gray-400 mt-2 sm:mb-0">
                        {/* <img
                                className="rounded-full bg-gray-100 mr-4"
                                height="120"
                                width="120"
                                src="https://d2l63a9diffym2.cloudfront.net/competition-logos/m5cPcc1jaBhvblCerpQeIX6WJ1W78lNicPKLPl2G.jpg"
                                alt="Desert Cricket Champions League Edition-2 2023-2024"
                            /> */}
                        <div className="  ">
                            <h3 className="text-left text-4xl uppercase text-gray-800  font-extrabold mb-3">
                                {tournament?.name}
                            </h3>
                            <p className="text-left">
                                <span className="inline-flex text-sm gap-1  items-center">
                                    <FaCalendarAlt className="text-green-500 mr-2" />

                                    {formatDate(tournament.startDate)} -
                                    <FaCalendarAlt className="text-green-500 mr-2" />

                                    {formatDate(tournament.endDate)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
            <div className="flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                {[
                    { to: 'squads', label: 'SQUADS/TEAMS' },
                    { to: 'matches', label: 'MATCHES' },
                    { to: 'draws', label: 'DRAWS/ROUNDS' },
                    { to: 'point-table', label: 'POINT-TABLE' },
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
        </>
    )
}

export default TournamentProfileLayout
