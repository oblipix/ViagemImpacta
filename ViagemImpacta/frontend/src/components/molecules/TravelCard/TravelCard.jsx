import React from 'react';
import { Button, Text, Image, Card } from '../../atoms';

export const TravelCard = ({ 
    travel, 
    onCardClick, 
    onSaveTravel, 
    isTravelSaved,
    className = ''
}) => {
    const isSaved = isTravelSaved ? isTravelSaved(travel.id) : false;
    const hasDiscount = travel.priceFrom && travel.priceTo && travel.priceFrom > travel.priceTo;

    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick(travel.id);
        }
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        if (onSaveTravel) {
            onSaveTravel(travel);
        }
    };

    return (
        <Card 
            variant="default"
            onClick={handleCardClick}
            className={`relative transition-transform hover:scale-105 ${className}`}
        >
            <div className="relative">
                <Image 
                    src={travel.imageUrl} 
                    alt={travel.title}
                    className="w-full h-48 object-cover"
                />
                
                {/* Status Badge */}
                {travel.status && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {travel.status}
                    </div>
                )}
                
                {/* Save Button */}
                {onSaveTravel && (
                    <Button
                        variant="ghost"
                        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition z-10 text-white"
                        onClick={handleSaveClick}
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
                    {travel.title}
                </Text>
                
                <Text variant="body" className="text-gray-600 mb-4 line-clamp-3">
                    {travel.description}
                </Text>
                
                {travel.eventDate && (
                    <Text variant="small" className="text-blue-600 mb-3">
                        📅 {travel.eventDate}
                    </Text>
                )}
                
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        {hasDiscount && (
                            <Text variant="small" className="text-gray-500 line-through">
                                De R$ {travel.priceFrom?.toFixed(2)}
                            </Text>
                        )}
                        <Text variant="price">
                            R$ {travel.priceTo?.toFixed(2)}
                        </Text>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {travel.type && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {travel.type}
                            </span>
                        )}
                        
                        {hasDiscount && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold">
                                PROMOÇÃO
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};
