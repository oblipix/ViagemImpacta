// src/services/promotionService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7010/api';

/**
 * Serviço para gerenciar operações relacionadas a promoções
 */
class PromotionService {

    /**
     * Busca todas as promoções ativas do backend
     * @returns {Promise<Array>} Lista de promoções
     */
    async getAllPromotions() {
        try {
            const response = await fetch(`${API_BASE_URL}/promotions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar promoções: ${response.status} ${response.statusText}`);
            }

            const promotions = await response.json();
            return promotions;
        } catch (error) {
            console.error('Erro no serviço de promoções:', error);
            throw new Error('Não foi possível carregar as promoções. Tente novamente mais tarde.');
        }
    }

    /**
     * Busca apenas promoções ativas
     * @returns {Promise<Array>} Lista de promoções ativas
     */
    async getActivePromotions() {
        try {
            const response = await fetch(`${API_BASE_URL}/promotions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                // Se a API não existir ainda, retorna dados de exemplo
                if (response.status === 404) {
                    console.warn('API de promoções não encontrada, usando dados de exemplo');
                    return this.getMockPromotions();
                }
                throw new Error(`Erro ao buscar promoções ativas: ${response.status} ${response.statusText}`);
            }

            const promotions = await response.json();
            return promotions;
        } catch (error) {
            console.error('Erro ao buscar promoções ativas:', error);
            // Em caso de erro, retorna dados de exemplo para desenvolvimento
            console.warn('Usando dados de exemplo para promoções');
            return this.getMockPromotions();
        }
    }

    /**
     * Retorna dados de exemplo para desenvolvimento
     * @returns {Array} Lista de promoções de exemplo
     */
    getMockPromotions() {
        return [
            {
                id: 1,
                title: "Pacote Praia de Verão",
                description: "3 dias de paraíso com desconto especial!",
                mainImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
                hotelName: "Resort Paradise Beach",
                checkIn: "2025-08-15",
                checkOut: "2025-08-18",
                originalPrice: 1200.00,
                finalPrice: 900.00,
                discountPercent: 25,
                isActive: true,
                endDate: "2025-08-10",
                roomsQuantityTotal: 50,
                roomsQuantityUsed: 15
            },
            {
                id: 2,
                title: "Escapada Romântica",
                description: "Final de semana perfeito para casais!",
                mainImageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
                hotelName: "Hotel Romantic Sunset",
                checkIn: "2025-08-20",
                checkOut: "2025-08-22",
                originalPrice: 800.00,
                finalPrice: 640.00,
                discountPercent: 20,
                isActive: true,
                endDate: "2025-08-15",
                roomsQuantityTotal: 20,
                roomsQuantityUsed: 8
            },
            {
                id: 3,
                title: "Aventura na Montanha",
                description: "5 dias de trilhas e paisagens incríveis!",
                mainImageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                hotelName: "Mountain Lodge Adventure",
                checkIn: "2025-09-01",
                checkOut: "2025-09-06",
                originalPrice: 1500.00,
                finalPrice: 1050.00,
                discountPercent: 30,
                isActive: true,
                endDate: "2025-08-25",
                roomsQuantityTotal: 30,
                roomsQuantityUsed: 12
            }
        ];
    }

    /**
     * Busca promoção por ID
     * @param {number} id - ID da promoção
     * @returns {Promise<Object>} Dados da promoção
     */
    async getPromotionById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar promoção: ${response.status} ${response.statusText}`);
            }

            const promotion = await response.json();
            return promotion;
        } catch (error) {
            console.error('Erro ao buscar promoção por ID:', error);
            throw new Error('Não foi possível carregar a promoção. Tente novamente mais tarde.');
        }
    }

    /**
     * Formata os dados da promoção para exibição
     * @param {Object} promotion - Dados brutos da promoção
     * @returns {Object} Dados formatados
     */
    formatPromotionData(promotion) {
        const roomsTotal = promotion.roomsPromotional?.totalRoomsAvailable || 0;
        const roomsReserved = promotion.roomsPromotional?.totalRoomsReserved || 0;

        return {
            id: promotion.id || promotion.promotionId,
            title: promotion.title,
            description: promotion.description,
            mainImageUrl: promotion.mainImageUrl || promotion.imageUrl || '/default-promotion.jpg',
            hotelName: promotion.hotel.name,
            checkIn: new Date(promotion.checkIn).toLocaleDateString('pt-BR'),
            checkOut: new Date(promotion.checkOut).toLocaleDateString('pt-BR'),
            originalPrice: promotion.originalPrice,
            finalPrice: promotion.finalPrice,
            discountPercent: promotion.discountPercentage || this.calculateDiscountPercent(promotion.originalPrice, promotion.finalPrice),
            isActive: promotion.isActive,
            validUntil: new Date(promotion.endDate).toLocaleDateString('pt-BR'),
            roomsReserved: roomsReserved,
            roomsTotal: roomsTotal,
            roomsAvailable: roomsTotal - roomsReserved
        };
    }

    /**
     * Calcula a porcentagem de desconto
     * @param {number} originalPrice - Preço original
     * @param {number} finalPrice - Preço final
     * @returns {number} Porcentagem de desconto
     */
    calculateDiscountPercent(originalPrice, finalPrice) {
        if (!originalPrice || originalPrice <= 0) return 0;
        return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
    }
}

// Exporta uma instância única do serviço
export const promotionService = new PromotionService();
export default promotionService;
