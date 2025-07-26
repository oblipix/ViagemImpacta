import React from 'react';

const Label = ({ 
    htmlFor,
    className = '',
    children,
    ...props 
}) => {
    const baseStyles = "block text-sm font-medium text-gray-700";
    const combinedStyles = `${baseStyles} ${className}`;

    return (
        <label 
            htmlFor={htmlFor}
            className={combinedStyles}
            {...props}
        >
            {children}
        </label>
    );
};

export default Label;
