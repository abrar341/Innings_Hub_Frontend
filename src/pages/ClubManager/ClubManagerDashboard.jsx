import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClubManagerDashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.auth.user);
    const club = userInfo?.club
    return (
        <div className="min-h-screen">
            <header className="bg-green-600 text-white p-3 font-bold text-center">
                {/* <h1 className="text-2xl font-bold">Welcome, {user.ame}</h1> */}
                <h2 className="text-xl">{club.clubName} Dashboard</h2>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <nav className="w-64 bg-white shadow-md h-screen p-4 sticky top-0">
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/club/details"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
                            >
                                Club Details
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="teams"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
                            >
                                Manage Teams
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="players"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
                            >
                                Manage Players
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/club/matches"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
                            >
                                Matches
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="tournaments"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
                            >
                                Tournaments
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="flex-1">
                    {/* <h3 className="text-2xl font-bold text-gray-800 mb-4">Overview</h3>
                    <p className="text-gray-600">
                        Here you can manage your club's details, teams, players, and check ongoing matches.
                    </p> */}
                    <Outlet />
                </main>
            </div>

            {/* <footer className="bg-green-600 text-white p-4 text-center mt-auto">
                <p>&copy; 2024 Club Management System</p>
            </footer> */}
        </div>
    );
};

export default ClubManagerDashboard;
