import React from 'react';
import { useOutletContext } from 'react-router-dom';

const MatchInfo = () => {
    const context = useOutletContext();
    let matchInfo = context;
    console.log(matchInfo);
    const umpires = ['Umpire1', 'Umpire2']
    return (
        <div className="bg-white shadow-md  p-6  mx-auto">
            <ul className="space-y-6">
                <li className="flex justify-between items-center border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base">Tournament:</h6>
                    <p className="text-blue-600 hover:underline">
                        <a href="/match-central/competitions/5727/pakistan-super-league-psl1/overview">
                            {matchInfo?.tournament.name}
                        </a>
                    </p>
                </li>

                <li className="flex justify-between items-center border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base">Match </h6>
                    <p className="text-gray-700">{`${matchInfo?.teams[0].teamName} vs ${matchInfo?.teams[1].teamName}`}</p>
                </li>

                <li className="flex justify-between items-center border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base">Venue</h6>
                    <p className="text-gray-700">{matchInfo?.venue}</p>
                </li>

                <li className="flex justify-between items-center border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base">Toss</h6>
                    <p className="text-gray-700">{matchInfo?.toss?.teamName} win the toss and choose to {matchInfo?.tossDecision}</p>
                </li>

                <li className="border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base mb-2">Match Officials</h6>
                    <ul className="list-disc list-inside text-gray-700">
                        {
                            umpires.map((index) => {
                                return (

                                    <li>{index} : Richard Illingworth </li>
                                )

                            })
                        }
                    </ul>
                </li>

                <li className="flex justify-between items-center">
                    <h6 className="text-green-600 font-bold text-base">Match Status</h6>
                    <p className="text-gray-700">{matchInfo?.status}</p>
                </li>
            </ul>
        </div>
    );
};

export default MatchInfo;
