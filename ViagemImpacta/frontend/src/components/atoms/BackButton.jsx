// src/components/atoms/BackButton.jsx
import React from 'react';

function BackButton({ onBack, children = "← Voltar", className = "" }) {
    return (
        <button
            onClick={onBack}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8 transition duration-300 ${className}`}
        >
            {children}
        </button>
    );
}

export default BackButton;
