import React, { useRef } from 'react';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useGetFeaturedMatchesQuery } from '../../slices/match/matchApiSlice';
import CompletedMatchSlide from './CompletedMatchSlide';
import ScheduledMatchSlide from './ScheduleMatchSlide';
import UpcomingTournamentSlide from './UpcomingTournamentSlide';

const ImageCarousel = () => {
    const sliderRef = useRef(null);

    const { data: featuredMatches, isLoading, error } = useGetFeaturedMatchesQuery();

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    if (isLoading) {
        return (
            <div className="relative w-full h-[80vh]">
                {/* Background Image Placeholder */}
                <div className="w-full h-full bg-gray-300 animate-pulse"></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row justify-center items-center px-8">
                    {/* Left Content */}
                    <div className="p-4 rounded-lg shadow-md max-w-md mx-auto text-gray-300 space-y-4">
                        {/* Date and Tournament Info */}
                        <div className="flex justify-between items-center text-xs md:text-sm">
                            <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
                            <div className="w-1/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                        </div>

                        {/* Divider */}
                        <div className="h-1 bg-gray-300 rounded animate-pulse my-2"></div>

                        {/* Teams and Scores */}
                        <div className="flex flex-col gap-4">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <div key={index} className="flex items-center space-x-8">
                                    {/* Team Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                                    </div>
                                    {/* Scores */}
                                    <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>

                        {/* Match Summary */}
                        <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse mx-auto my-4"></div>

                        {/* Match Centre Button */}
                        <div className="w-full h-10 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>

                    {/* Right Image Placeholder */}
                    <div className="w-1/2 flex justify-end relative">
                        <div className="h-[60%] w-full bg-gray-300 rounded animate-pulse shadow-lg"></div>
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error loading featured matches: {error.message}</div>;
    }

    if (!featuredMatches || featuredMatches.length === 0) {
        return <div>No featured matches available</div>;
    }

    const handleClick = (event) => {
        const { clientX, currentTarget } = event;
        const { offsetWidth, offsetLeft } = currentTarget;
        if (clientX - offsetLeft < offsetWidth / 2) {
            sliderRef.current.slickPrev();
        } else {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div
            className="relative w-full h-[80vh] overflow-hidden"
            onClick={handleClick}
        >
            <Slider ref={sliderRef} {...settings}>
                {featuredMatches?.data.map((match, index) => (
                    <CompletedMatchSlide key={index} matchInfo={match} />
                ))}
                {/* Add UpcomingTournamentSlide as the last slide */}
                {/* <UpcomingTournamentSlide /> */}
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
