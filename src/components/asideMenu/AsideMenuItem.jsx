import React, { useState, useEffect } from 'react';
import { mdiMinus, mdiPlus } from '@mdi/js';
import Icon from './Icon';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AsideMenuList from './AsideMenuList';

const AsideMenuItem = ({ item, isDropdownList = false }) => {
    const [isLinkActive, setIsLinkActive] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (item.href) {
            const linkPathName = new URL(item.href, window.location.href).pathname;
            const activePathname = new URL(location.pathname, window.location.href).pathname;
            setIsLinkActive(linkPathName === activePathname);
        }
    }, [item.href, location.pathname]);

    return (
        <li>
            {item.href ? (
                <Link
                    to={item.href}
                    className={`flex items-center py-3 px-6 text-white hover:bg-gray-800 ${isLinkActive ? 'bg-gray-700' : ''}`}
                >
                    {item.icon && <Icon path={item.icon} className="mr-2" />}
                    <span className="flex-grow">{item.label}</span>
                </Link>
            ) : (
                <div
                    className="flex items-center py-3 px-6 text-white hover:bg-gray-800 cursor-pointer"
                    onClick={() => setIsDropdownActive(!isDropdownActive)}
                >
                    {item.icon && <Icon path={item.icon} className="mr-2" />}
                    <span className="flex-grow">{item.label}</span>
                    {item.menu && <Icon path={isDropdownActive ? mdiMinus : mdiPlus} className="ml-2" />}
                </div>
            )}
            {item.menu && isDropdownActive && (
                <AsideMenuList menu={item.menu} />
            )}
        </li>
    );
};

AsideMenuItem.propTypes = {
    item: PropTypes.shape({
        href: PropTypes.string,
        icon: PropTypes.string,
        label: PropTypes.string.isRequired,
        menu: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    isDropdownList: PropTypes.bool,
};

export default AsideMenuItem;
