import React, { useState, useEffect } from 'react';
import { formatDateToYMD, convertTo12HourFormat } from '../../utils/dateUtils';
import clsx from 'clsx';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:8000');

const MatchCard1 = ({ id, matchData }) => {
    const navigate = useNavigate();
    const [matchInfo, setMatchInfo] = useState(matchData);

    const handleButtonClick = (matchData) => {
        navigate(`/match/${matchData?._id}/innings`);
    };

    const statusStyles = {
        live: 'bg-red-600 w-16 text-center text-white animate-blink', // Blinking effect for live matches
        scheduled: 'bg-blue-500 text-white',
        completed: 'bg-gray-500 text-white',
    };

    useEffect(() => {
        if (matchInfo?.status === 'live' && matchInfo?._id === id) {
            socket.emit('joinMatch', id);

            socket.on('newBall', (ballData) => {
                if (ballData._id === id) {
                    setMatchInfo(ballData);
                }
            });

            socket.on('matchUpdate', (data) => {
                if (data) {
                    setMatchInfo(data);
                }
            });

            socket.on('newBowlerAssigned', (updatedMatchData) => {
                setMatchInfo(updatedMatchData);
                socket.off('newBowlerAssigned');
            });
        }
    }, [matchInfo?._id, id]);

    // Utility function to get the last ball number for a given inning
    const getLastBallNumber = (inning) => {
        const lastOverIndex = inning?.overs?.length ? inning.overs.length - 1 : 0;
        const lastOver = inning?.overs?.[lastOverIndex];
        const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
        const lastBall = lastOver?.balls?.[lastBallIndex];
        return lastBall?.ballNumber || 0;
    };

    return (
        <div className="min-w-[380px] bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded shadow-lg transform transition-transform duration-300">
            {/* Card Front */}
            <div className="px-4 py-2">
                <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-gray-600 text-xs truncate">{formatDateToYMD(matchInfo.date)}</div>
                    <div className='text-gray-600 text-sm truncate'>
                        {matchInfo?.tournament?.name}-{matchInfo?.tournament?.season}
                    </div>
                    <div className={clsx(
                        'px-2 py-1 rounded text-xs ',
                        statusStyles[matchInfo?.status] || 'bg-gray-200 text-gray-800' // Default style
                    )}>
                        {matchInfo?.status === 'live' ? 'Live' : matchInfo?.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                    </div>
                </div>

                {
                    matchInfo?.innings.length >= 1 ? (
                        <div className="mt-4 flex flex-col">
                            {matchInfo?.innings?.map((inning, index) => {
                                const lastBallNumber = getLastBallNumber(inning);

                                return (
                                    <div className="min-h-[60px] flex items-center space-x-3" key={index}>
                                        <img
                                            className="w-10"
                                            src={inning?.team?.teamLogo}
                                            alt={inning?.team?.teamName}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                                            }}
                                        />
                                        <div className="flex-1">
                                            <span className="text-lg font-semibold text-gray-800">{inning?.team?.shortName}</span>
                                        </div>

                                        <div className="flex justify-center items-center flex-col text-right">
                                            <div className="text-sm font-bold text-gray-900">{inning.runs}/{inning.wickets}</div>
                                            <div className="text-xs text-gray-600">
                                                {inning?.overs?.length > 0 ? inning?.overs?.length - 1 : 0}.{lastBallNumber}/{matchData?.overs}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mt-4 flex flex-col">
                            {matchInfo?.teams?.map((team, index) => (
                                <div className="min-h-[60px] flex items-center space-x-3" key={index}>
                                    <img
                                        className="w-10"
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
                    )
                }
            </div>

            {/* Match Status */}
            <div className='bg-gray-200 p-2 text-center text-gray-500 font-semibold text-xs border-t border-gray-200'>
                {
                    matchInfo.status === 'scheduled' ?
                        convertTo12HourFormat(matchInfo.time)
                        : matchInfo.status === 'live' && matchInfo.currentInning === 1 ? 'Match is live'
                            : matchInfo.status === 'completed' && matchInfo?.result?.isTie ? 'Match Tie'
                                : matchInfo.status === 'completed' && matchInfo?.result?.winner ? `${matchInfo?.result?.winner?.teamName} won by ${matchInfo?.result.margin}`
                                    : ""
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
    );
};

export default MatchCard1;
