import React from 'react';
import { Link } from 'react-router-dom';
import tournaments from '../../data/tournaments';



const Series = () => {
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

            <div className="container bg-gray-100 mx-auto p-4 bg-gray-50">
                <h2 className="text-xl text-gray-600 font-bold mb-4">Upcoming Tournaments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments.map((tournament, index) => (
                        <Link to={`/series/${tournament.name}/fixtures`} key={index} className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 rounded  hover:cursor-pointer  transition duration-300 ease-in group  shadow-2xl hover:shadow-2xl overflow-hidden ">
                            <div className=" p-3 flex items-center justify-between ">
                                <div className='rounded-full border-gray-400 border'>
                                    <img
                                        className="transition duration-300 ease-in  h-16 w-16  p-2  "
                                        src="https://wassets.hscicdn.com/static/images/trophy.svg"
                                        alt={`${tournament.name} Logo`}
                                    />
                                </div>
                                <div className="text-gray-600 ">
                                    <div className='font-bold'>
                                        {tournament.name}
                                    </div>
                                    <div className="text-end mt-2 text-sm font-semibold ">
                                        {tournament.start !== 'Start Date' && tournament.end !== 'End Date' ? (
                                            <div className="">
                                                {tournament.start} - {tournament.end}
                                            </div>
                                        ) : (
                                            <div className="">Dates TBA</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="pb-2  transition duration-300 ease-in">
                                <div className="flex justify-center gap-5">
                                    <Link to={`/series/${tournament.name}/fixtures`} className=" transition duration-300 ease-in  text-sm  border-b border-gray-500      text-center  ">
                                        Fixtures
                                    </Link>
                                    <Link to={`/series/${tournament.name}/results`} className=" transition duration-300 ease-in  text-sm  border-b border-gray-800      text-center  ">
                                        Results
                                    </Link>
                                    <Link to={`/series/${tournament.name}/point-table`} className=" transition duration-300 ease-in  text-sm border-b  border-gray-800      text-center   ">
                                        Points Table
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </>

    );
};

export default Series;
