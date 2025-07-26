import React from 'react';

// 🎯 ATOMIC COMPONENT - SectionTitle
// Este átomo reproduz exatamente o título de seções do legacy
const SectionTitle = ({ 
    children,
    className = '',
    level = 2,
    ...props 
}) => {
    const Tag = `h${level}`;
    
    return (
        <Tag 
            className={`TitleSection text-3xl font-bold text-gray-800 mb-6 ${className}`} 
            {...props}
        >
            {children}
        </Tag>
    );
};

export default SectionTitle;
