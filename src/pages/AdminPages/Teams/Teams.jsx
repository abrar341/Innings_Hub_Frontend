import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    useReactTable,
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table';
import CreateTeamDialog from './CreateTeamDialog'; // Dialog for creating teams
import ActionButtons from './ActionButtons';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import AddPlayerToSquad from '../Competitions/Tournaments/SingleTournament.jsx/AddPlayerToSqaud';
import AddPlayersToTeamDialog from '../../Team/AddPlayersToTeamDialog';
import { useRemovePlayerFromTeamMutation } from '../../../slices/team/teamApiSlice';
import toast from 'react-hot-toast';

const Team = () => {
    const teams = useSelector((state) => state.teams.teams); // Fetch teams from Redux
    console.log(teams);
    const [removePlayerFromTeam, { isLoading, isSuccess, isError, error }] = useRemovePlayerFromTeamMutation();

    const handleRemovePlayer = async ({ teamId, playerId }) => {
        console.log(teamId, playerId);

        try {
            await removePlayerFromTeam({ teamId, playerId }).unwrap();
            toast.dismiss();
            toast.success('Player removed successfully');
        } catch (error) {
            console.error('Failed to remove player:', error);
        }
    };
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Filtered list of teams based on search and status
    const filteredTeams = useMemo(() => {
        return teams.filter(team => {
            const matchesSearch = team.teamName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter ? team.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        });
    }, [teams, searchQuery, statusFilter]);

    // Columns for the table
    const columns = useMemo(() => [
        {
            accessorKey: 'teamName',
            header: 'Team',
            cell: ({ row }) => (
                <div className="flex items-center text-sm">
                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                            className="object-cover w-full h-full rounded-full"
                            src={row.original.teamLogo || '/default-logo.png'} // Default logo if none
                            alt={row.original.teamName}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div>
                        <p className="font-semibold">{row.original.teamName}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{row.original.teamtype}</p>
                    </div>
                </div>
            )
        },

        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.original?.status;
                const statusClasses = status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800';

                return (
                    <div className={`px-2 py-1 text-center w-[90px] font-semibold leading-tight rounded-full ${statusClasses}`}>
                        {status}
                    </div>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: ({ row }) => (
                <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
            ),
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="space-x-2">
                    <ActionButtons team={row.original} />
                </div>
            )
        }
    ], [navigate]);

    // Table configuration using TanStack Table
    const table = useReactTable({
        data: filteredTeams,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const [openSquad, setOpenSquad] = useState(null); // State to track which squad is open

    const toggleSquad = (index) => {
        setOpenSquad(openSquad === index ? null : index); // Toggle the squad on click
    };

    // Function to handle team deletion
    const handleDeleteTeam = (teamId) => {
        // You can dispatch an action here to delete the team
        console.log(`Deleting team with id: ${teamId}`);
    };

    return (
        <div className="w-full h-screen mt-0 rounded-lg shadow-xs px-4">
            {/* Filters */}
            <div className="grid grid-cols-3 py-2 border-b sm:grid-cols-5 gap-3 sm:gap-4 mb-3 items-end  top-0 bg-white z-10">
                <div className="col-span-3 sm:col-span-3">
                    <form className="relative">
                        <input
                            type="search"
                            id="searchQuery"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search teams..."
                            required
                            className="focus:outline-none w-full block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        />
                    </form>
                </div>

                <CreateTeamDialog />

                {/* Status Filter */}
                <div className="col-span-2 sm:col-span-3">
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block px-3 w-full py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Filter By Status</option>
                        <option value="Active">Active</option>
                        <option value="inActive">Inactive</option>
                    </select>
                </div>

                {/* Reset Button */}
                <div className="flex sm:col-span-2 justify-center">
                    <button
                        onClick={() => {
                            setStatusFilter('');
                            setSearchQuery('');
                        }}
                        className="px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md shadow-sm transition-all duration-200"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Team List Table */}
            {filteredTeams?.length === 0 ? (
                <div className="p-4 text-lg text-gray-600">No squads available at the moment.</div>
            ) : (
                filteredTeams?.map((team, index) => {
                    const isOpen = openSquad === index;

                    return (
                        <div
                            key={team._id}
                            className={`card bg-white p-4 border rounded-lg mb-4 shadow-lg transition-transform duration-300 transform`}
                        >
                            {/* Squad Header */}
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer rounded-lg"
                                id={`team-${index}`}
                            >
                                <div className="flex items-center">
                                    <img
                                        className="rounded-lg mr-4"
                                        height="60"
                                        width="60"
                                        src={team?.teamLogo || 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'} // Default logo if none
                                        alt={team?.teamName}
                                    />
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-gray-800">{team?.teamName}</h2>
                                    </div>
                                </div>

                                {/* Arrow icon changes based on open/close state */}
                                <div className="flex" onClick={() => toggleSquad(index)}>
                                    <span className="text-gray-500 mr-2 text-sm">Players: {team?.players?.length}</span>
                                    {!isOpen ? (
                                        <IoIosArrowDown className="cursor-pointer text-xl" />
                                    ) : (
                                        <IoIosArrowUp className="cursor-pointer text-xl" />
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <ActionButtons team={team} />
                                    {!isOpen && (
                                        <AddPlayersToTeamDialog teamId={team?._id} clubId={team?.associatedClub?._id} />
                                    )}
                                </div>
                            </div>

                            {/* Players list */}
                            {isOpen && (
                                <div className="flex items-center flex-col">
                                    <div className="self-end">
                                        <AddPlayersToTeamDialog teamId={team?._id} clubId={team?.associatedClub?._id} />
                                    </div>
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        {team?.players?.length === 0 ? (
                                            <div className="col-span-full text-base text-gray-500">No Players Added to team Yet</div>
                                        ) : (
                                            team?.players?.map((player) => (
                                                <>
                                                    {isLoading ? <div className=''>loading....</div> : ""}
                                                    <div
                                                        key={player._id}
                                                        className="relative p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                                                    >
                                                        <div className="flex items-center">
                                                            <img
                                                                className="mr-3 h-10 w-10 rounded-full"
                                                                src={player.profilePicture || 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'} // Default avatar if none
                                                                alt={player.playerName}
                                                            />
                                                            <div>
                                                                <h5 className="text-sm font-semibold text-gray-800">
                                                                    {player.playerName}
                                                                </h5>
                                                                <p className="text-sm text-gray-500">{player.role}</p>
                                                            </div>
                                                        </div>

                                                        {/* Cross (X) button on top-right */}
                                                        <button
                                                            className="absolute text-sm font-semibold top-2 right-2 text-gray-500 hover:text-red-500"
                                                            onClick={() => handleRemovePlayer({ playerId: player._id, teamId: team?._id })}
                                                        >
                                                            {/* {removingPlayer === player._id ? '...' : '✕'} */}
                                                            x
                                                        </button>
                                                    </div>

                                                </>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Team;
