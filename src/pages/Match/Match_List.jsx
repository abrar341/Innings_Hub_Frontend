import React from 'react'
import Match_Card from './Match_Card';
import matchData from '../../data/matchData'
import Matches from '../AdminPages/Competitions/Tournaments/SingleTournament.jsx/Matches';

const Matches_List = () => {
    return (
        <>
            <div className="container mx-auto p-2 sm:p-4">
                <Matches />
            </div>
        </>
    );
};

export default Matches_List;
