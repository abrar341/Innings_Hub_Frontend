import React from 'react';
import { FaArrowRight, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserPlayerCard = ({ player, onClick }) => {

    const getRoleImageUrl = (role) => {
        const normalizedRole = role.toLowerCase().replace(" ", "-");
        return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
    };
    return (
        <div
            className="border  rounded border-gray-300 bg-white shadow-full transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out"
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
                    src={player.profilePicture || 'data:image/jpeg;base64,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'}
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
