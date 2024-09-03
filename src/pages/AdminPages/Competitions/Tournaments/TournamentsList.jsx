import React, { useEffect } from 'react';
import AdminTournamentCard from './AdminTournamentCard';
import { useGetAllTournamentsQuery } from '../../../../slices/tournament/tournamentApiSlice';
import { setTournaments } from '../../../../slices/tournament/tornamentSlice'; // Corrected import path
import { useDispatch, useSelector } from 'react-redux';

const TournamentsList = () => {
    const { data, isLoading, isError, error } = useGetAllTournamentsQuery();
    const tournaments = useSelector((state) => state.tournaments.tournaments);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isLoading && !isError && data) {
            dispatch(setTournaments({ data: data.data }));
        }
    }, [dispatch, data, isLoading, isError]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (tournaments.length === 0) {
        return <div>No tournament found</div>
    }

    return (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-6 bg-gray-50">
            {tournaments.map((tournament) => (
                <AdminTournamentCard key={tournament._id} tournament={tournament} />
            ))}
        </div>
    );
};

export default TournamentsList;
