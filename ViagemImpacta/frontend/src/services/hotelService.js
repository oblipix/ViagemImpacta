// 🏨 SERVIÇO DE HOTÉIS - INTEGRAÇÃO COM BACKEND
// Comunicação com os endpoints de hotéis do ASP.NET Core

import { apiService } from './apiService.js';
import { API_CONFIG } from './apiConfig.js';

/**
 * 🎯 SERVIÇO PARA OPERAÇÕES COM HOTÉIS
 * 
 * Integra com os endpoints do HotelsController do backend:
 * - GET /api/hotels - Listar todos os hotéis
 * - GET /api/hotels/{id} - Buscar hotel por ID
 * - GET /api/hotels/stars/{stars} - Filtrar por estrelas
 * - GET /api/hotels/amenities - Filtrar por comodidades
 * 
 * 🔗 BACKEND ENDPOINTS:
 * c:\backend\ViagemImpacta\Controllers\ApiControllers\HotelsController.cs
 */
export class HotelService {
    
    /**
     * 🏨 LISTAR TODOS OS HOTÉIS
     * 
     * @returns {Promise<Hotel[]>} Lista de hotéis
     * @throws {Error} Erro de comunicação ou servidor
     * 
     * 🌐 ENDPOINT: GET /api/hotels
     * 📊 RESPONSE: Array de objetos Hotel
     */
    async getAllHotels() {
        try {
            const hotels = await apiService.get(API_CONFIG.ENDPOINTS.HOTELS.LIST);
            
            // Transformar dados do backend para o formato do frontend
            return hotels.map(this.transformHotelData);
        } catch (error) {
            console.error('❌ Erro ao buscar hotéis:', error);
            throw new Error('Falha ao carregar lista de hotéis');
        }
    }

    /**
     * 🏨 BUSCAR HOTEL POR ID
     * 
     * @param {number} hotelId - ID do hotel
     * @returns {Promise<Hotel>} Dados do hotel
     * @throws {Error} Hotel não encontrado ou erro de servidor
     * 
     * 🌐 ENDPOINT: GET /api/hotels/{id}
     * 📊 RESPONSE: Objeto Hotel com detalhes completos
     */
    async getHotelById(hotelId) {
        try {
            if (!hotelId || hotelId <= 0) {
                throw new Error('ID do hotel inválido');
            }

            const hotel = await apiService.get(
                API_CONFIG.ENDPOINTS.HOTELS.BY_ID, 
                { id: hotelId }
            );
            
            return this.transformHotelData(hotel);
        } catch (error) {
            console.error(`❌ Erro ao buscar hotel ${hotelId}:`, error);
            
            if (error.status === 404) {
                throw new Error(`Hotel com ID ${hotelId} não encontrado`);
            }
            
            throw new Error('Falha ao carregar dados do hotel');
        }
    }

    /**
     * 🌟 FILTRAR HOTÉIS POR ESTRELAS
     * 
     * @param {number} stars - Número de estrelas (1-5)
     * @returns {Promise<Hotel[]>} Hotéis da categoria especificada
     * @throws {Error} Parâmetro inválido ou erro de servidor
     * 
     * 🌐 ENDPOINT: GET /api/hotels/stars/{stars}
     * 📊 RESPONSE: Array de hotéis com o número de estrelas especificado
     */
    async getHotelsByStars(stars) {
        try {
            if (!stars || stars < 1 || stars > 5) {
                throw new Error('Número de estrelas deve ser entre 1 e 5');
            }

            const hotels = await apiService.get(
                API_CONFIG.ENDPOINTS.HOTELS.BY_STARS,
                { stars }
            );
            
            return hotels.map(this.transformHotelData);
        } catch (error) {
            console.error(`❌ Erro ao buscar hotéis ${stars} estrelas:`, error);
            throw new Error(`Falha ao carregar hotéis de ${stars} estrelas`);
        }
    }

