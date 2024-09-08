import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

const ClubManager = () => {
    const players = useSelector((state) => state.players.players);
    const cards = [
        { to: 'players', icon: 'fa-users', title: `Players(${players?.length})` },
        { to: 'teams', icon: 'fa-group', title: 'Teams' },
    ];

    const navLinkClass = ({ isActive }) =>
        `px-2 py-1  rounded  hover:cursor-pointer hover:border-black transition duration-300 ease-in group ${isActive ? 'text-white bg-blue-500  ' : 'border border-gray-300'
        }`;

    return (

        <>

            <div className="container flex justify-center mx-auto my-5">
                <div className="flex gap-4">
                    {cards.map((card, index) => (
                        <NavLink to={card.to} key={index} className={navLinkClass}>
                            <div className="cursor-pointer">
                                {/* <i className={`fa ${card.icon} text-4xl`}></i> */}
                                {card.title}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <Outlet />

        </>

    );
};


export default ClubManager
