import React from 'react';

const OverlayLayer = ({ zIndex = 'z-40', onClick }) => {
    return (
        <div
            className={`fixed inset-0 bg-black opacity-50 ${zIndex}`}
            onClick={onClick}
            role="button"
            aria-label="Close menu overlay"
        />
    );
};

export default OverlayLayer;
