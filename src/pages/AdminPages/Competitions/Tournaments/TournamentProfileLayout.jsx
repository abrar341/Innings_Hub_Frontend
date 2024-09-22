import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useGetSingleTournamentDetailQuery } from '../../../../slices/tournament/tournamentApiSlice'
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

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
            <div className="container-fluid  p-0 m-0 py-5 bg-opacity-75">
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

                                        {format(Date(tournament?.startDate), "yyyy-MM-dd")} -
                                        <FaCalendarAlt className="text-green-500 mr-2" />

                                        {format(Date(tournament?.endDate), "yyyy-MM-dd")}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >            <div className=" pt-4  flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                {[
                    { to: 'squads', label: 'SQUADS/TEAMS' },
                    { to: 'matches', label: 'MATCHES' },
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
