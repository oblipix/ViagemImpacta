// src/hooks/usePromotions.js

import { useState, useEffect } from 'react';
import promotionService from '../services/promotionService.js';

/**
 * Hook personalizado para gerenciar promoções
 * @returns {Object} Estado das promoções
 */
export function usePromotions() {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            setError(null);

            const promotionsData = await promotionService.getActivePromotions();
            const formattedPromotions = promotionsData.map(promotion =>
                promotionService.formatPromotionData(promotion)
            );
            setPromotions(formattedPromotions);
            return formattedPromotions;
        } catch (err) {
            console.error('Erro ao carregar promoções:', err);
            setError(err.message);
            setPromotions([]); // Define array vazio em caso de erro
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    return {
        promotions,
        loading,
        error,
        refetch: fetchPromotions
    };
}
