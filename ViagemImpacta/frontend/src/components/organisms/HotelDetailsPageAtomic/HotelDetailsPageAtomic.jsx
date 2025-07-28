// 🧬 ORGANISM - HotelDetailsPageAtomic
// Versão atômica completa da página de detalhes do hotel

import React, { useState } from 'react';
import { 
    Button, 
    Text, 
    Card, 
    Image,
    IconSVG,
    PriceDisplay,
    AmenityItem,
    StarRating
} from '../../atoms';
import HotelGallery from '../../molecules/HotelGallery';
import ImageModalAtomic from '../../molecules/ImageModalAtomic/ImageModalAtomic';

// 🎨 Componentes internos específicos para HotelDetails
const HotelIcon = ({ children, className = "h-5 w-5 text-gray-500 mr-2" }) => (
    <IconSVG className={className}>
        {children}
    </IconSVG>
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
            {room.available !== undefined && (
                <Text variant="body" className="text-gray-700 text-sm">
                    Disponíveis: {room.available} {room.available === 1 ? 'quarto' : 'quartos'}
                </Text>
            )}
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 text-right">
            <PriceDisplay 
                price={room.price || room.averageDailyPrice || 0}
                period="/noite"
                size="lg"
                className="mb-2"
            />
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

// 🎯 COMPONENTE PRINCIPAL
const HotelDetailsPageAtomic = ({ hotel, onBack, onReserveRoom }) => {
    // Estados para o modal de imagens
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [initialImageId, setInitialImageId] = useState(null);

    // 🎨 Ícones SVG reutilizáveis
    const Icons = {
        TotalRooms: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </HotelIcon>
        ),
        TotalBathrooms: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 15v2m1-2v2m-1-5v2m1-2v2m-4-2v2m1-2v2m-4-2v2m1-2v2M4 7h16" />
            </HotelIcon>
        ),
        Parking: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.09 1.5H21m-4 0l-3 6m0 0l-4.5 1.5M14 14l-4.5 1.5M14 14l-.09 1.5M17 17H7l-.09 1.5H21m-4 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
            </HotelIcon>
        ),
        Elevator: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </HotelIcon>
        ),
        Restaurant: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
            </HotelIcon>
        ),
        Wifi: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l1.293-1.293a1 1 0 01.707-.293H15a1 1 0 01.707.293l1.293 1.293H20a1 1 0 011 1v4a1 1 0 01-1 1h-1.414l-1.293 1.293a1 1 0 01-.707.293H9a1 1 0 01-.707-.293L5.586 15z" />
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
        Spa: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </HotelIcon>
        ),
        Bar: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
            </HotelIcon>
        ),
        Sauna: () => (
            <HotelIcon>
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </HotelIcon>
        ),
        Lounge: () => (
            <HotelIcon>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2z" />
            </HotelIcon>
        ),
    };

    // Mapeamento de comodidades para ícones
    const leisureIconMap = {
        'Piscina': Icons.Pool,
        'Jaguzza': Icons.Spa,
        'Academia': Icons.Gym,
        'Spa': Icons.Spa,
        'Sauna': Icons.Sauna,
        'Bar na piscina': Icons.Bar,
        'Salão de Jogos': Icons.Lounge,
        'Piscina Aquecida': Icons.Pool,
        'Lareira Comunal': Icons.Lounge,
        'Jardim Amplo': Icons.Lounge,
        'Trilhas': Icons.Lounge,
        'Piscina natural': Icons.Pool,
        'Redário': Icons.Lounge,
        'Salão de Eventos': Icons.Lounge,
        'Área Kids': Icons.Lounge,
        'Sala de Artes': Icons.Lounge,
        'Sala de Cinema': Icons.Lounge,
        'Bar': Icons.Bar,
    };

    if (!hotel) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                    Hotel não encontrado.
                </Text>
                <Button
                    onClick={onBack}
                    variant="primary"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Voltar para Hotéis
                </Button>
            </div>
        );
    }

    // Função para abrir o modal de imagem
    const handleImageClick = (imagesArray, clickedImageId) => {
        setModalImages(imagesArray);
        setInitialImageId(clickedImageId);
        setIsModalOpen(true);
    };

    // Função para fechar o modal de imagem
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
                {/* Imagem Principal do Hotel - Clicável para abrir modal */}
                <Image
                    src={hotel.mainImageUrl}
                    alt={hotel.title}
                    className="w-full h-96 object-cover rounded-lg mb-6 cursor-pointer"
                    onClick={() => handleImageClick(hotel.galleryImages || [], hotel.galleryImages?.[0]?.id)}
                />
                
                <Text variant="h1" className="text-4xl font-extrabold text-blue-800 mb-2">
                    {hotel.title}
                </Text>
                {hotel.rating && (
                    <div className="mb-2">
                        <StarRating rating={hotel.rating} maxStars={5} size="md" />
                    </div>
                )}
                <Text variant="body" className="text-gray-400 text-lg mb-4">
                    {hotel.location}
                </Text>
                <Text variant="body" className="text-gray-700 leading-relaxed mb-8">
                    {hotel.description}
                </Text>

                {/* Galeria de Imagens do Hotel */}
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

                {/* Informações Gerais do Hotel */}
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
                        {hotel.elevators && (
                            <AmenityItem 
                                icon={<Icons.Elevator />} 
                                label="Elevadores" 
                                value={hotel.elevators} 
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
                    </div>
                </div>

                {/* Facilidades de Lazer */}
                {hotel.leisureFacilities && hotel.leisureFacilities.length > 0 && (
                    <div className="mb-8">
                        <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                            Lazer e Entretenimento
                        </Text>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {hotel.leisureFacilities.map((facility, index) => {
                                const IconComponent = leisureIconMap[facility];
                                return (
                                    <AmenityItem 
                                        key={index}
                                        icon={IconComponent ? <IconComponent /> : <IconSVG />} 
                                        label={facility} 
                                        value=""
                                        className="flex items-center gap-2"
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Opções de Quartos e Preços */}
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

                {/* Link para o Mapa (opcional) */}
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

            {/* Modal de Imagens Atômico */}
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
