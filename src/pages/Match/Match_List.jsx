import React from 'react'
import Match_Card from './Match_Card';
import matchData from '../../data/matchData'

const Matches_List = () => {
    return (
        <>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2">
                    {matchData.map((match, index) => (
                        <Match_Card key={index} matchData={match} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Matches_List;