    /**
     * 🏋️ FILTRAR HOTÉIS POR COMODIDADES
     * 
     * @param {object} amenities - Filtros de comodidades
     * @param {boolean} amenities.wifi - Hotéis com WiFi
     * @param {boolean} amenities.parking - Hotéis com estacionamento
     * @param {boolean} amenities.gym - Hotéis com academia
     * @returns {Promise<Hotel[]>} Hotéis que atendem aos critérios
     * 
     * 🌐 ENDPOINT: GET /api/hotels/amenities?wifi=true&parking=true&gym=true
     * 📊 RESPONSE: Array de hotéis filtrados
     */
    async getHotelsByAmenities(amenities = {}) {
        try {
            const queryParams = {};
            
            // Converter filtros para query parameters
            if (amenities.wifi === true) queryParams.wifi = 'true';
            if (amenities.parking === true) queryParams.parking = 'true';
            if (amenities.gym === true) queryParams.gym = 'true';

            const hotels = await apiService.get(
                API_CONFIG.ENDPOINTS.HOTELS.BY_AMENITIES,
                {},
                queryParams
            );
            
            return hotels.map(this.transformHotelData);
        } catch (error) {
            console.error('❌ Erro ao filtrar hotéis por comodidades:', error);
            throw new Error('Falha ao carregar hotéis filtrados');
        }
    }

    /**
     * 🔧 TRANSFORMAR DADOS DO BACKEND PARA FRONTEND
     * 
     * Converte o formato de dados do backend (ASP.NET Core)
     * para o formato esperado pelos componentes atomic do frontend
     * 
     * @param {object} backendHotel - Dados do hotel do backend
     * @returns {object} Hotel no formato do frontend
     */
    transformHotelData = (backendHotel) => {
        return {
            // IDs e identificação
            id: backendHotel.hotelId || backendHotel.id,
            title: backendHotel.name || backendHotel.title,
            
            // Localização e descrição
            location: backendHotel.hotelAddress || backendHotel.address || backendHotel.location,
            description: backendHotel.description || `Hotel ${backendHotel.name || 'Premium'}`,
            
            // Avaliação
            rating: backendHotel.stars || backendHotel.rating || 4.0,
            reviewsCount: backendHotel.reviewsCount || 0,
            
            // Preço (mockado por enquanto)
            price: backendHotel.price || this.generateMockPrice(backendHotel.stars),
            
            // Imagens (mockadas por enquanto)
            mainImageUrl: backendHotel.imageUrl || backendHotel.mainImageUrl || this.generateMockImage(backendHotel.name),
            galleryImages: backendHotel.galleryImages || this.generateMockGallery(backendHotel.name),
            
            // Comodidades
            hasWifi: backendHotel.hasWifi || backendHotel.wifi || true,
            hasParking: backendHotel.hasParking || backendHotel.parking || true,
            hasGym: backendHotel.hasGym || backendHotel.gym || false,
            hasRestaurant: backendHotel.hasRestaurant || true,
            
            // Informações adicionais
            totalRooms: backendHotel.roomCount || backendHotel.totalRooms || 50,
            totalBathrooms: backendHotel.totalBathrooms || backendHotel.roomCount || 50,
            elevators: backendHotel.elevators || 2,
            
            // Instalações de lazer (mockadas)
            leisureFacilities: backendHotel.leisureFacilities || ['Piscina', 'Academia', 'Spa', 'Bar'],
            
            // Quartos (mockados por enquanto)
            rooms: backendHotel.rooms || this.generateMockRooms(),
            
            // Amenidades (mockadas)
            amenities: backendHotel.amenities || this.generateMockAmenities()
        };
    };

    /**
     * 🔧 HELPERS PARA DADOS MOCKADOS
     * Usados enquanto o backend não fornece todos os dados necessários
     */
    generateMockPrice = (stars = 4) => {
        const basePrice = stars * 80;
        return Math.round(basePrice + (Math.random() * 100));
    };

    generateMockImage = (name = 'Hotel') => {
        return `https://via.placeholder.com/400x300/0EA5E9/FFFFFF?text=${encodeURIComponent(name)}`;
    };

