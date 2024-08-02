import React from 'react';
import { Link } from 'react-router-dom';
import tournaments from '../../data/tournaments';



const Series = () => {
    return (
        <>
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Link to='' className="text-start sm:text-center rounded transition duration-300 ease-in  text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Current
                    </Link>
                    <Link to='' className="text-start sm:text-center rounded transition duration-300 ease-in  text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Future Series/Tournaments
                    </Link>
                    <Link to='' className=" text-start sm:text-center rounded transition duration-300 ease-in  text-sm font-semibold  text-gray-700   py-1 px-2 bg-gray-200 hover:bg-gray-300 text-center">
                        Concluded
                    </Link>
                </div>
            </div>


            <div className="container mx-auto p-4 ">
                <h2 className="text-xl text-gray-600 font-bold mb-4">Upcoming Tournaments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments.map((tournament, index) => (
                        <Link to={`/series/${tournament.name}/fixtures`} key={index} className="rounded hover:cursor-pointer hover:border-customDarkBlue transition duration-300 ease-in group border border-gray-500 overflow-hidden p-2 ">
                            <div className=" p-3 flex items-center justify-between ">
                                <div className='rounded-full border-gray-400 border'>
                                    <img
                                        className="transition duration-300 ease-in group-hover:scale-110 h-16 w-16  p-2  "
                                        src="https://wassets.hscicdn.com/static/images/trophy.svg"
                                        alt={`${tournament.name} Logo`}
                                    />
                                </div>
                                <div className="text-gray-600 font-bold">
                                    <div className=''>
                                        {tournament.name}
                                    </div>
                                    <div className="text-end mt-2 text-sm ">
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
                            <div className="pb-2 scale-110 md:scale-0 group-hover:scale-110  transition duration-300 ease-in">
                                <div className="flex justify-center gap-5">
                                    <Link to={`/series/${tournament.name}/fixtures`} className=" transition duration-300 ease-in  text-sm  border-b border-gray-600 text-center  ">
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
