import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGetRoundsByTournamentIdQuery } from '../../../../../slices/tournament/tournamentApiSlice';
import { FaSpinner } from 'react-icons/fa';

const Standings = () => {
    const [rounds, setRounds] = useState([]);
    const context = useOutletContext();
    let tournament = context;
    const tournamentId = tournament?._id;
    const { data: roundData, error: getRoundsError, isLoading: gettingRounds } = useGetRoundsByTournamentIdQuery(tournamentId);

    useEffect(() => {
        if (roundData) {
            setRounds(roundData?.data);
        } else {
            setRounds([]);
        }
    }, [roundData]);

    if (gettingRounds) return <div className="flex justify-center items-center h-40">
        <FaSpinner className="animate-spin text-3xl text-gray-500" />
    </div>;
    if (getRoundsError) return <div>Error loading rounds: {getRoundsError.message}</div>;

    return (
        <div className="space-y-8 p-4">
            {rounds?.length > 0 ? (
                rounds.map((round) => (
                    <div key={round._id} className="space-y-4">
                        <h2 className="text-3xl font-extrabold text-center text-gray-800 border-b border-gray-400 pb-4">{round.roundName}</h2>
                        <div className=''>
                            {round.groups?.length > 0 ? (
                                round.groups.map((group) => (
                                    <div key={group._id} className="space-y-4 mb-3">
                                        <h3 className="text-2xl font-bold text-left text-gray-700">{group.groupName}</h3>
                                        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
                                            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                                <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm leading-normal">
                                                    <tr>
                                                        <th className="py-4 px-6 text-left font-semibold w-1/4">Team</th>
                                                        <th className="py-4 px-6 text-center font-semibold">Played</th>
                                                        <th className="py-4 px-6 text-center font-semibold">Won</th>
                                                        <th className="py-4 px-6 text-center font-semibold">Lost</th>
                                                        <th className="py-4 px-6 text-center font-semibold">Tied</th>
                                                        <th className="py-4 px-6 text-center font-semibold">Points</th>
                                                        <th className="py-4 px-6 text-center font-semibold">Net Run Rate</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-700 text-sm font-light">
                                                    {group.standings?.map((standing, index) => (
                                                        <tr key={standing._id} className={`border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                                            <td className="py-3 px-6 text-left max-w-xs truncate whitespace-nowrap">
                                                                <span className="font-semibold">{standing?.team.teamName}</span>
                                                            </td>
                                                            <td className="py-3 px-6 text-center">{standing.played}</td>
                                                            <td className="py-3 px-6 text-center">{standing.won}</td>
                                                            <td className="py-3 px-6 text-center">{standing.lost}</td>
                                                            <td className="py-3 px-6 text-center">{standing.tied}</td>
                                                            <td className="py-3 px-6 text-center font-bold text-green-600">{standing.points}</td>
                                                            <td className="py-3 px-6 text-center">
                                                                <span className={`py-1 px-2 rounded-lg ${standing.netRunRate >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                    {standing.netRunRate.toFixed(2)}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No groups available for this round.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No rounds available for this tournament.</p>
            )}
        </div>
    );
};

export default Standings;
