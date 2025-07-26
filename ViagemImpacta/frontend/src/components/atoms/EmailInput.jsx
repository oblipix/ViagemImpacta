// src/components/atoms/EmailInput.jsx
import React from 'react';

function EmailInput({ 
    value, 
    onChange, 
    placeholder = "Seu melhor e-mail aqui...",
    required = true,
    disabled = false,
    className = ""
}) {
    return (
        <input
            type="email"
            placeholder={placeholder}
            className={`flex-grow p-3 rounded-lg border-2 border-white focus:outline-none focus:border-blue-300 bg-white bg-opacity-20 text-gray-800 placeholder-white ${className}`}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
        />
    );
}

export default EmailInput;
