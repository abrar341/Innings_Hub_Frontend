import React, { useEffect, useState } from 'react'
import ScoreCard_Header from './ScoreCard_Header';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useGetMatchByIdQuery } from '../../../slices/match/matchApiSlice';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8000');

const ScoreCard = () => {

    const [matchInfo, setMatchInfo] = useState(null);

    const { matchId } = useParams();

    // const matchId = "66f9da08e7876225d4f91d68"; // Ideally, pass this dynamically
    // const { data, error, isLoading, refetch } = useGetMatchByIdQuery(matchId);
    console.log(matchInfo);

    useEffect(() => {
        socket.emit('joinMatch', matchId);
        socket.on('matchDetails', (matchData) => {
            console.log('Received match data:', matchData?.tournament);
            setMatchInfo(matchData); // Save match data in the state
        });
        socket.on('newBowlerAssigned', (matchData) => {
            console.log('new bowler assigned:', matchData);
            setMatchInfo(matchData); // Save match data in the state
        });
        socket.on('error', (errorMessage) => {
            console.error('Error:', errorMessage);
        });
        return () => {
            socket.off('matchDetails');
            socket.off('error');
            socket.emit('leaveMatch', matchId); // Optional: leave the match room if you have that functionality
        };
    }, [matchId]);

    useEffect(() => {
        // Join the match room when the component mounts
        socket.emit('joinMatch', matchId);
        socket.on('newBall', (ballData) => {
            console.log('Received ball update:', ballData);
            setMatchInfo(ballData)
        })

        socket.on('matchUpdate', (data) => {
            console.log('Received match update:', data);

            if (data) {
                // Update the UI accordingly (e.g., display match data, change match status)
                // Update frontend state with the new match data
                setMatchInfo(data?.match)
            }
        });
        socket.on('newBatsmanAssigned', (updatedMatchData) => {
            console.log("Updated match data received:", updatedMatchData);
            if (updatedMatchData) {
                setMatchInfo(updatedMatchData)

            }
        });
        socket.on('newBowlerAssigned', (updatedMatchData) => {
            console.log("Updated match data received:", updatedMatchData);
            socket.off('newBowlerAssigned');
        });

        socket.on('NewInningsStarted', (match) => {
            console.log("Updated match data received:", match);
            if (match) {
                setMatchInfo(match); // Save match data in the state
            }

        });
    }, [matchId]);

    const tabClasses = ({ isActive }) =>
        `flex  justify-center pt-4 pb-2 text-base font-medium transition-colors duration-300 ${isActive
            ? 'text-gray-900 border-b-4  border-blue-600'
            : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
        }`;
    return (
        <>
            <div className=" p-3 min-w-[200px]">
                <ScoreCard_Header matchInfo={matchInfo} />
                <div className="mx-auto z-50  sticky top-14 bg-white flex flex-row items-center w-full gap-4 overflow-x-auto border-b border-gray-300 scrollbar-hide">
                    {/* <div className="shrink-0">
                        {!matchInfo?.status === 'live' || !matchInfo?.status === 'scheduled' ? (<NavLink
                            to="summery"
                            className={tabClasses}
                        >
                            Summary
                        </NavLink>) : (<></>)}
                    </div> */}
                    <div className="shrink-0">
                        <NavLink
                            to="innings"
                            className={tabClasses}
                        >
                            Scorecard
                        </NavLink>
                    </div>
                    <div className="shrink-0">
                        <NavLink
                            to="overs"
                            className={tabClasses}
                        >
                            Overs
                        </NavLink>
                    </div>

                    <div className="shrink-0">
                        <NavLink
                            to="playing-eleven"
                            className={tabClasses}
                        >
                            playing11
                        </NavLink>
                    </div>
                    <div className="shrink-0">
                        <NavLink
                            to="match-info"
                            className={tabClasses}
                        >
                            MatchInfo
                        </NavLink>
                    </div>
                    <div className="shrink-0">
                        <NavLink
                            to="photos"
                            className={tabClasses}
                        >
                            Photos
                        </NavLink>
                    </div>
                </div>
                <Outlet context={matchInfo} />
            </div>

        </>

    )
}

export default ScoreCard
