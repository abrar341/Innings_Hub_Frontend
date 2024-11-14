import React, { useRef } from 'react';
import Slider from 'react-slick';
import LiveMatchSlide from './Crousal/LiveMatchSlide';
import CompletedMatchSlide from './Crousal/CompletedMatchSlide';
import UpcomingTournamentSlide from './Crousal/UpcomingTournamentSlide';

const ImageCarousel = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,  // Adjusted speed for smoother fade
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        fade: true  // Fade effect enabled
    };

    // Function to handle click based on position
    const handleClick = (event) => {
        const { clientX, currentTarget } = event;
        const { offsetWidth, offsetLeft } = currentTarget;

        // Calculate if click is on left or right half
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
            onClick={handleClick}  // Attach click handler to the container
        >
            <Slider ref={sliderRef} {...settings}>
                {/* Slide 1 - Live Match */}
                <LiveMatchSlide />

                {/* Slide 2 - Completed Match */}
                <CompletedMatchSlide />

                {/* Slide 3 - Upcoming Tournament */}
                <UpcomingTournamentSlide />
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

