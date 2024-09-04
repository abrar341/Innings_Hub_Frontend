import React, { useState } from 'react';
import NavigationTabs from './NaviagtionTabs';

const ScoreCard_Innings = () => {
    const batsmen = [
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

    const bowlers = [
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

    const fallOfWickets = [
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

    const handleTabClick = (index) => {
        const newTabs = tabs.map((tab, i) => ({
            ...tab,
            active: i === index,
        }));
        setTabs(newTabs);
        // Perform any additional logic when a tab is clicked
    };
    return (
        <>
            <NavigationTabs tabs={tabs} onTabClick={handleTabClick} />
            {/* Batting Section */}
            <div className="border rounded border-gray-300 mx-auto bg-white overflow-hidden ">
                <div className="bg-blue-500 flex justify-between text-white px-4 pb-2 pt-3">
                    <h1 className="text-xl font-bold">INDIA BATTING</h1>
                    <div className="flex items-end">
                        <p className="text-2xl font-bold">120/5</p>
                        <p className="font-bold text-lg ml-2">(20.0 overs)</p>
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
                        {batsmen.map((batsman, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 flex items-center">
                                    <img className="w-10 h-10 rounded-full mr-3" src={batsman.image} alt={batsman.name} />
                                    <div>
                                        <h5 className="font-bold text-gray-700">
                                            <a href="#" className="hover:underline">{batsman.name}</a>
                                        </h5>
                                        <p className="text-sm text-gray-400">{batsman.status}</p>
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-center">{batsman.runs}</td>
                                <td className="py-2 px-4 text-center">{batsman.balls}</td>
                                <td className="py-2 px-4 text-center">{batsman.fours}</td>
                                <td className="py-2 px-4 text-center">{batsman.sixes}</td>
                                <td className="py-2 px-4 text-center">{batsman.strikeRate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-4 border-b flex justify-between bg-gray-100 text-gray-700">
                    <p>Extras: 10 (b 1, lb 2, w 5, nb 2)</p>
                    <p className="font-bold text-lg">Total: 120</p>
                </div>

                <div className="p-4 bg-gray-50">
                    <h2 className="text-xl font-bold mb-2">Fall of Wickets</h2>
                    <div className="flex flex-wrap">
                        {fallOfWickets.map((wicket, index) => (
                            <div key={index} className="mr-4 mb-2 flex items-center bg-gray-100 px-3 py-1 rounded-lg">
                                <span className="font-bold">{wicket.score}</span>
                                <span className="text-gray-600 ml-1">({wicket.detail})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bowling Section */}
            <div className="border rounded border-gray-300 mx-auto bg-white overflow-hidden mt-6">
                <div className="bg-blue-500 flex justify-between text-white px-4 pb-2 pt-3">
                    <h1 className="text-xl font-bold">PAKISTAN BOWLING</h1>
                </div>
                <table className="w-full">
                    <thead className="bg-customDarkGray">
                        <tr>
                            <th className="py-2 px-4 text-left">Bowler</th>
                            <th className="py-2 px-4 text-center">O</th>
                            <th className="py-2 px-4 text-center">M</th>
                            <th className="py-2 px-4 text-center">R</th>
                            <th className="py-2 px-4 text-center">W</th>
                            <th className="py-2 px-4 text-center">Econ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bowlers.map((bowler, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 flex items-center">
                                    <img className="w-10 h-10 rounded-full mr-3" src={bowler.image} alt={bowler.name} />
                                    <div>
                                        <h5 className="font-bold text-gray-700">
                                            <a href="#" className="hover:underline">{bowler.name}</a>
                                        </h5>
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-center">{bowler.overs}</td>
                                <td className="py-2 px-4 text-center">{bowler.maidens}</td>
                                <td className="py-2 px-4 text-center">{bowler.runs}</td>
                                <td className="py-2 px-4 text-center">{bowler.wickets}</td>
                                <td className="py-2 px-4 text-center">{bowler.economy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ScoreCard_Innings;
