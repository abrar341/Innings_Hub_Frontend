import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    useReactTable,
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table';
import ActionButtons from './ActionButtons';
import { formatDateToYMD } from '../../../utils/dateUtils';
import CreatePlayerDialog from './CreatePlayerDialog';
import { setPlayers } from '../../../slices/clubManager/clubManagerSlice';
import { useGetInactivePlayersQuery } from '../../../slices/admin/adminApiSlice';

const PlayerList = () => {
    const players = useSelector((state) => state.clubManager.players);

    const { isAuthenticated, userType } = useSelector((state) => state.auth);
    const navigate = useNavigate();


    const { data: playersData, isLoading: isLoadingPlayers, refetch } = useGetInactivePlayersQuery(undefined, {
        skip: !(isAuthenticated && userType === 'admin') // Skip query if not authenticated or not admin
    });
    const dispatch = useDispatch();
    // Refetch players data whenever the page is accessed
    useEffect(() => {
        if (isAuthenticated && userType === 'admin') {
            refetch(); // Trigger refetch on component mount
        }
    }, [isAuthenticated, userType, refetch]);

    // Update players state when the fetched data changes
    useEffect(() => {
        if (isAuthenticated && userType === 'admin' && playersData) {
            dispatch(setPlayers({ data: playersData?.data }));
        }
    }, [isAuthenticated, userType, playersData, dispatch]);


    // // Refetch players data whenever the page is accessed
    // useEffect(() => {
    //     if (isAuthenticated && userType === 'admin') {
    //         refetch(); // Trigger refetch on component mount
    //     }
    // }, [isAuthenticated, userType, refetch]);

    // // Update players state when data changes
    // useEffect(() => {
    //     if (playersData) {
    //         dispatch(setPlayers({ data: playersData?.data }));
    //     }
    // }, [dispatch, playersData]);

    // useEffect(() => {
    //     if (isAuthenticated && userType === 'admin') {  // Only run this logic if the user is an admin
    //         if (!playersData) {
    //             refetch();  // Force refetch if data is empty or not loaded
    //         }

    //         if (playersData) {
    //             dispatch(setPlayers({ data: playersData?.data }));
    //         }
    //     }
    // }, [dispatch, playersData, refetch, userType]);

    // Filter states
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleClick = (id) => {
        navigate(`/player/${id}`);
    };

    // Filter the players based on search query, status, and role
    const filteredPlayers = useMemo(() => {
        return players.filter(player => {
            const matchesSearch = player.playerName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter ? player.status === statusFilter : true;
            const matchesRole = roleFilter ? player.role === roleFilter : true;
            return matchesSearch && matchesStatus && matchesRole;
        });
    }, [players, statusFilter, roleFilter, searchQuery]);

    // Define columns using the updated TanStack Table syntax
    const columns = useMemo(() => [
        {
            accessorKey: 'playerName',
            header: 'Player',
            cell: ({ row }) => (
                <div className="flex items-center text-sm">
                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                            className="object-cover w-full h-full rounded-full"
                            src={row.original.profilePicture}
                            alt={row.original.playerName}
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <Link onClick={() => handleClick(row?.original?._id)} className="hover:text-black font-semibold dark:hover:text-white">{row.original.playerName}</Link>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{row.original.role}</p>
                    </div>
                </div>
            )
        },
        {
            accessorKey: 'DOB',
            header: 'DOB',
            cell: ({ row }) => (
                <span>{formatDateToYMD(row.original.DOB)}</span>
            ),
        },
        {
            accessorKey: 'CNIC',
            header: 'CNIC',
            cell: ({ row }) => (
                <span>{row.original?.CNIC}</span>
            ),
        },
        {
            accessorKey: 'Phone',
            header: 'Phone',
            cell: ({ row }) => (
                <span>+{row.original?.phone}</span>
            ),
        },
        {
            header: 'Actions',
            cell: ({ row }) => <ActionButtons player={row.original} />
        }
    ], []);

    const table = useReactTable({
        data: filteredPlayers,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full h-screen mt-0 rounded-lg shadow-xs bg-gray-100 dark:bg-gray-900">
            {/* Sticky Element */}
            <div className="grid grid-cols-3 border-b sm:grid-cols-5 gap-4 p-4 items-end top-0 bg-white dark:bg-gray-800 z-10">
                {/* Search by Name */}
                <div className="col-span-3 sm:col-span-3">
                    <form className="relative">
                        <input
                            type="search"
                            id="searchQuery"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search players, teams, or names..."
                            required
                            className="focus:outline-none w-full block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-e-lg rounded-s-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        />
                    </form>
                </div>

                {isAuthenticated && (

                    <CreatePlayerDialog />)}

                {/* Role Filter */}
                <div className="col-span-1 sm:col-span-2">
                    <select
                        id="roleFilter"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    >
                        <option value="">Filter By Role</option>
                        <option value="Batsman">Batsman</option>
                        <option value="Bowler">Bowler</option>
                        <option value="All-Rounder">All-Rounder</option>
                        <option value="Wicketkeeper">Wicketkeeper</option>
                    </select>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            setStatusFilter('');
                            setRoleFilter('');
                            setSearchQuery('');
                        }}
                        className="px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md shadow-sm transition-all duration-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {players?.length === 0 ? (
                <div className="text-center py-4 text-gray-500 px-4 dark:text-gray-400">
                    No players found.
                </div>
            ) : (
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="px-4 py-3">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="text-gray-700 dark:text-gray-300">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-4 py-3">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PlayerList;