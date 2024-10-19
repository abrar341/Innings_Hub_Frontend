import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserPlayerCard = ({ player }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/player/${id}`);
    };

    const getRoleImageUrl = (role) => {
        const normalizedRole = role.toLowerCase().replace(" ", "-");
        return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
    };

    return (
        <div
            className="border rounded-xl border-gray-300 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out px-2 pt-2 pb-5 cursor-pointer group relative"
            onClick={() => handleClick(player?._id)}
        >
            {/* Player's Team Logo and Name */}
            <div className="flex justify-between items-center p-3 py-2  rounded-t-lg group-hover:bg-gray-100 transition-colors duration-300">
                <img
                    className="w-8 h-8 rounded-full border border-gray-300"
                    src={player?.currentTeam?.teamLogo || player?.associatedClub?.clubLogo}
                    alt="team Logo"
                />
                <span className="text-xs font-bold text-gray-700 uppercase truncate">
                    {player.playerName}
                </span>
            </div>

            {/* Player Image */}
            <div className="p-2 text-center">
                <img
                    className="h-24 w-24 md:h-28 md:w-28 rounded-full mx-auto border-2 border-blue-500 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    src={player?.profilePicture || "https://www.shutterstock.com/image-vector/cricket-batsman-playing-action-illustration-600nw-2136241905.jpg"}
                    alt={player?.playerName}
                />
                <div className="mt-3 flex items-center justify-center space-x-2">
                    <img
                        className="w-6 h-6"
                        src={getRoleImageUrl(player.role)}
                        alt={player.role}
                    />
                    <span className="text-sm font-semibold text-gray-600">{player.role}</span>
                </div>
            </div>

            {/* Hover Overlay with Profile Picture and View Details */}
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-xl backdrop-blur-sm">
                <img
                    className="h-20 w-20 md:h-24 md:w-24 rounded-full mx-auto border-2 border-white object-cover mb-4"
                    src={player?.profilePicture || "https://www.shutterstock.com/image-vector/cricket-batsman-playing-action-illustration-600nw-2136241905.jpg"}
                    alt={player?.playerName}
                />
                <div className="text-white text-center">
                    <h3 className="text-lg font-bold">{player.playerName}</h3>
                    <p className="text-sm">View player details</p>
                </div>
            </div>
        </div>
    );
};

export default UserPlayerCard;
