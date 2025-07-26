import React from 'react';
import { Text } from '../../atoms';
import { HotelCard } from '../../molecules';

export const HotelList = ({ 
    hotels = [], 
    title = "Hotéis Disponíveis",
    onHotelClick,
    onSaveHotel,
    isHotelSaved,
    loading = false,
    error = null,
    emptyMessage = "Nenhum hotel encontrado.",
    className = ''
}) => {
    if (loading) {
        return (
            <section className={`py-8 ${className}`}>
                <div className="container mx-auto px-6">
                    <Text variant="h2" className="text-center mb-8">
                        {title}
                    </Text>
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <Text variant="body" className="ml-4">
                            Carregando hotéis...
                        </Text>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={`py-8 ${className}`}>
                <div className="container mx-auto px-6">
                    <Text variant="h2" className="text-center mb-8">
                        {title}
                    </Text>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                        <Text variant="body">
                            ⚠️ {error}
                        </Text>
                    </div>
                </div>
            </section>
        );
    }

    if (!hotels || hotels.length === 0) {
        return (
            <section className={`py-8 ${className}`}>
                <div className="container mx-auto px-6">
                    <Text variant="h2" className="text-center mb-8">
                        {title}
                    </Text>
                    <div className="text-center py-12">
                        <Text variant="h3" className="text-gray-500 mb-4">
                            🏨
                        </Text>
                        <Text variant="body" className="text-gray-600">
                            {emptyMessage}
                        </Text>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-8 ${className}`}>
            <div className="container mx-auto px-6">
                <Text variant="h2" className="text-center mb-8">
                    {title}
                </Text>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map(hotel => (
                        <HotelCard
                            key={hotel.id}
                            hotel={hotel}
                            onImageClick={onHotelClick}
                            onSaveHotel={onSaveHotel}
                            isHotelSaved={isHotelSaved}
                        />
                    ))}
                </div>
                
                {hotels.length > 0 && (
                    <div className="text-center mt-8">
                        <Text variant="small" className="text-gray-600">
                            Mostrando {hotels.length} hotéis
                        </Text>
                    </div>
                )}
            </div>
        </section>
    );
};
