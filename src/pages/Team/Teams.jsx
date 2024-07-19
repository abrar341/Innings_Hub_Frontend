import React from 'react';
import teams from '../../data/teams'
import { Link, useNavigate } from 'react-router-dom';



const Teams = () => {


    return (
        <>
            <div className="w-full bg-gray-100 mx-auto border border-gray-300 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-300">
                    <div className="flex flex-col justify-center">
                        <a href="/teams" className="">
                            <span className="font-bold text-lg text-gray-800">POPULAR MEN'S INTERNATIONAL TEAMS</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="grid gap-2 grid-cols-2 xs-1:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
                {teams.map((team, index) => (
                    <Link
                        to={`/team/${team.name}`}
                        key={index}
                        className="rounded-xl hover:cursor-pointer hover:bg-gray-300 hover:cursor-pointer grid-cols-3 border border-gray-300 overflow-hidden transition duration-300 ease-in group">
                        <div className="flex flex-col gap-4 justify-center items-center p-4 space-x-4">
                            <img
                                className="h-20 border-b  pb-4 group-hover:border-black border-gray-300 object-cover transition duration-300 ease-in group-hover:scale-105"
                                src={team.imgSrc}
                                alt={team.name}
                            />
                            <div className='flex justify-center items-center'>
                                <div className="text-sm font-bold group-hover:scale-105 transition duration-300 ease-in">{team.name}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>

    );
};

export default Teams;
