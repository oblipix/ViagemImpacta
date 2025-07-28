import React from 'react';

/**
 * 🧩 IconSVG Atom
 * 
 * Atom base para ícones SVG reutilizáveis
 * Centraliza estilização e comportamento de ícones
 */
const IconSVG = ({ 
  children, 
  className = "h-5 w-5 text-gray-500", 
  fill = "none", 
  viewBox = "0 0 24 24", 
  stroke = "currentColor", 
  strokeWidth = "2",
  onClick,
  ...props 
}) => (
  <svg 
    className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
    fill={fill}
    viewBox={viewBox}
    stroke={stroke}
    strokeWidth={strokeWidth}
    onClick={onClick}
    {...props}
  >
    {children}
  </svg>
);

export default IconSVG;
