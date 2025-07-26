// 📦 SERVIÇO DE PACOTES DE VIAGEM - INTEGRAÇÃO COM BACKEND
// Comunicação com os endpoints de ReservationBooks do ASP.NET Core

import { apiService } from './apiService.js';
import { API_CONFIG } from './apiConfig.js';

/**
 * 🎯 SERVIÇO PARA OPERAÇÕES COM PACOTES DE VIAGEM
 * 
 * Integra com os endpoints do ReservationBooksController do backend:
 * - GET /api/reservationbooks - Listar pacotes com filtros
 * - GET /api/reservationbooks/{id} - Buscar pacote por ID
 * - POST /api/reservationbooks - Criar novo pacote
 * - PUT /api/reservationbooks/{id} - Atualizar pacote
 * - DELETE /api/reservationbooks/{id} - Excluir pacote
 * 
 * 🔗 BACKEND ENDPOINTS:
 * c:\backend\ViagemImpacta\Controllers\ApiControllers\ReservationBooksController.cs
 */
export class PackageService {
    
    /**
     * 📦 LISTAR PACOTES COM FILTROS
     * 
     * @param {object} filters - Filtros de busca
     * @param {string} filters.destination - Destino
     * @param {number} filters.minPrice - Preço mínimo
     * @param {number} filters.maxPrice - Preço máximo
     * @param {Date} filters.checkIn - Data de check-in
     * @param {Date} filters.checkOut - Data de check-out
     * @param {boolean} filters.promotion - Apenas promoções
     * @param {number} filters.skip - Paginação (offset)
     * @param {number} filters.take - Paginação (limite)
     * @returns {Promise<Package[]>} Lista de pacotes
     * @throws {Error} Erro de comunicação ou parâmetros inválidos
     * 
     * 🌐 ENDPOINT: GET /api/reservationbooks
     * 📊 RESPONSE: Array de ReservationBookListResponse
     */
    async getPackages(filters = {}) {
        try {
            const queryParams = {};
            
            // Construir parâmetros de query
            if (filters.destination) queryParams.destination = filters.destination;
            if (filters.minPrice !== undefined) queryParams.minPrice = filters.minPrice;
            if (filters.maxPrice !== undefined) queryParams.maxPrice = filters.maxPrice;
            if (filters.checkIn) queryParams.checkIn = this.formatDate(filters.checkIn);
            if (filters.checkOut) queryParams.checkOut = this.formatDate(filters.checkOut);
            if (filters.promotion !== undefined) queryParams.promotion = filters.promotion;
            
            // Paginação
            queryParams.skip = filters.skip || 0;
            queryParams.take = Math.min(filters.take || 10, 100); // Máximo 100

            console.log('📦 Buscando pacotes com filtros:', queryParams);

            const packages = await apiService.get(
                API_CONFIG.ENDPOINTS.PACKAGES.LIST,
                {},
                queryParams
            );
            
            return packages.map(this.transformPackageListData);

        } catch (error) {
            console.error('❌ Erro ao buscar pacotes:', error);
            throw new Error('Falha ao carregar pacotes de viagem');
        }
    }

    /**
     * 📦 BUSCAR PACOTE POR ID
     * 
     * @param {number} packageId - ID do pacote
     * @returns {Promise<Package>} Dados completos do pacote
     * @throws {Error} Pacote não encontrado ou erro de servidor
     * 
     * 🌐 ENDPOINT: GET /api/reservationbooks/{id}
     * 📊 RESPONSE: ReservationBookResponse
     */
    async getPackageById(packageId) {
        try {
            if (!packageId || packageId <= 0) {
                throw new Error('ID do pacote inválido');
            }

            console.log(`📦 Buscando pacote ${packageId}`);

            const packageData = await apiService.get(
                API_CONFIG.ENDPOINTS.PACKAGES.BY_ID,
                { id: packageId }
            );
            
            return this.transformPackageDetailData(packageData);

        } catch (error) {
            console.error(`❌ Erro ao buscar pacote ${packageId}:`, error);
            
            if (error.status === 404) {
                throw new Error(`Pacote com ID ${packageId} não encontrado`);
            }
            
            throw new Error('Falha ao carregar dados do pacote');
        }
    }

    /**
     * 📦 BUSCAR PACOTES PROMOCIONAIS
     * 
     * @param {number} limit - Limite de resultados
     * @returns {Promise<Package[]>} Pacotes em promoção
     */
    async getPromotionalPackages(limit = 10) {
        return this.getPackages({
            promotion: true,
            take: limit
        });
    }

    /**
     * 📦 BUSCAR PACOTES POR DESTINO
     * 
     * @param {string} destination - Destino desejado
     * @param {number} limit - Limite de resultados
     * @returns {Promise<Package[]>} Pacotes para o destino
     */
    async getPackagesByDestination(destination, limit = 20) {
        return this.getPackages({
            destination: destination,
            take: limit
        });
    }

