import React, { useState } from 'react';

const ScoreCard_Header = () => {
    const [scores, setScores] = useState({
        homeTeam: { name: 'INDIA', runs: '305/5', overs: '50.0', status: 'Won by 28 runs' },
        awayTeam: { name: 'PAKISTAN', runs: '277/10', overs: '46.1' },
    });

    return (
        <div className="mx-auto bg-white border border-gray-300 overflow-hidden mb-6">
            <div className=" p-4 py-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-300 bg-gray-50">
                <div
                    className="flex md:flex-col lg:flex-row px-4 border-gray-400 min-w-[350px] gap-20 md:gap-0 lg:gap-20 items-center py-6">
                    <a href="/teams/33718">
                        <img className="w-20 mb-2 "
                            src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/381800/381891.png"
                            alt="India Logo" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{scores.homeTeam.name}</h1>
                        <div className="text-sm text-gray-600 font-semibold">Runs: <span
                            className="text-gray-800 font-bold text-lg">{scores.homeTeam.runs}</span></div>
                        <div className="text-sm text-gray-600 font-semibold">Overs: <span
                            className="text-gray-700 text-lg">{scores.homeTeam.overs}</span></div>
                    </div>
                </div>
                <span className='border-2 text-base font-semibold  w-12 flex justify-center items-center h-12 w-12 rounded-full p-4'>V/S</span>
                <div className="flex md:flex-col lg:flex-row px-4 border-gray-400 min-w-[350px] gap-20 md:gap-0 lg:gap-20 items-center py-6">
                    <a href="/teams/33781" data-team-id="33781">
                        <img className="w-20 mb-2 "
                            src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/340400/340493.png"
                            alt="Pakistan Logo" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1" itemProp="name">{scores.awayTeam.name}</h1>
                        <div className="text-sm text-gray-600 font-semibold">Runs: <span
                            className="text-gray-800 font-bold text-lg">{scores.awayTeam.runs}</span></div>
                        <div className="text-sm text-gray-600 font-semibold">Overs: <span
                            className="text-gray-700 text-lg">{scores.awayTeam.overs}</span></div>
                    </div>
                </div>
            </div>
            <div itemProp="description" className="bg-gray-100 p-4 text-center">
                <h1 className="text-sm font-bold text-gray-800">{scores.homeTeam.status}</h1>
            </div>
        </div>
    );
};

export default ScoreCard_Header;
