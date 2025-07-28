import React from 'react';

/**
 * 🧩 OverlayContent Atom
 * 
 * Atom para overlay com conteúdo sobre imagens/backgrounds
 * Reutilizável em cards, hero sections, etc.
 */
const OverlayContent = ({ 
  children, 
  overlayOpacity = "50",
  overlayColor = "black",
  contentPosition = "center",
  className = "",
  overlayClassName = "",
  contentClassName = "",
  ...props 
}) => {
  const positionClasses = {
    center: "justify-center items-center",
    top: "justify-center items-start pt-4",
    bottom: "justify-center items-end pb-4",
    "top-left": "justify-start items-start p-4",
    "top-right": "justify-end items-start p-4", 
    "bottom-left": "justify-start items-end p-4",
    "bottom-right": "justify-end items-end p-4"
  };

  const overlayBg = `bg-${overlayColor}/${overlayOpacity}`;
  const positionClass = positionClasses[contentPosition] || positionClasses.center;

  return (
    <div className={`relative ${className}`} {...props}>
      {/* Overlay background */}
      <div className={`absolute inset-0 ${overlayBg} ${overlayClassName}`}></div>
      
      {/* Content */}
      <div className={`absolute inset-0 flex ${positionClass} text-white ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default OverlayContent;
