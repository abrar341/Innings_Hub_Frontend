import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import NavigationTabs from './NaviagtionTabs';

const ScoreCard_Innings = () => {
    const context = useOutletContext();
    let matchInfo = context;
    useEffect(() => {
        if (matchInfo?.currentInning) {
            const current = matchInfo?.currentInning - 1;
            console.log(current);
            setCurrentInningIndex(current);
        }
    }, [matchInfo]);

    const [currentInningIndex, setCurrentInningIndex] = useState(null);

    const handleTabClick = (index) => {
        setCurrentInningIndex(index);
    };

    const tabs = [
        { label: 'Inning 1', active: currentInningIndex === 0 },
        { label: 'Inning 2', active: currentInningIndex === 1 }
    ];

    const currentInning = matchInfo?.innings?.[currentInningIndex];
    const opposition = (currentInningIndex === 0 ? matchInfo?.innings?.[1]?.team : matchInfo?.innings?.[0]?.team);

    const batsmen = currentInning?.battingPerformances;
    const bowlers = currentInning?.bowlingPerformances;
    const fallOfWickets = currentInning?.fallOfWickets;

    const lastOverIndex = currentInning?.overs?.length ? currentInning.overs.length - 1 : 0;
    const lastOver = currentInning?.overs?.[lastOverIndex];
    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;

    return (
        <>
            <NavigationTabs tabs={tabs} onTabClick={handleTabClick} />

            {/* Batting Section */}
            <div className="border rounded border-gray-300 dark:border-gray-600 mx-auto bg-white dark:bg-gray-800 overflow-hidden">
                <div className="bg-blue-500 dark:bg-blue-700 flex justify-between text-white px-4 pb-2 pt-3">
                    <h1 className="text-xl font-bold">{currentInning?.team?.teamName} BATTING</h1>
                    <div className="flex items-end">
                        <p className="text-2xl font-bold">{currentInning?.runs}/{currentInning?.wickets}</p>
                        <p className="font-bold text-lg ml-2">{currentInning?.overs?.length > 0 ? currentInning?.overs?.length - 1 : 0}.{lastBallNumber || 0}</p>
                    </div>
                </div>

                <table className="w-full">
                    <thead className="bg-customDarkGray dark:bg-gray-700">
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Batsman</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">R</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">B</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">4s</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">6s</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">S/R</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batsmen?.map((batsman, index) => (
                            <tr key={index} className="border-b dark:border-gray-700">
                                <td className="py-2 px-4 flex items-center text-gray-800 dark:text-gray-200">
                                    <img className="w-10 h-10 rounded-full mr-3" src={batsman?.player.profilePicture || "http://res.cloudinary.com/dm01cdawj/image/upload/v1731596356/jqtqcjuezidhg3ij5mw4.png"} alt={batsman?.playerName} />
                                    {batsman?.player?._id === currentInning?.currentStriker?._id ? (
                                        <span className='px-3 py-2 font-bold'>*</span>
                                    ) : <span className='px-3 py-2 font-bold'></span>}
                                    <div>
                                        <h5 className="font-bold">
                                            <Link to={`/player/${batsman?.player?._id}`} className="hover:underline dark:text-gray-300">{batsman?.player?.playerName}</Link>
                                        </h5>
                                        <p className="text-sm text-gray-400 dark:text-gray-500">
                                            {batsman?.bowler?.playerName || ""} {batsman?.dismissalType || ""}  {batsman?.fielder?.playerName}
                                        </p>
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{batsman?.runs}</td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{batsman.ballsFaced}</td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{batsman.fours}</td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{batsman.sixes}</td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{batsman.runs > 0 ? `${(batsman.runs / batsman.ballsFaced * 100).toFixed(2)}` : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-4 bg-gray-50 dark:bg-gray-700">
                    <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">Fall of Wickets</h2>
                    <div className="flex flex-wrap">
                        {fallOfWickets?.map((wicket, index) => (
                            <div key={index} className="mr-4 mb-2 flex items-center bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300 font-bold">{index + 1}-{wicket.runs}</span>
                                <span className="text-gray-600 dark:text-gray-400 ml-1">{`(${wicket.batsmanOut?.playerName}, ${wicket?.over}.${wicket?.ball})`}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bowling Section */}
            <div className="border rounded border-gray-300 dark:border-gray-600 mx-auto bg-white dark:bg-gray-800 overflow-hidden mt-6">
                <div className="bg-blue-500 dark:bg-blue-700 flex justify-between text-white px-4 pb-2 pt-3">
                    <h1 className="text-xl font-bold">{opposition?.teamName} BOWLING</h1>
                </div>
                <table className="w-full">
                    <thead className="bg-customDarkGray dark:bg-gray-700">
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Bowler</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">O</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">R</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">W</th>
                            <th className="py-2 px-4 text-center text-gray-700 dark:text-gray-300">Econ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bowlers?.map((bowler, index) => (
                            <tr key={index} className="border-b dark:border-gray-700">
                                <td className="py-2 px-4 flex items-center text-gray-800 dark:text-gray-200">
                                    <img className="w-10 h-10 rounded-full mr-3" src={bowler?.player.profilePicture} alt={bowler.name} />
                                    <div>
                                        <h5 className="font-bold">
                                            <Link to={`/player/${bowler?.player?._id}`} className="hover:underline dark:text-gray-300">{bowler?.player.playerName}</Link>
                                        </h5>
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{Math.floor(bowler.balls / 6) + (bowler.balls % 6) / 10}</td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{bowler?.runsConceded}</td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{bowler?.wickets}</td>
                                <td className="py-2 px-4 text-center text-gray-800 dark:text-gray-200">{bowler?.runsConceded > 0 ? (bowler?.runsConceded / (bowler?.balls / 6)).toFixed(2) : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ScoreCard_Innings;
