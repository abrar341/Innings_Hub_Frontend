import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const MatchesLayout = () => {
    return (
        <>
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Link to='live-scores' className="text-start sm:text-center rounded transition duration-300 ease-in flex-1 text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Live Scores
                    </Link>
                    <Link to='schedules' className="text-start sm:text-center rounded transition duration-300 ease-in flex-1 text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Schedules
                    </Link>
                    <Link to='results' className=" text-start sm:text-center rounded transition duration-300 ease-in flex-1 text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Resultd
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default MatchesLayout
