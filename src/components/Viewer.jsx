import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useGetMatchByIdQuery } from '../slices/match/matchApiSlice';

const socket = io('http://localhost:8000');
// Connect to the backend socket server

const Viewer = () => {
    const matchId = "66f868b2d7daa97480901189"; // Pass the relevant matchId dynamically if needed
    const { data, error, isLoading, refetch } = useGetMatchByIdQuery(matchId);
    console.log(data);
    const matchData = data?.data;

    const [liveData, setLiveData] = useState({
        ballNo: 0,
        runs: 0,
        wickets: 0,
        timestamp: '',
    });
    const [score, setScore] = useState({
        totalRuns: 0,
        totalWickets: 0,
        overs: 0,
        balls: 0,
    });

    // Fetch initial match data via REST API
    useEffect(() => {
        setScore({
            totalRuns: matchData?.innings.runs,
            totalWickets: matchData?.innings.wickets,
            overs: matchData?.innings.overs,
            balls: matchData?.innings.balls,
        });
        // Join the match room when the component mounts
        socket.emit('joinMatch', matchId);

        // Listen for new ball-by-ball updates via WebSocket
        socket.on('newBall', (ballData) => {
            console.log('Received ball update:', ballData);
            setLiveData(ballData); // Update live data for this ball

            // Update the match score (e.g., total runs and wickets)
            setScore((prevScore) => ({
                totalRuns: prevScore.totalRuns + ballData.runs,
                totalWickets: prevScore.totalWickets + ballData.wickets,
                overs: Math.floor(ballData.ballNo / 6),
            }));
        });

        // Cleanup when component unmounts
        return () => {
            socket.disconnect();
        };
    }, [matchId]);

    if (isLoading) {
        return <div>Loading match data...</div>;
    }

    return (
        <div className="mx-auto bg-white border border-gray-300 overflow-hidden mb-6">
            <div className="p-4 py-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-300 bg-gray-50">
                <div className="flex md:flex-col lg:flex-row px-4 border-gray-400 min-w-[350px] gap-20 md:gap-0 lg:gap-20 items-center py-6">
                    <a href="/teams/33718">
                        <img className="w-20 mb-2"
                            src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/381800/381891.png"
                            alt="India Logo" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">INDIA</h1>
                        <div className="text-sm text-gray-600 font-semibold">
                            Runs: <span className="text-gray-800 font-bold text-lg">{score.totalRuns}/{score.totalWickets}</span>
                        </div>
                        <div className="text-sm text-gray-600 font-semibold">
                            Overs: <span className="text-gray-700 text-lg">{score.overs}.{liveData.ballNo % 6}</span>
                        </div>
                    </div>
                </div>
                <span className="border-2 text-base font-semibold w-12 flex justify-center items-center h-12 w-12 rounded-full p-4">V/S</span>
                <div className="flex md:flex-col lg:flex-row px-4 border-gray-400 min-w-[350px] gap-20 md:gap-0 lg:gap-20 items-center py-6">
                    <a href="/teams/33781">
                        <img className="w-20 mb-2"
                            src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/340400/340493.png"
                            alt="Pakistan Logo" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">PAKISTAN</h1>
                        <div className="text-sm text-gray-600 font-semibold">
                            Runs: <span className="text-gray-800 font-bold text-lg">Yet to Bat</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewer;
