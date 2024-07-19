import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import TeamProfile from './TeamProfile'

const TeamProfileLayout = () => {
    return (
        <>
            <TeamProfile />
            <div className=" pt-4 pb-0 flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                {[
                    { to: 'players', label: 'PLAYERS' },
                    { to: 'stats', label: 'STATS' },
                    { to: 'squad', label: 'SQUAD' },
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
            <Outlet />
        </>
    )
}

export default TeamProfileLayout
