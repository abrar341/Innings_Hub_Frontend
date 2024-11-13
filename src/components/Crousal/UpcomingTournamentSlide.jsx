import React from 'react'

const UpcomingTournamentSlide = () => {
    return (
        <>
            {/* Slide 3 - Upcoming Tournament */}
            <div className="relative w-full h-[80vh]">
                <img
                    src="https://plus.unsplash.com/premium_photo-1713836954462-6e6cd1eecc1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Upcoming Tournament Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute w-full inset-0 bg-black bg-opacity-50 flex items-center px-8">
                    {/* Left Content */}
                    <div className="p-8 text-white rounded-lg shadow-xl max-w-2xl  mx-auto space-y-6 bg-opacity-80 backdrop-blur-md bg-white/10 ">
                        {/* <div className="p-8 text-white rounded-lg max-w-2xl  space-y-6  "> */}
                        {/* Header */}
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold uppercase tracking-wider opacity-80">
                                Upcoming Event
                            </h2>
                            <h1 className="text-3xl md:text-4xl font-extrabold uppercase">
                                Fida Memorial 2024
                            </h1>
                        </div>

                        {/* Tournament Dates */}
                        <div className="text-gray-200 text-lg md:text-xl font-semibold space-y-1">
                            <p>Starting on <span className="font-bold text-white">15th Jan 2024</span></p>
                            <p>Final on <span className="font-bold text-white">20th Jan 2024</span></p>
                        </div>

                        {/* Button Section */}
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-500 bg-opacity-90 hover:bg-opacity-100 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md w-full">
                                Register
                            </button>

                        </div>
                    </div>


                    {/* Right Image */}
                    {/* <div className="w-1/2 flex justify-end ">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1712336662130-9dc092000606?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Tournament Poster"
                                className="h-[60%] object-cover bg-opacity-100 rounded-lg shadow-lg"
                            />
                        </div> */}
                </div>
            </div>
        </>
    )
}

export default UpcomingTournamentSlide
