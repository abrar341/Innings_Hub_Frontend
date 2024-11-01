import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import UserDropdown from '../../components/userDropdown';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Create breadcrumb links from the location pathname
    const breadcrumbs = location.pathname
        .split('/')
        .filter(path => path) // Filter out any empty strings
        .map((crumb, index, array) => {
            const routeTo = `/${array.slice(0, index + 1).join('/')}`;
            const isLast = index === array.length - 1;

            return (
                <span key={routeTo} className="inline-flex items-center text-sm">
                    {!isLast ? (
                        <button
                            className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                            onClick={() => navigate(routeTo)}
                        >
                            {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                        </button>
                    ) : (
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">
                            {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                        </span>
                    )}
                    {!isLast && <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>}
                </span>
            );
        });

    // Conditionally show breadcrumbs, excluding when on '/admin'
    const showBreadcrumbs = location.pathname !== '/admin';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {showBreadcrumbs && (
                <div className="flex justify-between sticky top-0 bg-white dark:bg-gray-800 py-2 z-10 border-b border-gray-200 dark:border-gray-700 items-center px-6">
                    {/* Breadcrumb Navigation */}
                    <div className="text-blue-500 dark:text-blue-400 text-sm font-semibold">
                        <button
                            className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                            onClick={() => navigate('/admin')}
                        >
                            Home
                        </button>
                        {breadcrumbs.length > 0 && ' / '}
                        {breadcrumbs}
                    </div>
                    <div className="mr-2">
                        <UserDropdown />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="bg-gray-50 dark:bg-gray-900">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
