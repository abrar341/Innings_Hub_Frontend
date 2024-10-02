import React, { useRef, useState, useEffect } from 'react';
import Match_Card from './Match_Card';
import { useGetAllMatchesQuery } from '../../slices/match/matchApiSlice';
import { convertTo12HourFormat, formatDate } from '../../utils/dateFormatter';
import { Link, useNavigate } from 'react-router-dom';
// import matchData from '../../data/matchData'

const Matches_Scroll = () => {
    const { data } = useGetAllMatchesQuery();
    console.log(data);
    const matches = data?.data;
    console.log(matches);
    const scrollContainerRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (matchData) => {
        // Navigate to the desired route with matchId as a param
        navigate(`/all-matches/scorecard/${matchData?._id}`);
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
                {matches?.map((matchData) => (
                    <div className=" min-w-[400px] gap-10 overflow-hidden flex-shrink-0 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded shadow-lg transform transition-transform duration-300 ">
                        {/* Card Front */}
                        <div className="px-4 py-2">
                            <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
                                <div className="text-gray-600 text-xs truncate">{formatDate(matchData.date)}  </div>
                                <div className='text-gray-600 text-xs truncate'>
                                    {matchData.tournament?.name}-{matchData.tournament?.season}
                                </div>
                                <div className={`text-xs bg-gray-100 border p-1 rounded`}>
                                    {matchData?.status}
                                </div>
                            </div>

                            <div className="mt-4 bg-white space-y-4">
                                {matchData.teams?.map((team, index) => (
                                    <div className="flex items-center space-x-3" key={index}>
                                        <img
                                            className="w-10 "
                                            src={team.teamLogo}
                                            alt={team.teamName}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                                            }}
                                        />
                                        <div className="flex-1">
                                            <span className="text-sm font-semibold text-gray-800">{team.shortName}</span>
                                        </div>
                                        {/* <div className="text-right">
                                             <div className="text-sm font-bold text-gray-900">{team.teamScore}</div>
                                             <div className="text-xs text-gray-600">{team.teamOvers}</div>
                                         </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Match Status */}
                        <div className='bg-gray-100 p-3 text-center text-gray-500 font-semibold text-xs border-t border-gray-200'>
                            {
                                matchData.status === 'scheduled' ? (<>
                                    {convertTo12HourFormat(matchData.time)}
                                </>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                        {/* Action Buttons */}
                        <div className=" flex flex-col gap-3 justify-center bottom-0 bg-gray-100 p-2   items-center border-t border-gray-300">
                            <button
                                onClick={() => handleButtonClick(matchData)}
                                className="text-xs font-semibold text-gray-700 border border-gray-300 bg-white rounded px-3 py-2 inline-flex items-center space-x-1 transition-colors hover:bg-gray-200"
                            >
                                <span>Match centre</span>
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
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