    generateMockGallery = (name = 'Hotel') => {
        return [
            { id: 1, url: `https://via.placeholder.com/400x300/0EA5E9/FFFFFF?text=${encodeURIComponent(name)}+1`, alt: `${name} - Fachada` },
            { id: 2, url: `https://via.placeholder.com/400x300/10B981/FFFFFF?text=${encodeURIComponent(name)}+2`, alt: `${name} - Quarto` },
            { id: 3, url: `https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=${encodeURIComponent(name)}+3`, alt: `${name} - Piscina` },
            { id: 4, url: `https://via.placeholder.com/400x300/EF4444/FFFFFF?text=${encodeURIComponent(name)}+4`, alt: `${name} - Restaurante` }
        ];
    };

    generateMockRooms = () => {
        return [
            {
                id: 1,
                type: 'Standard',
                description: 'Quarto padrão com todas as comodidades básicas',
                price: 150,
                capacity: 2,
                size: '25m²',
                amenities: ['WiFi', 'TV', 'Ar Condicionado', 'Frigobar'],
                images: ['https://via.placeholder.com/300x200/0EA5E9/FFFFFF?text=Standard']
            },
            {
                id: 2,
                type: 'Deluxe',
                description: 'Quarto superior com vista panorâmica',
                price: 250,
                capacity: 3,
                size: '35m²',
                amenities: ['WiFi', 'TV 50"', 'Ar Condicionado', 'Frigobar', 'Varanda'],
                images: ['https://via.placeholder.com/300x200/10B981/FFFFFF?text=Deluxe']
            }
        ];
    };

    generateMockAmenities = () => {
        return [
            'WiFi gratuito',
            'Estacionamento gratuito',
            'Recepção 24 horas',
            'Serviço de quarto',
            'Academia',
            'Piscina',
            'Restaurante',
            'Bar',
            'Spa',
            'Centro de negócios'
        ];
    };

    /**
     * 🔍 BUSCAR HOTÉIS COM QUARTOS DISPONÍVEIS
     * 
     * Integra busca de hotéis com verificação de disponibilidade real
     * Combina todos os filtros de busca em uma única consulta otimizada
     * 
     * @param {object} searchParams - Parâmetros de busca
     * @param {string} searchParams.destination - Cidade/destino (opcional)
     * @param {string} searchParams.checkInDate - Data check-in (YYYY-MM-DD)
     * @param {string} searchParams.checkOutDate - Data check-out (YYYY-MM-DD)
     * @param {number} searchParams.guests - Número de hóspedes
     * @param {number} searchParams.minRating - Classificação mínima (1-5)
     * @param {boolean} searchParams.wifi - Filtrar por WiFi
     * @param {boolean} searchParams.parking - Filtrar por estacionamento  
     * @param {number} searchParams.minPrice - Preço mínimo da diária
     * @param {number} searchParams.maxPrice - Preço máximo da diária
     * @returns {Promise<Hotel[]>} Hotéis com quartos disponíveis
     * 
     * 🌐 ENDPOINT: GET /api/hotels/search-available
     * 📊 RESPONSE: Array de hotéis com dados de quartos incluídos
     * 
     * 💡 EXEMPLO DE USO:
     * const hotels = await hotelService.searchAvailableHotels({
     *     destination: 'São Paulo',
     *     checkInDate: '2025-02-01',
     *     checkOutDate: '2025-02-05', 
     *     guests: 2,
     *     minRating: 4,
     *     wifi: true,
     *     minPrice: 100,
     *     maxPrice: 300
     * });
     */
    async searchAvailableHotels(searchParams) {
        try {
            // 🔧 CONSTRUIR QUERY PARAMETERS
            const queryParams = {};
            
            // Parâmetros obrigatórios
            if (searchParams.checkInDate) {
                queryParams.checkIn = searchParams.checkInDate;
            }
            if (searchParams.checkOutDate) {
                queryParams.checkOut = searchParams.checkOutDate;
            }
            if (searchParams.guests) {
                queryParams.guests = searchParams.guests.toString();
            }
            
            // Parâmetros opcionais - só incluir se especificados
            if (searchParams.destination) {
                queryParams.destination = searchParams.destination;
            }
            if (searchParams.minRating) {
                queryParams.minStars = searchParams.minRating.toString();
            }
            if (searchParams.wifi === true) {
                queryParams.wifi = 'true';
            }
            if (searchParams.parking === true) {
                queryParams.parking = 'true';
            }
            if (searchParams.minPrice !== undefined && searchParams.minPrice !== null) {
                queryParams.minPrice = searchParams.minPrice.toString();
            }
            if (searchParams.maxPrice !== undefined && searchParams.maxPrice !== null) {
                queryParams.maxPrice = searchParams.maxPrice.toString();
            }

            // 🌐 REQUISIÇÃO PARA O BACKEND
            const hotels = await apiService.get(
                `${API_CONFIG.ENDPOINTS.HOTELS.BASE}/search-available`,
                queryParams
            );
            
            // 🔄 TRANSFORMAR DADOS PARA O FRONTEND
            return hotels.map(this.transformHotelData);
            
        } catch (error) {
            console.error('❌ Erro ao buscar hotéis disponíveis:', error);
            
            // 🎭 FALLBACK COM DADOS MOCKADOS (desenvolvimento)
            console.warn('🎭 Usando dados mockados para busca de hotéis');
            return this.getMockAvailableHotels(searchParams);
        }
    }

