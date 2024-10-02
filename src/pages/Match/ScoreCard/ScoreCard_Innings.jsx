import React, { useState } from 'react';
import NavigationTabs from './NaviagtionTabs';
import { useOutletContext } from 'react-router-dom';

const ScoreCard_Innings = () => {
    const context = useOutletContext();
    let matchInfo = context;
    const batsme1n = [
        {
            name: 'Rohit Sharma',
            status: 'c Ahmed b Nawaz',
            runs: 12,
            balls: 18,
            fours: 0,
            sixes: 1,
            strikeRate: 66.67,
            image: 'https://d2l63a9diffym2.cloudfront.net/players/KXomLmv0cP0VsIW4yElQeLDHsjKTP760B0KnpUVg.png',
        },
        {
            name: 'Virat Kohli',
            status: 'c Ahmed b Nawaz',
            runs: 34,
            balls: 22,
            fours: 4,
            sixes: 2,
            strikeRate: 154.55,
            image: 'https://d2l63a9diffym2.cloudfront.net/players/KXomLmv0cP0VsIW4yElQeLDHsjKTP760B0KnpUVg.png',
        },
        {
            name: 'Rohit Sharma',
            status: 'c Ahmed b Nawaz',
            runs: 12,
            balls: 18,
            fours: 0,
            sixes: 1,
            strikeRate: 66.67,
            image: 'https://d2l63a9diffym2.cloudfront.net/players/KXomLmv0cP0VsIW4yElQeLDHsjKTP760B0KnpUVg.png',
        },
        {
            name: 'Virat Kohli',
            status: 'c Ahmed b Nawaz',
            runs: 34,
            balls: 22,
            fours: 4,
            sixes: 2,
            strikeRate: 154.55,
            image: 'https://d2l63a9diffym2.cloudfront.net/players/KXomLmv0cP0VsIW4yElQeLDHsjKTP760B0KnpUVg.png',
        },
        {
            name: 'Rohit Sharma',
            status: 'c Ahmed b Nawaz',
            runs: 12,
            balls: 18,
            fours: 0,
            sixes: 1,
            strikeRate: 66.67,
            image: 'https://d2l63a9diffym2.cloudfront.net/players/KXomLmv0cP0VsIW4yElQeLDHsjKTP760B0KnpUVg.png',
        },
        {
            name: 'Virat Kohli',
            status: 'c Ahmed b Nawaz',
            runs: 34,
            balls: 22,
            fours: 4,
            sixes: 2,
            strikeRate: 154.55,
            image: 'https://d2l63a9diffym2.cloudfront.net/players/KXomLmv0cP0VsIW4yElQeLDHsjKTP760B0KnpUVg.png',
        },
        // Add more batsmen as needed
    ];

    const bowlers1 = [
        {
            name: 'Naseem Shah',
            overs: 10,
            maidens: 2,
            runs: 40,
            wickets: 3,
            economy: 4.00,
            image: 'https://d2l63a9diffym2.cloudfront.net/players/placeholder.png',
        },
        {
            name: 'Umar Gul',
            overs: 8,
            maidens: 1,
            runs: 30,
            wickets: 2,
            economy: 3.75,
            image: 'https://d2l63a9diffym2.cloudfront.net/players/placeholder.png',
        },
        // Add more bowlers as needed
    ];

    const fallOfWickets1 = [
        { score: '1-23', detail: 'Rohit Sharma, 4.1 ov' },
        { score: '2-45', detail: 'KL Rahul, 9.3 ov' },
        { score: '3-98', detail: 'Virat Kohli, 19.6 ov' },
        { score: '4-120', detail: 'Ravindra Jadeja, 24.4 ov' },
        { score: '5-150', detail: 'Suryakumar Yadav, 30.5 ov' },
    ];

    const [tabs, setTabs] = useState([
        { label: 'Kenya Innings', active: true },
        { label: 'Nigeria Innings', active: false },
    ]);
    const batsmen = matchInfo?.innings?.[matchInfo?.currentInning - 1]?.battingPerformances;
    const bowlers = matchInfo?.innings?.[matchInfo?.currentInning - 1]?.bowlingPerformances;
    const fallOfWickets = matchInfo?.innings?.[matchInfo?.currentInning - 1]?.fallOfWickets;
    const handleTabClick = (index) => {
        const newTabs = tabs.map((tab, i) => ({
            ...tab,
            active: i === index,
        }));
        setTabs(newTabs);
        // Perform any additional logic when a tab is clicked
    };
    const currentInning1 = matchInfo?.innings?.[matchInfo?.currentInning - 1];
    const lastOverIndex = currentInning1?.overs?.length ? currentInning1.overs.length - 1 : 0;
    const lastOver = currentInning1?.overs?.[lastOverIndex];
    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;

    return (
        <>
            <NavigationTabs tabs={tabs} onTabClick={handleTabClick} />
            {/* Batting Section */}
            <div className="border rounded border-gray-300 mx-auto bg-white overflow-hidden ">
                <div className="bg-blue-500 flex justify-between text-white px-4 pb-2 pt-3">
                    <h1 className="text-xl font-bold">INDIA BATTING</h1>
                    <div className="flex items-end">
                        <p className="text-2xl font-bold">{matchInfo?.innings?.[0]?.runs}/{matchInfo?.innings?.[0]?.wickets}</p>
                        <p className="font-bold text-lg ml-2">{matchInfo?.innings?.[0]?.overs?.length - 1}.{lastBallNumber || 0}</p>
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
                                    {batsman?.player?._id === matchInfo?.innings?.[0]?.currentStriker?._id ? (
                                        <span className='px-3 py-2 font-bold '>*</span>
                                    ) : <span className='px-3 py-2 font-bold '></span>
                                    }

                                    <div>
                                        <h5 className="font-bold text-gray-700">
                                            <a href="#" className="hover:underline">{batsman?.player?.playerName}</a>
                                        </h5>
                                        <p className="text-sm text-gray-400 ">{batsman?.bowler?.playerName || ""} {batsman?.dismissalType || ""} - {batsman?.dismissalType === 'Caught' || batsman?.dismissalType === 'Run Out' && batsman?.fielder?.playerName}</p>
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-center">{batsman?.runs}</td>
                                <td className="py-2 px-4 text-center">{batsman.ballsFaced}</td>
                                <td className="py-2 px-4 text-center">{batsman.fours}</td>
                                <td className="py-2 px-4 text-center">{batsman.sixes}</td>
                                <td className="py-2 px-4 text-center">{`${(batsman.runs / batsman.ballsFaced * 100).toFixed(2)} ` || 0}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <div className="p-4 border-b flex justify-between bg-gray-100 text-gray-700">
                    <p>Extras: 10 (b 1, lb 2, w 5, nb 2)</p>
                    <p className="font-bold text-lg">Total: 120</p>
                </div> */}

                <div className="p-4 bg-gray-50 ">
                    <h2 className="text-xl font-bold mb-3">Fall of Wickets</h2>
                    <div className="flex flex-wrap">
                        {fallOfWickets?.map((wicket, index) => (
                            <div key={index} className="mr-4 mb-2 flex items-center bg-gray-100 px-3 py-1 rounded-lg">
                                <span className="text-gray-700 font-bold">{index + 1}-{wicket.runs}</span>
                                <span className="text-gray-600 ml-1">{`(${wicket.batsmanOut?.playerName}, ${wicket?.over}.${wicket?.ball})`}</span>
                                <span className="text-gray-600 ml-1">({wicket.detail})</span>
                            </div>
                        ))}
                    </div >
                </div >
            </div>

            {/* Bowling Section */}
            <div className="border rounded border-gray-300 mx-auto bg-white overflow-hidden mt-6" >
                <div className="bg-blue-500 flex justify-between text-white px-4 pb-2 pt-3">
                    <h1 className="text-xl font-bold">PAKISTAN BOWLING</h1>
                </div>
                <table className="w-full">
                    <thead className="bg-customDarkGray">
                        <tr>
                            <th className="py-2 px-4 text-left">Bowler</th>
                            <th className="py-2 px-4 text-center">O</th>
                            {/* <th className="py-2 px-4 text-center">M</th> */}
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
                                {/* <td className="py-2 px-4 text-center">{bowler.maidens}</td> */}
                                <td className="py-2 px-4 text-center">{bowler.runsConceded}</td>
                                <td className="py-2 px-4 text-center">{bowler.wickets}</td>
                                <td className="py-2 px-4 text-center">{((bowler.runsConceded) / (Math.floor(bowler.balls - 1 / 6) + (bowler.balls % 6) / 6)).toFixed(2) || "0"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ScoreCard_Innings;
