import React from 'react';

// 🎯 ATOMIC COMPONENT - RatingDisplay
// Este átomo reproduz exatamente a exibição de rating do legacy
const RatingDisplay = ({ 
    rating,
    maxRating = 5.0,
    reviewsCount = 0,
    showStar = true,
    className = '',
    ...props 
}) => {
    return (
        <div className={`flex items-center ${className}`} {...props}>
            {showStar && <span className="text-yellow-500 text-xl font-bold mr-1">★</span>}
            <span className="text-yellow-500 text-xl font-bold mr-1">{rating}</span>
            <span className="text-gray-500 text-lg">/ {maxRating}</span>
            {reviewsCount > 0 && (
                <span className="ml-2 text-gray-500 text-base">({reviewsCount} avaliações)</span>
            )}
        </div>
    );
};

export default RatingDisplay;
