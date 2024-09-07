import React, { useState } from 'react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setIsSidebarOpen(!isSidebarOpen);
    // };

    const togglePagesMenu = () => {
        setIsPagesMenuOpen(!isPagesMenuOpen);
    };

    return (
        <>
            {/* Toggle button for small screens */}


            {/* Sidebar */}
            <aside
                className={`z-20 w-64 overflow-y-auto bg-white dark:bg-gray-800 flex-shrink-0 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:block fixed md:relative top-0 left-0 h-full`}
            >
                <div className="py-4 text-gray-500 dark:text-gray-400">
                    <a
                        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                        href="#"
                    >
                        Windmill
                    </a>
                    <ul className="mt-6">
                        <li className="relative px-6 py-3">
                            <span
                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                            ></span>
                            <a
                                className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                                href="index.html"
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    ></path>
                                </svg>
                                <span className="ml-4">Dashboard</span>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li className="relative px-6 py-3">
                            <a
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                href="forms.html"
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                    ></path>
                                </svg>
                                <span className="ml-4">Forms</span>
                            </a>
                        </li>
                        {/* ... other menu items ... */}
                        <li className="relative px-6 py-3">
                            <button
                                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                onClick={togglePagesMenu}
                                aria-haspopup="true"
                            >
                                <span className="inline-flex items-center">
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                    </svg>
                                    <span className="ml-4">Pages</span>
                                </span>
                                <svg
                                    className={`w-4 h-4 ${isPagesMenuOpen ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 20 20"
                                    stroke="currentColor"
                                >
                                    <path d="M5 9l5 5 5-5"></path>
                                </svg>
                            </button>
                            {isPagesMenuOpen && (
                                <ul
                                    className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner dark:text-gray-400 dark:bg-gray-900"
                                    aria-label="submenu"
                                >
                                    <li className="relative px-6 py-3">
                                        <a
                                            className="inline-flex items-center w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                            href="login.html"
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li className="relative px-6 py-3">
                                        <a
                                            className="inline-flex items-center w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                            href="create-account.html"
                                        >
                                            Create account
                                        </a>
                                    </li>
                                    <li className="relative px-6 py-3">
                                        <a
                                            className="inline-flex items-center w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                            href="forgot-password.html"
                                        >
                                            Forgot password
                                        </a>
                                    </li>
                                    <li className="relative px-6 py-3">
                                        <a
                                            className="inline-flex items-center w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                            href="404.html"
                                        >
                                            404
                                        </a>
                                    </li>
                                    <li className="relative px-6 py-3">
                                        <a
                                            className="inline-flex items-center w-full transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                            href="blank.html"
                                        >
                                            Blank
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                    <div className="px-6 my-6">
                        <button
                            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        >
                            Create account
                            <span className="ml-2" aria-hidden="true">
                                +
                            </span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for small screens when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
