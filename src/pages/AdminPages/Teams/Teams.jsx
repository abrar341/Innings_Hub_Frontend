import React from 'react';
// import teams from '../../../data/teams'
import TeamCard from './TeamCard';
import { useSelector } from 'react-redux';



const Teams = () => {
    const teams = useSelector((state) => state.teams.teams);

    return (
        <>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
                {teams.map((team, index) => (
                    <TeamCard key={index} team={team} />
                ))}
            </div>
        </>

    );
};

export default Teams;
