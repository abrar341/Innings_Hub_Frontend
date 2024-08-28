import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AdminPlayerCard = ({ player, onClick }) => {
    return (
        <div
            className="border  rounded-xl border-gray-300 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out"
            onClick={onClick}
        >
            <div className="flex justify-between items-center p-3 text-white ">
                <img
                    className=" w-6 h-6"
                    src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/381800/381894.png"
                    alt="Country Logo"
                />
                <span className="text-sm text-black font-bold">{player.name}</span>
            </div>

            <div className="p-2 border-b text-center group">
                <img
                    className="h-24 w-24 md:h-28 md:w-28 rounded-lg mx-auto border-2 border-customDarkBlue object-cover transition-transform duration-300 ease-in-out group-hover:rounded-lg group-hover:scale-105"
                    src={player.image}
                    alt={player.name}
                />
                <div className="mt-3 flex items-center justify-center space-x-2">
                    <img
                        className="w-5 h-5"
                        src={player.roleImg}
                        alt={player.role}
                    />
                    <span className="text-sm font-semibold">{player.role}</span>
                </div>
                <div className="flex mt-4 justify-center items-center space-x-4">
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={(e) => { e.stopPropagation(); alert('Edit clicked'); }}
                    >
                        <FaEdit className="text-gray-600" />
                    </button>
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={(e) => { e.stopPropagation(); alert('Delete clicked'); }}
                    >
                        <FaTrashAlt className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPlayerCard;
