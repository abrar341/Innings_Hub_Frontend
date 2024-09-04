import React from 'react';
import { Link } from 'react-router-dom';

const Match_Card = ({ matchData }) => {
    return (
        <div className=" gap-10 overflow-hidden flex-shrink-0 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded-lg shadow-lg transform transition-transform duration-300 ">
            {/* Card Front */}
            <div className="px-4 py-2">
                <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                    <div className="text-gray-600 text-xs truncate">{matchData.matchDate} - {matchData.matchInfo}</div>
                </div>

                <div className="mt-4 space-y-4">
                    {matchData.teams.map((team, index) => (
                        <div className="flex items-center space-x-3" key={index}>
                            <img
                                className="w-10  shadow-lg hover:shadow-xl transition-shadow"
                                src={team.imgSrc}
                                alt={team.teamName}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                                }}
                            />
                            <div className="flex-1">
                                <span className="text-sm font-semibold text-gray-800">{team.teamShort}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-gray-900">{team.teamScore}</div>
                                <div className="text-xs text-gray-600">{team.teamOvers}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Match Status */}
            <div className={`bg-${getStatusColor(matchData.matchStatus)}-100 p-3 border-t border-gray-200`}>
                <p className={`text-xs truncate text-${getStatusColor(matchData.matchStatus)}-600`}>{matchData.matchStatus}</p>
            </div>

            {/* Action Buttons */}
            <div className=" flex justify-center bottom-0 bg-gray-100 p-2   items-center border-t border-gray-300">
                <Link
                    to="/all-matches/scorecard/summery"
                    title="MATCH CENTRE"
                    className="text-xs font-semibold text-gray-700 border border-gray-300 bg-white rounded px-3 py-1 inline-flex items-center space-x-1 transition-colors hover:bg-gray-200"
                >
                    <span>Match centre</span>
                    <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

// Utility function to get status color
const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'live':
            return 'red';
        case 'completed':
            return 'green';
        case 'scheduled':
            return 'yellow';
        default:
            return 'gray';
    }
};

export default Match_Card;
