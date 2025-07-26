// src/components/atoms/HotelDescription.jsx
import React from 'react';

function HotelDescription({ description, className = "" }) {
    return (
        <p className={`text-gray-700 leading-relaxed mb-8 ${className}`}>
            {description}
        </p>
    );
}

export default HotelDescription;
