import React from 'react';
import { Card } from '../Card';
import { Text } from '../Text';
import { Button } from '../Button';

/**
 * 🧩 PriceDisplay Atom
 * 
 * Atom para exibição consistente de preços
 * Reutilizável em hotéis, pacotes, reservas, etc.
 */
const PriceDisplay = ({ 
  price, 
  currency = "R$", 
  period = "",
  originalPrice = null,
  discount = null,
  size = "md",
  color = "green",
  className = "",
  priceClassName = "",
  currencyClassName = "",
  periodClassName = "",
  discountClassName = "",
  ...props 
}) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl", 
    lg: "text-3xl",
    xl: "text-4xl"
  };

  const colorClasses = {
    green: "text-green-600",
    blue: "text-blue-600",
    red: "text-red-600",
    gray: "text-gray-600",
    black: "text-black"
  };

  const textSize = sizeClasses[size] || sizeClasses.md;
  const textColor = colorClasses[color] || colorClasses.green;

  const formatPrice = (value) => {
    if (typeof value !== 'number') return value;
    return value.toFixed(2).replace('.', ',');
  };

  return (
    <div className={`flex flex-col ${className}`} {...props}>
      {/* Preço original com desconto */}
      {originalPrice && discount && (
        <div className="flex items-center gap-2 mb-1">
          <Text 
            variant="body" 
            className={`text-gray-500 line-through text-sm ${discountClassName}`}
          >
            {currency} {formatPrice(originalPrice)}
          </Text>
          <Text 
            variant="body" 
            className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold"
          >
            -{discount}%
          </Text>
        </div>
      )}
      
      {/* Preço principal */}
      <div className="flex items-baseline">
        <Text 
          variant="body" 
          className={`${textSize} font-bold ${textColor} ${priceClassName}`}
        >
          <span className={`text-sm ${currencyClassName}`}>{currency}</span>
          {' '}
          {formatPrice(price)}
        </Text>
        
        {period && (
          <Text 
            variant="body" 
            className={`ml-1 text-sm text-gray-500 ${periodClassName}`}
          >
            {period}
          </Text>
        )}
      </div>
    </div>
  );
};

export default PriceDisplay;
