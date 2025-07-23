import React from 'react';
import { useParams } from 'react-router-dom';
import { useHotelDetails } from '../hooks/useHotelDetails';

function HotelDetailsPage() {
  const { id } = useParams();
  const { hotel, loading, error } = useHotelDetails(id);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Detalhes do Hotel</h2>
      {loading && <p className="text-gray-600">Carregando...</p>}
      {error && <p className="text-red-600">Erro ao carregar hotel.</p>}
      {hotel && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-2">{hotel.name}</h3>
          <div className="text-gray-700 mb-2">Localização: {hotel.location}</div>
          <div className="text-gray-700 mb-2">Estrelas: {hotel.stars}</div>
          <div className="text-gray-700 mb-2">Facilidades: {hotel.hasWifi && 'Wi-Fi '} {hotel.hasParking && 'Estacionamento '} {hotel.hasGym && 'Academia '} {hotel.hasRestaurant && 'Restaurante '}</div>
          <div className="text-gray-700 mb-2">Descrição: {hotel.description}</div>
        </div>
      )}
    </div>
  );
}

export default HotelDetailsPage;
