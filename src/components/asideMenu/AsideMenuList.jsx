import React from 'react';
import AsideMenuItem from './AsideMenuItem';

const AsideMenuList = ({ menu }) => {
    return (
        <ul className="text-sm">
            {menu.map((item, index) => (
                <AsideMenuItem key={index} item={item} />
            ))}
        </ul>
    );
};

export default AsideMenuList;
