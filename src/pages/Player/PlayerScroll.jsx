import React, { useRef, useState, useEffect } from 'react';
import { useAllPlayersQuery, useGetRandomPlayersQuery } from '../../slices/player/playerApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import UserPlayerCard from './UserPlayerCard';


const PlayerCardLoadingSkeleton = () => (
    <div className="border rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out px-2 pt-2 pb-5 cursor-pointer">
        {/* Team Logo and Player Name Skeleton */}
        <div className="flex justify-between items-center p-3 py-2 rounded-t-lg bg-gray-100 dark:bg-gray-600 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-500" />
            <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-500 rounded" />
        </div>

        {/* Player Image Skeleton */}
        <div className="p-2 text-center">
            <div className="h-24 w-24 md:h-28 md:w-28 rounded-full mx-auto bg-gray-300 dark:bg-gray-500 border-2" />
            <div className="mt-3 flex items-center justify-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-500 rounded" />
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-500 rounded" />
            </div>
        </div>

        {/* Placeholder for Hover Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 pointer-events-none rounded-xl"></div>
    </div>
);

const PlayerScroll = () => {
    const { data, isLoading, isError, error } = useGetRandomPlayersQuery();
    const players = data?.data || [];
    const scrollContainerRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (playerData) => {
        navigate(`/player/${playerData?._id}/profile`);
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
        setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
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
        return (
            <div className="relative max-w-full overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-scroll space-x-1 mx-1 hide-scrollbar"
                >
                    {Array.from({ length: 2 }).map((_, index) => (
                        <PlayerCardLoadingSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative max-w-full overflow-hidden p-4 ">
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-extrabold'>
                    Players
                </h1>
                <Link to={'players'} className='hover:bg-gray-100 border px-4 py-2 border-gray-400 rounded'>
                    View All players
                </Link>
            </div>
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
                className="flex gap-4 overflow-x-scroll hide-scrollbar my-3 "
            >
                {players?.map((playerData) => (
                    <UserPlayerCard
                        key={playerData?._id}
                        player={playerData}
                    />
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

export default PlayerScroll;
