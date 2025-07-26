// src/components/atoms/HotelAmenityItem.jsx
import React from 'react';

function HotelAmenityItem({ icon: IconComponent, label, value, className = "" }) {
    return (
        <p className={`flex items-center ${className}`}>
            {IconComponent && <IconComponent />}
            {label}: <span className="font-semibold ml-1">{value}</span>
        </p>
    );
}

export default HotelAmenityItem;
