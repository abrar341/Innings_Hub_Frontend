import React, { useState, useEffect } from 'react';
import { formatDateToYMD, convertTo12HourFormat } from '../../utils/dateUtils';
import clsx from 'clsx';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For smooth transitions

const socket = io('http://localhost:8000');

const MatchCard1 = ({ id, matchData }) => {
    const navigate = useNavigate();
    const [matchInfo, setMatchInfo] = useState(matchData);

    const handleButtonClick = (matchData) => {
        navigate(`/match/${matchData?._id}/innings`);
    };

    const handleTeamClick = (teamId) => {
        navigate(`/team/${teamId}`); // Navigate to team page
    };

    const statusStyles = {
        live: 'bg-red-500 w-16 text-center text-white animate-blink',
        scheduled: 'bg-blue-500 text-white',
        completed: 'bg-gray-500 text-white',
    };

    useEffect(() => {
        if (matchInfo?.status === 'live' && matchInfo?.innings?.length >= 1 && matchInfo?._id === id) {
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

    const getLastBallNumber = (inning) => {
        const lastOverIndex = inning?.overs?.length ? inning.overs.length - 1 : 0;
        const lastOver = inning?.overs?.[lastOverIndex];
        const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
        const lastBall = lastOver?.balls?.[lastBallIndex];
        return lastBall?.ballNumber || 0;
    };

    return (
        <div
            className="min-w-[380px] bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded shadow-lg transform transition-transform duration-300"
            whileHover={{ scale: 1.05 }} // Slight zoom on hover
        >
            <div className="px-4 py-1">
                {/* Match Info */}
                <div className="bg-gray-50 py-1 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-gray-600 text-xs truncate">{formatDateToYMD(matchInfo.date)}</div>
                    <div className='text-gray-600 text-sm truncate'>
                        {matchInfo?.tournament?.name}-{matchInfo?.tournament?.season}
                    </div>
                    <div className={clsx(
                        'px-2 py-1 rounded text-xs ',
                        statusStyles[matchInfo?.status] || 'bg-gray-100 text-gray-800'
                    )}>
                        {matchInfo?.status === 'live' ? 'Live' : matchInfo?.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                    </div>
                </div>

                {/* Team and Inning Details */}
                <div className="mt-4 flex flex-col">
                    {matchInfo?.innings?.length >= 1 ? (
                        matchInfo?.innings?.map((inning, index) => {
                            const lastBallNumber = getLastBallNumber(inning);
                            return (
                                <div
                                    key={index}
                                    className="min-h-[60px] flex items-center space-x-3"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img
                                        className="w-10 rounded cursor-pointer"
                                        src={inning?.team?.teamLogo}
                                        alt={inning?.team?.teamName}
                                        onClick={() => handleTeamClick(inning?.team?._id)} // Clickable logo
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                                        }}
                                    />
                                    <div className="flex-1">
                                        <span
                                            className="text-lg font-semibold text-gray-800 cursor-pointer"
                                            onClick={() => handleTeamClick(inning?.team?._id)} // Clickable team name
                                        >
                                            {inning?.team?.shortName}
                                        </span>
                                    </div>

                                    <div className="flex justify-center items-center flex-col text-right">
                                        <motion.div
                                            className="text-sm font-bold text-gray-900"
                                            animate={{ opacity: [0, 1] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {inning.runs}/{inning.wickets}
                                        </motion.div>
                                        <div className="text-xs text-gray-600">
                                            {inning?.overs?.length > 0 ? inning?.overs?.length - 1 : 0}.{lastBallNumber}/{matchData?.overs}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        matchInfo?.teams?.map((team, index) => (
                            <motion.div
                                key={index}
                                className="min-h-[60px] flex items-center space-x-3"
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    className="w-10 cursor-pointer"
                                    src={team.teamLogo}
                                    alt={team.teamName}
                                    onClick={() => handleTeamClick(team?._id)} // Clickable logo
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                                    }}
                                />
                                <div className="flex-1">
                                    <span
                                        className="text-sm font-semibold text-gray-800 cursor-pointer"
                                        onClick={() => handleTeamClick(team?._id)} // Clickable team name
                                    >
                                        {team.shortName}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Match Status */}
            <div className='bg-gray-200 p-2 text-center text-gray-500 font-semibold text-xs border-t border-gray-200 relative'>
                {matchInfo.status === 'scheduled'
                    ? convertTo12HourFormat(matchInfo.time)
                    : matchInfo.status === 'live'
                        ? 'Match is live'
                        : matchInfo.status === 'completed' && matchInfo?.result?.isTie
                            ? 'Match Tie'
                            : matchInfo.status === 'completed' && matchInfo?.result?.winner
                                ? `${matchInfo?.result?.winner?.teamName} won by ${matchInfo?.result.margin}`
                                : ""
                }

                {/* Hover Popup for Match Summary */}
                {matchInfo?.result && matchInfo.status === 'completed' && (
                    <div className="absolute right-0 top-0 p-2 bg-white shadow-lg rounded text-xs hidden group-hover:block">
                        <p><strong>Top Scorer:</strong> {matchInfo?.result?.topScorer}</p>
                        <p><strong>Best Bowler:</strong> {matchInfo?.result?.bestBowler}</p>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 justify-center bottom-0 bg-gray-100 p-2 items-center border-t border-gray-300">
                <button
                    onClick={() => handleButtonClick(matchInfo)}
                    className="text-xs font-semibold text-gray-700 border border-gray-300 bg-white rounded px-3 py-1 inline-flex items-center space-x-1 transition-colors hover:bg-gray-200"
                >
                    <span>
                        {matchInfo.status === 'live' ? 'View Live Score' : 'Match Centre'}
                    </span>
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
