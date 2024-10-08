import React from 'react'
import { useOutletContext } from 'react-router-dom';

const Overs = () => {
    const context = useOutletContext();
    let matchInfo = context;
    return (
        <div className='min-h-screen'>
            <h2 className='text-2xl font-bold'>Overs</h2>
            {matchInfo?.innings?.map((inning, inningIndex) => (
                <div key={inningIndex} className='mb-6'>
                    <h3 className='text-xl font-semibold'>
                        Inning {inningIndex + 1} - Team: {inning.team.name}
                    </h3>
                    {inning.overs.map((over, overIndex) => (
                        <div key={overIndex} className='p-4 my-2 bg-gray-100 rounded'>
                            <h4 className='text-lg font-medium'>
                                Over {over.overNumber} - Bowler: {over.bowler.name}
                            </h4>
                            <div className='ml-4'>
                                {over.balls.map((ball, ballIndex) => (
                                    <div key={ballIndex} className='p-2'>
                                        {/* <p className='text-sm'>
                                    <span className='font-bold'>Ball {ball.ballNumber}:</span> 
                                    Batsman: {ball.batsmanId.name}, 
                                    Non-Striker: {ball.nonStrikerId.name}, 
                                    Runs: {ball.runs.scored}, 
                                    Extras: {ball.runs.extras.type} - {ball.runs.extras.runs}
                                </p> */}
                                        {/* {ball.event.boundary.type !== 'none' && (
                                    <p className='text-sm'>
                                        <span className='font-bold'>Boundary:</span> {ball.event.boundary.type}
                                    </p>
                                )} */}
                                        {/* {ball.isOut && (
                                    <p className='text-sm text-red-500'>
                                        <span className='font-bold'>Wicket:</span> {ball.event.wicket.type} 
                                        {ball.event.wicket.by ? ` by ${ball.event.wicket.by.name}` : ''}
                                    </p>
                                )} */}
                                        <p className='text-sm'>
                                            <span className='font-bold'>Valid Delivery:</span> {ball.isValidBall ? 'Yes' : 'No'}
                                        </p>
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
