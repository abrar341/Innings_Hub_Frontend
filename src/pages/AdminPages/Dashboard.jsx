import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const cards = [
    { to: 'competitions', icon: 'fa-trophy', title: 'Competitions' },
    { to: 'competitions', icon: 'fa-address-book', title: 'Matches' },
    { to: 'competitions', icon: 'fa-gears', title: 'Match Rules' },
    { to: 'players', icon: 'fa-users', title: 'Players' },
    { to: 'competitions', icon: 'fa-briefcase', title: 'Officials' },
    { to: 'teams', icon: 'fa-group', title: 'Teams' },
  ];

  return (
    <div className="container mx-auto my-5">
      <h4 className="text-center text-xl font-bold my-2">Manage your Actions</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
        {cards.map((card, index) => (
          <NavLink to={card.to} key={index} className=" border border-gray-400 rounded hover:cursor-pointer hover:border-black transition duration-300 ease-in group">
            <div className="flex items-center gap-6  cursor-pointer p-4  ">
              {/* <i className={`fa ${card.icon} text-4xl`}></i> */}
              <img className='h-10 transition duration-300 ease-in group-hover:scale-110' src={"fffff"} alt="" />
              <div className="py-2 text-base font-bold text-gray-600 transition duration-300 ease-in group-hover:scale-102 group-hover:text-black">{card.title}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>

  );
};

export default Dashboard;
