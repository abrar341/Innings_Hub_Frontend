import React from 'react';

const ScheduledMatchSlide = () => {
    const dummyMatchInfo = {
        date: '2024-12-25',
        time: '14:30',
        venue: 'Melbourne Cricket Ground',
        tournament: {
            name: 'Champions Trophy',
            season: '2024',
        },
        teams: [
            {
                shortName: 'AUS',
                teamLogo: 'https://via.placeholder.com/100?text=AUS',
            },
            {
                shortName: 'IND',
                teamLogo: 'https://via.placeholder.com/100?text=IND',
            },
        ],
    };

    return (
        <>
            {/* Slide for Scheduled Match */}
            <div className="relative w-full h-[80vh]">
                <img
                    src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Scheduled Match Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row justify-center items-center px-8">
                    {/* Left Content */}
                    <div className="p-4 rounded-lg shadow-md max-w-md mx-auto text-gray-300">
                        {/* Date, Time, and Tournament Info */}
                        <div className="flex flex-col items-center mb-4">
                            <p className="text-xs md:text-sm font-semibold">
                                {dummyMatchInfo.date} | {dummyMatchInfo.time}
                            </p>
                            <p className="text-sm md:text-base font-bold">
                                {dummyMatchInfo.tournament.name} - {dummyMatchInfo.tournament.season}
                            </p>
                        </div>

                        {/* Divider */}
                        <hr className="my-2" />

                        {/* Teams Info */}
                        <div className="flex flex-col gap-6 justify-between items-center mb-2">
                            {dummyMatchInfo.teams.map((team, index) => (
                                <div key={index} className="flex items-center space-x-6">
                                    {/* Team Info */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={team.teamLogo}
                                            alt={`${team.shortName} Logo`}
                                            className="w-24 rounded-full"
                                        />
                                        <p className="text-4xl uppercase font-extrabold">
                                            {team.shortName}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Venue */}
                        <p className="text-base font-semibold text-center my-4">
                            Venue: {dummyMatchInfo.venue}
                        </p>

                        {/* View Details Button */}
                        <button
                            className="w-full flex gap-1 justify-center items-center py-2 bg-blue-50 text-blue-600 font-semibold rounded-full hover:bg-blue-100 text-sm md:text-base"
                        >
                            <span className="mb-1 self-end">View Details</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Right Image with Overlay */}
                    <div className="w-1/2 flex justify-end relative">
                        <img
                            src="https://images.unsplash.com/photo-1591013744916-11be9c28e707?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Scheduled Match"
                            className="h-[60%] object-cover rounded shadow-lg"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScheduledMatchSlide;
