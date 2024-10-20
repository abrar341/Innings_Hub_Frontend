import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import NavigationTabs from './NaviagtionTabs';

const PlayingEleven = () => {
    const context = useOutletContext();
    let matchInfo = context;
    console.log(matchInfo?.playing11);

    const team1Players = matchInfo?.playing11[0]?.players || [];
    const team2Players = matchInfo?.playing11[1]?.players || [];

    const [tabs, setTabs] = useState([
        { label: `${matchInfo?.playing11[0]?.team?.teamName}`, active: true },
        { label: `${matchInfo?.playing11[1]?.team?.teamName}`, active: false },
    ]);

    const handleTabClick = (index) => {
        const newTabs = tabs.map((tab, i) => ({
            ...tab,
            active: i === index,
        }));
        setTabs(newTabs);
    };

    // Determine which team’s players to display based on active tab
    const activePlayers = tabs[0].active ? team1Players : team2Players;

    return (
        <>
            <NavigationTabs tabs={tabs} onTabClick={handleTabClick} />

            <div className="bg-white min-h-screen px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {activePlayers.map((player, index) => (
                        <div key={index} className="border p-4 grid grid-cols-3 gap-4">
                            <div>
                                <img
                                    className="h-10 w-10 rounded-full mx-auto object-cover"
                                    src={player?.profilePicture || 'https://via.placeholder.com/100'}
                                    alt={player.playerName}
                                />
                            </div>
                            <div className="player-name self-center col-span-2">
                                <h3 className="text-sm sm:text-base font-medium">{player.playerName}</h3>
                                <p className="text-sm text-gray-500">{player.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PlayingEleven;
