import React from 'react';

const NavigationTabs = ({ tabs, onTabClick }) => {
    return (
        <div className="py-4 w-full mx-auto min-w-[450px] flex flex-row w-full overflow-x-auto scrollbar-hide ">
            {tabs?.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => onTabClick(index)}
                    className={`inline-flex items-center justify-center whitespace-nowrap py-2 px-3 font-medium rounded transition-colors duration-300 ${tab.active
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white text-gray-700  hover:bg-gray-100 hover:text-black'
                        } `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default NavigationTabs;
