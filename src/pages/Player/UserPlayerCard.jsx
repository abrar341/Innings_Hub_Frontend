import React from 'react';
import { FaArrowRight, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserPlayerCard = ({ player, onClick }) => {

    const getRoleImageUrl = (role) => {
        const normalizedRole = role.toLowerCase().replace(" ", "-");
        return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
    };
    return (
        <div
            className="border  rounded-xl border-gray-300 bg-white shadow-full transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out"
            onClick={onClick}
        >
            <div className="flex justify-between items-center p-3 text-white">
                <img
                    className="w-6 h-6"
                    src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/381800/381891.png"
                    alt="Country Logo"
                />
                <span className="text-sm text-black font-bold">{player.playerName}</span>
            </div>

            <div className="p-2 border-b text-center group">
                <img
                    className="h-24 w-24 md:h-28 md:w-28 rounded-full mx-auto border-2 border-customDarkBlue object-cover transition-transform duration-300 ease-in-out group-hover:rounded-lg group-hover:scale-105"
                    src={player.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw4GVTa5rCatvKGw3El6BLqZUks44zL9ezZg&s'}
                    alt={player.name}
                />
                <div className="mt-3 flex items-center justify-center space-x-2">
                    <img
                        className="w-5 h-5"
                        src={getRoleImageUrl(player.role)}
                        alt={player.role}
                    />
                    <span className="text-sm font-semibold">{player.role}</span>
                </div>
                <div className="flex mt-4 justify-center items-center space-x-4">
                    <Link

                        className="inline-block flex justify-center items-center gap-2  rounded px-4 py-2 text-sm font-medium transition-colors duration-150"
                    >

                        <FaArrowRight className="t" />

                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserPlayerCard;
