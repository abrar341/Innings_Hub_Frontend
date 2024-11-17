import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const LiveMatchSlide = ({ match }) => {
  console.log(match);

  const navigate = useNavigate();
  const [liveMatch, setLiveMatch] = useState(match);
  console.log(liveMatch);

  useEffect(() => {
    if (liveMatch?.status === 'live') {
      const socket = io('http://localhost:8000');
      socket.emit('joinMatch', liveMatch._id);

      socket.on('newBall', (updatedMatch) => {
        console.log(updatedMatch);

        if (updatedMatch?._id === liveMatch?._id) {
          setLiveMatch(updatedMatch);
        }
      });

      socket.on('matchUpdate', (updatedMatch) => {
        if (updatedMatch._id === liveMatch._id) {
          setLiveMatch(updatedMatch);
        }
      });


    }
  }, [liveMatch]);

  if (!liveMatch) return null;

  return (
    <div className="relative w-full h-[80vh]">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1708147684485-7d0485087be3?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Live Match Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row justify-center items-center px-8">
        {/* Left Content */}
        <div className="p-4 rounded-lg shadow-md max-w-md mx-auto text-gray-300">
          {/* Date and Tournament Info */}
          <div className="flex font-semibold justify-between text-xs md:text-sm mb-2">
            <span>
              {new Date(liveMatch.date).toLocaleDateString()} -{' '}
              <span className="text-center font-bold">{liveMatch.tournamentName}</span>
            </span>
            <div className="text-right">
              <span className="text-[10px] md:text-xs">LIVE</span>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-2" />

          {/* Teams and Scores */}
          <div className="flex flex-col gap-4 justify-between items-center mb-2">
            {liveMatch?.teams.map((team, index) => (
              <div key={index} className="flex items-center space-x-8">
                <div className="flex items-center gap-4">
                  <img
                    src={team.teamLogo}
                    alt={team.teamName}
                    className="w-24 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                    }}
                  />
                  <p className="text-4xl uppercase font-extrabold">{team.shortName}</p>
                </div>
                {liveMatch?.innings[index] && (
                  <div>
                    <p className="text-2xl uppercase font-extrabold">
                      {liveMatch.innings[index].runs}/{liveMatch.innings[index].wickets} (
                      {liveMatch.innings[index].overs.length})
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Match Summary */}
          <p className="text-base font-semibold text-center my-4">
            {liveMatch.status === 'live'
              ? `Need ${liveMatch.target} runs in ${liveMatch.overs} overs`
              : ''}
          </p>

          {/* Match Centre Button */}
          <button
            onClick={() => navigate(`/match/${liveMatch._id}/innings`)}
            className="w-full flex gap-1 justify-center items-center py-1 md:py-2 bg-blue-50 text-blue-600 font-semibold rounded-full hover:bg-blue-100 text-sm md:text-base"
          >
            <span className="mb-1 self-end">Match Centre</span>
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
        <div className="w-1/2 flex hidden md:block justify-end relative">
          <img
            src="https://images.unsplash.com/photo-1708147684485-7d0485087be3?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team Logo or Related"
            className="h-[60%] object-cover rounded-lg shadow-lg"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatchSlide;
