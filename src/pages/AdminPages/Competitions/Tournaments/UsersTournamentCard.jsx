import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { formatDate } from '../../../../utils/dateFormatter';
import { useSelector } from 'react-redux';
import RegisterTeamToTournament from '../../../ClubManager/RegisterTeamToTournament';

const UsersTournamentCard = ({ tournament }) => {
    const { isAuthenticated, userType } = useSelector((state) => state.auth);

    if (tournament.startDate < Date.now && tournament.endDate < Date.now) {
        console.log("completed")
    }
    else {
        console.log("dasd");

    }
    return (
        <div className="p-6 bg-white shadow-md rounded-lg relative transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out">
            <div className="flex justify-between items-start">
                <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold">
                    Upcoming
                </span>
            </div>
            <div className="text-center flex flex-col gap-2 mt-6">

                <h5 className="font-semibold text-lg text-bold text-gray-800">{tournament.name}</h5>
                <div className="text-gray-500 mt-3">
                    {tournament.start !== 'Start Date' && tournament.end !== 'End Date' ? (
                        <div className="flex justify-center items-center">
                            <FaCalendarAlt className="text-green-500 mr-2" />
                            <span className='text-sm'>{formatDate(tournament.startDate)}</span>
                            <span className="mx-2">-</span>
                            <FaCalendarAlt className="text-green-500 mr-2" />
                            <span className='text-sm'>{formatDate(tournament.endDate)}</span>
                        </div>
                    ) : (
                        <div>Dates TBA</div>
                    )}
                    <p className="flex justify-center items-center mt-2">
                        <FaUsers className="text-green-500 mr-2" />
                        <span className='text-base'>{tournament?.squads.length} Teams</span>
                    </p>
                </div>
                <div className="mt-6 flex justify-center gap-5">
                    <Link
                        to={`/series/${tournament._id}/fixtures`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-500 text-center"
                    >
                        Fixtures
                    </Link>
                    <Link
                        to={`/series/${tournament._id}/point-table`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-800 text-center"
                    >
                        Points Table
                    </Link>
                </div>
                {
                    isAuthenticated && userType === 'club-manager' &&
                    <RegisterTeamToTournament tournamentId={tournament?._id} />
                }
            </div>
        </div>
    );
};

export default UsersTournamentCard;
