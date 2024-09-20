import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const playerData = {
    profile: {
        name: 'VIRAT KOHLI',
        country: 'INDIA',
        image: 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170661/rohit-sharma.jpg',
        roleImg: 'https://www.iplt20.com/assets/images/teams-batsman-icon.svg'
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const player = playerData;

    return (
        <div className="p-4 mx-auto bg-white shadow-md rounded-lg">
            {/* Player Profile Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4  mb-3">
                <div className="flex flex-col justify-between bg-gray-50 border rounded shadow-md overflow-hidden">
                    <div className="bg-customDarkBlue text-white  text-center text-lg font-bold  p-4">{player.profile.name}
                    </div>
                    <div className="flex flex-col items-center p-6">
                        <img className="w-36 h-36 rounded-full border-4 border-blue-900 mb-4" src={player.profile.image} alt={player.profile.name} />
                    </div>
                    <div className="bg-gray-100 p-4 flex justify-center items-center gap-2 border-t">
                        <img className="h-6" src={player.profile.roleImg} alt="Role" />
                        <span className="text-sm text-gray-800 font-bold">{player.personalInfo.role}</span>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="bg-gray-50 rounded shadow-md overflow-hidden">
                    <div className="bg-customDarkBlue text-white  text-lg font-bold p-4">
                        Personal Information
                    </div>
                    <div className="p-4">
                        {Object.entries(player.personalInfo).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                                <span className="capitalize font-semibold text-gray-800">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="text-gray-700">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1 bg-gray-50 rounded shadow-md overflow-hidden">
                    <div className="bg-customDarkBlue text-white  text-lg font-bold p-4">
                        Teams
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 p-2">
                        {player.careerInfo.teams.map((team, index) => (
                            <div key={index} className="bg-gray-100 text-sm text-gray-900 rounded px-4 py-2">
                                {team}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Career Information Section */}
            <div className="bg-white shadow-md rounded mb-2">
                <div className="bg-customDarkBlue rounded text-white  text-2xl font-bold p-4">Career Information</div>

            </div>

            {/* Batting Career Summary Section */}
            <div className="bg-white shadow-md rounded mb-2">
                <div className="bg-gray-300 text-xl text-gray-700 font-bold p-4 rounded">Batting Career Summary</div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                {['Format', 'M', 'Inn', 'Runs', 'Avg', 'SR', '100', '50'].map((header) => (
                                    <th key={header} className="px-4 py-2 text-left">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {player.battingCareer.map((career, index) => (
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
            <div className="bg-white  shadow-md rounded">
                <div className="rounded bg-gray-300 text-xl text-gray-700 font-bold p-4">Bowling Career Summary</div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                {['Format', 'M', 'Inn', 'Runs', 'Wkts', 'BBI', 'Econ'].map((header) => (
                                    <th key={header} className="px-4 py-2 text-left">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {player.bowlingCareer.map((career, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 font-bold">{career.format}</td>
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
    );
};

export default PlayerProfile;
