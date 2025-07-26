import React from 'react';

export const Card = ({ 
    children, 
    variant = 'default',
    className = '',
    onClick,
    ...props 
}) => {
    const getCardClasses = () => {
        const baseClasses = 'bg-white rounded-lg overflow-hidden transition-shadow duration-300';
        
        switch(variant) {
            case 'elevated':
                return `${baseClasses} shadow-lg hover:shadow-xl`;
            case 'outlined':
                return `${baseClasses} border border-gray-200 hover:border-gray-300`;
            case 'flat':
                return `${baseClasses}`;
            case 'default':
            default:
                return `${baseClasses} shadow-md hover:shadow-lg`;
        }
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div 
            className={`${getCardClasses()} ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </div>
    );
};
