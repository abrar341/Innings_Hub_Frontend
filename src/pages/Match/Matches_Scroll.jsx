import React, { useRef, useState, useEffect } from 'react';
import Match_Card from './Match_Card';
import matchData from '../../data/matchData'

const Matches_Scroll = () => {
    const scrollContainerRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

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
                className="flex overflow-x-scroll space-x-1 mx-1 my-1  hide-scrollbar"
            >
                {matchData.map((match, index) => (
                    <Match_Card key={index} matchData={match} />
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
