// src/components/atoms/HotelTitle.jsx
import React from 'react';

function HotelTitle({ title, location, className = "" }) {
    return (
        <div className={className}>
            <h1 className="text-4xl font-extrabold text-blue-800 mb-2">{title}</h1>
            <p className="text-gray-400 text-lg mb-4">{location}</p>
        </div>
    );
}

export default HotelTitle;
