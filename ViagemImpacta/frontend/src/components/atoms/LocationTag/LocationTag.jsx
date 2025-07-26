import React from 'react';

// 🎯 ATOMIC COMPONENT - LocationTag
// Este átomo reproduz exatamente a exibição de localização com ícone do legacy
const LocationTag = ({ 
    location,
    className = '',
    iconColor = 'text-blue-500',
    textColor = 'text-gray-600',
    ...props 
}) => {
    return (
        <p className={`mb-3 text-lg flex items-center ${textColor} ${className}`} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 mr-1 ${iconColor}`}
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                />
            </svg>
            {location}
        </p>
    );
};

export default LocationTag;
