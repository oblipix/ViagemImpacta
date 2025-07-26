import React from 'react';

// 🎯 ATOMIC COMPONENT - CategoryTag
// Este átomo reproduz exatamente as tags de categoria do legacy
const CategoryTag = ({ 
    category,
    onClick,
    className = '',
    variant = 'default',
    ...props 
}) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold transition-colors duration-200';
    
    const variantClasses = {
        default: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        success: 'bg-green-100 text-green-800 hover:bg-green-200'
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (onClick) {
            onClick(category);
        }
    };
    
    return (
        <span 
            className={`${baseClasses} ${variantClasses[variant]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={handleClick}
            {...props}
        >
            {category}
        </span>
    );
};

export default CategoryTag;
