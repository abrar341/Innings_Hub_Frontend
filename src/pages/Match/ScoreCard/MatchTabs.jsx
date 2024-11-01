import React from 'react';
import { NavLink } from 'react-router-dom';

const MatchTabs = () => {
    const tabClasses = ({ isActive }) =>
        `flex justify-center pt-4 pb-2 text-base font-medium transition-colors duration-300 ${isActive
            ? 'text-gray-900 dark:text-red-200 border-b-4 border-blue-600 dark:border-blue-400'
            : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
        }`;

    return (
        <div className="mx-auto sticky top-14 bg-white dark:bg-gray-800 flex flex-row items-center w-full gap-4 overflow-x-auto border-b border-gray-300 dark:border-gray-700 scrollbar-hide">
            <div className="shrink-0">
                <NavLink
                    to="/all-matches/scorecard/summery"
                    className={tabClasses}
                >
                    Summary
                </NavLink>
            </div>
            <div className="shrink-0">
                <NavLink
                    to="/all-matches/scorecard/innings"
                    className={tabClasses}
                >
                    Scorecard
                </NavLink>
            </div>
            <div className="shrink-0">
                <NavLink
                    to="/all-matches/scorecard/overs"
                    className={tabClasses}
                >
                    Overs
                </NavLink>
            </div>

            <div className="shrink-0">
                <NavLink
                    to="/all-matches/scorecard/playing-eleven"
                    className={tabClasses}
                >
                    playing11
                </NavLink>
            </div>
            <div className="shrink-0">
                <NavLink
                    to="/all-matches/scorecard/match-info"
                    className={tabClasses}
                >
                    Info
                </NavLink>
            </div>
        </div>
    );
};

export default MatchTabs;
