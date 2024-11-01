import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Spinner } from 'flowbite-react'; // Optional loading spinner
import { useNavigate, useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import AddPlayerToSqaud from '../../../pages/AdminPages/Competitions/Tournaments/SingleTournament.jsx/AddPlayerToSqaud';
import { useGetSingleTournamentSquadsQuery, useRemovePlayerFromSquadMutation, useRemoveTeamFromTournamentMutation } from '../../../slices/tournament/tournamentApiSlice';
import AddTeamToTournamentDialog from '../../AdminPages/Competitions/Tournaments/SingleTournament.jsx/AddTeamToTournamentDialog';
import { useAllPlayersQuery } from '../../../slices/player/playerApiSlice';
import UserPlayerCard from '../../Player/UserPlayerCard';
import AddPlayersToTeamDialog from '../AddPlayersToTeamDialog';
import { useSelector } from 'react-redux';

const PlayersListing = () => {
    const { isAuthenticated, userType, userInfo } = useSelector((state) => state.auth);

    const context = useOutletContext();
    let team = context;
    console.log(team?.associatedClub === userInfo?.club?._id);

    let playerss = team?.players;
    console.log(playerss);

    const tournamentId = "66d34efebd6b2b67fba0a424";
    console.log(tournamentId);

    const [removePlayerFromSquad] = useRemovePlayerFromSquadMutation();

    const [removingPlayer, setRemovingPlayer] = useState(null); // Track which player is being removed

    const handleRemovePlayer = async (playerId, squadId) => {
        setRemovingPlayer(playerId); // Set the specific player being removed
        try {
            await removePlayerFromSquad({ squadId, playerId }).unwrap();
            toast.dismiss();
            toast.success('Player removed successfully');
            // Optionally, refetch or update state to remove the player from UI
        } catch (error) {
            console.error('Failed to remove player:', error);
        } finally {
            setRemovingPlayer(null); // Reset the removing state after operation
        }
    };

    const [squads, setSquads] = useState([]);
    const { data, isLoading, isError, error, refetch } = useGetSingleTournamentSquadsQuery(tournamentId);

    useEffect(() => {
        if (data) {
            setSquads(data?.data);
        }
        if (!data) {
            setSquads([]);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [squads]);

    const [removeTeamFromTournament] = useRemoveTeamFromTournamentMutation(); // Initialize mutation

    const navigate = useNavigate();

    const handleClick = (name) => {
        navigate(`/player/${name}`);
    };

    const handleRemoveTeam = async (squadId) => {
        // try {
        //     await removeTeamFromTournament({ tournamentId, squadId }).unwrap();
        //     setOpenSquad(false);
        // } catch (error) {
        //     console.error('Failed to remove the team:', error);
        //     alert('Error removing team.');
        // }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" /> {/* Loading spinner */}
            </div>
        );
    }

    if (isError) {
        return <div className="p-4 text-red-500">Error fetching squads: {error?.message}</div>;
    }

    return (
        <div className="p-6 dark:bg-gray-900 min-h-screen"> {/* Dark background */}
            {/* Header with Add Team button */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-extrabold text-gray-700 dark:text-white">Players</h1> {/* Lighter text color */}
                {isAuthenticated && userType === 'club-manager' && team?.associatedClub === userInfo?.club?._id && <AddPlayersToTeamDialog teamId={team?._id} clubId={team?.associatedClub} />
                }
            </div>

            {playerss?.length === 0 ? (
                <div className="p-4 text-lg text-gray-400">No players available at the moment.</div>
            ) : (
                <div className="grid gap-4 grid-cols-2 xs-1:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 py-4">
                    {playerss?.map((player, index) => (
                        <UserPlayerCard key={index} player={player} onClick={handleClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlayersListing;
