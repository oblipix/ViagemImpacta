// 🧬 MOLECULE - HotelDetailsPageAtomic
// Versão atômica da página de detalhes do hotel (simplificada para iniciantes)

import React, { useState } from 'react';
import { Button, Text, Card, Image } from '../atoms';
import ImageModalAtomic from './ImageModalAtomic/ImageModalAtomic';

// Ícones SVG para comodidades (copiados do legacy)
const Icons = {
  TotalRooms: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  TotalBathrooms: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M11 15v2m1-2v2m-1-5v2m1-2v2m-4-2v2m1-2v2m-4-2v2m1-2v2M4 7h16" /></svg>,
  Parking: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.09 1.5H21m-4 0l-3 6m0 0l-4.5 1.5M14 14l-4.5 1.5M14 14l-.09 1.5M17 17H7l-.09 1.5H21m-4 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>,
  Elevator: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  Restaurant: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>,
  Wifi: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l1.293-1.293a1 1 0 01.707-.293H15a1 1 0 01.707.293l1.293 1.293H20a1 1 0 011 1v4a1 1 0 01-1 1h-1.414l-1.293 1.293a1 1 0 01-.707.293H9a1 1 0 01-.707-.293L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01" /></svg>,
  Pool: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18M4 12c3 0 3-1 6-1s3 1 6 1 3-1 6-1M4 8c3 0 3-1 6-1s3 1 6 1 3-1 6-1" /></svg>,
  Gym: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 4v16m12-16v16m-7-10a4 4 0 108 0m-4 0v-8m-8 8v8m16-8v8" /></svg>,
  ArtRoom: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  Garden: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Cinema: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m3 0H4m0 0v18a2 2 0 002 2h12a2 2 0 002-2V4M9 9l3 3 3-3" /></svg>,
  Sauna: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Spa: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Bar: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>,
  Saloon: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m4-12h6m-6 4h6m-6 4h6m0 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v3m10-5V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m4-12h6m-6 4h6m-6 4h6m0 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v3" /></svg>,
  KidsArea: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h3a2 2 0 002-2V6zm0 0a2 2 0 012 2h3a2 2 0 012 2v4a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm-7 4h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>,
  Lounge: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2z" /></svg>,
  AirConditioning: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  TV: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Safe: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
};

// Mapeamento de nomes de comodidades para componentes de ícone
const amenityIconMap = {
  'Wi-Fi gratuito': Icons.Wifi,
  'Wi-Fi': Icons.Wifi,
  'WiFi': Icons.Wifi,
  'Piscina': Icons.Pool,
  'Academia': Icons.Gym,
  'Spa': Icons.Spa,
  'Restaurante': Icons.Restaurant,
  'Bar': Icons.Bar,
  'Estacionamento': Icons.Parking,
  'Room service 24h': Icons.Elevator,
  'Room service': Icons.Elevator,
  'Elevador': Icons.Elevator,
  'Quartos': Icons.TotalRooms,
  'Banheiros': Icons.TotalBathrooms,
  'Ar condicionado': Icons.AirConditioning,
  'Frigobar': Icons.Bar,
  'TV': Icons.TV,
  'TV 55"': Icons.TV,
  'TV 65"': Icons.TV,
  'Cofre': Icons.Safe,
  'Banheira': Icons.TotalBathrooms,
};

const leisureIconMap = {
  'Piscina': Icons.Pool,
  'Jaguzza': Icons.Spa,
  'Academia': Icons.Gym,
  'Spa': Icons.Spa,
  'Sauna': Icons.Sauna,
  'Bar na piscina': Icons.Bar,
  'Salão de Jogos': Icons.Saloon,
  'Piscina Aquecida': Icons.Pool,
  'Lareira Comunal': Icons.Lounge,
  'Jardim Amplo': Icons.Garden,
  'Trilhas': Icons.Garden,
  'Piscina natural': Icons.Pool,
  'Redário': Icons.Lounge,
  'Salão de Eventos': Icons.Saloon,
  'Área Kids': Icons.KidsArea,
  'Sala de Artes': Icons.ArtRoom,
  'Sala de Cinema': Icons.Cinema,
  'Centro de bem-estar': Icons.Spa,
  'Jacuzzi': Icons.Spa,
  'Sala de jogos': Icons.Saloon,
  'Biblioteca': Icons.ArtRoom,
  'Terraço panorâmico': Icons.Garden,
};

// 🎨 Componentes internos simples
const HotelIcon = ({ children }) => (
    <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        {children}
    </svg>
);

const AmenityItem = ({ icon, label, value }) => (
    <div className="flex items-center text-gray-700">
        {icon}
        <Text variant="body">
            {label}: <span className="font-semibold ml-1">{value}</span>
        </Text>
    </div>
);

const RoomOption = ({ room, hotel, onReserveRoom }) => (
    <Card className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
            <Text variant="h4" className="text-xl font-semibold text-gray-800">{room.type}</Text>
            <Text variant="body" className="text-gray-600 text-sm mb-2">{room.description}</Text>
            <Text variant="body" className="text-gray-700 text-sm">
                Capacidade: {room.minCapacity || 1} - {room.capacity} {room.capacity > 1 ? 'pessoas' : 'pessoa'}
            </Text>
            {room.beds && (
                <Text variant="body" className="text-gray-700 text-sm">Camas: {room.beds}</Text>
            )}
            {room.bathrooms && (
                <Text variant="body" className="text-gray-700 text-sm">Banheiros: {room.bathrooms}</Text>
            )}
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 text-right">
            <Text variant="h3" className="text-2xl font-bold text-green-600 mb-2">
                R$ {room.price.toFixed(2).replace('.', ',')}
            </Text>
            <Button 
                onClick={() => onReserveRoom(hotel, room)}
                variant="primary"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
                Reservar
            </Button>
        </div>
    </Card>
);

// 🎯 COMPONENTE PRINCIPAL - MOLECULE
const HotelDetailsPageAtomic = ({ hotel, onBack, onReserveRoom }) => {
    // Estados simples para o modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [initialImageId, setInitialImageId] = useState(null);

    // 🎨 Ícones simples (sem complexidade extra)
    const Icons = {
        TotalRooms: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </HotelIcon>
        ),
        TotalBathrooms: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v5z" />
            </HotelIcon>
        ),
        Parking: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.09 1.5H21m-4 0l-3 6m0 0l-4.5 1.5M14 14l-4.5 1.5M14 14l-.09 1.5M17 17H7l-.09 1.5H21m-4 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
            </HotelIcon>
        ),
        Restaurant: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
            </HotelIcon>
        ),
        Wifi: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01" />
            </HotelIcon>
        ),
        Pool: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292V15m0 0v2m0-2a4 4 0 100 0m0 0a4 4 0 110 0" />
            </HotelIcon>
        ),
        Gym: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </HotelIcon>
        ),
    };

    // Mapeamento simples
    const leisureIconMap = {
        'Piscina': Icons.Pool,
        'Academia': Icons.Gym,
        'Spa': Icons.Pool,
        'Bar': Icons.Restaurant,
    };

    if (!hotel) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                    Hotel não encontrado.
                </Text>
                <Button onClick={onBack} variant="primary">
                    Voltar para Hotéis
                </Button>
            </div>
        );
    }

    // Funções simples
    const handleImageClick = (imagesArray, clickedImageId) => {
        setModalImages(imagesArray);
        setInitialImageId(clickedImageId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalImages([]);
        setInitialImageId(null);
    };

    return (
        <div className="container mx-auto py-8 px-6">
            <Button
                onClick={onBack}
                variant="secondary"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8 transition duration-300"
            >
                ← Voltar para Hotéis
            </Button>

            <Card className="bg-white rounded-lg shadow-lg p-8">
                {/* Imagem Principal */}
                <Image
                    src={hotel.mainImageUrl}
                    alt={hotel.title}
                    className="w-full h-96 object-cover rounded-lg mb-6 cursor-pointer"
                    onClick={() => handleImageClick(hotel.galleryImages || [], hotel.galleryImages?.[0]?.id)}
                />
                
                <Text variant="h1" className="text-4xl font-extrabold text-blue-800 mb-2">
                    {hotel.title}
                </Text>
                <Text variant="body" className="text-gray-400 text-lg mb-4">
                    {hotel.location}
                </Text>
                <Text variant="body" className="text-gray-700 leading-relaxed mb-8">
                    {hotel.description}
                </Text>

                {/* Galeria */}
                {hotel.galleryImages && hotel.galleryImages.length > 0 && (
                    <div className="mb-8">
                        <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                            Galeria
                        </Text>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {hotel.galleryImages.map(img => (
                                <Image
                                    key={img.id}
                                    src={img.url}
                                    alt={img.alt}
                                    className="w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition"
                                    onClick={() => handleImageClick(hotel.galleryImages, img.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Comodidades */}
                <div className="mb-8">
                    <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                        Comodidades e Estrutura
                    </Text>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {hotel.totalRooms && (
                            <AmenityItem 
                                icon={<Icons.TotalRooms />} 
                                label="Total de Quartos" 
                                value={hotel.totalRooms} 
                            />
                        )}
                        {hotel.totalBathrooms && (
                            <AmenityItem 
                                icon={<Icons.TotalBathrooms />} 
                                label="Total de Banheiros" 
                                value={hotel.totalBathrooms} 
                            />
                        )}
                        {hotel.parking !== undefined && (
                            <AmenityItem 
                                icon={<Icons.Parking />} 
                                label="Estacionamento" 
                                value={hotel.parking ? 'Disponível' : 'Não Disponível'} 
                            />
                        )}
                        {hotel.hasRestaurant !== undefined && (
                            <AmenityItem 
                                icon={<Icons.Restaurant />} 
                                label="Restaurante" 
                                value={hotel.hasRestaurant ? 'Sim' : 'Não'} 
                            />
                        )}
                        {hotel.hasWifi !== undefined && (
                            <AmenityItem 
                                icon={<Icons.Wifi />} 
                                label="Wi-Fi" 
                                value={hotel.hasWifi ? 'Disponível' : 'Não Disponível'} 
                            />
                        )}
                        
                        {/* Lista de comodidades */}
                        {hotel.amenities && hotel.amenities.map((amenity, index) => {
                            const IconComponent = amenityIconMap[amenity] || Icons.Wifi;
                            return (
                                <div key={index} className="flex items-center text-gray-700">
                                    <IconComponent />
                                    <Text variant="body">{amenity}</Text>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Facilidades de Lazer */}
                {hotel.leisureFacilities && hotel.leisureFacilities.length > 0 && (
                    <div className="mb-8">
                        <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                            Lazer e Entretenimento
                        </Text>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {hotel.leisureFacilities.map((facility, index) => {
                                const IconComponent = leisureIconMap[facility] || Icons.Pool;
                                return (
                                    <div key={index} className="flex items-center text-gray-700">
                                        <IconComponent />
                                        <Text variant="body">{facility}</Text>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Quartos */}
                {hotel.roomOptions && hotel.roomOptions.length > 0 && (
                    <div className="mb-8">
                        <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                            Opções de Quartos
                        </Text>
                        <div className="space-y-6">
                            {hotel.roomOptions.map((room, index) => (
                                <RoomOption
                                    key={index}
                                    room={room}
                                    hotel={hotel}
                                    onReserveRoom={onReserveRoom}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Mapa */}
                {hotel.mapUrl && (
                    <div className="text-center mt-8">
                        <a
                            href={hotel.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline text-lg font-semibold"
                        >
                            Ver localização no mapa
                        </a>
                    </div>
                )}
            </Card>

            {/* Modal Atômico */}
            {isModalOpen && (
                <ImageModalAtomic
                    images={modalImages}
                    initialImageId={initialImageId}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default HotelDetailsPageAtomic;
