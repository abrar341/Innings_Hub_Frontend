import React from 'react'
import { useOutletContext } from 'react-router-dom';

const Overs = () => {
    const context = useOutletContext();
    let matchInfo = context;
    return (
        <div className='min-h-screen min-w-[300px]'>
            <h2 className='text-2xl font-bold'>Overs</h2>
            {matchInfo?.innings?.map((inning, inningIndex) => (
                <div key={inningIndex} className='mb-6'>
                    <h3 className='text-xl font-semibold'>
                        Inning {inningIndex + 1} - Team: {inning?.team?.teamName}
                    </h3>
                    {inning.overs
                        .filter((over) => over.balls.length > 0) // Filter out overs without any balls
                        .map((over, overIndex) => (
                            <div key={overIndex} className='fp-4 p-2 mt-2 bg-gray-100'>
                                <h4 className='text-lg my-2 self-center'>
                                    Over: {over.overNumber}
                                </h4>
                                <div className='flex justify-center gap-3 items-center'>
                                    {over.balls.map((ball, ballIndex) => (
                                        <div
                                            key={ballIndex}
                                            className={`w-10 h-10 text-xl rounded flex justify-center items-center font-bold  ${ball?.isBoundary
                                                ? "bg-yellow-400 text-white"
                                                : ball?.isOut
                                                    ? "bg-red-600 text-white"
                                                    : ball?.isValidBall === false
                                                        ? "bg-green-600 text-white"
                                                        : ball?.runs?.extras?.type !== "none"
                                                            ? "bg-gray-600 text-base text-white"
                                                            : "border border-gray-300"
                                                } `}
                                        >
                                            {ball?.runs?.extras?.type !== "none" ? ball?.runs?.extras?.type : ""}
                                            {ball?.isOut ? "W" : ball?.runs?.scored}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                </div>
            ))}
        </div>

    )
}

export default Overs
