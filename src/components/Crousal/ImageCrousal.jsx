import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import LiveMatchSlide from './LiveMatchSlide';
import CompletedMatchSlide from './CompletedMatchSlide';
import UpcomingTournamentSlide from './UpcomingTournamentSlide';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const ImageCarousel = () => {
    const sliderRef = useRef(null);

    // State for matches
    const [liveMatch, setLiveMatch] = useState(null);
    const [completedMatch, setCompletedMatch] = useState(null);
    const [upcomingTournaments, setUpcomingTournaments] = useState([]);

    useEffect(() => {
        // Listen for initial carousel data
        socket.on('carouselData', (data) => {
            console.log('Initial carousel data:', data);
            setLiveMatch(data.liveMatch);
            setCompletedMatch(data.completedMatch);
            setUpcomingTournaments(data.upcomingTournaments || []);
        });
        // Listen for live match updates
        socket.on('liveMatchUpdated', (updatedMatch) => {
            console.log('Live match updated:', updatedMatch);
            setLiveMatch(updatedMatch);
        });

        // Listen for completed match updates
        socket.on('completedMatchUpdated', (updatedMatch) => {
            console.log('Completed match updated:', updatedMatch);
            setCompletedMatch(updatedMatch);
        });

        // Cleanup listeners on unmount
        return () => {
            socket.off('carouselData');
            socket.off('liveMatchUpdated');
            socket.off('completedMatchUpdated');
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000, // Adjusted speed for smoother fade
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        fade: true, // Enable fade effect
    };

    // Function to handle click for manual slide navigation
    const handleClick = (event) => {
        const { clientX, currentTarget } = event;
        const { offsetWidth, offsetLeft } = currentTarget;

        // Calculate if click is on the left or right half
        if (clientX - offsetLeft < offsetWidth / 2) {
            // Clicked on the left side - go to previous slide
            sliderRef.current.slickPrev();
        } else {
            // Clicked on the right side - go to next slide
            sliderRef.current.slickNext();
        }
    };

    return (
        <div
            className="relative w-full h-[80vh] overflow-hidden rounded-xl"
            onClick={handleClick} // Attach click handler to the container
        >
            <Slider ref={sliderRef} {...settings}>
                {/* Slide 1 - Live Match */}
                {liveMatch ? (
                    <LiveMatchSlide match={liveMatch} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        No live matches currently
                    </div>
                )}

                {/* Slide 2 - Completed Match */}
                {completedMatch ? (
                    <CompletedMatchSlide match={completedMatch} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        No completed matches
                    </div>
                )}

                {/* Slide 3 - Upcoming Tournaments */}
                {upcomingTournaments.length > 0 ? (
                    upcomingTournaments.map((tournament, index) => (
                        <UpcomingTournamentSlide key={index} tournament={tournament} />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        No upcoming tournaments
                    </div>
                )}
            </Slider>
        </div>
    );
};

// Arrow components (optional if you want visible arrows)
const NextArrow = ({ onClick }) => (
    <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full z-10"
        onClick={onClick}
        aria-label="Next Slide"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
    </button>
);

const PrevArrow = ({ onClick }) => (
    <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full z-10"
        onClick={onClick}
        aria-label="Previous Slide"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
    </button>
);

export default ImageCarousel;