    /**
     * 📦 BUSCAR PACOTES POR FAIXA DE PREÇO
     * 
     * @param {number} minPrice - Preço mínimo
     * @param {number} maxPrice - Preço máximo
     * @param {number} limit - Limite de resultados
     * @returns {Promise<Package[]>} Pacotes na faixa de preço
     */
    async getPackagesByPriceRange(minPrice, maxPrice, limit = 20) {
        if (minPrice > maxPrice) {
            throw new Error('Preço mínimo não pode ser maior que o máximo');
        }

        return this.getPackages({
            minPrice: minPrice,
            maxPrice: maxPrice,
            take: limit
        });
    }

    /**
     * 🔧 TRANSFORMAR DADOS DA LISTA (RESUMIDOS) DO BACKEND
     * 
     * @param {object} backendPackage - ReservationBookListResponse
     * @returns {object} Pacote no formato do frontend
     */
    transformPackageListData = (backendPackage) => {
        return {
            id: backendPackage.id,
            title: backendPackage.title,
            destination: backendPackage.destination,
            price: backendPackage.finalPrice,
            originalPrice: backendPackage.isPromotion ? 
                Math.round(backendPackage.finalPrice * 1.2) : backendPackage.finalPrice,
            isPromotion: backendPackage.isPromotion,
            checkIn: new Date(backendPackage.checkIn),
            checkOut: new Date(backendPackage.checkOut),
            duration: this.calculateDuration(backendPackage.checkIn, backendPackage.checkOut),
            imageUrl: backendPackage.imageUrl || this.generateMockPackageImage(backendPackage.destination),
            
            // Campos adicionais para compatibilidade com frontend
            description: `Viagem para ${backendPackage.destination}`,
            category: this.getCategoryFromDestination(backendPackage.destination),
            saved: false // Será controlado pelo estado do frontend
        };
    };

    /**
     * 🔧 TRANSFORMAR DADOS DETALHADOS DO BACKEND
     * 
     * @param {object} backendPackage - ReservationBookResponse
     * @returns {object} Pacote completo no formato do frontend
     */
    transformPackageDetailData = (backendPackage) => {
        const basicData = this.transformPackageListData(backendPackage);
        
        return {
            ...basicData,
            description: backendPackage.description || basicData.description,
            hotels: backendPackage.hotels?.map(this.transformHotelData) || [],
            
            // Dados adicionais mockados por enquanto
            itinerary: this.generateMockItinerary(backendPackage.destination),
            inclusions: this.generateMockInclusions(),
            exclusions: this.generateMockExclusions(),
            gallery: this.generateMockGallery(backendPackage.destination)
        };
    };

    /**
     * 🔧 HELPERS E UTILITIES
     */
    
    formatDate = (date) => {
        if (date instanceof Date) {
            return date.toISOString().split('T')[0];
        }
        return date;
    };

    calculateDuration = (checkIn, checkOut) => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} dias`;
    };

    getCategoryFromDestination = (destination) => {
        if (!destination) return 'Nacional';
        
        const national = ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Recife', 'Fortaleza', 'Brasília'];
        const isNational = national.some(city => 
            destination.toLowerCase().includes(city.toLowerCase())
        );
        
        return isNational ? 'Nacional' : 'Internacional';
    };

    generateMockPackageImage = (destination) => {
        const encoded = encodeURIComponent(destination || 'Destino');
        return `https://via.placeholder.com/400x250/0EA5E9/FFFFFF?text=${encoded}`;
    };

    transformHotelData = (hotelData) => {
        return {
            id: hotelData.id,
            name: hotelData.name,
            address: hotelData.address,
            stars: hotelData.stars || 4,
            imageUrl: hotelData.imageUrl || this.generateMockPackageImage(hotelData.name)
        };
    };

    generateMockItinerary = (destination) => {
        return [
            { day: 1, title: 'Chegada', description: `Chegada em ${destination} e check-in no hotel` },
            { day: 2, title: 'City Tour', description: 'Passeio pelos principais pontos turísticos' },
            { day: 3, title: 'Dia Livre', description: 'Dia livre para atividades opcionais' },
            { day: 4, title: 'Partida', description: 'Check-out e retorno' }
        ];
    };

    generateMockInclusions = () => {
        return [
            'Passagens aéreas',
            'Hospedagem com café da manhã',
            'Traslados aeroporto/hotel',
            'Seguro viagem',
            'City tour'
        ];
    };

    generateMockExclusions = () => {
        return [
            'Refeições não mencionadas',
            'Bebidas alcoólicas',
            'Passeios opcionais',
            'Despesas pessoais',
            'Gorjetas'
        ];
    };

    generateMockGallery = (destination) => {
        return [
            { id: 1, url: this.generateMockPackageImage(destination + ' 1'), alt: `${destination} - Vista 1` },
            { id: 2, url: this.generateMockPackageImage(destination + ' 2'), alt: `${destination} - Vista 2` },
            { id: 3, url: this.generateMockPackageImage(destination + ' 3'), alt: `${destination} - Vista 3` }
        ];
    };
}

// 🎯 INSTÂNCIA SINGLETON PARA USO GLOBAL
export const packageService = new PackageService();

export default packageService;
