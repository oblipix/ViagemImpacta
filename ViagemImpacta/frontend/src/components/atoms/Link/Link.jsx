import React from 'react';

// 🎯 ATOMIC COMPONENT - Link
const Link = ({ 
    children, 
    href = "#/",
    onClick,
    className = '',
    variant = 'default',
    external = false,
    ...props 
}) => {
    const baseStyles = "transition-colors duration-200 cursor-pointer";
    
    const variants = {
        default: "text-gray-400 hover:text-white",
        footer: "text-gray-400 hover:text-white transition-colors",
        nav: "text-gray-300 hover:text-white",
        primary: "text-blue-500 hover:text-blue-700",
        danger: "text-red-500 hover:text-red-700"
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
    };

    if (external) {
        return (
            <a 
                href={href}
                className={combinedStyles}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <a 
            href={href}
            className={combinedStyles}
            onClick={handleClick}
            {...props}
        >
            {children}
        </a>
    );
};

export default Link;
