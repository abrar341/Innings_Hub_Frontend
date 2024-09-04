import React from 'react';

const MatchInfo = () => {
    return (
        <div className="bg-white shadow-md  p-6  mx-auto">
            <ul className="space-y-6">
                <li className="flex justify-between items-center border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base">Tournament:</h6>
                    <p className="text-blue-600 hover:underline">
                        <a href="/match-central/competitions/5727/pakistan-super-league-psl1/overview">
                            Pakistan Super League (PSL1)
                        </a>
                    </p>
                </li>

                <li className="flex justify-between items-center border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base">Match </h6>
                    <p className="text-gray-700">PSL 1 - League Matches (MATCH # 2)</p>
                </li>

                <li className="flex justify-between items-center border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base">Venue</h6>
                    <p className="text-gray-700">Karachi National Stadium</p>
                </li>

                <li className="flex justify-between items-center border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base">Toss</h6>
                    <p className="text-gray-700">Pakistan won the toss and elected to bat</p>
                </li>

                <li className="border-b pb-4">
                    <h6 className="text-green-600 font-bold text-base mb-2">Match Officials</h6>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Umpire 1: Aleem Dar</li>
                        <li>Umpire 2: Richard Illingworth</li>
                    </ul>
                </li>

                <li className="flex justify-between items-center">
                    <h6 className="text-green-600 font-bold text-base">Match Status</h6>
                    <p className="text-gray-700">Ongoing</p>
                </li>
            </ul>
        </div>
    );
};

export default MatchInfo;
