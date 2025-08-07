import React, { useState, useRef, useEffect } from 'react';
import { hotelService } from '../../services/hotelService';

const SortButton = ({ onSortChange, currentSort = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const dropdownRef = useRef(null);

  const sortOptions = hotelService.getSortOptions();

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
    setIsOpen(false);
    onSortChange(sortValue);
  };

  const getCurrentLabel = () => {
    if (!selectedSort) return 'Ordenar';
    const option = sortOptions.find(opt => opt.value === selectedSort);
    return option ? option.label : 'Ordenar';
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button 
        className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 text-gray-600 rounded-full shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ordenar resultados"
        title={getCurrentLabel()}
      >
        <span className="text-lg">↕</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden min-w-[140px]">
          {sortOptions.map((option, index) => (
            <button
              key={option.value}
              className={`w-full px-3 py-2 text-left text-xs sm:text-sm hover:bg-gray-50 transition-colors duration-150 ${
                selectedSort === option.value 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600'
              } ${
                index === 0 ? 'rounded-t-md' : ''
              } ${
                index === sortOptions.length - 1 ? 'rounded-b-md' : ''
              }`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortButton; 