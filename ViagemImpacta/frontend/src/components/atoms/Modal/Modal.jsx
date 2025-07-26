import React from 'react';

const Modal = ({ 
    isOpen,
    onClose,
    title,
    children,
    className = '',
    maxWidth = 'max-w-lg',
    ...props 
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
            {...props}
        >
            <div className={`bg-white rounded-lg shadow-xl p-8 w-full ${maxWidth} relative max-h-[90vh] overflow-y-auto ${className}`}>
                {/* Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold transition-colors"
                        aria-label="Fechar modal"
                    >
                        &times;
                    </button>
                )}
                
                {/* Title */}
                {title && (
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center pr-8">
                        {title}
                    </h2>
                )}
                
                {/* Content */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
