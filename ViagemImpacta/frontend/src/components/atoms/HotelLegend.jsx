// src/components/atoms/HotelLegend.jsx
import React from 'react';

function HotelLegend({ hotels, onLegendClick }) {
    return (
        <div className="w-full md:w-1/3 lg:w-1/4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossas Unidades</h3>
            <div className="flex flex-col gap-3">
                {hotels.map(hotel => (
                    <button
                        key={`legend-${hotel.id}`}
                        onClick={() => onLegendClick(hotel)}
                        className="flex items-center p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-300 text-left"
                    >
                        <span 
                            style={{ backgroundColor: hotel.markerColor }} 
                            className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
                        ></span>
                        <span className="text-gray-800 font-medium">
                            {hotel.location.split(',')[0]}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default HotelLegend;
