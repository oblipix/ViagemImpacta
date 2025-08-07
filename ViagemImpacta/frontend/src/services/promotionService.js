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
                throw new Error(`Erro ao buscar promoções ativas: ${response.status} ${response.statusText}`);
            }

            const promotions = await response.json();
            return promotions;
        } catch (error) {
            console.error('Erro ao buscar promoções ativas:', error);
            throw new Error('Não foi possível carregar as promoções. Tente novamente mais tarde.');
        }
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
        // Para dados da API (estrutura completa)
        const roomsTotal = promotion.roomsPromotional?.totalRoomsAvailable || 0;
        const roomsReserved = promotion.roomsPromotional?.totalRoomsReserved || 0;

        return {
            id: promotion.id || promotion.promotionId,
            promotionId: promotion.promotionId || promotion.id, // Manter ambos os campos
            title: promotion.title || promotion.titlePromotion,
            description: promotion.description,
            mainImageUrl: promotion.mainImageUrl || promotion.imageUrl || '/default-promotion.jpg',
            bannerPromotion: promotion.bannerPromotion || promotion.BannerPromotion || promotion.banner_promotion || promotion.mainImageUrl || promotion.imageUrl,
            hotelId: promotion.hotelId || promotion.hotel?.hotelId || promotion.hotel?.id, // Preservar hotelId
            hotelName: promotion.hotel?.name || promotion.hotelName || 'Hotel não informado',
            checkIn: new Date(promotion.checkIn).toLocaleDateString('pt-BR'),
            checkOut: new Date(promotion.checkOut).toLocaleDateString('pt-BR'),
            originalPrice: promotion.originalPrice,
            totalPrice: promotion.totalPrice,
            discountPercent: promotion.discountPercentage || this.calculateDiscountPercent(promotion.originalPrice, promotion.totalPrice),
            isActive: promotion.isActive,
            validUntil: new Date(promotion.endDate).toLocaleDateString('pt-BR'),
            roomsReserved: roomsReserved,
            roomsTotal: roomsTotal,
            roomsAvailable: roomsTotal - roomsReserved,
            // Preservar todos os dados originais como fallback
            ...promotion
        };
    }

    /**
     * Calcula a porcentagem de desconto
     * @param {number} originalPrice - Preço original
     * @param {number} totalPrice - Preço total
     * @returns {number} Porcentagem de desconto
     */
}


// Exporta uma instância única do serviço
export const promotionService = new PromotionService();
export default promotionService;
