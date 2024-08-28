import React from 'react';
import { useParams } from 'react-router-dom';
import tournaments from '../../../data/tournaments';
import { FaCalendarAlt, FaUsers, FaEdit, FaTrashAlt } from 'react-icons/fa';

const TournamentProfileHeader = () => {
    const tournament = tournaments?.find(
        (p) => p.name === "Pakistan Super League 2024"
    );

    if (!tournament) {
        return <div className="text-center text-red-500 mt-4">Tournament or Series not found</div>;
    }

    // Example status - this could be dynamic based on real data
    const status = "Completed"; // Replace with dynamic data if available

    return (
        <div className="grid grid-cols-1 bg-green-400 sm:grid-cols-2 gap-4 p-10 border-b border-gray-400 rounded-t-lg">
            {/* Tournament Image and Details */}
            <div className="flex flex-row items-center space-x-4">
                {/* Tournament Image */}
                <img
                    className="h-16 w-16 rounded-full border-2 border-gray-200 shadow-sm "
                    src="https://wassets.hscicdn.com/static/images/trophy.svg"
                    alt={`${tournament.name} Logo`}
                />
                {/* Tournament Details */}
                <div>
                    {/* Tournament Name */}
                    <div className="text-xl font-bold text-black text-customDarkBlue">{tournament.name}</div>
                    {/* Date Range */}
                    <div className="flex items-center mt-1 text-sm font-medium text-gray-600">
                        <FaCalendarAlt className="text-green-500 mr-2" />
                        <span>{tournament.start}</span>
                        <span className="mx-1">-</span>
                        <span>{tournament.end}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-row sm:flex-col gap-4 justify-center items-center'>
                {/* Status Badge */}
                <div className="flex items-center">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                            }`}
                    >
                        {status}
                    </span>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 ">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-150 focus:outline-none">
                        <FaEdit className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-150 focus:outline-none">
                        <FaTrashAlt className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TournamentProfileHeader;
