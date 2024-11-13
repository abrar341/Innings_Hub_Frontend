import React, { useState, useEffect } from 'react';
import { formatDateToYMD, convertTo12HourFormat } from '../../utils/dateUtils';
import clsx from 'clsx';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const socket = io('http://localhost:8000');

const MatchCardCarousel = ({ id, matchData }) => {
    const navigate = useNavigate();
    const [matchInfo, setMatchInfo] = useState(matchData);

    const handleButtonClick = (matchData) => {
        navigate(`/match/${matchData?._id}/innings`);
    };

    const handleTeamClick = (teamId) => {
        navigate(`/team/${teamId}`);
    };

    const statusStyles = {
        live: 'bg-red-500 text-white animate-blink text-xs font-bold',
        scheduled: 'bg-blue-500 text-white text-xs font-bold',
        completed: 'bg-gray-500 text-white text-xs font-bold',
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

    const getLastBallNumber = (inning) => {
        const lastOver = inning?.overs?.[inning?.overs?.length - 1];
        const lastBall = lastOver?.balls?.[lastOver?.balls?.length - 1];
        return lastBall?.ballNumber || 0;
    };

    return (
        <motion.div
            className="min-w-[320px] max-w-[320px] rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 p-4 transform transition-transform duration-300"
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-500 dark:text-gray-400">
                    {formatDateToYMD(matchInfo.date)}
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200 truncate">
                    {matchInfo?.round?.roundName} - {matchInfo?.tournament?.name}
                </span>
                <span
                    className={clsx(
                        'px-2 py-1 rounded',
                        statusStyles[matchInfo?.status]
                    )}
                >
                    {matchInfo?.status.charAt(0).toUpperCase() + matchInfo?.status.slice(1)}
                </span>
            </div>

            <div className="flex gap-4 items-center mt-4">
                {matchInfo?.innings?.map((inning, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <img
                            src={inning?.team?.teamLogo}
                            alt={inning?.team?.teamName}
                            className="w-12 h-12 rounded-full cursor-pointer"
                            onClick={() => handleTeamClick(inning?.team?._id)}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                            }}
                        />
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-200">
                                {inning.runs}/{inning.wickets}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {inning?.overs?.length - 1}.{getLastBallNumber(inning)}/{matchData?.overs}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-3 text-sm text-gray-700 dark:text-gray-300">
                {matchInfo.status === 'scheduled'
                    ? convertTo12HourFormat(matchInfo?.time)
                    : matchInfo.status === 'live'
                        ? 'Live Match'
                        : matchInfo.status === 'completed' && matchInfo?.result?.isTie
                            ? 'Match Tie'
                            : matchInfo.status === 'completed' && matchInfo?.result?.winner
                                ? `${matchInfo?.result?.winner?.teamName} won by ${matchInfo?.result.margin}`
                                : ''}
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handleButtonClick(matchInfo)}
                    className="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 transition hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    {matchInfo.status === 'live' ? 'View Live Score' : 'Match Centre'}
                </button>
            </div>
        </motion.div>
    );
};

export default MatchCardCarousel;
