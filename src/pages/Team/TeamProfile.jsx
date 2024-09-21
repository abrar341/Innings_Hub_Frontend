import React from 'react';

import { useParams } from 'react-router-dom';
import teams from '../../data/teams';

const TeamProfile = () => {
    const { teamName } = useParams();
    const team = teams?.find(p => p.name === "England");
    console.log(team)

    if (!teams) {
        return <div>Team not found</div>;
    }
    return (

        <>
            <div className="overflow-hidden ">
                <div className="grid grid-cols-1 justify-between items-start gap-1">
                    {/* Team Profile Section */}
                    <div className="border-t border-gray-300">
                        <div className="bg-customDarkBlue  flex text-xl font-bold justify-between text-white p-4">
                            <div className="text-2xl  my-auto font-bold text-white">{team.name}</div>
                            <img className="h-10  border-gray-300"
                                src={team.imgSrc} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default TeamProfile