    /**
     * 🎭 DADOS MOCKADOS PARA DESENVOLVIMENTO
     * 
     * Simula resposta da API para desenvolvimento/testes
     * Aplica filtros básicos nos dados mockados
     */
    getMockAvailableHotels(searchParams) {
        // Dados mockados básicos
        const mockHotels = [
            {
                id: 1,
                title: 'Hotel Copacabana Palace',
                location: 'Rio de Janeiro, RJ',
                rating: 5,
                description: 'Hotel de luxo na praia de Copacabana',
                mainImageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
                wifi: true,
                parking: true,
                gym: true,
                rooms: [
                    { id: 1, type: 'Standard', price: 350, capacity: 2, available: true },
                    { id: 2, type: 'Deluxe', price: 450, capacity: 3, available: true }
                ]
            },
            {
                id: 2,
                title: 'Grand Hyatt São Paulo',
                location: 'São Paulo, SP',
                rating: 4,
                description: 'Hotel moderno no centro financeiro',
                mainImageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
                wifi: true,
                parking: false,
                gym: true,
                rooms: [
                    { id: 3, type: 'Executive', price: 280, capacity: 2, available: true }
                ]
            }
        ];

        // Aplicar filtros básicos aos dados mockados
        return mockHotels.filter(hotel => {
            // Filtro por destino
            if (searchParams.destination && 
                !hotel.location.toLowerCase().includes(searchParams.destination.toLowerCase())) {
                return false;
            }
            
            // Filtro por classificação
            if (searchParams.minRating && hotel.rating < searchParams.minRating) {
                return false;
            }
            
            // Filtro por WiFi
            if (searchParams.wifi === true && !hotel.wifi) {
                return false;
            }
            
            // Filtro por estacionamento
            if (searchParams.parking === true && !hotel.parking) {
                return false;
            }
            
            // Filtro por capacidade e preço (verificar se tem quarto adequado)
            const hasAvailableRoom = hotel.rooms?.some(room => {
                if (!room.available) return false;
                if (room.capacity < searchParams.guests) return false;
                if (searchParams.minPrice && room.price < searchParams.minPrice) return false;
                if (searchParams.maxPrice && room.price > searchParams.maxPrice) return false;
                return true;
            });
            
            return hasAvailableRoom;
        });
    }
}

// 🎯 INSTÂNCIA SINGLETON PARA USO GLOBAL
export const hotelService = new HotelService();

export default hotelService;
