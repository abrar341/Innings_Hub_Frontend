import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MatchCard1 from '../Match/MatchCard';
import { useGetAllMatchesQuery } from '../../slices/match/matchApiSlice';
import { MatchCard1LoadingSkeleton } from '../AdminPages/Competitions/Tournaments/SingleTournament.jsx/Matches';

const MatchesLayout = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const statusStyles = {
        live: 'bg-red-600 w-16 text-center text-white animate-blink', // Blinking effect for live matches
        scheduled: 'bg-blue-500 text-white',
        completed: 'bg-gray-500 text-white',
    };

    const { data, isLoading } = useGetAllMatchesQuery();
    const matches = data?.data;

    const navigate = useNavigate();

    const handleButtonClick = (matchData) => {
        navigate(`/match/${matchData?._id}/innings`);
    };

    // Filter matches based on the active filter
    const filteredMatches = matches?.filter((match) => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'live') return match.status === 'live';
        if (activeFilter === 'schedules') return match.status === 'scheduled';
        if (activeFilter === 'results') return match.status === 'completed';
        return true;
    });

    return (
        <div className="container mx-auto p-4 pb-0 bg-gray-100 dark:bg-gray-900">
            <div className="flex gap-3 items-center mb-3 md:mb-2">
                <button
                    onClick={() => handleFilterClick('all')}
                    className={`text-sm font-medium py-2 px-4 rounded ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-200'}`}
                >
                    All
                </button>
                <button
                    onClick={() => handleFilterClick('live')}
                    className={`text-sm font-medium py-2 px-4 rounded ${activeFilter === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-200'}`}
                >
                    Live
                </button>
                <button
                    onClick={() => handleFilterClick('schedules')}
                    className={`text-sm font-medium py-2 px-4 rounded ${activeFilter === 'schedules' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-200'}`}
                >
                    Schedules
                </button>
                <button
                    onClick={() => handleFilterClick('results')}
                    className={`text-sm font-medium py-2 px-4 rounded ${activeFilter === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-200'}`}
                >
                    Results
                </button>
            </div>
            {isLoading && (
                <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <MatchCard1LoadingSkeleton key={index} />
                    ))}
                </div>
            )}
            {filteredMatches?.length === 0 ? (
                <div className='text-base font-semibold text-gray-600 dark:text-gray-300 p-4'>
                    No {activeFilter} matches found
                </div>
            ) : (
                <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMatches?.map((matchData) => (
                        <MatchCard1
                            key={matchData?._id}
                            id={matchData?._id}
                            handleButtonClick={handleButtonClick}
                            matchData={matchData}
                            statusStyles={statusStyles}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MatchesLayout;
