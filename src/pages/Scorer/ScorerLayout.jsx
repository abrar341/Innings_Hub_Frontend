import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import ScorerProfile from './ScorerProfile'
import { useGetAllMatchesQuery } from '../../slices/match/matchApiSlice'
import { convertTo12HourFormat, formatDate } from '../../utils/dateFormatter'
import matchData from '../../data/matchData'

const ScorerLayout = () => {
    const { data } = useGetAllMatchesQuery();
    console.log(data);
    const matches = data?.data;
    console.log(matches);

    const navigate = useNavigate();

    const handleButtonClick = (matchData) => {
        // Navigate to the desired route with matchId as a param
        navigate(`/runner/${matchData?._id}`);
    };
    return (
        <>
            {/* <ScorerProfile /> */}
            {/* <div>
                <div className=" pt-4  flex flex-row items-center w-full gap-4 overflow-x-auto px-4 border-b border-gray-400 scrollbar-hide">
                    {[
                        { to: 'live', label: 'LIVE' },
                        { to: 'upcoming', label: 'UPCOMING' },
                        { to: 'results', label: 'RESULTS' },
                    ].map(({ to, label }) => (
                        <div className="shrink-0  relative group" key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex justify-center pb-1 text-sm font-bold text-base  transition-colors duration-300 ease-in-out justify-end  ${isActive
                                        ? 'text-gray-700 border-b-2  border-customDarkBlue'
                                        : 'text-gray-700 border-b-2  border-transparent'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </div>
                    ))}
                </div>
                <Outlet />
            </div> */}
            <div className='grid grid-cols-2 gap-4 p-5'>
                {matches?.map((matchData) => (
                    <div className=" gap-10 overflow-hidden flex-shrink-0 bg-gradient-to-r from-gray-50 to-white border border-gray-300 rounded shadow-lg transform transition-transform duration-300 ">
                        {/* Card Front */}
                        <div className="px-4 py-2">
                            <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
                                <div className="text-gray-600 text-xs truncate">{formatDate(matchData.date)}  </div>
                                <div className='text-gray-600 text-xs truncate'>
                                    {matchData.tournament?.name}-{matchData.tournament?.season}
                                </div>
                                <div className={`text-xs bg-gray-100 border p-1 rounded`}>
                                    {matchData?.status}
                                </div>
                            </div>

                            <div className="mt-4 bg-white space-y-4">
                                {matchData?.teams?.map((team, index) => (
                                    <div className="flex items-center space-x-3" key={index}>
                                        <img
                                            className="w-10 "
                                            src={team?.teamLogo}
                                            alt={team?.teamName}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/00.png?v=7';
                                            }}
                                        />
                                        <div className="flex-1">
                                            <span className="text-sm font-semibold text-gray-800">{team.shortName}</span>
                                        </div>
                                        {/* <div className="text-right">
                                             <div className="text-sm font-bold text-gray-900">{team.teamScore}</div>
                                             <div className="text-xs text-gray-600">{team.teamOvers}</div>
                                         </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Match Status */}
                        <div className='bg-gray-100 p-3 text-center text-gray-500 font-semibold text-xs border-t border-gray-200'>
                            {
                                matchData?.status === 'scheduled' ? (<>
                                    {convertTo12HourFormat(matchData.time)}
                                </>
                                ) : matchData?.status === 'live' ? (
                                    <>Match is in Process</>
                                ) : matchData?.status === 'completed' && matchData?.result?.isTie ? (
                                    <>Match Draw</>
                                ) : matchData?.status === 'completed' ? (
                                    <>{`${matchData?.result?.winner?.teamName} won by ${matchData?.result.margin}`}</>
                                ) : ""
                            }
                        </div>
                        {/* Action Buttons */}
                        <div className=" flex flex-col gap-3 justify-center bottom-0 bg-gray-100 p-2   items-center border-t border-gray-300">
                            <Link
                                to="/all-matches/scorecard/summery"
                                title="MATCH CENTRE"
                                className="text-xs font-semibold text-gray-700 border border-gray-300 bg-white rounded px-3 py-2 inline-flex items-center space-x-1 transition-colors hover:bg-gray-200"
                            >
                                <span>Match centre</span>
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </Link>

                            <button
                                onClick={() => { handleButtonClick(matchData) }}
                                className="text-xs font-semibold text-gray-700 border border-gray-300 bg-white rounded px-3 py-2 inline-flex items-center space-x-1 transition-colors hover:bg-gray-200"
                            >
                                {
                                    matchData?.status === 'completed' ? "See Match Details" : matchData?.status === 'live' ? "Resume Live Scoring" : "Start Live Scoring"
                                }
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ScorerLayout

