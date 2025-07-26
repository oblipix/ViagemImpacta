import React from 'react';

const Textarea = ({ 
    variant = 'default',
    className = '',
    rows = 4,
    ...props 
}) => {
    const baseStyles = "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm";
    
    const variants = {
        default: "border-gray-300 focus:ring-purple-500 focus:border-purple-500",
        error: "border-red-300 focus:ring-red-500 focus:border-red-500",
        success: "border-green-300 focus:ring-green-500 focus:border-green-500"
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

    return (
        <textarea 
            className={combinedStyles}
            rows={rows}
            {...props}
        />
    );
};

export default Textarea;
