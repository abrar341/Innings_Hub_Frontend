import React, { useState } from 'react';
import NavigationTabs from './NaviagtionTabs';
import { useOutletContext } from 'react-router-dom';

const PlayingEleven = () => {
    const context = useOutletContext();
    let matchInfo = context;
    console.log(matchInfo?.playing11[0]);

    const players = [
        {
            name: 'Abdul Khader',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/profile/placeholder-3.png',
        },
        {
            name: 'Adnan Ali Ali Husain',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/profile/placeholder-1.png',
        },
        {
            name: 'Awais Rafia',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/team/8B9xMVXmN2KWey73tVWzjTroZrvdGDwNJ2NuF1z5.png',
        },
        {
            name: 'Essam Sadaqat Ali',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/profile/placeholder-1.png',
        },
        {
            name: 'Kamran Allauddin',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/profile/placeholder-1.png',
        },
        {
            name: 'Sajid Mahmood',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/team/R03ncgyrw02u5XXB4vpvWApCTCVFYk8rihAxEmxG.png',
        },
        {
            name: 'Shahroz Tahir',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/profile/placeholder-3.png',
        },
        {
            name: 'Sohail Ahmad',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/team/ppEkVUpDwLTpGqmuHw19jN4UVEVt3c6zfd3YjVEc.png',
        },
        {
            name: 'Tahir Abbas',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/team/RddoD7zc3vk0J0zZnbVwGryt4BMUZNmLDbkmU9NL.png',
        },
        {
            name: 'Umer Salahuddin',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/profile/placeholder-2.png',
        },
        {
            name: 'Usman Sohail Aslam Mohammad',
            imgSrc: 'https://d2l63a9diffym2.cloudfront.net/profile/placeholder-2.png',
        },
    ];
    const [tabs, setTabs] = useState([
        { label: 'Royal Blue Club', active: true },
        { label: 'Royal Green Club', active: false },
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

            <div className="bg-white min-h-screen p-4 mb-4 ">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <h5 className="text-lg font-semibold">Royal Blue Club</h5>
                    <button className="text-gray-600 focus:outline-none">
                        <i className="fa fa-caret-up" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {matchInfo?.playing11[0].players.map((player, index) => (
                        <div key={index} className="border p-4 grid grid-cols-3 gap-4">
                            <div >
                                <img
                                    className="h-10 w-10 rounded-full mx-auto  object-cover"
                                    src={player.imgSrc}
                                    alt={player.playerName}
                                />
                            </div>
                            <div className="player-name self-center col-span-2">
                                <h3 className="text-sm sm:text-base font-medium">{player.playerName}</h3>
                                <p className='text-sm text-gray-500'>{player.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PlayingEleven;
