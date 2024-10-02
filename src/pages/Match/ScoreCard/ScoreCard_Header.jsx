import React, { useState, useEffect } from 'react';
import { useGetMatchByIdQuery } from '../../../slices/match/matchApiSlice';
import { io } from 'socket.io-client';
import { convertTo12HourFormat, formatDate } from '../../../utils/dateFormatter';
const socket = io('http://localhost:8000');
const ScoreCard_Header = ({ matchInfo }) => {
    console.log(matchInfo);
    const currentInning1 = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const lastOverIndex = currentInning1?.overs?.length ? currentInning1.overs.length - 1 : 0;
    const lastOver = currentInning1?.overs?.[lastOverIndex];
    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;
    console.log(lastOver);
    console.log(lastBallNumber);

    const currentInning = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const battingTeamId = currentInning?.team?._id;

    const battingTeam = matchInfo?.playing11?.find((team) => team?.team?._id === battingTeamId);


    return (
        <div className="mx-auto bg-white border border-gray-300 overflow-hidden mb-6">
            <div className=" p-4 py-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-300 bg-gray-50">
                <div
                    className="flex md:flex-col lg:flex-row px-4 border-gray-400 min-w-[350px] gap-20 md:gap-0 lg:gap-20 items-center py-6">
                    <a href="/teams/33718">
                        <img className="w-20 mb-2 "
                            src={matchInfo?.innings?.[0].team?.teamLogo || matchInfo?.teams?.[0]?.teamLogo}
                            alt="Logo" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{matchInfo?.innings?.[0]?.team?.teamName || matchInfo?.teams?.[0]?.teamName}</h1>
                        {matchInfo?.status === 'live' &&
                            <>
                                <div className="text-sm text-gray-600 font-semibold">Runs: <span
                                    className="text-gray-800 font-bold text-lg">{matchInfo.innings?.[0]?.runs}/{matchInfo?.innings?.[0]?.wickets}</span></div>
                                <div className="text-sm text-gray-600 font-semibold">Overs:
                                    <span className="text-gray-700 text-lg">
                                        {lastOver?.overNumber - 1 || 0}.
                                        {lastBallNumber}/{matchInfo?.overs || 0}
                                    </span>
                                    {matchInfo?.innings?.[matchInfo?.currentInning - 1] === 0 && <p className="text-sm text-gray-700 text-lg">

                                        CRR {`${(matchInfo?.innings?.[matchInfo?.currentInning - 1]?.runs / (lastOver?.overNumber + lastBallNumber / 6)).toFixed(2)}`}
                                    </p>}

                                </div>
                            </>
                        }
                    </div>
                </div>
                <span className='border-2 text-base font-semibold  w-12 flex justify-center items-center h-12 w-12 rounded-full p-4'>V/S</span>
                <div className="flex md:flex-col lg:flex-row px-4 border-gray-400 min-w-[350px] gap-20 md:gap-0 lg:gap-20 items-center py-6">
                    <a href="/teams/33781" data-team-id="33781">
                        <img className="w-20 mb-2 "
                            src={matchInfo?.innings?.[1].team?.teamLogo || matchInfo?.teams?.[1]?.teamLogo}

                            alt="Logo" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{matchInfo?.innings?.[1]?.team?.teamName || matchInfo?.teams?.[1].teamName}</h1>
                        {matchInfo?.status === 'live' &&
                            <>
                                {matchInfo?.currentInning === 2 ?
                                    <>
                                        <div className="text-sm text-gray-600 font-semibold">Runs: <span
                                            className="text-gray-800 font-bold text-lg">{matchInfo.innings?.[1].runs}/{matchInfo?.innings?.[1]?.wickets}</span></div>
                                        <div className="text-sm text-gray-600 font-semibold">Overs:
                                            <span className="text-sm text-gray-700 text-lg">
                                                {lastOver?.overNumber || 0}.
                                                {lastBallNumber || 0}/{matchInfo?.overs || 0}
                                            </span>
                                            <p className="text-sm text-gray-700 text-lg">

                                                CRR {`${(matchInfo?.innings?.[matchInfo?.currentInning - 1]?.runs / (lastOver?.overNumber + lastBallNumber / 6)).toFixed(2)}`}
                                            </p>
                                        </div>
                                    </> : (
                                        <div className='text-base text-gray-600 font-semibold'>
                                            Yet to Bat
                                        </div>
                                    )

                                }
                            </>}
                    </div>
                </div>
            </div>
            <div itemProp="description" className="bg-gray-100 p-4 text-center">
                {matchInfo?.status === 'live' && matchInfo?.currentInning ?
                    (<>
                        {matchInfo?.currentInning === 1 ? (<h1 className="text-base font-semibold text-gray-600">

                            {matchInfo?.tossDecision === "bat" && `${battingTeam?.teamName}`} win the toss and choose to {matchInfo?.tossDecision}
                        </h1>) : (<><h1 className="text-base font-semibold text-gray-600">

                            {matchInfo?.innings?.[0]?.runs - matchInfo?.innings?.[1]?.runs} runs in {(matchInfo?.overs * 6) - (lastOver?.overNumber * 6 + lastBallNumber)} balls - RRR {`${(matchInfo?.innings?.[0]?.runs - matchInfo?.innings?.[1]?.runs / (20 - (lastOver?.overNumber + lastBallNumber / 6))).toFixed(2)}`}
                        </h1></>)}
                    </>) :
                    (<>
                        <div className='flex gap-2 justify-center'>
                            <h1 className="text-base font-semibold text-gray-600">
                                Scheduled on {formatDate(matchInfo?.date)}</h1>
                            <h1 className="text-base font-semibold text-gray-600">
                                at {(matchInfo?.time)}</h1>
                        </div>
                    </>)}
                {/* <h1 className="text-sm font-bold text-gray-600">
                    {matchInfo.currentInning === 1 ? `${matchInfo.toss.teamName} won the toss and choose to bat` : "India Need 200 in 120 balls"}</h1> */}
            </div>
        </div>
    );
};

export default ScoreCard_Header;
