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
}

// 🎯 INSTÂNCIA SINGLETON PARA USO GLOBAL
export const hotelService = new HotelService();

export default hotelService;
