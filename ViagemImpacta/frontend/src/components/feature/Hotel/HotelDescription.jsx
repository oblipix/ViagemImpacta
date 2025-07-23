import React from 'react';

function HotelDescription({ description }) {
  if (!description) return null;
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-gray-50 rounded-lg p-6 shadow-sm">
      <div className="w-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Sobre o Hotel</h3>
        <p className="text-gray-700 text-sm mb-3">{description}</p>
      </div>
    </div>
  );
}

export default HotelDescription;
