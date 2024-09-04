import React, { useEffect, useState } from 'react'
import ScoreCard_Header from './ScoreCard_Header';
import ScoreCard_Innings from './ScoreCard_Innings';
import NavigationTabs from './NaviagtionTabs';
import MatchTabs from './MatchTabs';
import { Outlet } from 'react-router-dom';
// import EndOfOver from '../Commentry/Endofover';
// import Commentary from '../Commentry/Commentry';

const ScoreCard = () => {
    return (
        <>
            <div className=" p-3 min-w-[200px]">
                <ScoreCard_Header />
                <MatchTabs />
                <Outlet />
            </div>

        </>

    )
}

export default ScoreCard
