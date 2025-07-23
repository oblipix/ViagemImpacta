import React, { useState } from 'react';
import { useHotels } from '../hooks/useHotels';

function HotelsPage() {
  const [stars, setStars] = useState('');
  const [amenities, setAmenities] = useState('');
  const { hotels, loading, error } = useHotels({ stars, amenities });

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Página de Hotéis</h2>
      <div className="mb-4 flex gap-4">
        <input type="number" min="1" max="5" value={stars} onChange={e => setStars(e.target.value)} placeholder="Filtrar por estrelas" className="border px-2 py-1 rounded" />
        <input type="text" value={amenities} onChange={e => setAmenities(e.target.value)} placeholder="wifi=true&parking=true" className="border px-2 py-1 rounded" />
      </div>
      {loading && <p className="text-gray-600">Carregando hotéis...</p>}
      {error && <p className="text-red-600">Erro ao carregar hotéis.</p>}
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.id} className="mb-4 p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold text-blue-800">{hotel.name}</h3>
            <div className="text-gray-700">Localização: {hotel.location}</div>
            <div className="text-gray-700">Estrelas: {hotel.stars}</div>
            <div className="text-gray-700">Facilidades: {hotel.hasWifi && 'Wi-Fi '} {hotel.hasParking && 'Estacionamento '} {hotel.hasGym && 'Academia '} {hotel.hasRestaurant && 'Restaurante '}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HotelsPage;
