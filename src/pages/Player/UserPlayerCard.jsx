import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddPlayerToClubReqMutation } from '../../slices/player/playerApiSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import placeholderImage from '../../assets/club.png';


const UserPlayerCard = ({ player }) => {
    const { isAuthenticated, userType, userInfo } = useSelector((state) => state.auth);
    const clubId = userInfo?.club?._id;

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/player/${id}`);
    };

    const getRoleImageUrl = (role) => {
        const normalizedRole = role.toLowerCase().replace(' ', '-');
        return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
    };

    // Initialize the mutation hook
    const [addPlayerToClubReq, { isLoading }] = useAddPlayerToClubReqMutation();

    const handleReqAssignPlayer = async (playerId) => {
        try {
            const result = await addPlayerToClubReq({ playerId, clubId }).unwrap();
            if (result) {
                toast.dismiss();
                toast.success('Request to add player to club successfully sent.');
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.data?.message || 'Failed to assign player to club.');
        }
    };

    return (
        <div
            className="relative z-10 group border rounded-xl min-w-[230px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg transition-transform transform  hover:shadow-xl duration-300 ease-in-out px-4 pt-4 pb-6 cursor-pointer"
            onClick={() => handleClick(player?._id)}
        >
            {/* Player's Team Logo and Name */}
            <div className="flex justify-between items-center mb-4">
                <img
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                    src={player?.currentTeam?.teamLogo || player?.associatedClub?.clubLogo || placeholderImage}
                    alt="Team Logo"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                    {player?.playerName}
                </span>
                {!player?.associatedClub && isAuthenticated && userType === 'club-manager' && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleReqAssignPlayer(player._id);
                        }}
                        disabled={isLoading}
                        className="p-2 bg-blue-100 dark:bg-blue-700 rounded-full hover:bg-blue-200 dark:hover:bg-blue-600 focus:outline-none"
                        aria-label="Add player to club"
                    >
                        <FaPlus className="text-blue-600 dark:text-white text-sm" />
                    </button>
                )}
            </div>

            {/* Player Image */}
            <div className="flex flex-col items-center">
                <img
                    className="h-24 w-24 md:h-28 md:w-28 rounded-full border-2 border-blue-500 dark:border-blue-400 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    src={player?.profilePicture || 'http://res.cloudinary.com/dm01cdawj/image/upload/v1731596356/jqtqcjuezidhg3ij5mw4.png'}
                    alt={player?.playerName}
                />
                <div className="mt-3 flex items-center space-x-2">
                    <img
                        className="w-6 h-6 dark:invert"
                        src={getRoleImageUrl(player?.role)}
                        alt={player?.role}
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{player?.role}</span>
                </div>
            </div>

            {/* Hover Overlay with Profile Picture and View Details */}
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-xl backdrop-blur-sm">
                <img
                    className="h-20 w-20 md:h-24 md:w-24 rounded-full mx-auto border-2 border-white dark:border-gray-800 object-cover mb-3"
                    src={player?.profilePicture || 'http://res.cloudinary.com/dm01cdawj/image/upload/v1731596356/jqtqcjuezidhg3ij5mw4.png'}
                    alt={player?.playerName}
                />
                <h3 className="text-lg font-semibold text-white dark:text-gray-300">{player?.playerName}</h3>
                <p className="text-sm text-gray-200 dark:text-gray-400">View player details</p>
                {isAuthenticated && userType === 'club-manager' && !player?.associatedClub && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleReqAssignPlayer(player._id);
                        }}
                        disabled={isLoading}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none"
                        aria-label="Request to add player"
                    >
                        <FaPlus className="text-sm" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserPlayerCard;
