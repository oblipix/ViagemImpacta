import React from 'react';

// 🎯 ATOMIC COMPONENT - Container
const Container = ({ 
    children, 
    className = '',
    maxWidth = 'default',
    padding = true,
    ...props 
}) => {
    const baseStyles = "mx-auto";
    
    const maxWidths = {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md", 
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        '2xl': "max-w-screen-2xl",
        full: "max-w-full",
        default: "container"
    };

    const paddingStyles = padding ? "px-6" : "";
    
    const combinedStyles = `${baseStyles} ${maxWidths[maxWidth]} ${paddingStyles} ${className}`;

    return (
        <div 
            className={combinedStyles}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;
