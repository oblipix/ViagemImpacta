// src/components/molecules/HotelRoomCard.jsx
import React from 'react';
import { Card, Text, PriceDisplay, AmenityItem, IconSVG } from '../atoms';
import ReserveButton from '../atoms/ReserveButton';

function HotelRoomCard({ room, hotel, onReserveRoom }) {
    return (
        <Card className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
                <Text variant="h3" className="text-xl font-semibold text-gray-800 mb-2">
                    {room.type}
                </Text>
                <Text variant="body" className="text-gray-600 text-sm mb-3">
                    {room.description}
                </Text>
                
                <div className="space-y-1">
                    <AmenityItem 
                        icon={<IconSVG><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.99 2.99 0 0 0 17.08 7H16.5c-.69 0-1.26.38-1.58.93L13 11.5v3.5c0 .55-.45 1-1 1s-1-.45-1-1v-6.5c0-1.1-.9-2-2-2H6C4.9 7 4 7.9 4 9v11H2v2h18v-2h-2zM12.5 11.5L15 8" /></IconSVG>}
                        label="Capacidade" 
                        value={`${room.minCapacity || 1} - ${room.capacity} ${room.capacity > 1 ? 'pessoas' : 'pessoa'}`}
                    />
                    
                    {room.beds && (
                        <AmenityItem 
                            icon={<IconSVG><path d="M4 10v7h3v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2h3v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M7 7h10v1H7z"/></IconSVG>}
                            label="Camas" 
                            value={room.beds}
                        />
                    )}
                    
                    {room.bathrooms && (
                        <AmenityItem 
                            icon={<IconSVG><path d="M21 12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v5z" /><path d="M11 15v2m1-2v2m-1-5v2m1-2v2m-4-2v2m1-2v2m-4-2v2m1-2v2M4 7h16" /></IconSVG>}
                            label="Banheiros" 
                            value={room.bathrooms}
                        />
                    )}
                    
                    {room.available !== undefined && (
                        <AmenityItem 
                            icon={<IconSVG><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></IconSVG>}
                            label="Disponíveis" 
                            value={`${room.available} ${room.available === 1 ? 'quarto' : 'quartos'}`}
                        />
                    )}
                </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-4 text-right">
                <PriceDisplay 
                    price={room.price} 
                    currency="R$" 
                    size="lg" 
                    className="mb-3"
                />
                <ReserveButton 
                    onReserve={onReserveRoom}
                    hotel={hotel}
                    room={room}
                />
            </div>
        </Card>
    );
}

export default HotelRoomCard;
