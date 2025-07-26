import React from 'react';
import ActionButton from '../ActionButton/ActionButton';

// 🎯 ATOMIC COMPONENT - TravelCard
// Este átomo reproduz exatamente o card de viagem do legacy
const TravelCard = ({ 
    travel,
    onCardClick,
    className = '',
    generateRandomImageUrl,
    ...props 
}) => {
    const handleButtonClick = (e) => {
        e.stopPropagation();
        if (onCardClick) {
            onCardClick(travel.id);
        }
    };

    const imageUrl = travel.imageUrl || (generateRandomImageUrl ? generateRandomImageUrl(travel.id) : '');
    
    return (
        <div
            className={`cardSombra bg-white rounded-lg border border-gray-200 p-2 transform transition duration-300 hover:scale-105 max-w-[620px] mx-2 relative h-full flex flex-col ${className}`}
            {...props}
        >
            <div className="relative w-full h-92 overflow-hidden rounded-md">
                <img
                    src={imageUrl}
                    alt={travel.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div> 

                <div className="absolute inset-0 p-4 text-white flex flex-col justify-center items-start text-left">
                    <div>
                        <h3 className="TittleCards">{travel.title}</h3>
                        <p className="text-xs mb-3 line-clamp-2">{travel.description}</p>
                    </div>
                    <ActionButton
                        onClick={handleButtonClick}
                        variant="primary"
                    >
                        Ver Detalhes
                    </ActionButton>
                </div>
            </div>
        </div>
    );
};

export default TravelCard;
