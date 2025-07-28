import React from 'react';
import { Image } from '../Image';
import IconSVG from '../IconSVG/IconSVG';

/**
 * 🧩 AvatarUpload Atom
 * 
 * Atom para upload de avatar com preview
 * Reutilizável em perfis, cadastros, etc.
 */
const AvatarUpload = ({ 
  src,
  alt = "Avatar",
  onChange,
  size = "md",
  editable = false,
  loading = false,
  className = "",
  imageClassName = "",
  overlayClassName = "",
  accept = "image/*",
  ...props 
}) => {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-40 h-40",
    lg: "w-60 h-60",
    xl: "w-80 h-80"
  };

  const iconSizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10", 
    lg: "h-14 w-14",
    xl: "h-18 w-18"
  };

  const avatarSize = sizeClasses[size] || sizeClasses.md;
  const iconSize = iconSizeClasses[size] || iconSizeClasses.md;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onChange) {
      onChange(file, event);
    }
  };

  return (
    <div className={`relative group ${className}`} {...props}>
      {/* Avatar Image */}
      <Image
        src={src}
        alt={alt}
        className={`${avatarSize} rounded-full object-cover border-4 border-blue-400 shadow-md transition-transform duration-300 ${editable ? 'group-hover:scale-105' : ''} ${imageClassName}`}
      />
      
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <IconSVG className={`${iconSize} text-white animate-spin`}>
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </IconSVG>
        </div>
      )}
      
      {/* Edit overlay */}
      {editable && !loading && (
        <label
          htmlFor="avatar-upload"
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${overlayClassName}`}
          title="Alterar Avatar"
        >
          <input
            id="avatar-upload"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <IconSVG className={`${iconSize} text-white`}>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </IconSVG>
        </label>
      )}
    </div>
  );
};

export default AvatarUpload;
