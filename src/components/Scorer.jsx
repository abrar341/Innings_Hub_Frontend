import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Replace with the actual backend server URL where Socket.io is running


// Connect to the backend socket server
const socket = io('http://localhost:8000');

const Scorer = () => {
    const matchId = "1234";
    const [ballData, setBallData] = useState({
        ballNo: 0,
        runs: 0,
        wickets: 0,
        timestamp: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...ballData, matchId };

        // Emit ball update to server
        socket.emit('ballUpdate', data);
    };

    return (
        <div>
            <h2>Live Scorer</h2>
            <form onSubmit={handleSubmit}>
                <label>Ball Number:</label>
                <input
                    type="number"
                    value={ballData.ballNo}
                    onChange={(e) => setBallData({ ...ballData, ballNo: +e.target.value })}
                    required
                />

                <label>Runs:</label>
                <input
                    type="number"
                    value={ballData.runs}
                    onChange={(e) => setBallData({ ...ballData, runs: +e.target.value })}
                    required
                />

                <label>Wickets:</label>
                <input
                    type="number"
                    value={ballData.wickets}
                    onChange={(e) => setBallData({ ...ballData, wickets: +e.target.value })}
                    required
                />

                <button type="submit">Submit Ball Update</button>
            </form>
        </div>
    );
};

export default Scorer;
