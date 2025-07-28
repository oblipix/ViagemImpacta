// 🧬 SECTION - HotelsMapSectionAtomic (Idêntica ao legacy)
// Seção do mapa de hotéis - PARIDADE TOTAL com HotelsMapSection

import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Text, Container, Button, Image } from '../atoms';

const containerStyle = {
    width: '100%',
    height: '500px',
};

const defaultCenter = { lat: -15.779720, lng: -47.929720 };

const createMarkerIcon = (color) => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const HotelsMapSectionAtomic = ({ 
    hotels = [],
    onHotelSelect = () => {},
    isLoaded = false,
    title = "Onde Estamos: Nossos Hotéis no Mapa",
    subtitle = "Explore nossas unidades e planeje sua estadia!",
    legendTitle = "Nossas Unidades",
    loadingText = "Carregando mapa...",
    buttonText = "Ver Detalhes",
    id = "hotels-map",
    className = "",
    center = defaultCenter,
    zoom = 4.5,
    mapHeight = "500px",
    ...props 
}) => {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [map, setMap] = useState(null);

    const onLoad = useCallback((map) => setMap(map), []);
    const onUnmount = useCallback(() => setMap(null), []);

    const handleLegendClick = (hotelData) => {
        if (hotelData && map) {
            map.panTo({ lat: hotelData.lat, lng: hotelData.lng });
            map.setZoom(14);
            setSelectedHotel(hotelData);
        }
    };

    // Estilo dinâmico para o container do mapa
    const dynamicContainerStyle = {
        ...containerStyle,
        height: mapHeight,
    };

    // Se o mapa não está carregado, mostra loading
    if (!isLoaded) {
        return (
            <Container className="px-6 py-12 text-center">
                <div 
                    style={dynamicContainerStyle} 
                    className="bg-gray-200 flex items-center justify-center rounded-lg shadow-lg"
                >
                    <Text variant="body" className="text-gray-500">
                        {loadingText}
                    </Text>
                </div>
            </Container>
        );
    }

    return (
        <section id={id} className={`py-12 bg-white overflow-hidden ${className}`} {...props}>
            <Container className="px-6">
                <Text variant="h2" className="text-4xl font-extrabold text-gray-900 text-center mb-4 TitleSection">
                    {title}
                </Text>
                <Text variant="body" className="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
                    {subtitle}
                </Text>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Legenda dos hotéis */}
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <Text variant="h3" className="text-2xl font-bold text-gray-800 mb-4">
                            {legendTitle}
                        </Text>
                        <div className="flex flex-col gap-3">
                            {(hotels || []).map(hotel => (
                                <button
                                    key={`legend-${hotel.id}`}
                                    onClick={() => handleLegendClick(hotel)}
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
                    
                    {/* Mapa do Google */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <div className="rounded-lg shadow-xl overflow-hidden">
                            <GoogleMap
                                mapContainerStyle={dynamicContainerStyle}
                                center={center}
                                zoom={zoom}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                                options={{ disableDefaultUI: true, zoomControl: true }}
                                onClick={() => setSelectedHotel(null)}
                            >
                                {/* Marcadores dos hotéis */}
                                {(hotels || []).map(hotel => (
                                    <Marker
                                        key={hotel.id}
                                        position={{ lat: hotel.lat, lng: hotel.lng }}
                                        title={hotel.title}
                                        icon={{
                                            url: createMarkerIcon(hotel.markerColor),
                                            scaledSize: new window.google.maps.Size(40, 40),
                                            anchor: new window.google.maps.Point(20, 40),
                                        }}
                                        onClick={() => setSelectedHotel(hotel)}
                                    />
                                ))}
                                
                                {/* Info Window do hotel selecionado */}
                                {selectedHotel && (
                                    <InfoWindow
                                        position={{ lat: selectedHotel.lat, lng: selectedHotel.lng }}
                                        onCloseClick={() => setSelectedHotel(null)}
                                    >
                                        <div className="p-1 max-w-xs">
                                            <Image 
                                                src={selectedHotel.mainImageUrl} 
                                                alt={selectedHotel.title} 
                                                className="w-full h-32 object-cover rounded-t-lg" 
                                            />
                                            <div className="p-2">
                                                <Text variant="h3" className="text-lg font-bold text-gray-900">
                                                    {selectedHotel.title}
                                                </Text>
                                                <Text variant="body" className="text-sm text-gray-600 mb-2">
                                                    {selectedHotel.location}
                                                </Text>
                                                <Button
                                                    onClick={() => onHotelSelect(selectedHotel)}
                                                    className="main-action-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm transition duration-300"
                                                    variant="primary"
                                                >
                                                    {buttonText}
                                                </Button>
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HotelsMapSectionAtomic;
