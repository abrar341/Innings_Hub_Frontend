import React from 'react'
import TeamCard from './TeamCard'
import { useGetAllSquadsQuery } from '../../../../../slices/tournament/tournamentApiSlice';

const Squads = () => {
    const { data, isLoading, isError, error } = useGetAllSquadsQuery();
    const squads = data?.data || []; // Extract players with a 



    return (
        <div>
            <div className="p-4 text-2xl font-bold">Squads</div>

            {squads.map((squad) => (<TeamCard squad={squad} />))}
        </div>
    )
}

export default Squads
