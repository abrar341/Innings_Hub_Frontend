import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaEdit, FaTrashAlt } from 'react-icons/fa';

const UsersTournamentCard = ({ tournament }) => {
    return (
        <Link to={`/series/${tournament.name}/fixtures`} className="p-6 bg-white shadow-md rounded-lg relative transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out">
            <div className="flex justify-between items-start">
                <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold">
                    Completed
                </span>
            </div>
            <div className="text-center mt-6">

                <h5 className="font-semibold text-lg text-bold text-gray-800">{tournament.name}</h5>
                <div className="text-gray-500 mt-3">
                    {tournament.start !== 'Start Date' && tournament.end !== 'End Date' ? (
                        <div className="flex justify-center items-center">
                            <FaCalendarAlt className="text-green-500 mr-2" />
                            <span className='text-sm'>{tournament.start}</span>
                            <span className="mx-2">-</span>
                            <FaCalendarAlt className="text-green-500 mr-2" />
                            <span className='text-sm'>{tournament.end}</span>
                        </div>
                    ) : (
                        <div>Dates TBA</div>
                    )}
                    <p className="flex justify-center items-center mt-2">
                        <FaUsers className="text-green-500 mr-2" />
                        <span className='text-base'>4 Teams</span>
                    </p>
                </div>
                <div className="mt-6 flex justify-center gap-5">
                    <Link
                        to={`/series/${tournament.name}/fixtures`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-500 text-center"
                    >
                        Fixtures
                    </Link>
                    <Link
                        to={`/series/${tournament.name}/results`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-800 text-center"
                    >
                        Results
                    </Link>
                    <Link
                        to={`/series/${tournament.name}/point-table`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-800 text-center"
                    >
                        Points Table
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default UsersTournamentCard;
