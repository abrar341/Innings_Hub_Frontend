import React, { useEffect, useState } from 'react'

const CurrentStriker = ({ matchInfo }) => {
    const [currentInningIndex, setCurrentInningIndex] = useState(null);
    useEffect(() => {
        if (matchInfo?.currentInning) {
            const current = matchInfo?.currentInning - 1;
            console.log(current);
            setCurrentInningIndex(current);
        }
    }, [matchInfo]);
    const currentInning = matchInfo?.innings?.[currentInningIndex];
    const batsmen = currentInning?.battingPerformances;
    const bowlers = currentInning?.bowlingPerformances;
    return (
        <div>
            <div className=''>
                <div className='flex justify-between px-6 border-b'>
                    <div className=''>
                        {batsmen?.filter(batsman =>
                            batsman?.player?._id === currentInning?.currentStriker?._id ||
                            batsman?.player?._id === currentInning?.nonStriker?._id
                        ).map((batsman, index) => (
                            <div key={index} className="flex flex-wrap justify-center items-center">
                                <div className=" px-4 flex items-center">
                                    {batsman?.player?._id === currentInning?.currentStriker?._id ? (
                                        <span className='text-xl w-4  font-bold '>*</span>
                                    ) : <span className=' font-bold w-4 '></span>
                                    }
                                    <h5 className={`px-4 py-2 font-bold text-gray-700`}>
                                        {batsman?.player?.playerName}
                                    </h5>
                                </div>
                                <div className=" px-4 text-center">{batsman?.runs}({batsman.ballsFaced})</div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {bowlers?.filter(bowler =>
                            bowler?.player?._id === currentInning?.previousBowler?._id ||
                            bowler?.player?._id === currentInning?.currentBowler?._id
                        ).map((bowler, index) => (
                            <div key={index} className="flex justify-center flex-wrap items-center">
                                <div className="py-2 px-4 flex items-center">
                                    {/* {bowler?.player?._id === currentInning?.currentStriker?._id ? (
                                    <span className='text-xl w-4  font-bold '>*</span>
                                ) : <span className=' font-bold w-4 '></span>
                                } */}
                                    <h5 className={`px-4 font-bold text-gray-700`}>
                                        {bowler?.player?.playerName}
                                    </h5>
                                </div>
                                <div className=" px-4 text-center">({bowler?.runsConceded}){bowler.balls}</div>
                            </div>
                        ))}
                    </div>
                </div></div>
        </div>
    )
}

export default CurrentStriker
