import React from 'react';
import AsideMenuList from './AsideMenuList';
import OverlayLayer from './OverlayLayer';

const AsideMenu = ({ isAsideMobileExpanded, isAsideLgActive, menu, onAsideLgClose }) => {
    return (
        <>
            {/* Main Aside Menu */}
            <aside
                className={`fixed top-0 h-full w-60 bg-gray-900 z-40 transition-all 
                ${isAsideMobileExpanded ? 'left-0' : '-left-60'} 
                lg:left-0 lg:w-60 lg:relative lg:translate-x-0
                ${!isAsideLgActive ? 'lg:hidden xl:flex' : ''}`}
            >
                <AsideMenuList menu={menu} />
            </aside>

            {/* Overlay for large screen menu */}
            {isAsideLgActive && (
                <OverlayLayer zIndex="z-30" onClick={onAsideLgClose} />
            )}
        </>
    );
};

export default AsideMenu;
