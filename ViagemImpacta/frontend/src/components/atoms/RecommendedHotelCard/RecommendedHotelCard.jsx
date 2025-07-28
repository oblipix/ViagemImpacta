import React from 'react';
import ActionButton from '../ActionButton/ActionButton';
import { StarRating, PriceDisplay } from '../index';
import LocationTag from '../LocationTag/LocationTag';

// 🎯 ATOMIC COMPONENT - RecommendedHotelCard
// Este átomo reproduz exatamente o card de hotel recomendado do legacy
const RecommendedHotelCard = ({ 
    hotel,
    onHotelClick,
    className = '',
    ...props 
}) => {
    const handleClick = () => {
        if (onHotelClick) {
            onHotelClick(hotel.id);
        }
    };

    return (
        <div 
            className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${className}`}
            {...props}
        >
            <img 
                src={hotel.mainImageUrl} 
                alt={hotel.title} 
                className="w-full h-48 object-cover" 
            />
            <div className="p-6">
                <h3 className="font-bold text-2xl text-gray-800 mb-2">{hotel.title}</h3>
                
                <LocationTag location={hotel.location} />
                
                <StarRating 
                    rating={hotel.rating} 
                    maxStars={5} 
                    size="sm" 
                    className="mb-4"
                />
                
                <p className="text-gray-700 text-base mb-4 line-clamp-3">{hotel.description}</p>
                
                {hotel.price && (
                    <PriceDisplay 
                        price={hotel.price} 
                        currency="R$" 
                        size="lg" 
                        className="mb-4"
                    />
                )}
                
                <ActionButton
                    onClick={handleClick}
                    variant="primary"
                    className="w-full font-semibold py-3 shadow-md hover:shadow-lg"
                >
                    Ver Detalhes
                </ActionButton>
            </div>
        </div>
    );
};

export default RecommendedHotelCard;
