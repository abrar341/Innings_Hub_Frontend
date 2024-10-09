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
    const [team, setTeam] = useState();
    console.log(team);

    useEffect(() => {
        if (data) {
            setTeam(data?.data); // Assuming that the API response structure has the team data under `data.data`
        }
    }, [data]);



    return (
        <>
            <div className="overflow-hidden border-gray-300 border-b ">
                <div className="grid grid-cols-1 justify-between items-start gap-1">
                    <div className="border-t border-gray-300">
                        <div className="flex text-xl font-bold justify-between text-white p-4">
                            <div className="text-2xl  my-auto font-bold text-black">{team?.teamName}</div>
                            <img className="h-10  border-gray-300"
                                src={team?.teamLogo} />
                        </div>
                    </div>
                </div>
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
