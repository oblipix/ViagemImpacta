import React from 'react';
import { Button } from '../Button/Button';

// 🧬 ATOM - Navigation Button (especializado para header)
const NavigationButton = ({ 
  children, 
  isActive = false, 
  onClick, 
  variant = "ghost",
  style,
  className = "",
  ...props 
}) => {
  const baseClasses = `
    buttonHeader 
    text-gray-300 hover:text-white 
    font-medium focus:outline-none 
    transition-colors duration-300
    relative
    ${isActive ? 'active-link' : ''}
    ${className}
  `;

  return (
    <Button
      onClick={onClick}
      className={baseClasses}
      variant={variant}
      style={style}
      {...props}
    >
      {children}
    </Button>
  );
};

export default NavigationButton;
