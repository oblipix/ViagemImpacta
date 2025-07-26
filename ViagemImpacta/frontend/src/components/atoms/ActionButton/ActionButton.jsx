import React from 'react';

// 🎯 ATOMIC COMPONENT - ActionButton
// Este átomo reproduz exatamente os botões de ação do legacy
const ActionButton = ({ 
    children,
    onClick,
    variant = 'primary',
    className = '',
    type = 'button',
    disabled = false,
    ...props 
}) => {
    const baseClasses = 'main-action-button px-4 py-2 rounded-md transition duration-300 text-sm mt-4 cursor-pointer';
    
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default ActionButton;
