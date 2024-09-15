import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UserDropdown from '../../components/userDropdown';

const AdminDashboard = () => {
  const cards = [
    { to: 'competitions', icon: 'fa-trophy', title: 'Competitions' },
    { to: 'competitio', icon: 'fa-address-book', title: 'Matches Schedules' },
    { to: 'players', icon: 'fa-users', title: 'Players' },
    { to: 'teams', icon: 'fa-group', title: 'Teams' },
    { to: 'clubs', icon: 'fa-trophy', title: 'Clubs' },
    { to: 'coetitions', icon: 'fa-briefcase', title: 'Officials' },
  ];
  const navLinkClass = ({ isActive }) =>
    `px-3 py-1  gap-3 text-sm font-semibold transition-all duration-300 ease-in-out transform
    ${isActive
      ? 'text-white bg-blue-600 rounded  border-blue-600 shadow-lg  '
      : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:scale-105 hover:shadow-md'
    }`;
  return (
    <>
      <h2 className='text-3xl  mt-6 font-bold mb-6 text-center text-gray-700'>
        Admin
      </h2>
      <div className="container flex items-end pb-2 border-b border-gray-300 justify-between mx-auto my-5">
        <div className="flex  gap-2  pl-4 pb-4 ">
          {cards.map((card, index) => (
            <NavLink to={card.to} key={index} className={navLinkClass
            }
            >

              <div className="flex items-center  cursor-pointer  ">
                {/* <i className={`fa ${card.icon} text-4xl`}></i> */}
                <img className='transition duration-300 ease-in group-hover:scale-110' src={"fffff"} alt="" />
                <div className="text-base font-bold transition duration-300 ease-in group-hover:scale-102 group-hover:text-black">{card.title}</div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className='mr-2'>

          <UserDropdown />
        </div>
      </div>
      <Outlet />
    </>

  );
};

export default AdminDashboard;
