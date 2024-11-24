import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlayerByIdQuery } from '../../slices/player/playerApiSlice';


const playerData = {
    profile: {
        name: 'VIRAT KOHLI',
        country: 'INDIA',
        image: 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170661/rohit-sharma.jpg',
        roleImg: 'https://www.iplt20.com/assets/images/teams-batsman-icon.svg'
    },
    personalInfo: {
        born: 'Nov 05, 1988',
        role: 'Batsman',
        battingStyle: 'Right Handed',
        bowlingStyle: 'Right-arm medium',
    },
    careerInfo: {
        teams: ['India', 'Delhi', 'Royal Challengers Bengaluru', 'India U19', 'Asia XI'],
    },
    battingCareer: [
        { format: '200', matches: 113, innings: 191, runs: 8848, average: 49.16, strikeRate: 55.56, hundreds: 29, fifties: 30 },
        // { format: '200', matches: 292, innings: 280, runs: 13848, average: 58.68, strikeRate: 93.59, hundreds: 50, fifties: 72 },
        // { format: '200', matches: 125, innings: 117, runs: 4188, average: 48.7, strikeRate: 137.04, hundreds: 1, fifties: 38 },
        // { format: '200', matches: 252, innings: 244, runs: 8004, average: 38.67, strikeRate: 131.97, hundreds: 8, fifties: 55 },
    ],
    bowlingCareer: [
        { format: 'Test', matches: 113, innings: 11, runs: 84, wickets: 0, best: '0/0', economy: 2.88 },
        // { format: 'ODI', matches: 292, innings: 50, runs: 680, wickets: 5, best: '1/13', economy: 6.16 },
        // { format: 'T20I', matches: 125, innings: 13, runs: 204, wickets: 4, best: '1/13', economy: 8.05 },
        // { format: 'IPL', matches: 252, innings: 26, runs: 368, wickets: 4, best: '2/25', economy: 8.80 },
    ],
};
const getRoleImageUrl = (role) => {
    const normalizedRole = role?.toLowerCase().replace(" ", "-");
    return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
};
function formatDate(dateString) {
    console.log(dateString);

    const dateObject = new Date(dateString);

    // Check if date is valid
    if (isNaN(dateObject)) {
        // If it's invalid, return the original string (it might already be formatted)
        return dateString;
    }

    // If valid, format the date
    return dateObject.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
}
const PlayerProfile = () => {
    const { id } = useParams();
    // const id = "66e88fb78e0e4e9fd26654bb";
    console.log(id);

    const { data } = useGetPlayerByIdQuery(id);
    const playerInfo = data?.data;
    console.log(playerInfo);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const player = playerData;

    return (
        <div className="p-4 mx-auto bg-white shadow-md rounded-lg dark:bg-gray-800">
            {/* Player Profile Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4  mb-3">
                <div className="flex flex-col justify-between bg-gray-50 border rounded shadow-md overflow-hidden dark:bg-gray-700">
                    <div className="bg-customDark uppercase bg-blue-500 text-white text-center text-lg font-extrabold p-4 dark:bg-blue-600">
                        {playerInfo?.playerName}
                    </div>
                    <div className="flex justify-center items-center items-center  gap-4 items-center p-6">
                        <img className="w-36 h-36 rounded-full border-2 border-blue-900 object-cover dark:border-blue-500"
                            src={playerInfo?.profilePicture || "http://res.cloudinary.com/dm01cdawj/image/upload/v1731596356/jqtqcjuezidhg3ij5mw4.png"} alt={player.profile.name} />
                        <img src={playerInfo?.currentTeam?.teamLogo} className="w-36 opacity-80 rounded-full" alt="" />

                    </div>
                    <div className="bg-gray-100 p-4 flex justify-center items-center gap-2 border-t dark:bg-gray-600">
                        <img className="h-6" src={getRoleImageUrl(playerInfo?.role)} alt="Role" />
                        <span className="text-sm text-gray-800 font-bold dark:text-gray-200">{playerInfo?.role}</span>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="bg-gray-50 rounded shadow-md overflow-hidden dark:bg-gray-700">
                    <div className="bg-blue-500 text-white text-lg font-bold p-4 dark:bg-blue-600">
                        Personal Information
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between py-2 border-b dark:border-gray-500">
                            <span className="font-semibold text-gray-800 dark:text-gray-300">Born:</span>
                            <span className="text-gray-700 dark:text-gray-200">{formatDate(playerInfo?.DOB)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b dark:border-gray-500">
                            <span className="font-semibold text-gray-800 dark:text-gray-300">Role:</span>
                            <span className="text-gray-700 dark:text-gray-200">{playerInfo?.role}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b dark:border-gray-500">
                            <span className="font-semibold text-gray-800 dark:text-gray-300">Batting Style:</span>
                            <span className="text-gray-700 dark:text-gray-200">{playerInfo?.battingStyle || "-"}</span>
                        </div>
                        <div className="flex justify-between py-2 dark:border-gray-500">
                            <span className="font-semibold text-gray-800 dark:text-gray-300">Bowling Style:</span>
                            <span className="text-gray-700 dark:text-gray-200">{playerInfo?.bowlingStyle || "-"}</span>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1 bg-gray-50 rounded shadow-md overflow-hidden dark:bg-gray-700">
                    <div className="bg-blue-500 text-white text-lg font-bold p-4 dark:bg-blue-600">
                        Teams
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 p-2">
                        {playerInfo?.teams.map((team, index) => (
                            <div
                                key={index}
                                className={`text-sm font-semibold rounded px-4 py-2 ${team?.teamName === playerInfo?.currentTeam?.teamName
                                    ? 'bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-300'
                                    : 'bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                {team?.teamName}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Career Information Section */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded mb-2">
                <div className="bg-blue-500 dark:bg-blue-600 rounded text-white text-2xl font-bold p-4">
                    Career Information
                </div>
            </div>

            {/* Batting Career Summary Section */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded mb-2">
                <div className="bg-blue-500 dark:bg-blue-600 text-xl text-white font-bold p-4 rounded">
                    Batting Career Summary
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                {['Matches', 'Inn', 'Runs', 'HS', 'Avg', 'SR', '100', '50'].map((header) => (
                                    <th key={header} className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {player.battingCareer.map((career, index) => (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.matches}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.battingInnings}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.runs}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.highestScore}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                        {playerInfo?.stats.runs / (playerInfo?.stats.battingInnings || 1)}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                        {((playerInfo?.stats.runs / playerInfo?.stats.ballFaced) * 100 || 0).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.centuries}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.halfCenturies}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Bowling Career Summary Section */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded">
                <div className="rounded bg-blue-500 dark:bg-blue-600 text-xl text-white font-bold p-4">
                    Bowling Career Summary
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                {['Matches', 'Inn', 'Runs', 'Wkts', 'BBI', '5W', '10W', 'Avg'].map((header) => (
                                    <th key={header} className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {player.bowlingCareer.map((career, index) => (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {/* <td className="px-4 py-2 font-bold">{career.format}</td> */}
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.matches}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.bowlingInnings}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.runsConceded}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.wickets}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.BB}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.FiveWickets}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{playerInfo?.stats.TenWickets}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                        {playerInfo?.stats.wickets > 0
                                            ? (playerInfo?.stats.runsConceded / playerInfo?.stats.wickets).toFixed(2)
                                            : "0"}
                                    </td>
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
