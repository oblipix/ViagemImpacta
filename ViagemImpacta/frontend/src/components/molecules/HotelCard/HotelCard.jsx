import React from 'react';
import { Button, Text, Image } from '../../atoms';

export const HotelCard = ({ 
    hotel, 
    onImageClick, 
    onSaveHotel, 
    isHotelSaved, 
    className = ''
}) => {
    const isSaved = isHotelSaved ? isHotelSaved(hotel.id) : false;

    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${className}`}>
            <div className="relative">
                <Image 
                    src={hotel.mainImageUrl} 
                    alt={hotel.title}
                    className="w-full h-48 object-cover"
                    onClick={() => onImageClick && onImageClick(hotel)}
                />
                
                {onSaveHotel && (
                    <Button
                        variant="ghost"
                        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition z-10 text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSaveHotel(hotel);
                        }}
                    >
                        <svg className={`h-5 w-5 ${isSaved ? 'text-red-500' : 'text-white'}`} 
                             fill={isSaved ? 'currentColor' : 'none'} 
                             viewBox="0 0 24 24" 
                             stroke="currentColor">
                            <path strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth="2" 
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </Button>
                )}
            </div>
            
            <div className="p-4">
                <Text variant="h3" className="mb-2">
                    {hotel.title}
                </Text>
                
                <Text variant="body" className="text-gray-600 mb-4">
                    {hotel.description}
                </Text>
                
                <div className="flex justify-between items-center">
                    <Text variant="price">
                        R$ {hotel.price?.toFixed(2)}
                    </Text>
                    
                    {hotel.rating && (
                        <div className="flex items-center">
                            <span className="text-yellow-500">⭐</span>
                            <Text variant="small" className="ml-1">
                                {hotel.rating}
                            </Text>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
