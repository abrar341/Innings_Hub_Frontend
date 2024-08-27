import React from 'react'
import { Link } from 'react-router-dom';

const Match_Card = ({ matchData }) => {
    return (
        <div className="w-200 my-1 bg-white overflow-hidden flex-shrink-0 border border-gray-300">
            <div className="bg-gray-50 p-2 border-b border-gray-300">
                <div className="text-gray-600 text-xs truncate">
                    {matchData.matchDate} - {matchData.matchInfo}
                </div>
            </div>
            <div className="p-4">
                {matchData.teams.map((team, index) => (
                    <div className="flex items-center space-x-2 mb-2" key={index}>
                        <img
                            className="h-8"
                            src={team.imgSrc}
                            loading="lazy"
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
            <div className="bg-gray-50 p-2 border-b border-gray-300">
                <p className="text-gray-600 text-xs truncate">{matchData.matchStatus}</p>
            </div>
            <div className="bg-gray-100 p-2 text-center border-t border-gray-300">
                <Link
                    to="/scorecard"
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

export default Match_Card
