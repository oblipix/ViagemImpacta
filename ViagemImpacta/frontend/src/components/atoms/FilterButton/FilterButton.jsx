import React from 'react';

// 🎯 ATOMIC COMPONENT - FilterButton
const FilterButton = ({ 
    children,
    isActive = false,
    onClick,
    href,
    variant = 'button', // 'button' | 'link'
    className = '',
    ...props 
}) => {
    // Usando as mesmas classes CSS do legacy exatamente como o App.jsx
    const baseClasses = variant === 'button' ? 'reset-btn-style btn-common-style' : 'btn-common-style';
    const activeClass = isActive ? 'btn-active-style' : '';
    
    const combinedClasses = `
        ${baseClasses} ${activeClass} flex items-center
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const handleClick = (e) => {
        if (href) {
            e.preventDefault();
        }
        if (onClick) {
            onClick(e);
        }
    };

    if (variant === 'link' && href) {
        return (
            <a
                href={href}
                onClick={handleClick}
                className={combinedClasses}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={combinedClasses}
            {...props}
        >
            {children}
        </button>
    );
};

export default FilterButton;
