import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { useGetClubsQuery } from '../../../slices/admin/adminApiSlice';
import { setClubs } from '../../../slices/admin/adminSlice';
import ActionButtons from './ActionButtons';
import debounce from 'lodash.debounce';

const ClubList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clubs = useSelector((state) => state?.admin.clubs);

    // State for registration status
    const [registrationStatus, setRegistrationStatus] = useState('all'); // Default registrationStatus is 'all' for all clubs
    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading, refetch } = useGetClubsQuery(registrationStatus);

    // Refetch data only when registrationStatus changes
    useEffect(() => {
        refetch();
    }, [dispatch, registrationStatus, refetch]);

    // Dispatch clubs to the store when data is available
    useEffect(() => {
        if (data?.data) {
            dispatch(setClubs({ data: data.data }));
        }
    }, [data, dispatch]);

    // Debounce search input to reduce state updates
    const handleSearch = useMemo(() => debounce((value) => {
        setSearchQuery(value);
    }, 50), []);

    // Filter clubs by search query (memoized to avoid recalculating on each render)
    const filteredClubs = useMemo(() => {
        return clubs?.filter((club) =>
            club?.clubName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [clubs, searchQuery]);

    const columns = React.useMemo(() => [
        {
            accessorKey: 'clubName',
            header: 'Club Name',
            cell: ({ row }) => (
                <div className="text-sm font-medium">
                    {row.original.clubName}
                </div>
            ),
        },
        {
            accessorKey: 'registrationStatus',
            header: 'Registration Status',
            cell: ({ row }) => (
                <span className={`px-2 py-1 rounded-full font-semibold ${row.original.registrationStatus === 'approved' ? 'bg-green-100 text-green-800' : row.original.registrationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {row.original.registrationStatus}
                </span>
            ),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => (
                <span>{row.original.manager.email}</span>
            ),
        },
        {
            header: 'Actions',
            cell: ({ row }) => <ActionButtons club={row.original} />,
        },
    ], []);

    const table = useReactTable({
        data: filteredClubs,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Handle reset of filters
    const handleResetFilters = () => {
        setRegistrationStatus('all');
        setSearchQuery('');
    };

    return (
        <div className="w-full h-screen mt-0 rounded-lg shadow-xs px-4">
            {/* Filter and search section */}
            <div className="py-2 border-b grid grid-cols-3 md:grid-cols-5 gap-2 mb-1 items-end sticky top-0 bg-white z-10">
                <select
                    id="registrationStatusFilter"
                    value={registrationStatus}
                    onChange={(e) => setRegistrationStatus(e.target.value)}
                    className="block col-span-2 md:col-span-1 px-3 w-full h-full py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500 sm:text-sm"
                >
                    <option value="all">All Clubs</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>

                {/* Search input */}
                <div className="col-span-3 order-first md:order-none sm:col-span-3">
                    <form className="relative">
                        <input
                            id="searchQuery"
                            onChange={(e) => handleSearch(e.target.value)}
                            value={searchQuery}
                            placeholder="Search clubs by name..."
                            required
                            className="focus:outline-none w-full block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2 font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                &times;
                            </button>
                        )}
                    </form>
                </div>

                {/* Reset button */}
                <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Reset
                </button>
            </div>

            {/* Display the club table */}
            {filteredClubs?.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                    No clubs found.
                </div>
            ) : isLoading ? (
                <div className="bg-red-200 h-screen flex justify-center items-center">Loading...</div>
            ) : (
                <div className="w-full overflow-x-auto">
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
                        <tbody className="bg-white divide-y">
                            {table.getRowModel()?.rows.map(row => (
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
                </div>
            )}
        </div>
    );
};

export default ClubList;
