import React from 'react';

export const Text = ({ 
    children, 
    variant = 'body',
    className = '',
    ...props 
}) => {
    // 🎯 MAPEAMENTO para diferentes tipos de texto
    const getTextClasses = () => {
        switch(variant) {
            case 'h1':
                return 'text-4xl font-bold text-gray-900';
            case 'h2':
                return 'text-3xl font-bold text-gray-800';
            case 'h3':
                return 'text-2xl font-bold text-gray-800';
            case 'h4':
                return 'text-xl font-semibold text-gray-800';
            case 'price':
                return 'text-2xl font-bold text-blue-600';
            case 'small':
                return 'text-sm text-gray-600';
            case 'caption':
                return 'text-xs text-gray-500';
            case 'body':
            default:
                return 'text-base text-gray-700';
        }
    };

    // 🔄 ESCOLHER tag HTML baseada no variant
    const getTagName = () => {
        if (variant.startsWith('h')) return variant;
        if (variant === 'small' || variant === 'caption') return 'small';
        return 'p';
    };

    const Component = getTagName();
    
    return (
        <Component 
            className={`${getTextClasses()} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};
