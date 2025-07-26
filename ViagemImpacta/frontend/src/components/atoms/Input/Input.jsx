import React from 'react';

export const Input = ({ 
    type = 'text',
    placeholder,
    value,
    onChange,
    className = '',
    disabled = false,
    required = false,
    ...props 
}) => {
    const baseClasses = `
        w-full px-4 py-2 border border-gray-300 rounded-lg 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        transition-colors duration-200
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    `;

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`${baseClasses} ${className}`}
            {...props}
        />
    );
};
