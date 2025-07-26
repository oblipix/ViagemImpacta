import React, { useState } from 'react';

export const Image = ({ 
    src, 
    alt, 
    className = '',
    fallback = './assets/images/default-hotel.png',
    onClick,
    ...props 
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        console.warn(`Erro ao carregar imagem: ${src}. Usando fallback: ${fallback}`);
        setImgSrc(fallback);
        setHasError(true);
        setIsLoading(false);
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className={`relative ${onClick ? 'cursor-pointer' : ''}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Carregando...</span>
                </div>
            )}
            <img 
                src={imgSrc}
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onClick={handleClick}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
            />
            {hasError && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Imagem padrão
                </div>
            )}
        </div>
    );
};
