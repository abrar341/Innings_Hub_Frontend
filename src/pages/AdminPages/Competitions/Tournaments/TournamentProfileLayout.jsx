import React from 'react'
import TournamentProfileHeader from './SingleTournament.jsx/TournamentProfileHeader'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useGetSingleTournamentDetailQuery } from '../../../../slices/tournament/tournamentApiSlice'

const TournamentProfileLayout = () => {
    //single tournament api call

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
            <TournamentProfileHeader tournament={tournament} />
            <div className=" pt-4  flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                {[
                    { to: 'draws-and-rounds', label: 'DRAWS AND ROUNDS' },
                    { to: 'squads', label: 'SQUADS' },
                    { to: 'point-table', label: 'OFFICALS' },
                    { to: 'point-table', label: 'MATCHES' },
                    { to: 'point-table', label: 'RULES' },
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
            <Outlet />
        </>
    )
}

export default TournamentProfileLayout
