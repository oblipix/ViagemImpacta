// 🏠 HOOK PARA DADOS DA HOMEPAGE - INTEGRAÇÃO BACKEND + MOCK
// Gerencia dados de hotéis, pacotes e outras informações da página inicial

import { useState, useEffect } from 'react';
import { HotelService } from '../services/hotelService.js';
import { PackageService } from '../services/packageService.js';

const hotelService = new HotelService();
const packageService = new PackageService();

/**
 * 🎯 HOOK PERSONALIZADO PARA HOMEPAGE
 * 
 * Combina dados do backend com mocks para funcionalidades ainda não implementadas.
 * Garante que a homepage sempre tenha dados para exibir.
 * 
 * 🔗 DADOS DO BACKEND:
 * - Hotéis recomendados (HotelsController)
 * - Pacotes de viagem (ReservationBooksController)
 * 
 * 🎭 DADOS MOCKADOS:
 * - Posts do blog
 * - Dados para newsletter
 * - Coordenadas dos hotéis para o mapa
 * 
 * @returns {object} Dados organizados para as seções da homepage
 */
export function useHomePageData() {
    const [data, setData] = useState({
        hotels: [],
        packages: [],
        blogPosts: [],
        mapHotels: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        loadHomePageData();
    }, []);

    /**
     * 📡 CARREGAR DADOS DA HOMEPAGE
     * 
     * Combina requisições do backend com dados mockados
     */
    async function loadHomePageData() {
        try {
            setData(prev => ({ ...prev, loading: true, error: null }));

            // 🏨 HOTÉIS DO BACKEND
            const hotelsPromise = hotelService.getAllHotels()
                .then(hotels => hotels.slice(0, 6)) // Apenas 6 para a seção de recomendados
                .catch(error => {
                    console.warn('⚠️ Erro ao carregar hotéis, usando mock:', error);
                    return getMockHotels();
                });

            // 📦 PACOTES DO BACKEND
            const packagesPromise = packageService.getPackages({ 
                take: 8, // Apenas 8 para a seção de promoções
                promotion: true 
            })
                .then(packages => packages.slice(0, 8))
                .catch(error => {
                    console.warn('⚠️ Erro ao carregar pacotes, usando mock:', error);
                    return getMockPackages();
                });

            // 🎭 DADOS MOCKADOS (funcionalidades futuras)
            const blogPostsPromise = Promise.resolve(getMockBlogPosts());
            
            // 🗺️ HOTÉIS PARA O MAPA (backend + coordenadas mockadas)
            const mapHotelsPromise = hotelsPromise.then(hotels => 
                hotels.map(hotel => ({
                    ...hotel,
                    // Adicionar coordenadas mockadas se não existirem
                    latitude: hotel.latitude || getMockCoordinates(hotel.id).lat,
                    longitude: hotel.longitude || getMockCoordinates(hotel.id).lng
                }))
            );

            // ⚡ EXECUTAR TODAS AS REQUISIÇÕES EM PARALELO
            const [hotels, packages, blogPosts, mapHotels] = await Promise.all([
                hotelsPromise,
                packagesPromise,
                blogPostsPromise,
                mapHotelsPromise
            ]);

            setData({
                hotels,
                packages,
                blogPosts,
                mapHotels,
                loading: false,
                error: null
            });

        } catch (error) {
            console.error('❌ Erro ao carregar dados da homepage:', error);
            
            // ⚡ FALLBACK COMPLETO PARA MOCKS
            setData({
                hotels: getMockHotels(),
                packages: getMockPackages(),
                blogPosts: getMockBlogPosts(),
                mapHotels: getMockHotels().map(hotel => ({
                    ...hotel,
                    latitude: getMockCoordinates(hotel.id).lat,
                    longitude: getMockCoordinates(hotel.id).lng
                })),
                loading: false,
                error: 'Alguns dados podem estar desatualizados'
            });
        }
    }

    return {
        ...data,
        refetch: loadHomePageData
    };
}

/**
 * 🏨 HOTÉIS MOCKADOS (fallback)
 */
