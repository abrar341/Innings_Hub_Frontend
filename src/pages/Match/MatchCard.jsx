import React, { useState, useEffect } from 'react';
import { formatDateToYMD, convertTo12HourFormat } from '../../utils/dateUtils';
import clsx from 'clsx';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8000');
const MatchCard1 = ({ id, matchData, statusStyles, handleButtonClick }) => {

    console.log(id);

    const [matchInfo, setMatchInfo] = useState(matchData);
    console.log(matchInfo);


    useEffect(() => {
        if (matchInfo?.status === 'live' && matchInfo?._id === id) {
            // Join the match room when the match is live
            socket.emit('joinMatch', id);
            // Listen for ball-by-ball updates
            socket.on('newBall', (ballData) => {
                console.log('Received ball update:', ballData);
                if (ballData._id === id) // Ensure the update is for this specific match
                    setMatchInfo(ballData);

            });


            // Listen for general match updates
            socket.on('matchUpdate', (data) => {
                console.log('Received match update:', data);
                if (data) {
                    setMatchInfo(data);
                }
            });

            // Listen for bowler assignment updates
            socket.on('newBowlerAssigned', (updatedMatchData) => {
                console.log('Updated match data received:', updatedMatchData);
                setMatchInfo(updatedMatchData);
                socket.off('newBowlerAssigned'); // Unsubscribe after the update
            });

            // Clean up the socket listeners when the component unmounts
            // return () => {
            //     socket.off('newBall');
            //     socket.off('matchUpdate');
            //     socket.off('newBowlerAssigned');
            // };
        }
    }, [matchInfo?._id, id]);

    return (
        <>
            <div className="min-w-[400px]   bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded shadow-lg transform transition-transform duration-300">
                {/* Card Front */}

                <div className="px-4 py-2">
                    <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
                        <div className="text-gray-600 text-xs truncate">{formatDateToYMD(matchInfo.date)}</div>
                        <div className='text-gray-600 text-sm truncate'>
                            {matchInfo?.tournament?.name}-{matchInfo?.tournament?.season}
                        </div>
                        <div className={clsx(
                            'px-2 py-1 rounded text-sm font-semibold',
                            statusStyles[matchInfo?.status] || 'bg-gray-200 text-gray-800' // Default style
                        )}>
                            {matchInfo?.status === 'live' ? 'Live' : matchInfo?.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                        </div>
                    </div>

                    {
                        matchInfo?.innings.length >= 1 ?
                            (<>
                                <div className="mt-4 bg-white space-y-4">
                                    {matchInfo?.innings?.map((team, index) => (
                                        <div className="flex items-center space-x-3" key={index}>
                                            <img
                                                className="w-10 "
                                                src={team.team.teamLogo}
                                                alt={team.team.teamName}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                                                }}
                                            />
                                            <div className="flex-1">
                                                <span className="text-sm font-semibold text-gray-800">{team.team.shortName}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-gray-900">{team.runs}/{team.wickets}</div>
                                                <div className="text-xs text-gray-600">
                                                    {
                                                        team.overs.length
                                                    }.
                                                    {

                                                    }/{
                                                        matchData.overs
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                            ) : (<>
                                <div className="mt-4 bg-white space-y-4">
                                    {matchInfo?.teams?.map((team, index) => (
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

                                        </div>
                                    ))}
                                </div>
                            </>
                            )}
                </div>

                {/* Match Status */}
                <div className='bg-gray-200 p-3 text-center text-gray-500 font-semibold text-xs border-t border-gray-200'>
                    {
                        matchInfo.status === 'scheduled' ?
                            (<>
                                {convertTo12HourFormat(matchInfo.time)}
                            </>)
                            : matchInfo.status === 'live' && matchInfo.currentInning === 1 ? (<>
                                Match is live
                            </>) : matchInfo.status === 'completed' && matchInfo?.result?.isTie === true ? (<>
                                Match Tie
                            </>) : matchInfo.status === 'completed' && matchInfo?.result?.winner ? (<>
                                {`${matchInfo?.result?.winner?.teamName} won by ${matchInfo?.result.margin}`}
                            </>) : ""
                    }
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 justify-center bottom-0 bg-gray-100 p-2 items-center border-t border-gray-300">
                    <button
                        onClick={() => handleButtonClick(matchInfo)}
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
        </>
    );
};

export default MatchCard1;
