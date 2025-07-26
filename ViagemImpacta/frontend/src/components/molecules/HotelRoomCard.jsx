// src/components/molecules/HotelRoomCard.jsx
import React from 'react';
import ReserveButton from '../atoms/ReserveButton';

function HotelRoomCard({ room, hotel, onReserveRoom }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h3 className="text-xl font-semibold text-gray-800">{room.type}</h3>
                <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                <p className="text-gray-700 text-sm">
                    Capacidade: {room.minCapacity || 1} - {room.capacity} {room.capacity > 1 ? 'pessoas' : 'pessoa'}
                </p>
                {room.beds && (
                    <p className="text-gray-700 text-sm">Camas: {room.beds}</p>
                )}
                {room.bathrooms && (
                    <p className="text-gray-700 text-sm">Banheiros: {room.bathrooms}</p>
                )}
                {room.available !== undefined && (
                    <p className="text-gray-700 text-sm">
                        Disponíveis: {room.available} {room.available === 1 ? 'quarto' : 'quartos'}
                    </p>
                )}
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 text-right">
                <p className="pHotelDetails text-2xl font-bold text-green-600 mb-2">
                    R$ {room.price.toFixed(2).replace('.', ',')}
                </p>
                <ReserveButton 
                    onReserve={onReserveRoom}
                    hotel={hotel}
                    room={room}
                />
            </div>
        </div>
    );
}

export default HotelRoomCard;
