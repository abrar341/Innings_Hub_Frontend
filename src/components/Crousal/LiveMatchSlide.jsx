import React from 'react'

const LiveMatchSlide = () => {
  return (
    <>
      {/* Slide 1 - Live Match */}
      <div className="relative w-full h-[80vh]">
        <img
          src="https://images.unsplash.com/photo-1708147684485-7d0485087be3?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Live Match Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row justify-center items-center px-8">
          {/* Left Content */}
          <div className="p-4 rounded-lg shadow-md max-w-md mx-auto text-gray-300">
            {/* Date and Tournament Info */}
            <div className="flex font-semibold justify-between text-xs md:text-sm  mb-2">
              <span>12.11.2024 - <span className="text-center font-bold">ICC T20  World Cup</span></span>
              <div className="text-right "><span className="text-[10px] md:text-xs ">LIVE</span>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-2" />

            {/* Teams and Scores */}
            <div className="flex flex-col gap-4 justify-between items-center mb-2">
              <div className="flex items-center space-x-8">
                {/* Team 1 */}
                <div className='flex items-center gap-4'><img
                  src="https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/1170.png?v=7"
                  className=" w-24 "
                />
                  <p className="text-4xl uppercase font-extrabold">IND</p></div>
                <div>
                  <p className="text-2xl uppercase font-extrabold">56/1 (7.1)</p>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                {/* Team 2 */}
                <div className='flex items-center gap-4'>
                  <img
                    src="https://assets-icc.sportz.io/static-assets/buildv3-stg/images/teams/4.png?v=7"
                    alt="THA Flag"
                    className="w-24"
                  />
                  <p className="text-4xl  uppercase font-extrabold">PAK</p>
                </div>

                <div>
                  <p className="text-2xl uppercase font-extrabold">55 (19.4)</p>
                </div>
              </div>
            </div>

            {/* Match Summary */}
            <p className="text-base font-semibold text-center my-4">
              Pak need 200 runs in 20 overs
            </p>

            {/* Match Centre Button */}
            <button className="w-full  flex gap-1 justify-center items-center py-1 md:py-2 bg-blue-50 text-blue-600 font-semibold rounded-full hover:bg-blue-100 text-sm md:text-base">
              <span className='mb-1 self-end'>Match Centre</span>
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
          {/* Right Image */}
          {/* <div className="w-1/2 flex justify-end">
                            <img
                                src="https://images.unsplash.com/photo-1708147684485-7d0485087be3?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Team Logo or Related"
                                className="h-[60%] object-cover rounded-lg shadow-lg"
                            />
                        </div> */}

          {/* Right Image with Overlay */}
          <div className="w-1/2 flex justify-end relative">
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
    </>
  )
}

export default LiveMatchSlide
