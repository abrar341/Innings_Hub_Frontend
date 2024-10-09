import React, { useEffect, useState } from 'react'
import CreateMatchDialog from './AddMatchDialog'
import { useOutletContext } from 'react-router-dom'
import Match_Card from './Match_Card'
import { useGetMatchesByTournamentIdQuery, useGetMatchesByTeamIdQuery } from '../../../../../slices/match/matchApiSlice'
import { useSelector } from 'react-redux'
import MatchCard1 from '../../../../Match/MatchCard'

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

    const { data, error, isLoading, refetch } = queryFn(entityId);
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
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Matches</h1>

                {
                    isAuthenticated && userType === 'admin' && (
                        <>
                            {/* Show create match dialog only for tournaments */}
                            {type === 'tournament' && <CreateMatchDialog tournamentId={entityId} />}
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
