import React from 'react';

// 🎯 ATOMIC COMPONENT - SVGIcon
const SVGIcon = ({ type, className = "h-5 w-5 text-gray-400" }) => {
    const icons = {
        location: (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
        ),
        guests: (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V8a2 2 0 00-2-2h-2M4 7v10m0 0h6m-6 0h-2a2 2 0 01-2-2V7a2 2 0 012-2h2m0 0h10M4 7a2 2 0 012-2h2m0 0h8a2 2 0 012 2M4 7v10m0 0h16M4 17h16"/>
            </svg>
        ),
        search: (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
        )
    };

    return icons[type] || null;
};

export default SVGIcon;
