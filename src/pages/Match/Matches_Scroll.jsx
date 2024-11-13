import React, { useRef, useState, useEffect } from 'react';
import Match_Card from './Match_Card';
import { useGetAllMatchesQuery, useGetParticularMatchesQuery } from '../../slices/match/matchApiSlice';
import { convertTo12HourFormat, formatDate } from '../../utils/dateFormatter';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import MatchCard1 from './MatchCard';
import { MatchCard1LoadingSkeleton } from '../AdminPages/Competitions/Tournaments/SingleTournament.jsx/Matches';
// import matchData from '../../data/matchData'

const Matches_Scroll = () => {


    const statusStyles = {
        live: 'bg-red-600 w-16 text-center text-white animate-blink', // Blinking effect for live matches
        scheduled: 'bg-blue-500 text-white',
        completed: 'bg-gray-500 text-white',
    };
    const { data, isLoading } = useGetParticularMatchesQuery();
    console.log(data);
    const matches = data?.data;
    console.log(matches);
    const scrollContainerRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (matchData) => {
        // Navigate to the desired route with matchId as a param
        navigate(`/match/${matchData?._id}/innings`);
    };

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -200,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 200,
            behavior: 'smooth',
        });
    };

    const checkScrollPosition = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setAtStart(scrollLeft === 0);
        setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // Adjust for precision
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        container.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition();

        return () => {
            container.removeEventListener('scroll', checkScrollPosition);
        };
    }, []);

    if (isLoading) {
        // Return loading skeletons when the data is loading
        return (
            <div className="relative max-w-full overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-scroll space-x-1 mx-1 my-1 hide-scrollbar"
                >
                    {Array.from({ length: 2 }).map((_, index) => (
                        <MatchCard1LoadingSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="relative max-w-full overflow-hidden">

            {!atStart && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10 hover:bg-gray-300 active:bg-gray-400 transition duration-150 ease-in-out focus:outline-none hidden sm:block"
                >
                    <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            )}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-scroll space-x-1 mx-1 my-1 gap-1 py-1 hide-scrollbar"
            >
                {matches?.map((matchData) => (
                    <MatchCard1 id={matchData?._id} handleButtonClick={handleButtonClick} matchData={matchData} statusStyles={statusStyles} />
                ))}
            </div>
            {!atEnd && (
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10 hover:bg-gray-300 active:bg-gray-400 transition duration-150 ease-in-out focus:outline-none hidden sm:block"
                >
                    <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>

                    </svg>
                </button>
            )}
        </div>
    );
};

export default Matches_Scroll;
