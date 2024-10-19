import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import TeamProfile from './TeamProfile'
import { useGetSingleTournamentDetailQuery } from '../../slices/tournament/tournamentApiSlice';
import { useGetSingleTeamDetailQuery } from '../../slices/team/teamApiSlice';
import teams from '../../data/teams';

const TeamProfileLayout = () => {
    const { id } = useParams();
    console.log(id);
    const { data, error, isLoading, refetch } = useGetSingleTeamDetailQuery(id);
    console.log(data);

    const [team, setTeam] = useState();
    console.log(team);

    useEffect(() => {
        if (data) {
            setTeam(data?.data); // Assuming that the API response structure has the team data under `data.data`
        }
    }, [data]);



    return (
        <>
            <div className="relative overflow-hidden flex justify-between items-center border-gray-300 bg-white px-6 py-4 shadow-md">
                {/* Team Name with subtle animation */}
                <div
                    className="text-4xl sm:text-5xl text-gray-800 font-extrabold cursor-pointer transition-transform duration-300 hover:scale-105 hover:text-blue-600"
                    title="Team Name"
                >
                    {team?.teamName}
                </div>

                {/* Interactive Team Logo with smooth hover effects */}
                <div className="relative group">
                    <img
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-gray-300 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[15deg] group-hover:shadow-lg"
                        src={team?.teamLogo}
                        alt={`${team?.teamName} Logo`}
                        title={`${team?.teamName} Logo`}
                    />

                    {/* Glowing effect on hover */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-blue-500/40"></div>

                    {/* Subtle pulsing ring effect */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse border-blue-400"></div>
                </div>

                {/* Floating effect for the entire container */}
                <div className="absolute inset-0 rounded-lg transition-transform duration-500 group-hover:translate-y-[-5px] group-hover:shadow-xl"></div>
            </div>






            <div className=" pt-4 pb-0 flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                {[
                    { to: 'players', label: 'PLAYERS' },
                    { to: 'stats', label: 'STATS' },
                    { to: 'matches', label: 'MATCHES' },
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
            <Outlet context={team} />
        </>
    )
}

export default TeamProfileLayout
