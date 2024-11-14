import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { Trophy, Calendar, Users, Briefcase, ClipboardList } from 'lucide-react'; // Professional icons
import UserDropdown from '../../components/userDropdown';
import { setPlayers } from '../../slices/clubManager/clubManagerSlice';
import { useDispatch } from 'react-redux';
import { data } from 'autoprefixer';
import { useGetInactivePlayersQuery } from '../../slices/admin/adminApiSlice';

const AdminDashboard = () => {
  const cards = [
    { to: 'competitions', icon: <Trophy />, title: 'Competitions' },
    // { to: 'competitio', icon: <Calendar />, title: 'Matches Schedules' },
    { to: 'clubs', icon: <Users />, title: 'Clubs' },
    { to: 'scorers', icon: <ClipboardList />, title: 'Scorers' },
    { to: 'players', icon: <ClipboardList />, title: 'Inactive Player' },
    // { to: 'assign-matches', icon: <ClipboardList />, title: 'Assign Matches' },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { data: playersData, isLoading: isLoadingPlayers, refetch } = useGetInactivePlayersQuery();
  // console.log(playersData);

  // // Ensure the data is fetched when the page is loaded or navigated back to
  // useEffect(() => {
  //   if (!playersData) {
  //     refetch(); // Force refetch if data is empty or not loaded
  //   }

  //   if (playersData) {
  //     dispatch(setPlayers({ data: playersData?.data }));
  //   }
  // }, [dispatch, playersData, refetch]);  // Add refetch as a dependency to ensure the data is fetched correctly


  const handleCardClick = (to) => {
    navigate(`/admin/${to}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      {/* Header with Profile */}
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Admin
        </h1>
        {/* <div className='mr-2 z-10 self-end'>
          <UserDropdown />
        </div> */}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.to)}
            className="group relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
          >
            {/* Subtle Background Ripple Effect */}
            <div className="absolute inset-0 rounded-lg bg-blue-500 opacity-0 group-hover:opacity-20 transition duration-500"></div>

            {/* Icon and Title */}
            <div className="z-10 flex flex-col items-center">
              <div className="text-5xl text-blue-500 mb-4 transition-transform duration-300 group-hover:scale-110">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-300">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
