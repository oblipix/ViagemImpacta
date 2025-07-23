import React from 'react';

function HotelInfoCard({ hotel }) {
  if (!hotel) return null;
  return (
    <div className="mt-6 text-sm text-gray-700">
      <div><b>Localização:</b> {hotel.location}</div>
      <div><b>Telefone:</b> {hotel.phone}</div>
      <div><b>Estrelas:</b> {hotel.stars} ⭐</div>
      <div><b>Facilidades:</b> {hotel.hasWifi && 'Wi-Fi '} {hotel.hasParking && 'Estacionamento '} {hotel.hasGym && 'Academia '} {hotel.hasRestaurant && 'Restaurante '}</div>
    </div>
  );
}

export default HotelInfoCard;
