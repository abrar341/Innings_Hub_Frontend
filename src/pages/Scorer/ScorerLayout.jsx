import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import ScorerProfile from './ScorerProfile'
import { useGetAllMatchesQuery } from '../../slices/match/matchApiSlice'
import { convertTo12HourFormat, formatDate } from '../../utils/dateFormatter'
import matchData from '../../data/matchData'
import UserDropdown from '../../components/userDropdown'
import MatchCard1 from '../Match/MatchCard'
import { MatchCard1LoadingSkeleton } from '../AdminPages/Competitions/Tournaments/SingleTournament.jsx/Matches'

const ScorerLayout = () => {
    const { data, isLoading } = useGetAllMatchesQuery();
    console.log(data);
    const matches = data?.data;
    console.log(matches);

    const navigate = useNavigate();

    const handleButtonClick = (matchData) => {
        // Navigate to the desired route with matchId as a param
        navigate(`/runner/${matchData?._id}`);
    };

    if (isLoading) {
        return (
            <>
                <div className='p-4 flex justify-end'>
                    <UserDropdown />
                </div>
                <div className='px-5 pb-6 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 sm:gap-4'>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <MatchCard1LoadingSkeleton key={index} />
                    ))}
                </div>
            </>
        );
    }
    return (
        <>
            <div className='p-4 flex justify-end'>
                <UserDropdown />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 sm:gap-4 px-5 pb-4">
                {matches?.map((matchData) => (
                    <MatchCard1 id={matchData?._id} matchData={matchData} />))}
            </div>
        </>
    )
}

export default ScorerLayout

