// src/components/atoms/SubmitButton.jsx
import React from 'react';

function SubmitButton({ 
    children, 
    isSubmitting = false,
    disabled = false,
    className = "",
    onClick,
    type = "submit"
}) {
    return (
        <button
            type={type}
            className={`event-submit bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${className}`}
            disabled={isSubmitting || disabled}
            onClick={onClick}
        >
            {isSubmitting ? 'Enviando...' : children}
        </button>
    );
}

export default SubmitButton;
