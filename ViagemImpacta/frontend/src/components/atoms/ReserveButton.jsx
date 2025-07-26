// src/components/atoms/ReserveButton.jsx
import React from 'react';

function ReserveButton({ onReserve, hotel, room, className = "" }) {
    return (
        <button 
            onClick={() => onReserve(hotel, room)}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 reservation-button ${className}`}
        >
            Reservar
        </button>
    );
}

export default ReserveButton;
