import React from 'react';

// 🎯 ATOMIC COMPONENT - HeroSlide
const HeroSlide = ({ 
    imageUrl,
    title,
    subtitle,
    overlay = "linear-gradient(rgba(0, 0, 0, 0.81), rgba(0, 0, 0, 0.83))",
    titleClassName = "",
    subtitleClassName = "",
    containerClassName = "",
    alignment = "left",
    children,
    ...props 
}) => {
    const alignmentClasses = {
        left: "justify-start text-left",
        center: "justify-center text-center",
        right: "justify-end text-right"
    };

    const baseContainerClasses = "relative w-full h-full bg-cover bg-center flex items-center p-8";
    const containerClasses = `${baseContainerClasses} ${alignmentClasses[alignment]} ${containerClassName}`;

    const baseTitleClasses = "text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-md";
    const titleClasses = `${baseTitleClasses} ${titleClassName}`;

    const baseSubtitleClasses = "text-base md:text-lg lg:text-xl drop-shadow-sm";
    const subtitleClasses = `${baseSubtitleClasses} ${subtitleClassName}`;

    const backgroundStyle = {
        backgroundImage: `${overlay}, url(${imageUrl})`
    };

    return (
        <div
            className={containerClasses}
            style={backgroundStyle}
            {...props}
        >
            <div className="z-10 max-w-3xl">
                {title && (
                    <h1 className={titleClasses} style={{ fontFamily: '"Anton", sans-serif', textTransform: 'uppercase' }}>
                        {title}
                    </h1>
                )}
                {subtitle && (
                    <p className={subtitleClasses}>
                        {subtitle}
                    </p>
                )}
                {children}
            </div>
        </div>
    );
};

export default HeroSlide;
