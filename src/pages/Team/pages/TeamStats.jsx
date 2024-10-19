import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// Single Stat Card Component with hover effect
const StatCard = ({ title, value, color }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className={`mt-4 text-4xl font-bold ${color}`}>{value}</p>
    </div>
);

// Component for listing tournaments where the team was champion

const ChampionTournaments = ({ tournaments }) => {

    return (
        <div className="bg-white rounded-lg ">
            <h3 className="text-2xl font-extrabold text-gray-700 mb-4"> Champion</h3>
            <ul className="list-disc list-inside grid grid-cols-2 gap-2 text-gray-700">
                <>
                    {
                        tournaments?.length === 0 ? <div className=' text-base '>Not Champion in Event Yet.</div> :
                            tournaments.map((tournament, index) => (
                                <li key={index} className="mb-4 list-none	">
                                    <div className="bg-gray-100 p-4 list-none rounded-lg shadow hover:bg-blue-50 transition duration-200 ease-in-out">
                                        <span className="font-semibold text-lg text-gray-800 hover:text-blue-600">
                                            {tournament.name}
                                        </span>
                                        <span className="text-gray-500 text-sm"> - {tournament.year}</span>
                                    </div>
                                </li>

                            ))}
                </>
            </ul>
        </div>
    );
};



const TeamStats = () => {
    // Dummy Data    
    const context = useOutletContext();
    const teamStats = context?.stats;
    console.log(teamStats);

    // Dummy Champion Tournaments Data
    const championTournaments = [
        // { name: "Premier League", year: 2021 },
        // { name: "National Cup", year: 2022 },
        // { name: "International Champions Trophy", year: 2023 },
    ];

    return (
        <div className="container mx-auto p-8 space-y-8">

            {/* Stats Grid */}            <h3 className="text-2xl font-extrabold text-gray-700 mb-4"> Matches Stats</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="Matches Played" value={teamStats?.matches} color="text-blue-500" />
                <StatCard title="Wins" value={teamStats?.wins} color="text-green-500" />
                <StatCard title="Losses" value={teamStats?.loss} color="text-red-500" />
                <StatCard title="Draws" value={teamStats?.draws} color="text-yellow-500" />
            </div>

            {/* Champion Tournaments Section */}
            <ChampionTournaments tournaments={championTournaments} />


        </div>
    );
};

export default TeamStats;
