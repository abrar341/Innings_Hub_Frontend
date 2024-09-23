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
                <span key={routeTo} className='text-sm'>
                    {!isLast ? (
                        <button
                            className='text-blue-600 hover:underline'
                            onClick={() => navigate(routeTo)}
                        >
                            {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                        </button>
                    ) : (
                        <span className='text-blue-500 font-semibold'>
                            {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                        </span>
                    )}
                    {!isLast && ' > '}
                </span>
            );
        });

    return (
        <>
            <h2 className='text-3xl mt-6 font-bold mb-6 text-center text-gray-700'>
                Admin
            </h2>

            <div className='flex justify-between items-center'>
                {/* Breadcrumb Navigation */}
                <div className='text-blue-500 text-sm'>
                    <button
                        className='text-blue-600 text-sm  hover:underline'
                        onClick={() => navigate('/admin')}
                    >
                        Home
                    </button>
                    {breadcrumbs.length > 0 && ' > '}
                    {breadcrumbs}
                </div>

                <div className='mr-2 self-end'>
                    <UserDropdown />
                </div>
            </div>

            {/* Render the routed component */}
            <div className='mt-6'>
                {/* You can now remove the Outlet if desired */}
                <Outlet />
            </div>
        </>
    );
};

export default DashboardLayout;
