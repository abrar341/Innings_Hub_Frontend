import React from 'react';
import { FaCalendarAlt, FaUsers, FaEdit, FaTrashAlt } from 'react-icons/fa';

const TournamentCard = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg relative transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold">
            Completed
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
            onClick={() => alert('Edit clicked')}
          >
            <FaEdit className="text-gray-600" />
          </button>
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
            onClick={() => alert('Delete clicked')}
          >
            <FaTrashAlt className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="text-center mt-6">
        <h5 className="font-semibold text-lg text-bold text-gray-800">Tournament_1</h5>
        <div className="text-gray-500 mt-3">
          <p className="flex justify-center items-center">
            <FaCalendarAlt className="text-green-500  mr-2" />
            <span className='text-sm'>2024-05-12</span>
            <span className="mx-2">-</span>
            <FaCalendarAlt className="text-green-500 mr-2" />
            <span className='text-sm' >2024-05-31</span>
          </p>
          <p className="flex justify-center items-center mt-2">
            <FaUsers className="text-green-500 mr-2" />
            <span className='text-base'>4 Teams</span>
          </p>
        </div>
        <div className="mt-6">
          <a
            className="inline-block bg-blue-600 text-white rounded px-4 py-1 text-sm font-medium  hover:bg-blue-700 transition-colors duration-150"
            href="/account/competitions/7971"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
