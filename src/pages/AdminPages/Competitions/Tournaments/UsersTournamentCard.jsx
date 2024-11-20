import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { formatDate } from '../../../../utils/dateFormatter';
import { useSelector } from 'react-redux';
import RegisterTeamToTournament from '../../../ClubManager/RegisterTeamToTournament';

const UsersTournamentCard = ({ tournament }) => {
    console.log(tournament?.status);

    const { isAuthenticated, userType } = useSelector((state) => state.auth);

    const currentDate = new Date();
    const startDate = new Date(tournament.startDate);
    const endDate = new Date(tournament.endDate);
    const registrationDeadline = new Date(tournament.startDate);

    // Determine tournament status based on current date
    let status = '';
    if (tournament?.status === 'Upcoming') {
        status = 'Upcoming';
    }
    if (tournament?.status === 'Started') {
        status = 'Ongoing';
    }
    if (tournament?.winner) {
        status = 'Concluded';
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-lg relative transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out dark:border dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-xl">
            <div className="flex justify-between items-start">
                <span
                    className={`${status === 'Upcoming'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : status === 'Ongoing'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                        } rounded-full px-3 py-1 text-xs font-semibold`}
                >
                    {status}
                </span>
            </div>
            <div className="text-center flex flex-col gap-2 mt-6">
                <h5 className="text-xl font-extrabold text-gray-700 uppercase dark:text-gray-200">{tournament.name}</h5>
                <div className="text-gray-500 mt-3 dark:text-gray-400">
                    {tournament.startDate && tournament.endDate ? (
                        <div className="flex justify-center items-center">
                            <FaCalendarAlt className="text-green-500 mr-2 dark:text-green-400" />
                            <span className="text-sm">{formatDate(tournament.startDate)}</span>
                            <span className="mx-2">-</span>
                            <FaCalendarAlt className="text-green-500 mr-2 dark:text-green-400" />
                            <span className="text-sm">{formatDate(tournament.endDate)}</span>
                        </div>
                    ) : (
                        <div>Dates TBA</div>
                    )}
                    <p className="flex justify-center items-center mt-2">
                        <FaUsers className="text-green-500 mr-2 dark:text-green-400" />
                        <span className="text-base">{tournament?.squads.length} Teams</span>
                    </p>
                </div>

                {/* Conditionally render "Fixtures/Points Table" if the start date is present */}
                <div className="mt-6 flex justify-center gap-5">
                    <Link
                        to={`/series/${tournament._id}/fixtures`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-500 text-center dark:border-gray-400 dark:text-gray-300"
                    >
                        Fixtures
                    </Link>
                    <Link
                        to={`/series/${tournament._id}/point-table`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-800 text-center dark:border-gray-600 dark:text-gray-300"
                    >
                        Points Table
                    </Link>
                </div>

                {/* Conditionally render "RegisterTeamToTournament" if registration is still open */}
                {isAuthenticated && userType === 'club-manager' && currentDate < registrationDeadline && (
                    <RegisterTeamToTournament tournamentId={tournament?._id} />
                )}
            </div>
        </div>
    );
};

export default UsersTournamentCard;
