import React from 'react';
import { Text } from '../Text';
import IconSVG from '../IconSVG/IconSVG';

/**
 * 🧩 AmenityItem Atom
 * 
 * Atom para exibição de amenidades/facilidades
 * Reutilizável em hotéis, quartos, propriedades, etc.
 */
const AmenityItem = ({ 
  icon,
  label, 
  value = null,
  available = true,
  layout = "horizontal", // "horizontal" | "vertical" | "icon-only"
  size = "md",
  className = "",
  iconClassName = "",
  labelClassName = "",
  valueClassName = "",
  ...props 
}) => {
  const sizeClasses = {
    sm: {
      icon: "h-4 w-4",
      text: "text-sm",
      gap: "gap-1"
    },
    md: {
      icon: "h-5 w-5", 
      text: "text-base",
      gap: "gap-2"
    },
    lg: {
      icon: "h-6 w-6",
      text: "text-lg", 
      gap: "gap-3"
    }
  };

  const layoutClasses = {
    horizontal: "flex items-center",
    vertical: "flex flex-col items-center text-center",
    "icon-only": "flex items-center justify-center"
  };

  const { icon: iconSize, text: textSize, gap } = sizeClasses[size] || sizeClasses.md;
  const layoutClass = layoutClasses[layout] || layoutClasses.horizontal;
  
  const iconColor = available ? "text-gray-600" : "text-gray-400";
  const textColor = available ? "text-gray-700" : "text-gray-400";

  if (layout === "icon-only") {
    return (
      <div className={`${layoutClass} ${className}`} title={label} {...props}>
        {icon && (
          typeof icon === 'string' ? (
            <IconSVG className={`${iconSize} ${iconColor} ${iconClassName}`}>
              <path d={icon} />
            </IconSVG>
          ) : (
            React.cloneElement(icon, {
              className: `${iconSize} ${iconColor} ${iconClassName}`
            })
          )
        )}
      </div>
    );
  }

  return (
    <div className={`${layoutClass} ${gap} ${textColor} ${className}`} {...props}>
      {icon && (
        typeof icon === 'string' ? (
          <IconSVG className={`${iconSize} ${iconColor} ${iconClassName}`}>
            <path d={icon} />
          </IconSVG>
        ) : (
          React.cloneElement(icon, {
            className: `${iconSize} ${iconColor} ${iconClassName}`
          })
        )
      )}
      
      <div className={layout === "vertical" ? "mt-1" : ""}>
        <Text 
          variant="body" 
          className={`${textSize} ${available ? 'font-medium' : ''} ${labelClassName}`}
        >
          {value ? `${label}: ` : label}
          {value && (
            <span className={`font-semibold ml-1 ${valueClassName}`}>
              {value}
            </span>
          )}
        </Text>
      </div>
    </div>
  );
};

export default AmenityItem;
