import React from 'react';
// import teams from '../../data/teams'
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllTeamsQuery } from '../../slices/team/teamApiSlice';



const Teams = () => {
    const { data, isLoading, isError, error } = useGetAllTeamsQuery();
    const teams = data?.data || []; // Extract players with a 
    console.log(teams);

    return (
        <>
            <div className="container bg-gray-100 mx-auto  p-4  bg-gray-50 grid-cols-1 ">
                <form class="max-w-lg mx-auto">
                    <div class="relative w-full">
                        <input type="search" class="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 rounded-s-lg " placeholder="Search team name......" required />
                        <button type="submit" class="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-white bg-blue-500  rounded-e-lg ">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full bg-gray-100 mx-auto border border-gray-300 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-300">
                    <div className="flex flex-col justify-center">
                        <a href="/teams" className="">
                            <span className="font-bold text-lg text-gray-800">TEAMS</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="grid gap-2 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
                {teams.map((team, index) => (
                    <Link
                        to={`/team/${team._id}/players`}
                        key={index}
                        className="rounded-xl hover:cursor-pointer  hover:cursor-pointer grid-cols-3 border border-gray-300 overflow-hidden transition duration-300 ease-in group">
                        <div className="flex flex-col gap-4 justify-center items-center p-4 space-x-4">
                            <img
                                className="h-20 border-b  pb-4 group-hover:border-black border-gray-300 object-cover transition duration-300 ease-in group-hover:scale-105"
                                src={team.teamLogo}
                                alt={team.teamName}
                            />
                            <div className='flex justify-center items-center'>
                                <div className="text-sm font-bold group-hover:scale-105 transition duration-300 ease-in">{team.teamName}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>

    );
};

export default Teams;
