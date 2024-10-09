import React from 'react';
import { Link } from 'react-router-dom';
import UsersTournamentCard from '../AdminPages/Competitions/Tournaments/UsersTournamentCard';
import { useGetAllTournamentsQuery } from '../../slices/tournament/tournamentApiSlice';



const Series = () => {
    const { data, isLoading, isError, error } = useGetAllTournamentsQuery();
    const tournaments = data?.data || []; // Extract players with a fallback to an empty array

    return (
        <>
            <div className="container bg-gray-100 mx-auto  p-4 pb-0  bg-gray-50 grid-cols-1 md:grid grid-cols-2 ">
                <div className=" flex items-center mb-3 md:mb-2">
                    <Link to='' className="bg-blue-600 rounded text-white hover:text-white text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600">
                        Ongoing
                    </Link>
                    <Link to='' className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4  hover:text-gray-600">
                        Upcoming
                    </Link>
                    <Link to='' className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4  hover:text-gray-600">
                        Concluded
                    </Link>
                </div>

                <form class="max-w-lg">
                    <div class="relative w-full">
                        <input type="search" class="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 rounded-s-lg " placeholder="Search teams, tournament name......" required />
                        <button type="submit" class="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-white bg-blue-500  rounded-e-lg ">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className=" bg-gray-100 mx-auto p-4 bg-gray-50">
                <h2 className="text-xl text-gray-600 font-bold mb-4">Upcoming Tournaments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments.map((tournament, index) => (
                        <UsersTournamentCard key={index} tournament={tournament} />
                    ))}
                </div>

            </div>
        </>

    );
};

export default Series;
