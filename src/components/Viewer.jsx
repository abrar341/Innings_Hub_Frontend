import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connect to the backend socket server
const a = 7;
const socket = io('http://localhost:8000');
const Viewer = () => {
    const matchId = "1234";
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
    });

    useEffect(() => {
        // Join the match room when the component mounts
        socket.emit('joinMatch', matchId);

        // Listen for new ball-by-ball updates
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
    }, []);

    return (
        <div>
            <h2>Live Score Viewer</h2>
            <h3>Match ID: {matchId}</h3>

            {/* Display the current match score */}
            <div>
                <h4>Score: {score.totalRuns}/{score.totalWickets}</h4>
                <h5>Overs: {score.overs}.{liveData.ballNo % 6}</h5>
            </div>

            {/* Display live ball-by-ball data */}
            <div>
                <h4>Ball Number: {liveData.ballNo}</h4>
                <p>Runs: {liveData.runs}</p>
                <p>Wickets: {liveData.wickets}</p>
                <p>Time: {new Date(liveData.timestamp).toLocaleTimeString()}</p>
            </div>
        </div>
    );
};

export default Viewer;
