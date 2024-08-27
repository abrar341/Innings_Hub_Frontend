import React, { useEffect } from 'react';

import players from '../../data/players'
import { useParams } from 'react-router-dom';


const playerData = {
    profile: {
        name: 'VIRAT KOHLI',
        country: 'INDIA',
        image: 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170661/rohit-sharma.jpg',
    },
    personalInfo: {
        born: 'Nov 05, 1988',
        birthPlace: 'Delhi',
        height: "5' 9\"",
        role: 'Batsman',
        battingStyle: 'Right Handed',
        bowlingStyle: 'Right-arm medium',
    },
    careerInfo: {
        teams: ['India', 'Delhi', 'Royal Challengers Bengaluru', 'India U19', 'Asia XI'],
    },
    battingCareer: [
        { format: 'Test', matches: 113, innings: 191, runs: 8848, average: 49.16, strikeRate: 55.56, hundreds: 29, fifties: 30 },
        { format: 'ODI', matches: 292, innings: 280, runs: 13848, average: 58.68, strikeRate: 93.59, hundreds: 50, fifties: 72 },
        { format: 'T20I', matches: 125, innings: 117, runs: 4188, average: 48.7, strikeRate: 137.04, hundreds: 1, fifties: 38 },
        { format: 'IPL', matches: 252, innings: 244, runs: 8004, average: 38.67, strikeRate: 131.97, hundreds: 8, fifties: 55 },
    ],
    bowlingCareer: [
        { format: 'Test', matches: 113, innings: 11, runs: 84, wickets: 0, best: '0/0', economy: 2.88 },
        { format: 'ODI', matches: 292, innings: 50, runs: 680, wickets: 5, best: '1/13', economy: 6.16 },
        { format: 'T20I', matches: 125, innings: 13, runs: 204, wickets: 4, best: '1/13', economy: 8.05 },
        { format: 'IPL', matches: 252, innings: 26, runs: 368, wickets: 4, best: '2/25', economy: 8.80 },
    ],
};

const PlayerProfile = () => {
    const { name } = useParams();
    const player = players.find(p => p.name === name);
    console.log(name)
    console.log(player)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!player) {
        return <div>Player not found</div>;
    }
    return (
        <div className="max-w-4xl  mx-auto overflow-hidden ">
            <div className="grid grid-cols-1 md:grid-cols-2   justify-between items-start mb-4 gap-1">
                {/* Player Profile Section */}
                <div className="flex flex-col justify-between  border md:min-h-[336.667px] border-gray-300">
                    <div className="bg-customDarkBlue flex text-xl font-bold justify-between text-white p-4">
                        <div className="text-xl font-bold text-white">{player.name}</div>
                        <div className="text-lg text-white">{player.country}</div>
                    </div>
                    <div className='flex justify-center w-a items-center p-4'>
                        <img className="h-38 w-38 self-center mr-4 rounded-full border-4 border-customDarkBlue" src={player.image} alt={playerData.profile.name} />
                        <img className="h-20 mb-2  shadow-md"
                            src="https://dnd3y8e5nonx2.cloudfront.net/teams/avatars/33718/1697119124/profile."
                            alt="India Logo" />
                    </div>
                    <div className='flex border-t p-4 border-gray-300 justify-center items-center gap-2'>
                        <img
                            className="h-6  group-hover:scale-105 transition duration-300 ease-in"
                            src={player.roleImg}
                            alt="India Logo"
                        />
                        <div className="text-sm font-bold group-hover:scale-105 transition duration-300 ease-in">{player.role}</div>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="border border-gray-300  overflow-hidden">
                    <div className="bg-customDarkBlue flex items-center justify-between text-white p-4 ">
                        <span className="text-xl font-bold">Personal Information</span>
                    </div>
                    <div className="text-base text-gray-700 p-4">
                        {Object.entries(playerData.personalInfo).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                                <div className="flex items-center space-x-2">
                                    <strong className="capitalize text-gray-800">{key.replace(/([A-Z])/g, ' $1')}:</strong>
                                </div>
                                <span className="text-right">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>



            </div>

            {/* Career Information Section */}
            <div className="flex flex-col gap-2">
                <div className="bg-customDarkBlue flex text-2xl font-bold justify-between text-white p-4">Career Information</div>
                <div className="border border-gray-300  overflow-hidden">
                    <div className="bg-gray-300 p-4 ">
                        <h2 className="text-xl font-bold">Teams</h2>
                    </div>
                    <div className="p-4 bg-white">
                        <div className="flex gap-x-6 flex-wrap">
                            {playerData.careerInfo.teams.map((team, index) => (
                                <div key={index} className="flex-shrink-0 text-start	">
                                    <span className="text-gray-800 font-semibold">{team}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Batting Career Summary Section */}
                <div className=" border border-gray-300">
                    <div className="text-xl font-bold bg-gray-300 p-4 text-black p-4">Batting Career Summary</div>
                    <div className="overflow-x-auto hide-scrollbar">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-customDarkGray">
                                <tr>
                                    <th className="px-4 py-2">Format</th>
                                    <th className="px-4 py-2">M</th>
                                    <th className="px-4 py-2">Inn</th>
                                    <th className="px-4 py-2">Runs</th>
                                    <th className="px-4 py-2">Avg</th>
                                    <th className="px-4 py-2">SR</th>
                                    <th className="px-4 py-2">100</th>
                                    <th className="px-4 py-2">50</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {playerData.battingCareer.map((career, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 font-bold">{career.format}</td>
                                        <td className="px-4 py-2">{career.matches}</td>
                                        <td className="px-4 py-2">{career.innings}</td>
                                        <td className="px-4 py-2">{career.runs}</td>
                                        <td className="px-4 py-2">{career.average}</td>
                                        <td className="px-4 py-2">{career.strikeRate}</td>
                                        <td className="px-4 py-2">{career.hundreds}</td>
                                        <td className="px-4 py-2">{career.fifties}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bowling Career Summary Section */}
                <div className=" border border-gray-300">
                    <div className="text-xl font-bold bg-customDarkBlue p-4 bg-gray-300 p-4 text-black">Bowling Career Summary</div>
                    <div className="overflow-x-auto hide-scrollbar">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-customDarkGray">
                                <tr>
                                    <th className="px-4 py-2">Format</th>
                                    <th className="px-4 py-2">M</th>
                                    <th className="px-4 py-2">Inn</th>
                                    <th className="px-4 py-2">Runs</th>
                                    <th className="px-4 py-2">Wkts</th>
                                    <th className="px-4 py-2">BBI</th>
                                    <th className="px-4 py-2">Econ</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {playerData.bowlingCareer.map((career, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{career.format}</td>
                                        <td className="px-4 py-2">{career.matches}</td>
                                        <td className="px-4 py-2">{career.innings}</td>
                                        <td className="px-4 py-2">{career.runs}</td>
                                        <td className="px-4 py-2">{career.wickets}</td>
                                        <td className="px-4 py-2">{career.best}</td>
                                        <td className="px-4 py-2">{career.economy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PlayerProfile