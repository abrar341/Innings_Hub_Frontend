import React from 'react';
import { Link } from 'react-router-dom';
import tournaments from '../../data/tournaments';



const Series = () => {
    return (
        <>
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Link to='' className="text-start sm:text-center rounded transition duration-300 ease-in flex-1 text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Current
                    </Link>
                    <Link to='' className="text-start sm:text-center rounded transition duration-300 ease-in flex-1 text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Future Series/Tournaments
                    </Link>
                    <Link to='' className=" text-start sm:text-center rounded transition duration-300 ease-in flex-1 text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Concludednp
                    </Link>
                </div>
            </div>


            <div className="container mx-auto p-4">
                <h2 className="text-xl text-gray-600 font-bold mb-4">Upcoming Tournaments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments.map((tournament, index) => (
                        <Link to={`/series/${tournament.name}`} key={index} className="rounded-xl hover:cursor-pointer transition duration-300 ease-in group border border-gray-300 overflow-hidden">
                            <div className="bg-customDarkBlue p-4 flex items-center justify-between">
                                <img
                                    className="transition duration-300 ease-in group-hover:scale-110 h-16 w-16 rounded-full border-2 border-customDarkBlue"
                                    src="https://wassets.hscicdn.com/static/images/trophy.svg"
                                    alt={`${tournament.name} Logo`}
                                />
                                <div className="text-white font-bold">
                                    <div className=''>
                                        {tournament.name}
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                                        {tournament.start !== 'Start Date' && tournament.end !== 'End Date' ? (
                                            <div className="flex-1">
                                                {tournament.start} - {tournament.end}
                                            </div>
                                        ) : (
                                            <div className="flex-1">Dates TBA</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between">
                                    <Link to={`/series/${tournament.name}/fixtures`} className="rounded transition duration-300 ease-in flex-1 text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                                        Fixtures
                                    </Link>
                                    <Link to={`/series/${tournament.name}/results`} className="rounded transition duration-300 ease-in flex-1 text-sm font-semibold text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center ml-2">
                                        Results
                                    </Link>
                                    <Link to={`/series/${tournament.name}/point-table`} className="rounded transition duration-300 ease-in flex-1 text-sm font-semibold text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center ml-2">
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
