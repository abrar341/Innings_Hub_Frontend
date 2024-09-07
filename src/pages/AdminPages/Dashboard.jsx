import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [title, setTitile] = useState('')
  const cards = [
    { to: 'competitions', icon: 'fa-trophy', title: 'Competitions' },
    { to: 'competitions', icon: 'fa-address-book', title: 'Matches' },
    { to: 'competitions', icon: 'fa-gears', title: 'Match Rules' },
    { to: 'players', icon: 'fa-users', title: 'Players' },
    { to: 'competitions', icon: 'fa-briefcase', title: 'Officials' },
    { to: 'teams', icon: 'fa-group', title: 'Teams' },
  ];

  return (
    <>

      <div className="container mx-auto my-5">
        <div className="flex border-b-2 ">
          {cards.map((card, index) => (
            <NavLink to={card.to} key={index} className="  rounded hover:cursor-pointer hover:border-black transition duration-300 ease-in group">
              <div className="flex items-center gap-6  cursor-pointer  ">
                {/* <i className={`fa ${card.icon} text-4xl`}></i> */}
                <img className='h-10 transition duration-300 ease-in group-hover:scale-110' src={"fffff"} alt="" />
                <div className="py-2 text-base font-bold text-gray-600 transition duration-300 ease-in group-hover:scale-102 group-hover:text-black">{card.title}</div>
              </div>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>

  );
};

export default Dashboard;
