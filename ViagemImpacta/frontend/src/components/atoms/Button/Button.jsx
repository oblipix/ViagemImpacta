import React from 'react';

export const Button = ({ 
    children, 
    variant = 'primary', 
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    ...props 
}) => {
    // 🎯 REUTILIZA CSS EXISTENTE do projeto
    const getButtonClasses = () => {
        const baseClasses = 'btn-common-style';
        
        switch(variant) {
            case 'active':
                return `${baseClasses} main-action-button`;
            case 'ghost':
                // Se já tem buttonHeader no className, não aplicar estilos de botão de corpo
                if (className.includes('buttonHeader')) {
                    return 'reset-btn-style'; // Apenas reset para deixar o CSS do buttonHeader funcionar
                }
                return `reset-btn-style ${baseClasses}`;
            case 'secondary':
                return `${baseClasses} bg-gray-500 hover:bg-gray-600`;
            case 'outline':
                return `${baseClasses} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50`;
            case 'primary':
            default:
                return baseClasses;
        }
    };

    return (
        <button 
            type={type}
            className={`${getButtonClasses()} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
