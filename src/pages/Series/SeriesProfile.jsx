import React from 'react'
import { useParams } from 'react-router-dom'
// import tournaments from '../../data/tournaments';
import { useGetSingleTournamentDetailQuery } from '../../slices/tournament/tournamentApiSlice';
import { formatDateToYMD } from '../../utils/dateUtils'


const SingleSeriesProfile = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleTournamentDetailQuery(id);
    const tournament = data?.data
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>error...</div>;
    }
    return (
        <div className="hover:cursor-pointer transition duration-300 ease-in group border-t border-gray-300 overflow-hidden">
            <div className="bg-customDarkBlue p-4 flex items-center justify-between">
                {/* <img
                    className="transition duration-300 ease-in group-hover:scale-110 h-16 w-16 rounded-full border-2 border-customDarkBlue"
                    src="https://wassets.hscicdn.com/static/images/trophy.svg"
                    alt={` Logo`}
                /> */}
                <div className="text-white font-bold">
                    <div className=''>
                        {tournament?.name}
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                        <div className="flex-1">
                            {formatDateToYMD(tournament.startDate)} - {formatDateToYMD(tournament.endDate)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingleSeriesProfile
