// src/components/molecules/HotelsMapSectionAtomic.jsx
import React, { useState, useCallback } from 'react';
import MapContainer from '../atoms/MapContainer';
import HotelLegend from '../atoms/HotelLegend';
import LoadingMap from '../atoms/LoadingMap';

function HotelsMapSectionAtomic({ hotels, onHotelSelect, isLoaded }) {
    const [selectedHotel, setSelectedHotel] = useState(null);

    const handleLegendClick = useCallback((hotelData) => {
        setSelectedHotel(hotelData);
    }, []);

    const handleMarkerClick = useCallback((hotel) => {
        setSelectedHotel(hotel);
    }, []);

    const handleMapClick = useCallback(() => {
        setSelectedHotel(null);
    }, []);

    // Se o mapa não estiver carregado, mostra o loading
    if (!isLoaded) {
        return <LoadingMap />;
    }

    return (
        <section id="hotels-map" className="py-12 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4 TitleSection">
                    Onde Estamos: Nossos Hotéis no Mapa
                </h2>
                <p className="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
                    Explore nossas unidades e planeje sua estadia!
                </p>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <HotelLegend 
                        hotels={hotels} 
                        onLegendClick={handleLegendClick} 
                    />
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <MapContainer
                            hotels={hotels}
                            onHotelSelect={onHotelSelect}
                            selectedHotel={selectedHotel}
                            onMarkerClick={handleMarkerClick}
                            onMapClick={handleMapClick}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HotelsMapSectionAtomic;
