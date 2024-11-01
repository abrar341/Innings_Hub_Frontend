import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import NavigationTabs from './NaviagtionTabs';

const PlayingEleven = () => {
    const context = useOutletContext();
    let matchInfo = context;

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
    const activePlayers = tabs?.[0].active ? team1Players : team2Players;

    return (
        <>
            <NavigationTabs tabs={tabs} onTabClick={handleTabClick} />

            <div className=" min-h-screen  dark:text-gray-300 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {activePlayers?.map((player) => (
                        <div
                            key={player._id}
                            className="relative  p-4 border-gray-400 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 "
                        >
                            <div className="flex flex-col items-center">
                                <img
                                    className="w-12 h-12 mb-2 rounded-full"
                                    src={player?.profilePicture || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-photo-placeholder-icon-grey-profile-picture-businessman-no-face-free-vector.jpg'}
                                    alt={player.name}
                                />
                                <p className="font-semibold text-center dark:text-gray-300">{player?.playerName}</p>
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">{player?.role}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PlayingEleven;
