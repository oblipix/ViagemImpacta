// src/components/atoms/HotelImage.jsx
import React from 'react';

function HotelImage({ 
    src, 
    alt, 
    onClick, 
    className = "",
    isMain = false 
}) {
    const baseClasses = isMain 
        ? "w-full h-96 object-cover rounded-lg mb-6 cursor-pointer" 
        : "w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition";
    
    return (
        <img
            src={src}
            alt={alt}
            className={`${baseClasses} ${className}`}
            onClick={onClick}
        />
    );
}

export default HotelImage;
