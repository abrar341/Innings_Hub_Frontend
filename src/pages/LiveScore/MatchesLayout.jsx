import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MatchCard1 from '../Match/MatchCard';
import { useGetAllMatchesQuery } from '../../slices/match/matchApiSlice';

const MatchesLayout = ({ }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const statusStyles = {
        live: 'bg-red-600 w-16 text-center text-white animate-blink', // Blinking effect for live matches
        scheduled: 'bg-blue-500 text-white',
        completed: 'bg-gray-500 text-white',
    };
    const { data } = useGetAllMatchesQuery();
    console.log(data);
    const matches = data?.data;
    console.log(matches);

    const navigate = useNavigate();

    const handleButtonClick = (matchData) => {
        // Navigate to the desired route with matchId as a param
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
        <div className="container bg-gray-100 mx-auto p-4 pb-0 bg-gray-50">
            <div className="flex items-center mb-3 md:mb-2">
                <button
                    onClick={() => handleFilterClick('all')}
                    className={`text-sm font-medium py-2 px-4 rounded ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
                >
                    All
                </button>
                <button
                    onClick={() => handleFilterClick('live')}
                    className={`text-sm font-medium py-2 px-4 rounded ${activeFilter === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
                >
                    Live
                </button>
                <button
                    onClick={() => handleFilterClick('schedules')}
                    className={`text-sm font-medium py-2 px-4 rounded ${activeFilter === 'schedules' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
                >
                    Schedules
                </button>
                <button
                    onClick={() => handleFilterClick('results')}
                    className={`text-sm font-medium py-2 px-4 rounded ${activeFilter === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
                >
                    Results
                </button>
            </div>

            {/* Render the filtered matches list */}
            <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
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

            {/* Outlet for nested routes if needed */}
            {/* <Outlet /> */}
        </div>
    );
};

export default MatchesLayout;
