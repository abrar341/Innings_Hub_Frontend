import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SingleSeriesProfile from './SeriesProfile'

const SeriesPageLayout = () => {
    return (
        <>
            <SingleSeriesProfile />
            <div>
                <div className=" pt-4  flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                    {[
                        { to: 'fixtures', label: 'FIXTURES' },
                        { to: 'results', label: 'RESULTS' },
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
                <Outlet />
            </div>
        </>
    )
}

export default SeriesPageLayout
