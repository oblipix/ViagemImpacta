import React from 'react';

// 🎯 ATOMIC COMPONENT - OverlaySearchForm
// Este átomo reproduz exatamente a lógica de sobreposição do legacy
const OverlaySearchForm = ({ 
    children,
    className = '',
    ...props 
}) => {
    return (
        <section className={`px-6 -mt-10 md:-mt-16 relative z-0 ${className}`} {...props}>
            <div className="container mx-auto max-w-full">
                <div className="HotelsSeachForm p-8 rounded-xl shadow-lg px-6 -mt-10 md:-mt-10 relative z-0">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default OverlaySearchForm;
