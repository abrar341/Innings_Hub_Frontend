import { current } from '@reduxjs/toolkit';
import React from 'react'

const Target = ({ innings, totalOvers }) => {

    const lastOverIndex = innings?.[1]?.overs?.length ? innings?.[1].overs.length - 1 : 0;
    const lastOver = innings?.[1]?.overs?.[lastOverIndex];

    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;

    const targetRuns = innings?.[0]?.runs + 1;
    const currentScore = innings?.[1].runs;
    const currentOver = lastOver?.overNumber - 1;
    const currentBalls = lastBallNumber || 0;

    return (
        <div>{`${targetRuns - currentScore} runs needed in ${(totalOvers * 6) - (currentOver * 6 + currentBalls)} balls`}</div>
    )
}

export default Target
