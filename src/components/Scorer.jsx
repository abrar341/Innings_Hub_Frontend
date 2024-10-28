import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is integrated
import useDialog from '../hooks/useDialog';
import InitializePlayersDialog from './Dialogs/InitializePlayersDialog';
import NewBowlerDialog from './Dialogs/NewBowlerDialog';
import NewBatsmanDialog from './Dialogs/NewBatsmanDialog';
import { io } from 'socket.io-client';
import InningsEndedDialog from './Dialogs/InningsEndedDialog';
import { useParams } from 'react-router-dom';
import StartMatchDialog from './Dialogs/StartMatchDialog';
import ScoreButtons from './ScorerCardButtons/ScoreButtons';
import FielderInvolvementDialog from './FielderInvolvementDialog';
import ScoreDisplay from './scorer/ScoreDisplay';
import CurrentStriker from '../pages/Match/ScoreCard/CurrentStriker';
import { TypographyH2 } from './ui/typography';
import MatchClickDialog from './MathcClickDialog';

// Connect to the backend socket server

const socket = io('http://localhost:8000');

const Scorer = () => {
    const { matchId } = useParams();
    const [matchInfo, setMatchInfo] = useState(null);
    const [wicketType, setWicketType] = useState("");
    const [loading, setLoading] = useState(false);

    // const [result, setResult] = useState(null);
    const [fielderInvolved, setFielderInvolved] = useState(false); // State to open/close dialog
    console.log(matchInfo);

    const [currentInning, setCurrentInning] = useState(null); // Track current inning
    const onSubmit = (data) => {
        socket.emit('joinMatch', matchId);
        socket.emit('newBowler', { matchId, bowlerId: data.bowler });
        socket.on('newBowlerAssigned', (updatedMatchData) => {
            // socket.off('newBowlerAssigned');
        });
    }
    const retrive = () => {
        socket.emit('joinMatch', matchId);

        socket.on('matchDetails', (matchData) => {
            console.log('Received match data:', matchData);
            console.log(matchData);

            setMatchInfo(matchData); // Save match data in the state
            console.log(matchInfo);

            if (matchData.innings && matchData.innings.length > 0) {
                setCurrentInning(matchData?.innings?.[matchData.currentInning - 1]);
            }
        });
    }
    useEffect(() => {
        socket.emit('joinMatch', matchId);
        socket.on('matchDetails', (matchData) => {
            console.log('Received match data:', matchData);
            console.log(matchData);

            setMatchInfo(matchData); // Save match data in the state
            console.log(matchInfo);
            if (matchData.innings && matchData.innings.length > 0) {
                setCurrentInning(matchData?.innings?.[matchData.currentInning - 1]);
            }
        });
        socket.on('error', (errorMessage) => {
            console.error('Error:', errorMessage);
        });

        return () => {
            socket.off('matchDetails');
            socket.off('error');
            socket.emit('leaveMatch', matchId); // Leave match when component unmounts
        };
    }, [matchId]);

    const currentInning1 = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const lastOverIndex = currentInning1?.overs?.length ? currentInning1.overs.length - 1 : 0;
    const lastOver = currentInning1?.overs?.[lastOverIndex];
    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;

    function handleScore(e) {
        const event = e.currentTarget.value;
        console.log(event);
        const dataToEmit = {
            matchId,
            event,
            bowlerId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.currentBowler?._id,
            batsmanId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.currentStriker?._id,
            nonStrikerbatsmanId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.nonStriker?._id,
            ballNumber: lastBallNumber,
            overNumber: lastOver?.overNumber || 0
        };
        console.log(dataToEmit);
        socket.emit('ballUpdate', dataToEmit);
        setLoading(true);


    }
    function handleWicket(e) {

        const event = e.currentTarget.value;
        console.log(event);
        const wicket = JSON.parse(event);
        const wicketType = wicket?.type;
        console.log(wicketType);
        setWicketType(wicketType)
        {
            wicketType === 'Caught' || wicketType === 'Run Out' || wicketType === 'Stumped' ? (
                setFielderInvolved(true)) : null
        }
        const dataToEmit = {
            matchId,
            event: wicketType,
            bowlerId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.currentBowler?._id,
            batsmanId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.currentStriker?._id,
            nonStrikerbatsmanId: matchInfo?.innings?.[matchInfo?.currentInning - 1]?.nonStriker?._id,
            ballNumber: lastBallNumber,
            overNumber: lastOver?.overNumber || 0
        };
        if (wicketType === 'Caught' || wicketType === 'Run Out' || wicketType === 'Stumped') {
            console.log("ball send from dialog");
        }
        else {
            console.log(dataToEmit)
            socket.emit('ballUpdate', dataToEmit);

        }
    }
    socket.on('newBall', (updatedMatch) => {
        console.log('New ball event received:', updatedMatch);
        setMatchInfo(updatedMatch);
        setCurrentInning(updatedMatch?.innings?.[updatedMatch?.currentInning - 1]);
        setLoading(false);

    });
    socket.on('newBowlerAssigned', (updatedMatchData) => {
        console.log("Updated match data received:", updatedMatchData);
        if (updatedMatchData) {
            // retrive();
            setMatchInfo(updatedMatchData);
            setCurrentInning(updatedMatchData?.innings?.[updatedMatchData?.currentInning - 1]);

        }
    });
    socket.on('newBatsmanAssigned', (updatedMatchData) => {
        console.log("Updated match data received:", updatedMatchData);
        if (updatedMatchData) {
            // retrive();
            setMatchInfo(updatedMatchData)
            setCurrentInning(updatedMatchData?.innings?.[updatedMatchData?.currentInning - 1]);

        }
    });
    socket.on('matchUpdate', (match) => {
        console.log("Updated match data received:", match);
        if (match) {
            retrive();
        }
        // setCurrentInning(updatedMatchData?.innings?.[updatedMatchData?.currentInning - 1]);
    });
    socket.on('NewInningsStarted', (match) => {
        console.log("Updated match data received:", match);
        if (match) {
            setMatchInfo(match); // Save match data in the state

            if (match) {
                setCurrentInning(match?.innings?.[match.currentInning - 1]);
            }
        }

    });

    const currentInning2 = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const battingTeamId = currentInning2?.team?._id; // Get the team ID for this inning
    const battingTeam = matchInfo?.playing11?.find((team) => team?.team?._id === battingTeamId);
    const bowlingTeam = matchInfo?.playing11?.find((team) => team?.team?._id !== battingTeamId);
    console.log(bowlingTeam?.team);
    console.log(battingTeam?.team);


    const totalOves = matchInfo?.overs;

    let result;
    let winingTeam;
    let remainRuns;
    let remainingWickets;
    if (matchInfo?.currentInning === 2) {
        if (matchInfo?.innings?.[1].runs > matchInfo?.innings?.[0].runs) {
            console.log("winning by wickets");
            winingTeam = battingTeam?.team;
            result = true
            remainingWickets = 10 - matchInfo?.innings?.[1].wickets;
        }
        if (matchInfo?.innings?.[0].runs > matchInfo?.innings?.[1].runs) {
            if (currentInning?.fallOfWickets?.length >= 10 || lastOver?.overNumber === matchInfo?.overs + 1) {

                winingTeam = bowlingTeam?.team
                result = true
                remainRuns = matchInfo?.innings?.[0]?.runs - matchInfo?.innings?.[1]?.runs + 1;

                console.log("winniing by runs");
            }
        }
    }
    // if (!matchInfo?.toss || (lastOver?.overNumber === matchInfo?.over)) {
    // if (!matchInfo?.toss) {
    //     return <StartMatchDialog setMatchInfo={setMatchInfo} matchInfo={matchInfo} matchId={matchId} />;
    // }
    // if (currentInning?.fallOfWickets?.length === 10 || currentInning?.fallOfWickets?.length >= 10 || lastOver?.overNumber === matchInfo?.overs + 1 || result) {
    //     return <InningsEndedDialog remainingWickets={remainingWickets} remainRuns={remainRuns} winingTeam={winingTeam} result={result} matchId={matchId} />;
    // }
    if (fielderInvolved) {
        return <FielderInvolvementDialog matchId={matchId} matchInfo={matchInfo} fielders={bowlingTeam} wicketType={wicketType} setFielderInvolved={setFielderInvolved} />;
    }
    return (
        <div className="mx-auto max-w-2xl w-full bg-white rounded shadow-md p-6 border border-gray-600">
            {/* <h2 className="text-2xl font-bold mb-4 text-center">Live Scorer</h2> */}
            {matchInfo && (
                // ScoreDisplay({ runs, wickets, totalBalls, runRate, curTeam })
                <div className="mb-2">
                    <div className='grid grid-cols-2 gap-2'>
                        {matchInfo?.innings?.map((inning, index) => (
                            <>
                                <ScoreDisplay key={index} totalOves={totalOves} inning={inning} inningNumber={index + 1} />

                                <MatchClickDialog matchId={matchInfo?._id} />
                            </>
                        ))}

                    </div>
                    {matchInfo?.status === 'completed' && matchInfo?.result?.isTie === false && <p className='uppercase text-center text-center w-full p-3 my-3 text-base text- font-bold tracking-normal	'>{matchInfo?.result?.winner?.teamName} WON BY {matchInfo?.result?.margin}</p>}
                    {matchInfo?.result?.isTie === true &&
                        <div className='uppercase text-center text-center w-full p-3 my-3 text-base text- font-bold tracking-normal'>
                            Match Tie
                        </div>}
                    {matchInfo?.toss && <div className='border-2'>
                        <div className='flex justify-between '>
                            <p className='w-full text-center font-semibold text-sm py-2 border-b '>Batsman</p>
                            <p className='w-full text-center font-semibold text-sm py-2 border-b '>Bowlers</p>
                        </div>
                        <CurrentStriker matchInfo={matchInfo} />
                    </div>}

                </div>

            )}


            {!matchInfo?.toss &&
                <div className='flex mb-4 justify-between px-20 py-4 border-2 gap-4'>
                    {matchInfo?.teams?.map((team, index) => (
                        <TypographyH2 key={team?._id} className="flex justify-between gap-10 left-0">
                            {/* {processTeamName(curTeam ?? "TEAM 1")} */}
                            {team?.teamName}
                            {index === 0 && <TypographyH2 className="">
                                vs
                            </TypographyH2>}
                        </TypographyH2>
                    ))}
                </div>
            }


            {
                loading ? <div>loading</div> :
                    <div className="border-2  p-2">
                        <>
                            {
                                (!matchInfo?.toss) ? <StartMatchDialog setMatchInfo={setMatchInfo} matchInfo={matchInfo} matchId={matchId} /> :
                                    (currentInning?.fallOfWickets?.length === 10 || currentInning?.fallOfWickets?.length >= 10 || lastOver?.overNumber === matchInfo?.overs + 1 || matchInfo?.status === 'completed') ? <InningsEndedDialog matchInfo={matchInfo} remainingWickets={remainingWickets} remainRuns={remainRuns} winingTeam={winingTeam} result={result} matchId={matchId} /> :
                                        (!currentInning?.currentStriker && !currentInning?.nonStriker && !currentInning?.currentBowler)
                                            ? <InitializePlayersDialog matchInfo={matchInfo} setMatchInfo={setMatchInfo} setCurrentInning={setCurrentInning} matchId={matchId} playing11={matchInfo?.playing11} />
                                            : (!currentInning?.currentStriker) ? <NewBatsmanDialog matchInfo={matchInfo} matchId={matchId} playing11={matchInfo?.playing11} />
                                                : (!currentInning?.currentBowler) ?
                                                    <NewBowlerDialog matchInfo={matchInfo} onSubmit={onSubmit} matchId={matchId} playing11={matchInfo?.playing11?.[0]} />
                                                    : <ScoreButtons handleScore={handleScore} handleWicket={handleWicket} />
                            }
                        </>

                    </div>
            }

            {/* Ball Summary */}
            {/* <div className="mt-6">
                <h3 className="text-lg font-semibold">Ball Summary</h3>
                <p className="text-lg font-mono">{ballData.summary.join(', ')}</p>
            </div> */}
        </div>
    );
};

export default Scorer;
