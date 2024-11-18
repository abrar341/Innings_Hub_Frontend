import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddPlayerToClubReqMutation } from '../../slices/player/playerApiSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

const UserPlayerCard = ({ player }) => {
    const { isAuthenticated, userType, userInfo } = useSelector((state) => state.auth);
    const clubId = userInfo?.club?._id;
    console.log(clubId);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/player/${id}`);
    };

    const getRoleImageUrl = (role) => {
        const normalizedRole = role.toLowerCase().replace(" ", "-");
        return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
    };


    // Initialize the mutation hook
    const [addPlayerToClubReq, { isLoading }] = useAddPlayerToClubReqMutation();

    const handleReqAssignPlayer = async (playerId) => {


        try {
            const result = await addPlayerToClubReq({ playerId, clubId }).unwrap();
            console.log(result);

            if (result) {
                toast.dismiss()
                toast.success("Req for player added to club successfully...")
            }
        } catch (error) {
            toast.dismiss()
            toast.error(error?.data?.message)
            console.error("Failed to assign player to club:", error);
        }
    };
    return (
        <div
            className="border rounded-xl min-w-[230px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out px-2 pt-2 pb-5 cursor-pointer group relative"
            onClick={() => handleClick(player?._id)}
        >
            {/* Player's Team Logo and Name */}
            <div className="flex justify-between items-center p-3 py-2 rounded-t-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-300">
                <img
                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
                    src={player?.currentTeam?.teamLogo || player?.associatedClub?.clubLogo}
                    alt="team Logo"
                />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase truncate">
                    {player.playerName}
                </span>
                {!player?.associatedClub && isAuthenticated && userType === 'club-manager' && (

                    <button
                        onClick={(e) => { e.stopPropagation(); handleReqAssignPlayer(player._id); }} disabled={isLoading}
                        className=" p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                    >
                        <FaPlus className="text-gray-600 text-xs" />
                    </button>)}
            </div>

            {/* Player Image */}
            <div className="p-2 text-center">
                <img
                    className="h-24 w-24 md:h-28 md:w-28 rounded-full mx-auto border-2 border-blue-500 dark:border-blue-400 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    src={player?.profilePicture || "http://res.cloudinary.com/dm01cdawj/image/upload/v1731596356/jqtqcjuezidhg3ij5mw4.png"}
                    alt={player?.playerName}
                />
                <div className="mt-3 flex items-center justify-center space-x-2">
                    <img
                        className="w-6 h-6 dark:invert"
                        src={getRoleImageUrl(player.role)}
                        alt={player.role}
                    />

                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{player.role}</span>
                </div>
            </div>

            {/* Hover Overlay with Profile Picture and View Details */}
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-xl backdrop-blur-sm">
                <img
                    className="h-20 w-20 md:h-24 md:w-24 rounded-full mx-auto border-2 border-white dark:border-gray-800 object-cover mb-4"
                    src={player?.profilePicture || "http://res.cloudinary.com/dm01cdawj/image/upload/v1731596356/jqtqcjuezidhg3ij5mw4.png"}
                    alt={player?.playerName}
                />
                <div className="text-white dark:text-gray-300 text-center">
                    <h3 className="text-lg font-bold">{player?.playerName}</h3>
                    <p className="text-sm">View player details</p>

                    {isAuthenticated && userType === 'club-manager' && !player?.associatedClub && <button
                        onClick={(e) => { e.stopPropagation(); handleReqAssignPlayer(player._id); }} disabled={isLoading}
                        className=" p-1 mt-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                    >
                        <FaPlus className="text-gray-600" />
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default UserPlayerCard;
