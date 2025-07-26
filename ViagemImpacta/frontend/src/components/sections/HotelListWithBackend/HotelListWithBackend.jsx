// 🧬 HOTEL LIST ATOMIC - INTEGRADO COM BACKEND
// Versão do HotelList que usa dados reais do backend

import React, { useState } from 'react';
import { Text, Button, Alert } from '../../atoms';
import { HotelCard } from '../../molecules/HotelCard';
import { useHotels } from '../../../hooks/useApi';

// 🎯 COMPONENTE DE LISTA DE HOTÉIS INTEGRADO COM BACKEND
const HotelListWithBackend = ({ 
    title = "Hotéis Disponíveis",
    onHotelClick,
    onSaveHotel,
    isHotelSaved,
    filters = {},
    showFilters = true,
    maxResults = 20,
    className = ''
}) => {
    // 🪝 Hook personalizado para gerenciar hotéis
    const {
        hotels,
        loading,
        error,
        filterByStars,
        filterByAmenities,
        refetch
    } = useHotels();

    // 🎛️ Estado dos filtros locais
    const [activeStarFilter, setActiveStarFilter] = useState(null);
    const [activeAmenityFilter, setActiveAmenityFilter] = useState({
        wifi: false,
        parking: false,
        gym: false
    });

    // 🔄 Aplicar filtros do backend
    const handleStarFilter = async (stars) => {
        setActiveStarFilter(stars);
        await filterByStars(stars);
    };

    const handleAmenityFilter = async (amenity) => {
        const newFilters = {
            ...activeAmenityFilter,
            [amenity]: !activeAmenityFilter[amenity]
        };
        setActiveAmenityFilter(newFilters);
        await filterByAmenities(newFilters);
    };

    const handleClearFilters = async () => {
        setActiveStarFilter(null);
        setActiveAmenityFilter({ wifi: false, parking: false, gym: false });
        await refetch();
    };

    // 🎨 Estados de UI
    const renderLoading = () => (
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <Text variant="body" className="ml-4">Carregando hotéis...</Text>
        </div>
    );

    const renderError = () => (
        <Alert variant="error" title="Erro ao carregar hotéis">
            {error}
            <Button 
                variant="secondary" 
                onClick={refetch}
                className="mt-2"
            >
                Tentar novamente
            </Button>
        </Alert>
    );

    const renderEmpty = () => (
        <div className="text-center py-12">
            <Text variant="h3" className="mb-4">Nenhum hotel encontrado</Text>
            <Text variant="body" className="text-gray-600 mb-4">
                Tente ajustar os filtros ou verifique sua conexão
            </Text>
            <Button onClick={handleClearFilters}>
                Limpar filtros
            </Button>
        </div>
    );

    const renderFilters = () => {
        if (!showFilters) return null;

        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <Text variant="h4" className="mb-4">Filtros</Text>
                
                {/* Filtro por estrelas */}
                <div className="mb-4">
                    <Text variant="small" className="mb-2 block">Estrelas:</Text>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Button
                                key={star}
                                variant={activeStarFilter === star ? "primary" : "ghost"}
                                onClick={() => handleStarFilter(star)}
                                className="px-3 py-1 text-sm"
                            >
                                {star}★
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Filtro por comodidades */}
                <div className="mb-4">
                    <Text variant="small" className="mb-2 block">Comodidades:</Text>
                    <div className="flex gap-2">
                        <Button
                            variant={activeAmenityFilter.wifi ? "primary" : "ghost"}
                            onClick={() => handleAmenityFilter('wifi')}
                            className="px-3 py-1 text-sm"
                        >
                            WiFi
                        </Button>
                        <Button
                            variant={activeAmenityFilter.parking ? "primary" : "ghost"}
                            onClick={() => handleAmenityFilter('parking')}
                            className="px-3 py-1 text-sm"
                        >
                            Estacionamento
                        </Button>
                        <Button
                            variant={activeAmenityFilter.gym ? "primary" : "ghost"}
                            onClick={() => handleAmenityFilter('gym')}
                            className="px-3 py-1 text-sm"
                        >
                            Academia
                        </Button>
                    </div>
                </div>

                {/* Botão limpar filtros */}
                {(activeStarFilter || Object.values(activeAmenityFilter).some(Boolean)) && (
                    <Button 
                        variant="secondary" 
                        onClick={handleClearFilters}
                        className="text-sm"
                    >
                        Limpar filtros
                    </Button>
                )}
            </div>
        );
    };

    const renderHotels = () => {
        const displayHotels = hotels.slice(0, maxResults);
        
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayHotels.map(hotel => (
                    <HotelCard
                        key={hotel.id}
                        hotel={hotel}
                        onImageClick={onHotelClick}
                        onSaveHotel={onSaveHotel}
                        isHotelSaved={isHotelSaved}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className={`py-8 px-6 bg-gray-50 ${className}`}>
            <div className="container mx-auto">
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <Text variant="h2" className="mb-4">{title}</Text>
                    <Text variant="body" className="text-gray-600">
                        {loading ? 'Carregando...' : `${hotels.length} hotéis encontrados`}
                    </Text>
                </div>

                {/* Filtros */}
                {renderFilters()}

                {/* Conteúdo principal */}
                {loading ? renderLoading() :
                 error ? renderError() :
                 hotels.length === 0 ? renderEmpty() :
                 renderHotels()}

                {/* Informação sobre dados do backend */}
                <div className="mt-8 text-center">
                    <Text variant="small" className="text-gray-500">
                        ✅ Dados carregados do backend ASP.NET Core
                    </Text>
                </div>
            </div>
        </section>
    );
};

export default HotelListWithBackend;
