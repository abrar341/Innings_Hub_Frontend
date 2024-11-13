import React from 'react';
import Slider from 'react-slick';
import LiveMatchSlide from './Crousal/LiveMatchSlide';
import CompletedMatchSlide from './Crousal/CompletedMatchSlide';
import UpcomingTournamentSlide from './Crousal/UpcomingTournamentSlide';

const ImageCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };



    return (
        <div className="relative w-full h-[80vh] overflow-hidden">
            <Slider {...settings}>
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

// Arrow components
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