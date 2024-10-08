import React from 'react';

const UpcomingItem = ({ time, teamName, teamLocation, teamLogo }) => {
    const match = {
        time: 'Mar 12, 2024 - 8:30 PM',
        teamName: 'Lions',
        teamLocation: 'Los Angeles',
        teamLogo: 'https://via.placeholder.com/100x100.png?text=Lions+Logo', // Placeholder image
    };
    return (
        <div className="upcoming-item p-4 border-b border-gray-200">
            <div className="content flex flex-col items-center">
                {/* Match Time */}
                <div className="time text-gray-500 text-sm">
                    {match.time}
                </div>

                {/* Team Details */}
                <div className="team-content flex items-center space-x-4 mt-2">
                    {/* Team Logo */}
                    <div className="team-logo">
                        <img
                            src={match.teamLogo}
                            className="h-10 w-10 object-cover"
                            alt={`${match.teamName} logo`}
                        />
                    </div>

                    {/* Team Name and Location */}
                    <div className="team-details flex flex-col items-center">
                        <div className="team-name font-semibold text-lg">
                            {match.teamName}
                        </div>
                        <div className="team-location text-gray-500 text-sm">
                            {match.teamLocation}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingItem;
