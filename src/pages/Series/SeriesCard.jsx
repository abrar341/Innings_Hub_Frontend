import React from 'react';
import { Link } from 'react-router-dom';

const SeriesCard = ({ tournament }) => {
    return (
        <Link
            to={`/series/${tournament.name}/fixtures`}
            className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 rounded hover:cursor-pointer transition duration-300 ease-in group shadow-2xl hover:shadow-2xl overflow-hidden"
        >
            <div className="p-3 flex items-center justify-between">
                <div className="rounded-full border-gray-400 border">
                    <img
                        className="transition duration-300 ease-in h-16 w-16 p-2"
                        src="https://wassets.hscicdn.com/static/images/trophy.svg"
                        alt={`${tournament.name} Logo`}
                    />
                </div>
                <div className="text-gray-600">
                    <div className="font-bold">
                        {tournament.name}
                    </div>
                    <div className="text-end mt-2 text-sm font-semibold">
                        {tournament.start !== 'Start Date' && tournament.end !== 'End Date' ? (
                            <div>
                                {tournament.start} - {tournament.end}
                            </div>
                        ) : (
                            <div>Dates TBA</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="pb-2 transition duration-300 ease-in">
                <div className="flex justify-center gap-5">
                    <Link
                        to={`/series/${tournament.name}/fixtures`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-500 text-center"
                    >
                        Fixtures
                    </Link>
                    <Link
                        to={`/series/${tournament.name}/results`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-800 text-center"
                    >
                        Results
                    </Link>
                    <Link
                        to={`/series/${tournament.name}/point-table`}
                        className="transition duration-300 ease-in text-sm border-b border-gray-800 text-center"
                    >
                        Points Table
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default SeriesCard;
