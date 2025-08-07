// src/data/mockPromotions.js

/**
 * Dados de exemplo para promoções (para desenvolvimento)
 */
export const mockPromotions = [
    {
        id: 1,
        title: "Pacote Praia de Verão",
        description: "3 dias de paraíso com desconto especial! Inclui café da manhã e acesso à praia privativa.",
        mainImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        hotelName: "Resort Paradise Beach",
        checkIn: "2025-08-15",
        checkOut: "2025-08-18",
        originalPrice: 1200.00,
        totalPrice: 900.00,
        discountPercent: 25,
        isActive: true,
        endDate: "2025-08-10",
        roomsQuantityTotal: 50,
        roomsQuantityUsed: 15
    },
    {
        id: 2,
        title: "Escapada Romântica",
        description: "Final de semana perfeito para casais! Inclui jantar romântico e spa.",
        mainImageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        hotelName: "Hotel Romantic Sunset",
        checkIn: "2025-08-20",
        checkOut: "2025-08-22",
        originalPrice: 800.00,
        totalPrice: 640.00,
        discountPercent: 20,
        isActive: true,
        endDate: "2025-08-15",
        roomsQuantityTotal: 20,
        roomsQuantityUsed: 8
    },
    {
        id: 3,
        title: "Aventura na Montanha",
        description: "5 dias de trilhas e paisagens incríveis! Inclui guia especializado e equipamentos.",
        mainImageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        hotelName: "Mountain Lodge Adventure",
        checkIn: "2025-09-01",
        checkOut: "2025-09-06",
        originalPrice: 1500.00,
        totalPrice: 1050.00,
        discountPercent: 30,
        isActive: true,
        endDate: "2025-08-25",
        roomsQuantityTotal: 30,
        roomsQuantityUsed: 12
    },
    {
        id: 4,
        title: "Relax Total SPA",
        description: "3 dias de puro relaxamento com tratamentos inclusos!",
        mainImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        hotelName: "Wellness Resort & SPA",
        checkIn: "2025-08-25",
        checkOut: "2025-08-28",
        originalPrice: 1000.00,
        totalPrice: 750.00,
        discountPercent: 25,
        isActive: true,
        endDate: "2025-08-20",
        roomsQuantityTotal: 25,
        roomsQuantityUsed: 10
    }
];
