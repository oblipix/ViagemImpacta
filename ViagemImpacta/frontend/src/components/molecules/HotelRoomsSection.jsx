// src/components/molecules/HotelRoomsSection.jsx
import React from 'react';
import HotelRoomCard from './HotelRoomCard';

function HotelRoomsSection({ roomOptions, hotel, onReserveRoom }) {
    if (!roomOptions || roomOptions.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Opções de Quartos</h2>
            <div className="space-y-6">
                {roomOptions.map((room, index) => (
                    <HotelRoomCard
                        key={index}
                        room={room}
                        hotel={hotel}
                        onReserveRoom={onReserveRoom}
                    />
                ))}
            </div>
        </div>
    );
}

export default HotelRoomsSection;
