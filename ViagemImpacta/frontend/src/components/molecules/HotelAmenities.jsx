// src/components/molecules/HotelAmenities.jsx
import React from 'react';
import HotelAmenityItem from '../atoms/HotelAmenityItem';

// Importando os ícones SVG da HotelDetailsPage
const Icons = {
  TotalRooms: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  TotalBathrooms: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M11 15v2m1-2v2m-1-5v2m1-2v2m-4-2v2m1-2v2m-4-2v2m1-2v2M4 7h16" /></svg>,
  Parking: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.09 1.5H21m-4 0l-3 6m0 0l-4.5 1.5M14 14l-4.5 1.5M14 14l-.09 1.5M17 17H7l-.09 1.5H21m-4 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>,
  Elevator: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  Restaurant: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>,
  Wifi: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l1.293-1.293a1 1 0 01.707-.293H15a1 1 0 01.707.293l1.293 1.293H20a1 1 0 011 1v4a1 1 0 01-1 1h-1.414l-1.293 1.293a1 1 0 01-.707.293H9a1 1 0 01-.707-.293L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01" /></svg>,
};

function HotelAmenities({ hotel }) {
    return (
        <div className="mb-8 bgHotelDetails1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comodidades e Estrutura</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                {hotel.totalRooms && (
                    <HotelAmenityItem 
                        icon={Icons.TotalRooms}
                        label="Total de Quartos"
                        value={hotel.totalRooms}
                    />
                )}
                {hotel.totalBathrooms && (
                    <HotelAmenityItem 
                        icon={Icons.TotalBathrooms}
                        label="Total de Banheiros"
                        value={hotel.totalBathrooms}
                    />
                )}
                {hotel.elevators && (
                    <HotelAmenityItem 
                        icon={Icons.Elevator}
                        label="Elevadores"
                        value={hotel.elevators}
                    />
                )}
                {hotel.parking !== undefined && (
                    <HotelAmenityItem 
                        icon={Icons.Parking}
                        label="Estacionamento"
                        value={hotel.parking ? 'Disponível' : 'Não Disponível'}
                    />
                )}
                {hotel.hasRestaurant !== undefined && (
                    <HotelAmenityItem 
                        icon={Icons.Restaurant}
                        label="Restaurante"
                        value={hotel.hasRestaurant ? 'Sim' : 'Não'}
                    />
                )}
                {hotel.hasWifi !== undefined && (
                    <HotelAmenityItem 
                        icon={Icons.Wifi}
                        label="Wi-Fi"
                        value={hotel.hasWifi ? 'Disponível' : 'Não Disponível'}
                    />
                )}
            </div>
        </div>
    );
}

export default HotelAmenities;
