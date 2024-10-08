import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
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

    // State to manage the currently selected inning (1 or 2), initialized as null
    const [currentInningIndex, setCurrentInningIndex] = useState(null);

    // Function to handle tab click and set the current inning
    const handleTabClick = (index) => {
        setCurrentInningIndex(index);
    };

    // Tabs configuration for innings
    const tabs = [
        { label: 'Inning 1', active: currentInningIndex === 0 },
        { label: 'Inning 2', active: currentInningIndex === 1 }
    ];

    // Accessing the current inning's data
    const currentInning = matchInfo?.innings?.[currentInningIndex];
    const opposition = (currentInningIndex === 0 ? matchInfo?.innings?.[1]?.team : matchInfo?.innings?.[0]?.team);



    const batsmen = currentInning?.battingPerformances;
    const bowlers = currentInning?.bowlingPerformances;
    const fallOfWickets = currentInning?.fallOfWickets;

    // Handling overs and balls information for the last ball
    const lastOverIndex = currentInning?.overs?.length ? currentInning.overs.length - 1 : 0;
    const lastOver = currentInning?.overs?.[lastOverIndex];
    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;

    return (
        <>

            <NavigationTabs tabs={tabs} onTabClick={handleTabClick} />

            {/* Batting Section */}
            <div className="border rounded border-gray-300 mx-auto bg-white overflow-hidden ">
                <div className="bg-blue-500 flex justify-between text-white px-4 pb-2 pt-3">
                    <h1 className="text-xl font-bold">{currentInning?.team?.teamName} BATTING</h1>
                    <div className="flex items-end">
                        <p className="text-2xl font-bold">{currentInning?.runs}/{currentInning?.wickets}</p>
                        <p className="font-bold text-lg ml-2">{currentInning?.overs?.length > 0 ? currentInning?.overs?.length - 1 : 0}.{lastBallNumber || 0}</p>
                    </div>
                </div>

                <table className="w-full">
                    <thead className="bg-customDarkGray">
                        <tr>
                            <th className="py-2 px-4 text-left">Batsman</th>
                            <th className="py-2 px-4 text-center">R</th>
                            <th className="py-2 px-4 text-center">B</th>
                            <th className="py-2 px-4 text-center">4s</th>
                            <th className="py-2 px-4 text-center">6s</th>
                            <th className="py-2 px-4 text-center">S/R</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batsmen?.map((batsman, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 flex items-center">
                                    <img className="w-10 h-10 rounded-full mr-3" src={batsman?.player.profilePicture} alt={batsman?.playerName} />
                                    {batsman?.player?._id === currentInning?.currentStriker?._id ? (
                                        <span className='px-3 py-2 font-bold '>*</span>
                                    ) : <span className='px-3 py-2 font-bold '></span>
                                    }

                                    <div>
                                        <h5 className="font-bold text-gray-700">
                                            <a href="#" className="hover:underline">{batsman?.player?.playerName}</a>
                                        </h5>
                                        <p className="text-sm text-gray-400 ">{batsman?.bowler?.playerName || ""} {batsman?.dismissalType || ""}  {batsman?.fielder?.playerName}</p>
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-center">{batsman?.runs}</td>
                                <td className="py-2 px-4 text-center">{batsman.ballsFaced}</td>
                                <td className="py-2 px-4 text-center">{batsman.fours}</td>
                                <td className="py-2 px-4 text-center">{batsman.sixes}</td>
                                <td className="py-2 px-4 text-center">{batsman.runs > 0 ? `${(batsman.runs / batsman.ballsFaced * 100).toFixed(2)} ` : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-4 bg-gray-50">
                    <h2 className="text-xl font-bold mb-3">Fall of Wickets</h2>
                    <div className="flex flex-wrap">
                        {fallOfWickets?.map((wicket, index) => (
                            <div key={index} className="mr-4 mb-2 flex items-center bg-gray-100 px-3 py-1 rounded-lg">
                                <span className="text-gray-700 font-bold">{index + 1}-{wicket.runs}</span>
                                <span className="text-gray-600 ml-1">{`(${wicket.batsmanOut?.playerName}, ${wicket?.over}.${wicket?.ball})`}</span>
                            </div>
                        ))}
                    </div >
                </div >
            </div>

            {/* Bowling Section */}
            <div className="border rounded border-gray-300 mx-auto bg-white overflow-hidden mt-6">
                <div className="bg-blue-500 flex justify-between text-white px-4 pb-2 pt-3">
                    <h1 className="text-xl font-bold">{opposition?.teamName} BOWLING</h1>
                </div>
                <table className="w-full">
                    <thead className="bg-customDarkGray">
                        <tr>
                            <th className="py-2 px-4 text-left">Bowler</th>
                            <th className="py-2 px-4 text-center">O</th>
                            <th className="py-2 px-4 text-center">R</th>
                            <th className="py-2 px-4 text-center">W</th>
                            <th className="py-2 px-4 text-center">Econ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bowlers?.map((bowler, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 flex items-center">
                                    <img className="w-10 h-10 rounded-full mr-3" src={bowler?.player.profilePicture} alt={bowler.name} />
                                    <div>
                                        <h5 className="font-bold text-gray-700">
                                            <a href="#" className="hover:underline">{bowler?.player.playerName}</a>
                                        </h5>
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-center">{Math.floor(bowler.balls / 6) + (bowler.balls % 6) / 10}</td>
                                <td className="py-2 px-4 text-center">{bowler.runsConceded}</td>
                                <td className="py-2 px-4 text-center">{bowler.wickets}</td>
                                <td className="py-2 px-4 text-center">{bowler.runsConceded > 0 ? ((bowler.runsConceded) / (Math.floor(bowler.balls / 6) + (bowler.balls % 6) / 10)).toFixed(2) : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ScoreCard_Innings;
