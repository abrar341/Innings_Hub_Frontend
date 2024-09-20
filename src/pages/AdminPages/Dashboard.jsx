import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import UserDropdown from '../../components/userDropdown';
import Profile from './Profile';


const AdminDashboard = () => {
  const cards = [
    { to: 'competitions', icon: 'fa-trophy', title: 'Competitions' },
    { to: 'competitio', icon: 'fa-address-book', title: 'Matches Schedules' },
    { to: 'players', icon: 'fa-users', title: 'Players' },
    { to: 'teams', icon: 'fa-group', title: 'Teams' },
    { to: 'clubs', icon: 'fa-trophy', title: 'Clubs' },
    { to: 'coetitions', icon: 'fa-briefcase', title: 'Officials' },
  ];
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1  gap-3 text-sm font-semibold transition-all duration-300 ease-in-out transform
    ${isActive
      ? 'text-white bg-blue-600 rounded  border-blue-600 shadow-lg  '
      : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:scale-105 hover:shadow-md'
    }`;
  return (
    <>

      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="col-span-1 grid grid-cols-2 gap-3 md:col-span-2  ">
          {cards.map((card, index) => (
            <div onClick={() => {
              navigate(`/admin/${card.to}`);
            }} key={index} className={navLinkClass
            }
            >
              <div className="realtive hover:bg-gray-100 h-full group w-full flex border border-gray-400 rounded p-4 items-center cursor-pointer  ">
                {/* <i className={`fa ${card.icon} text-4xl`}></i> */}
                <img className='transition duration-300 ease-in group-hover:scale-110' src={"fffff"} alt="" />
                <div className="text-base text-gray-700 font-semibold transition duration-300 ease-in  group-hover:border-gray-700 group-hover:scale-102 group-hover:text-black">{card.title}</div>
              </div>
            </div>
          ))}
        </div>
        <Profile />
      </div>
    </>

  );
};

export default AdminDashboard;
