// src/components/atoms/StatusMessage.jsx
import React from 'react';

function StatusMessage({ message, type = 'info' }) {
    if (!message) return null;

    const getMessageStyles = () => {
        switch (type) {
            case 'success':
                return 'text-green-200';
            case 'error':
                return 'text-red-200';
            case 'warning':
                return 'text-yellow-200';
            default:
                return 'text-gray-200';
        }
    };

    const detectMessageType = () => {
        if (message.includes('Obrigado') || message.includes('sucesso')) {
            return 'success';
        }
        if (message.includes('erro') || message.includes('inválido')) {
            return 'error';
        }
        return type;
    };

    const messageType = detectMessageType();
    const messageStyles = getMessageStyles(messageType);

    return (
        <p className={`mt-4 text-sm font-medium ${messageStyles}`}>
            {message}
        </p>
    );
}

export default StatusMessage;
