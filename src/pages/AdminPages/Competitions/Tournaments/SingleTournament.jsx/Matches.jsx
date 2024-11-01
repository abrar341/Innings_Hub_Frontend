import React, { useEffect, useState } from 'react'
import CreateMatchDialog from './AddMatchDialog'
import { useOutletContext } from 'react-router-dom'
import Match_Card from './Match_Card'
import { useGetMatchesByTournamentIdQuery, useGetMatchesByTeamIdQuery } from '../../../../../slices/match/matchApiSlice'
import { useSelector } from 'react-redux'
import MatchCard1 from '../../../../Match/MatchCard'
import OrganizeMatchesDialog from '../../../../../components/OrganizeMatchDialog'


export const MatchCard1LoadingSkeleton = () => (
    <div className="min-w-[380px] bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg animate-pulse">
        {/* Match Info (Date, Tournament, Status) */}
        <div className="px-4 py-1">
            <div className="bg-gray-50 dark:bg-gray-800 py-1 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Team and Inning Details */}
            <div className="mt-4 flex flex-col gap-4">
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="min-h-[60px] flex items-center space-x-3">
                        {/* Team Logo */}
                        <div className="w-10 h-10 rounded bg-gray-300 dark:bg-gray-600"></div>

                        {/* Team Name */}
                        <div className="flex-1">
                            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>

                        {/* Runs, Wickets, Overs */}
                        <div className="flex flex-col justify-center items-end space-y-1">
                            <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Match Status */}
        <div className="bg-gray-200 dark:bg-gray-700 p-2 text-center text-gray-500 dark:text-gray-400 font-semibold text-xs border-t border-gray-200 dark:border-gray-600">
            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 justify-center bottom-0 bg-gray-100 dark:bg-gray-700 p-2 items-center border-t border-gray-300 dark:border-gray-600">
            <div className="w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
    </div>
);




const Matches = ({ type }) => {
    console.log(type);
    const context = useOutletContext();
    let entity = context;  // This will either be a tournament or team based on the `type`
    console.log(entity);

    const { isAuthenticated, userType } = useSelector((state) => state.auth);

    const entityId = entity?._id;  // This will either be the tournamentId or teamId
    console.log(entityId);

    const [matches, setMatches] = useState([]);

    // Fetch data conditionally based on `type`
    const queryFn = type === 'tournament'
        ? useGetMatchesByTournamentIdQuery
        : useGetMatchesByTeamIdQuery;

    const { data, isLoading, error, refetch } = queryFn(entityId);
    console.log(data);

    useEffect(() => {
        if (data) {
            setMatches(data?.data);
        }
        if (!data) {
            setMatches([]);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [matches]);
    if (isLoading) {
        return (
            <div className='p-6 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 sm:gap-4'>
                {Array.from({ length: 10 }).map((_, index) => (
                    <MatchCard1LoadingSkeleton key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen  dark:bg-gray-800 p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-700 dark:text-white">Matches</h1>

                {
                    isAuthenticated && userType === 'admin' && (
                        <>
                            {/* Show create match dialog only for tournaments */}
                            {type === 'tournament' && <>
                                <CreateMatchDialog tournamentId={entityId} />
                                <OrganizeMatchesDialog />
                            </>}
                        </>
                    )
                }
            </div>
            {
                matches?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 sm:gap-4">
                        {matches?.map((matchData) => (
                            <MatchCard1 id={matchData?._id} matchData={matchData} />))}
                    </div>
                ) : (
                    <div className="p-4 text-lg text-gray-600">
                        {type === 'tournament' ? 'No matches are scheduled for this tournament yet.' : 'No matches are scheduled for this team yet.'}
                    </div>
                )
            }
        </div>
    )
}

export default Matches
