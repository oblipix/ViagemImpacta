import React from 'react';
import { Text } from '../Text';
import IconSVG from '../IconSVG/IconSVG';

/**
 * 🧩 StarRating Atom
 * 
 * Atom para exibição de rating com estrelas
 * Reutilizável em hotéis, reviews, etc.
 */
const StarRating = ({ 
  rating = 0, 
  maxRating = 5, 
  showText = true,
  showReviewCount = false,
  reviewCount = 0,
  size = "md",
  className = "",
  starClassName = "",
  textClassName = "",
  ...props 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg", 
    xl: "text-xl"
  };

  const starSize = sizeClasses[size] || sizeClasses.md;
  const textSize = textSizeClasses[size] || textSizeClasses.md;

  return (
    <div className={`flex items-center ${className}`} {...props}>
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, index) => {
          const filled = index < Math.floor(rating);
          const partial = index < rating && !filled;
          
          return (
            <IconSVG 
              key={index}
              className={`${starSize} ${filled ? 'text-yellow-500' : partial ? 'text-yellow-300' : 'text-gray-300'} ${starClassName}`}
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </IconSVG>
          );
        })}
      </div>
      
      {showText && (
        <Text 
          variant="body" 
          className={`ml-2 font-semibold ${textSize} ${textClassName}`}
        >
          {rating.toFixed(1)}
        </Text>
      )}
      
      {showReviewCount && reviewCount > 0 && (
        <Text 
          variant="body" 
          className={`ml-1 text-gray-500 ${textSize}`}
        >
          ({reviewCount} {reviewCount === 1 ? 'avaliação' : 'avaliações'})
        </Text>
      )}
    </div>
  );
};

export default StarRating;
