import React from 'react';

const Icon = ({ path, w = 'w-6', h = 'h-6', size = 16, className = '', children }) => {
    return (
        <span className={`inline-flex justify-center items-center ${w} ${h} ${className}`}>
            <svg viewBox="0 0 24 24" width={size} height={size} className="inline-block">
                <path fill="currentColor" d={path} />
            </svg>
            {children}
        </span>
    );
};

export default Icon;
