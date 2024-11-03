import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// Single Stat Card Component with hover effect
const StatCard = ({ title, value, color }) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        <p className={`mt-4 text-4xl font-bold ${color}`}>{value}</p>
    </div>
);

// Component for listing tournaments where the team was champion
const ChampionTournaments = ({ tournaments }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-2xl font-extrabold text-gray-700 dark:text-gray-200 mb-4">Champion</h3>
            <ul className="list-disc list-inside grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                <>
                    {tournaments?.length === 0 ? (
                        <div className="text-base dark:text-gray-400">Not Champion in Event Yet.</div>
                    ) : (
                        tournaments?.map((tournament, index) => (
                            <li key={index} className="mb-4 list-none">
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-blue-600 transition duration-200 ease-in-out">
                                    <span className="font-semibold text-lg text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300">
                                        {tournament.name}
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-400 font-semibold text-base"> S-{tournament.season}</span>
                                </div>
                            </li>
                        ))
                    )}
                </>
            </ul>
        </div>
    );
};

const TeamStats = () => {
    // Dummy Data    
    const context = useOutletContext();
    const teamStats = context?.stats;
    console.log("context", context?.tournamentsWon);

    // Dummy Champion Tournaments Data
    const championTournaments = [
        // { name: "Premier League", year: 2021 },
        // { name: "National Cup", year: 2022 },
        // { name: "International Champions Trophy", year: 2023 },
    ];

    return (
        <div className="container mx-auto p-4 sm:p-6 space-y-6">

            {/* Stats Grid */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-700 dark:text-gray-200 mb-4">Matches Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="Matches Played" value={teamStats?.matches} color="text-blue-500 dark:text-blue-400" />
                <StatCard title="Wins" value={teamStats?.wins} color="text-green-500 dark:text-green-400" />
                <StatCard title="Losses" value={teamStats?.loss} color="text-red-500 dark:text-red-400" />
                <StatCard title="Draws" value={teamStats?.draws} color="text-yellow-500 dark:text-yellow-400" />
            </div>

            {/* Champion Tournaments Section */}
            <ChampionTournaments tournaments={context?.tournamentsWon} />
        </div>
    );
};

export default TeamStats;
