import React from 'react';

const Alert = ({ 
    variant = 'info',
    title,
    children,
    className = '',
    ...props 
}) => {
    const baseStyles = "border px-4 py-3 rounded relative mb-4";
    
    const variants = {
        success: "bg-green-100 border-green-400 text-green-700",
        error: "bg-red-100 border-red-400 text-red-700",
        warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
        info: "bg-blue-100 border-blue-400 text-blue-700"
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

    return (
        <div 
            className={combinedStyles}
            role="alert"
            {...props}
        >
            {title && (
                <strong className="font-bold">{title}</strong>
            )}
            <span className={title ? "block sm:inline" : ""}>
                {title && " "}
                {children}
            </span>
        </div>
    );
};

export default Alert;
