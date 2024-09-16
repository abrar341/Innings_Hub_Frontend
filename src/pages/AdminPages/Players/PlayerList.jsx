import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    useReactTable,
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table';
import AdminPlayerCard from './AdminPlayerCard';
import { formatDateToYMD } from '../../../utils/dateUtils';
import CreatePlayerDialog from './CreatePlayerDialog';

const PlayerList = () => {
    const players = useSelector((state) => state.players.players);
    const navigate = useNavigate();
    console.log(players);

    // Filter states
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleClick = (name) => {
        navigate(`/player/${name}`);
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
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div>
                        <p className="font-semibold">{row.original.playerName}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{row.original.role}</p>
                    </div>
                </div>
            )
        },
        {
            accessorKey: 'role',
            header: 'Role',
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
            accessorKey: 'DOB',
            header: 'DOB',
            cell: ({ row }) => (
                <span>{formatDateToYMD(row.original.DOB)}</span>
            ),
        },
        {
            header: 'Actions',
            cell: ({ row }) => <AdminPlayerCard player={row.original} />
        }
    ], []);

    const table = useReactTable({
        data: filteredPlayers,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });



    return (
        <div className="w-full h-screen mt-0 rounded-lg shadow-xs px-4">
            {/* Sticky Element */}
            <div className="grid grid-cols-3 py-2 border-b  sm:grid-cols-5 gap-4 mb-6 items-end sticky top-0 bg-white z-10">

                {/* Search by Name */}
                <div className="col-span-3 sm:col-span-3">
                    <form className="relative ">
                        <input
                            type="search"
                            id="searchQuery"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search players, teams, or names..."
                            required
                            className="focus:outline-none w-full block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 rounded-s-lg"
                        />
                    </form>
                </div>
                <CreatePlayerDialog />
                {players.length}
                {/* Status Filter */}
                <div className="col-span-1 sm:col-span-2">

                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block px-3 w-full py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Filter By Status</option>
                        <option value="Active">Active</option>
                        <option value="inActive">InActive</option>
                    </select>
                </div>

                {/* Role Filter */}
                <div className="col-span-1 sm:col-span-2">
                    <select
                        id="roleFilter"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="block w-full  px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Filter By Role</option>
                        <option value="Batsman">Batsman</option>
                        <option value="Bowler">Bowler</option>
                        <option value="All-Rounder">All-Rounder</option>
                        <option value="wicket-keeper">Wicketkeeper</option>
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
                        className="px-4 py-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md shadow-sm transition-all duration-200"
                    >
                        Reset
                    </button>
                </div>
            </div>
            {players?.length == 0 ? (
                <div className="text-center py-4 text-gray-500">
                    No players found.
                </div>
            ) : (<div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
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
                            <tr key={row.id} className="text-gray-700">
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
            </div>)}


        </div>
    );
};

export default PlayerList;
