

import React from 'react'
import { formatDateToYMD } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

const CompletedMatchSlide = ({ matchInfo }) => {
    const navigate = useNavigate();
    console.log(matchInfo?.innings?.[0]?.team?.teamLogo);
    const getLastBallNumber = (inning) => {
        const lastOverIndex = inning?.overs?.length ? inning.overs.length - 1 : 0;
        const lastOver = inning?.overs?.[lastOverIndex];
        const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
        const lastBall = lastOver?.balls?.[lastBallIndex];
        return lastBall?.ballNumber || 0;
    };
    const handleButtonClick = (matchData) => {
        navigate(`/match/${matchData?._id}/innings`);
    };
    return (
        <>
            {/* Slide 2 - Completed Match */}
            <div className="relative w-full h-[80vh]">
                <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Live Match Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row justify-center items-center px-8">
                    {/* Left Content */}
                    <div className="p-4 rounded-lg shadow-md max-w-md mx-auto text-gray-300">
                        {/* Date and Tournament Info */}
                        <div className="flex font-semibold justify-between text-xs md:text-sm  mb-2">
                            <span>{formatDateToYMD(matchInfo?.date)} - <span className="text-center font-bold">{matchInfo?.tournament?.name}-{matchInfo?.tournament?.season}</span></span>
                            <div className="text-right "><span className="text-[10px] md:text-xs ">RECENT</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="my-2" />

                        {/* Teams and Scores */}
                        <div className="flex flex-col gap-4 justify-between items-center mb-2">
                            {matchInfo?.innings?.map((inning, index) => {
                                const lastBallNumber = getLastBallNumber(inning);
                                return (
                                    <div key={index} className="flex items-center space-x-8">
                                        {/* Team Info */}
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={inning?.team?.teamLogo}
                                                alt={`${inning?.team?.shortName} Logo`}
                                                className="w-24 rounded-full"
                                            />
                                            <p className="text-4xl uppercase font-extrabold">
                                                {inning?.team?.shortName}
                                            </p>
                                        </div>
                                        {/* Scores */}
                                        <div>
                                            <p className="text-2xl uppercase font-extrabold">
                                                {inning.runs}/{inning.wickets} {inning?.overs?.length > 0 ? inning?.overs?.length - 1 : 0}.{lastBallNumber}/{matchInfo?.overs}
                                            </p>
                                        </div>
                                    </div>)
                            }
                            )}
                        </div>


                        {/* Match Summary */}
                        <p className="text-base font-semibold text-center my-4">
                            {matchInfo?.result?.winner?.teamName} won by {matchInfo?.result?.margin}
                        </p>

                        {/* Match Centre Button */}
                        <button
                            className="w-full flex gap-1 justify-center items-center py-1 md:py-2 bg-blue-50 text-blue-600 font-semibold rounded-full hover:bg-blue-100 text-sm md:text-base"
                            onClick={() => handleButtonClick(matchInfo)}
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
                    <div className="w-1/2 flex justify-end relative">
                        <img
                            src="https://images.unsplash.com/photo-1624194770831-00d655f9a1e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Team Logo or Related"
                            className="h-[60%] object-cover rounded shadow-lg"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CompletedMatchSlide