function getMockHotels() {
    return [
        {
            id: 1,
            name: "Hotel Paradise Resort",
            city: "Rio de Janeiro",
            state: "RJ",
            stars: 5,
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
            pricePerNight: 450,
            description: "Resort luxuoso com vista para o mar",
            rating: 4.8,
            feedbacks: [],
            wifi: true,
            parking: true,
            gym: true
        },
        {
            id: 2,
            name: "Pousada São Paulo Center",
            city: "São Paulo",
            state: "SP",
            stars: 4,
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
            pricePerNight: 280,
            description: "No coração da cidade, próximo ao metrô",
            rating: 4.5,
            feedbacks: [],
            wifi: true,
            parking: false,
            gym: true
        },
        {
            id: 3,
            name: "Hotel Praia Bela",
            city: "Salvador",
            state: "BA",
            stars: 4,
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
            pricePerNight: 320,
            description: "Frente para a praia, café da manhã incluso",
            rating: 4.6,
            feedbacks: [],
            wifi: true,
            parking: true,
            gym: false
        },
        {
            id: 4,
            name: "Mountain Lodge",
            city: "Gramado",
            state: "RS",
            stars: 5,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
            pricePerNight: 380,
            description: "Charme europeu na serra gaúcha",
            rating: 4.9,
            feedbacks: [],
            wifi: true,
            parking: true,
            gym: true
        },
        {
            id: 5,
            name: "Hotel Business Tower",
            city: "Brasília",
            state: "DF",
            stars: 4,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
            pricePerNight: 350,
            description: "Ideal para viagens corporativas",
            rating: 4.3,
            feedbacks: [],
            wifi: true,
            parking: true,
            gym: true
        },
        {
            id: 6,
            name: "Eco Resort Amazônia",
            city: "Manaus",
            state: "AM",
            stars: 4,
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
            pricePerNight: 290,
            description: "Experiência única na floresta amazônica",
            rating: 4.4,
            feedbacks: [],
            wifi: false,
            parking: true,
            gym: false
        }
    ];
}

/**
 * 📦 PACOTES MOCKADOS (fallback)
 */
function getMockPackages() {
    return [
        {
            id: 1,
            title: "🏖️ Rio de Janeiro - 5 dias",
            description: "Cristo Redentor, Pão de Açúcar e praias",
            image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400",
            originalPrice: 1200,
            promotionalPrice: 899,
            isPromotion: true,
            duration: "5 dias / 4 noites",
            destination: "Rio de Janeiro, RJ"
        },
        {
            id: 2,
            title: "🌆 São Paulo Cultural - 3 dias",
            description: "Museus, teatros e gastronomia paulistana",
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400",
            originalPrice: 800,
            promotionalPrice: 599,
            isPromotion: true,
            duration: "3 dias / 2 noites",
            destination: "São Paulo, SP"
        },
        {
            id: 3,
            title: "🏛️ Salvador Histórico - 4 dias",
            description: "Pelourinho, música e culinária baiana",
            image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400",
            originalPrice: 1000,
            promotionalPrice: 750,
            isPromotion: true,
            duration: "4 dias / 3 noites",
            destination: "Salvador, BA"
        },
        {
            id: 4,
            title: "❄️ Gramado Romântico - 3 dias",
            description: "Serra gaúcha, chocolate e arquitetura europeia",
            image: "https://images.unsplash.com/photo-1609948230043-71d90b7cfe55?w=400",
            originalPrice: 900,
            promotionalPrice: 679,
            isPromotion: true,
            duration: "3 dias / 2 noites",
            destination: "Gramado, RS"
        }
    ];
}

/**
 * 📝 POSTS DO BLOG MOCKADOS
 */
function getMockBlogPosts() {
    return [
        {
            id: 1,
            title: "10 Destinos Imperdíveis no Brasil",
            excerpt: "Descubra lugares únicos para suas próximas férias",
            image: "https://images.unsplash.com/photo-1539650116574-75c0c6d0d9d3?w=400",
            author: "Marina Santos",
            publishedAt: "2025-01-15",
            readTime: "5 min"
        },
        {
            id: 2,
            title: "Dicas de Economia em Viagens",
            excerpt: "Como viajar mais gastando menos",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
            author: "Carlos Oliveira",
            publishedAt: "2025-01-12",
            readTime: "8 min"
        },
        {
            id: 3,
            title: "Roteiro Completo: Nordeste Brasileiro",
            excerpt: "21 dias explorando as maravilhas nordestinas",
            image: "https://images.unsplash.com/photo-1587405448984-5d355d0b35b0?w=400",
            author: "Ana Costa",
            publishedAt: "2025-01-10",
            readTime: "12 min"
        }
    ];
}

/**
 * 🗺️ COORDENADAS MOCKADAS PARA HOTÉIS
 */
function getMockCoordinates(hotelId) {
    const coordinates = {
        1: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
        2: { lat: -23.5505, lng: -46.6333 }, // São Paulo
        3: { lat: -12.9714, lng: -38.5014 }, // Salvador
        4: { lat: -29.3751, lng: -50.8755 }, // Gramado
        5: { lat: -15.7942, lng: -47.8822 }, // Brasília
        6: { lat: -3.1190, lng: -60.0217 }   // Manaus
    };
    
    return coordinates[hotelId] || { lat: -14.2350, lng: -51.9253 }; // Centro do Brasil como fallback
}
