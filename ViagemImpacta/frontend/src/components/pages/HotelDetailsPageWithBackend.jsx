// 🏨 PÁGINA DE DETALHES DO HOTEL - INTEGRADA COM BACKEND
// Busca dados do hotel por ID e exibe usando componente atômico

import React, { useState, useEffect } from 'react';
import { HotelService } from '../../services/hotelService.js';
import HotelDetailsPageAtomic from '../organisms/HotelDetailsPageAtomic/HotelDetailsPageAtomic';
import { Button } from '../atoms';

const hotelService = new HotelService();

function HotelDetailsPageWithBackend({ 
    hotelId, 
    onBack = () => {},
    onReserveRoom = () => {},
    ...props 
}) {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (hotelId) {
            loadHotelDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotelId]);

    /**
     * 📡 CARREGAR DETALHES DO HOTEL
     * 
     * Busca dados completos do hotel via API
     */
    async function loadHotelDetails() {
        try {
            setLoading(true);
            setError(null);

            // 🌐 Buscar hotel no backend
            const hotelData = await hotelService.getHotelById(hotelId);
            
            // 📊 Transformar dados para formato esperado pelo componente atômico
            const transformedHotel = {
                ...hotelData,
                // Garantir que campos obrigatórios existem
                mainImageUrl: hotelData.image || hotelData.mainImageUrl || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
                title: hotelData.name || hotelData.title,
                location: `${hotelData.city || ''}, ${hotelData.state || ''}`.trim().replace(/,$/, ''),
                rating: hotelData.rating || (hotelData.stars * 0.8 + Math.random() * 0.4),
                feedbacks: hotelData.feedbacks || [],
                amenities: {
                    wifi: hotelData.wifi || false,
                    parking: hotelData.parking || false,
                    gym: hotelData.gym || false,
                    pool: hotelData.pool || false,
                    restaurant: hotelData.restaurant || false,
                    spa: hotelData.spa || false
                },
                // Mockar dados que podem não vir do backend
                gallery: hotelData.gallery || [
                    hotelData.image || hotelData.mainImageUrl || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
                ],
                rooms: hotelData.rooms || [
                    {
                        id: 1,
                        type: 'Standard',
                        price: hotelData.pricePerNight || 200,
                        description: 'Quarto confortável com todas as comodidades básicas',
                        features: ['Wi-Fi grátis', 'TV a cabo', 'Ar condicionado']
                    },
                    {
                        id: 2,
                        type: 'Deluxe',
                        price: (hotelData.pricePerNight || 200) * 1.5,
                        description: 'Quarto espaçoso com vista privilegiada',
                        features: ['Wi-Fi grátis', 'TV smart', 'Minibar', 'Vista para o mar']
                    }
                ]
            };

            setHotel(transformedHotel);

        } catch (error) {
            console.error('❌ Erro ao carregar detalhes do hotel:', error);
            setError('Não foi possível carregar os detalhes do hotel. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    // 🔄 LOADING STATE
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Carregando detalhes do hotel...</p>
                </div>
            </div>
        );
    }

    // ❌ ERROR STATE
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Erro ao Carregar Hotel</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="space-x-4">
                        <Button
                            onClick={loadHotelDetails}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                        >
                            Tentar Novamente
                        </Button>
                        <Button
                            onClick={onBack}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                        >
                            Voltar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // 🏨 HOTEL DETAILS
    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">🏨</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel não encontrado</h2>
                    <p className="text-gray-600 mb-6">O hotel solicitado não foi encontrado em nossa base de dados.</p>
                    <Button
                        onClick={onBack}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        Voltar à Lista
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <HotelDetailsPageAtomic
            hotel={hotel}
            onBack={onBack}
            onReserveRoom={onReserveRoom}
            {...props}
        />
    );
}

export default HotelDetailsPageWithBackend;
