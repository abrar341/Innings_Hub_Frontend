import React from 'react';

const MatchSummary = () => {
    const teams = [
        {
            name: 'Scotland',
            score: '154/9',
            overs: '20 overs',
            batting: [
                {
                    name: 'George Munsey',
                    stats: '28 (16)',
                },
                {
                    name: 'Matthew Cross',
                    stats: '27 (21)',
                },
            ],
            bowling: [
                {
                    name: 'Sean Abbott',
                    stats: '3/39 (4)',
                },
                {
                    name: 'Xavier Bartlett',
                    stats: '2/23 (4)',
                },
            ],
        },
        {
            name: 'Australia',
            score: '156/3',
            overs: '9.4 overs',
            batting: [
                {
                    name: 'Travis Head',
                    stats: '80 (25)',
                },
                {
                    name: 'Mitchell Marsh',
                    stats: '39 (12)',
                },
            ],
            bowling: [
                {
                    name: 'Mark Watt',
                    stats: '2/13 (2)',
                },
                {
                    name: 'Brandon McMullen',
                    stats: '1/25 (2)',
                },
            ],
        },
    ];

    return (
        <>
            <div className=" lg:grid grid-cols-2 space-y-4 lg:space-y-0  lg:gap-4 p-4 bg-gray-100">
                {teams.map((team, index) => (
                    <div key={index} className="bg-white  shadow-lg rounded overflow-hidden">
                        <div className=" text-gray-700 border-b px-4 py-2 flex justify-between items-center">
                            <h2 className="text-xl font-bold">{team.name}</h2>
                            <div className="text-right">
                                <span className="text-2xl font-bold">{team.score}</span>
                                <span className="block text-sm">{team.overs}</span>
                            </div>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-4">
                            <div className='border-r border-gray-600 p-2'>
                                <div className="space-y-2">
                                    {team.batting.map((player, playerIndex) => (
                                        <div
                                            key={playerIndex}
                                            className="flex justify-between items-center"
                                        >
                                            <span className="font-medium text-gray-700">
                                                {player.name}
                                            </span>
                                            <span className="text-gray-600">{player.stats}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="space-y-2">
                                    {team.bowling.map((player, playerIndex) => (
                                        <div
                                            key={playerIndex}
                                            className="flex justify-between items-center"
                                        >
                                            <span className="font-medium text-gray-700">
                                                {player.name}
                                            </span>
                                            <span className="text-gray-600">{player.stats}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-60 mx-auto'>
                <button className=' mx-auto border px-4 py-2 bg-blue-500 text-white font-semibold rounded'>View Full ScoreCard</button>
            </div>
        </>
    );
};

export default MatchSummary;
