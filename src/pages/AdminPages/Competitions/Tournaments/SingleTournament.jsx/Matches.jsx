import React, { useEffect, useState } from 'react'
import AddTeamToTournamentDialog from './AddTeamToTournamentDialog'
import AddMatchDialog from './AddMatchDialog'
import CreateMatchDialog from './AddMatchDialog'
import { useOutletContext } from 'react-router-dom'
import Match_Card from './Match_Card'
import { useGetMatchesByTournamentIdQuery } from '../../../../../slices/match/matchApiSlice'
import { useSelector } from 'react-redux'

const Matches = () => {
    const context = useOutletContext();
    let tournament = context;
    const { isAuthenticated, userType } = useSelector((state) => state.auth);

    const tournamentId = tournament?._id;
    const [matches, setMatches] = useState([])
    const { data, error, isLoading, refetch } = useGetMatchesByTournamentIdQuery(tournamentId);
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
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header with Add Team button */}
            <div className="flex justify-between items-center mb-6">
                {
                    isAuthenticated && userType === 'admin' && (
                        <>
                            <h1 className="text-3xl font-bold text-gray-800">Matches</h1>
                            <CreateMatchDialog tournamentId={tournamentId} />
                        </>
                    )
                }
            </div>
            {
                matches?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 sm:gap-4">
                        {matches?.map((match) => (
                            <Match_Card key={match._id} matchData={match} />
                        ))}
                    </div>
                ) : (
                    <div className="p-4 text-lg text-gray-600">No matches are schedule for this tournament yet.</div>
                )
            }
        </div >
    )
}

export default Matches
