import React from 'react';

const Dashboard = () => {
  const cards = [
    { icon: 'fa-trophy', title: 'Competitions' },
    { icon: 'fa-address-book', title: 'Matches' },
    { icon: 'fa-gears', title: 'Match Rules' },
    { icon: 'fa-users', title: 'Players' },
    { icon: 'fa-briefcase', title: 'Officials' },
    { icon: 'fa-group', title: 'Teams' },
  ];

  return (
    <div className="container mx-auto my-5">
      <h4 className="text-center text-xl font-bold my-2">Manage your Actions</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
        {cards.map((card, index) => (
          <div key={index} className=" border border-gray-400 rounded hover:cursor-pointer hover:border-black transition duration-300 ease-in group">
            <div className="flex items-center gap-6  cursor-pointer p-4  ">
              {/* <i className={`fa ${card.icon} text-4xl`}></i> */}
              <img className='h-10 transition duration-300 ease-in group-hover:scale-110' src={"data:image/png;base64,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"} alt="" />
              <div className="py-2 text-base font-bold text-gray-600 transition duration-300 ease-in group-hover:scale-102 group-hover:text-black">{card.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
