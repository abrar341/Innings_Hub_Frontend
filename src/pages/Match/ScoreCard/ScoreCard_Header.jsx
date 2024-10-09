import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { convertTo12HourFormat, formatDate } from '../../../utils/dateFormatter';
import Target from './Target';
import CurrentStriker from './CurrentStriker';
const socket = io('http://localhost:8000');
const ScoreCard_Header = ({ matchInfo }) => {
    console.log(matchInfo);
    const totalOves = matchInfo?.overs;
    // const [currentInningIndex, setCurrentInningIndex] = useState(null);
    // useEffect(() => {
    //     if (matchInfo?.currentInning) {
    //         const current = matchInfo?.currentInning - 1;
    //         console.log(current);
    //         setCurrentInningIndex(current);
    //     }
    // }, [matchInfo]);
    // const currentInning1 = matchInfo?.innings?.[currentInningIndex];
    // const batsmen = currentInning1?.battingPerformances;
    // const bowlers = currentInning1?.bowlingPerformances;

    //first inning 
    const lastOverIndex1 = matchInfo?.innings?.[0]?.overs?.length ? matchInfo?.innings?.[0]?.overs.length - 1 : 0;
    const lastOver1 = matchInfo?.innings?.[0]?.overs?.[lastOverIndex1];
    const lastBallIndex1 = lastOver1?.balls?.length ? lastOver1.balls.length - 1 : 0;
    const lastBall1 = lastOver1?.balls?.[lastBallIndex1];
    const lastBallNumber1 = lastBall1?.ballNumber || 0;
    //second inning
    const lastOverIndex2 = matchInfo?.innings?.[1]?.overs?.length ? matchInfo?.innings?.[1]?.overs.length - 1 : 0;
    const lastOver2 = matchInfo?.innings?.[1]?.overs?.[lastOverIndex2];
    const lastBallIndex2 = lastOver2?.balls?.length ? lastOver2.balls.length - 1 : 0;
    const lastBall2 = lastOver2?.balls?.[lastBallIndex2];
    const lastBallNumber2 = lastBall2?.ballNumber || 0;

    const currentInning = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const battingTeamId = currentInning?.team?._id;

    const battingTeam = matchInfo?.playing11?.find((team) => team?.team?._id === battingTeamId);
    return (
        <div className="mx-auto bg-white border border-gray-300 overflow-hidden mb-6">
            <div className=" p-4 py-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-300 bg-gray-50">
                <div
                    className="flex md:flex-col lg:flex-row px-4 border-gray-400 min-w-[350px] gap-20 md:gap-0 lg:gap-20 items-center py-6">
                    <a href="/teams/33718">
                        {matchInfo?.status === 'live' || matchInfo?.status === "completed" ?
                            <img className="w-20 mb-2 "
                                src={matchInfo?.innings?.[0]?.team?.teamLogo}
                                alt="Logo" />
                            :
                            <img className="w-20 mb-2 "
                                src={matchInfo?.teams?.[0]?.teamLogo}
                                alt="Logo" />
                        }
                    </a>
                    <div>
                        {matchInfo?.status !== 'live' && matchInfo?.status !== "completed" && <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{matchInfo?.teams?.[0]?.teamName}</h1>
                        }
                        {matchInfo?.status !== 'scheduled' &&
                            <>
                                <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{matchInfo?.innings?.[0]?.team?.teamName}</h1>
                                <div className="text-sm text-gray-600 font-semibold">Runs: <span
                                    className="text-gray-800 font-bold text-lg">{matchInfo?.innings?.[0]?.runs}/{matchInfo?.innings?.[0]?.wickets}</span></div>
                                <div className="text-sm text-gray-600 font-semibold">Overs:
                                    <span className="text-gray-700 text-lg">
                                        {lastOver1?.overNumber < 0 ? 0 : lastOver1?.overNumber - 1 || 0}.{lastBallNumber1 || 0}
                                        /{matchInfo?.overs || 0}
                                    </span>
                                    {matchInfo?.innings?.[matchInfo?.currentInning - 1] === 0 && <p className="text-sm text-gray-700 text-lg">

                                        CRR {`${(matchInfo?.innings?.[matchInfo?.currentInning - 1]?.runs / (lastOver1?.overNumber + lastBallNumber1 / 6)).toFixed(2)}`}
                                    </p>}

                                </div>
                            </>
                        }
                        {/* <Target totalOvers={matchInfo?.overs} innings={matchInfo?.innings} /> */}
                    </div>
                </div>
                <span className='border-2 text-base font-semibold  w-12 flex justify-center items-center h-12 w-12 rounded-full p-4'>V/S</span>
                <div className="flex md:flex-col lg:flex-row px-4 border-gray-400 min-w-[350px] gap-20 md:gap-0 lg:gap-20 items-center py-6">
                    <a href="/teams/33781" data-team-id="33781">
                        {matchInfo?.status === 'live' || matchInfo?.status === "completed" ?
                            <img className="w-20 mb-2 "
                                src={matchInfo?.innings?.[1]?.team?.teamLogo}
                                alt="Logo" />
                            :
                            <img className="w-20 mb-2 "
                                src={matchInfo?.teams?.[1]?.teamLogo}
                                alt="Logo" />
                        }
                    </a>
                    <div>
                        {/* <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{matchInfo?.innings?.[1]?.team?.teamName || matchInfo?.teams?.[1].teamName}</h1> */}
                        {matchInfo?.status !== 'live' && matchInfo?.status !== "completed" &&
                            <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{matchInfo?.teams?.[1]?.teamName}</h1>
                        }
                        <>
                            {matchInfo?.currentInning === 2 ?
                                <>
                                    <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{matchInfo?.innings?.[1]?.team?.teamName}</h1>
                                    <div className="text-sm text-gray-600 font-semibold">Runs: <span
                                        className="text-gray-800 font-bold text-lg">{matchInfo?.innings?.[1]?.runs}/{matchInfo?.innings?.[1]?.wickets}</span></div>
                                    <div className="text-sm text-gray-600 font-semibold">Overs:
                                        <span className="text-sm text-gray-700 text-lg">
                                            {lastOver2?.overNumber < 0 ? 0 : lastOver2?.overNumber - 1}.
                                            {lastBallNumber2 || 0}/{matchInfo?.overs || 0}
                                        </span>
                                        <p className="text-sm text-gray-700 text-lg">
                                            CRR {`${(matchInfo?.innings?.[matchInfo?.currentInning - 1]?.runs / (lastOver2?.overNumber + lastBallNumber2 / 6)).toFixed(2)}`}
                                        </p>
                                    </div>
                                </> : (
                                    ""
                                )

                            }
                        </>
                    </div>
                </div>
            </div>
            <div itemProp="description" className="bg-gray-100 p-4 text-center">
                {matchInfo?.status === 'live' && matchInfo?.currentInning ?
                    (<>
                        {matchInfo?.currentInning === 1 ? (<h1 className="text-base font-semibold text-gray-600">
                            {matchInfo?.tossDecision === "bat" && `${matchInfo?.innings?.[0]?.team?.teamName}`} Win the toss and choose to {matchInfo?.tossDecision}
                        </h1>) : (<><h1 className="text-base font-semibold text-gray-600">
                            {
                                `Target ${matchInfo?.innings?.[0]?.runs + 1}\n`
                            }
                            {/* {matchInfo?.innings?.[0]?.runs - matchInfo?.innings?.[1]?.runs} runs in {(matchInfo?.overs * 6) - (lastOver2?.overNumber * 6 + lastBallNumber2) || !(matchInfo?.overs * 6) - (lastOver2?.overNumber * 6 + lastBallNumber2) && "fsdf"} balls -  */}
                            {/* RRR {`${(matchInfo?.innings?.[0]?.runs - matchInfo?.innings?.[1]?.runs / (20 - (lastOver2?.overNumber + lastBallNumber2 / 6))).toFixed(2)}`} */}
                        </h1></>)}
                    </>) :
                    matchInfo?.result?.isTie === true ? <div>Match Tied</div> :
                        matchInfo?.result?.winner ? (<><div>
                            {
                                `${matchInfo?.result.winner?.teamName} by ${matchInfo?.result.margin}`
                            }
                        </div></>) :
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
            {matchInfo?.status === 'live' && <CurrentStriker matchInfo={matchInfo} />}
        </div >
    );
};

export default ScoreCard_Header;
