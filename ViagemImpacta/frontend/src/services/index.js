// 🌐 ÍNDICE DE SERVIÇOS - EXPORT CENTRALIZADO
// Ponto de entrada único para todos os serviços de API

// 🔧 Configuração e utilitários base
export { default as apiConfig, API_CONFIG } from './apiConfig.js';
export { default as apiService, ApiService } from './apiService.js';

// 🏨 Serviços específicos
export { default as hotelService, HotelService } from './hotelService.js';
export { default as authService, AuthService } from './authService.js';
export { default as packageService, PackageService } from './packageService.js';

/**
 * 🎯 COMO USAR OS SERVIÇOS NOS COMPONENTES ATOMIC:
 * 
 * import { hotelService, authService, packageService } from '../services';
 * 
 * // Em um componente React:
 * const [hotels, setHotels] = useState([]);
 * 
 * useEffect(() => {
 *   const loadHotels = async () => {
 *     try {
 *       const data = await hotelService.getAllHotels();
 *       setHotels(data);
 *     } catch (error) {
 *       console.error('Erro ao carregar hotéis:', error);
 *     }
 *   };
 *   
 *   loadHotels();
 * }, []);
 * 
 * 🏗️ ESTRUTURA DOS SERVIÇOS:
 * 
 * services/
 * ├── index.js           (este arquivo - exports centralizados)
 * ├── apiConfig.js       (configurações da API)
 * ├── apiService.js      (classe base para HTTP requests)
 * ├── hotelService.js    (operações com hotéis)
 * ├── authService.js     (autenticação e usuários)
 * └── packageService.js  (pacotes de viagem)
 * 
 * 🔗 ENDPOINTS DO BACKEND INTEGRADOS:
 * 
 * ✅ Hotels Controller:
 *    - GET /api/hotels
 *    - GET /api/hotels/{id}
 *    - GET /api/hotels/stars/{stars}
 *    - GET /api/hotels/amenities
 * 
 * ✅ Auth Controller:
 *    - POST /api/auth/login
 * 
 * ✅ Users Controller:
 *    - POST /api/users/createUser
 *    - GET /api/users/{id}
 * 
 * ✅ ReservationBooks Controller:
 *    - GET /api/reservationbooks
 *    - GET /api/reservationbooks/{id}
 * 
 * 📋 PRÓXIMOS PASSOS PARA INTEGRAÇÃO COMPLETA:
 * 
 * 1. Substituir dados mockados por calls reais da API
 * 2. Implementar cache/estado global (Redux/Context)
 * 3. Adicionar tratamento de loading states
 * 4. Implementar refresh tokens
 * 5. Adicionar interceptors para tratamento de erros globais
 */

// 🎯 HELPER: Verificar se backend está disponível
export const checkBackendHealth = async () => {
    try {
        const { API_CONFIG } = await import('./apiConfig.js');
        const response = await fetch(`${API_CONFIG.BASE_URL.replace('/api', '')}/health`);
        return response.ok;
    } catch {
        return false;
    }
};

// 🎯 HELPER: Obter estatísticas dos serviços
export const getServicesInfo = async () => {
    const { API_CONFIG } = await import('./apiConfig.js');
    const { authService } = await import('./authService.js');
    
    return {
        baseUrl: API_CONFIG.BASE_URL,
        endpoints: Object.keys(API_CONFIG.ENDPOINTS),
        services: ['hotelService', 'authService', 'packageService'],
        isAuthenticated: authService.isAuthenticated(),
        currentUser: authService.getCurrentUser()
    };
};
