// 🌐 CONFIGURAÇÃO DA API - BACKEND INTEGRATION
// Configurações centralizadas para comunicação com o backend ASP.NET Core

/**
 * 🎯 CONFIGURAÇÃO BASE DA API
 * URL base do backend ASP.NET Core em desenvolvimento
 * Porta padrão: 5155 (HTTP) / 7010 (HTTPS)
 */
export const API_CONFIG = {
    // URL base do backend
    BASE_URL: 'http://localhost:5155/api',
    
    // URLs específicas dos endpoints
    ENDPOINTS: {
        // Autenticação
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/users/createUser',
            LOGOUT: '/auth/logout'
        },
        
        // Hotéis
        HOTELS: {
            LIST: '/hotels',                          // GET /api/hotels
            BY_ID: '/hotels/{id}',                   // GET /api/hotels/1
            BY_STARS: '/hotels/stars/{stars}',       // GET /api/hotels/stars/5
            BY_AMENITIES: '/hotels/amenities'        // GET /api/hotels/amenities?wifi=true&parking=true
        },
        
        // Usuários
        USERS: {
            PROFILE: '/users/{id}',                  // GET /api/users/1
            UPDATE: '/users/{id}',                   // PUT /api/users/1
            CREATE: '/users/createUser'              // POST /api/users/createUser
        },
        
        // Pacotes de Viagem (ReservationBooks)
        PACKAGES: {
            LIST: '/reservationbooks',               // GET /api/reservationbooks
            BY_ID: '/reservationbooks/{id}',         // GET /api/reservationbooks/1
            CREATE: '/reservationbooks',             // POST /api/reservationbooks
            UPDATE: '/reservationbooks/{id}',       // PUT /api/reservationbooks/1
            DELETE: '/reservationbooks/{id}'        // DELETE /api/reservationbooks/1
        }
    },
    
    // Headers padrão
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    
    // Timeout da requisição (30 segundos)
    TIMEOUT: 30000,
    
    // Status codes esperados
    STATUS_CODES: {
        SUCCESS: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500
    }
};

/**
 * 🔧 HELPER: Construir URL completa do endpoint
 * @param {string} endpoint - Endpoint relativo (ex: '/hotels')
 * @param {object} params - Parâmetros para substituir na URL (ex: {id: 1})
 * @returns {string} URL completa
 */
export const buildUrl = (endpoint, params = {}) => {
    let url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    // Substituir parâmetros na URL (ex: {id} por valor real)
    Object.keys(params).forEach(key => {
        url = url.replace(`{${key}}`, params[key]);
    });
    
    return url;
};

/**
 * 🔧 HELPER: Construir query string
 * @param {object} params - Parâmetros da query string
 * @returns {string} Query string formatada
 */
export const buildQueryString = (params = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            searchParams.append(key, params[key]);
        }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
};

/**
 * 🔧 HELPER: Obter headers com token de autenticação
 * @returns {object} Headers com token JWT se disponível
 */
export const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    const headers = { ...API_CONFIG.DEFAULT_HEADERS };
    
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
};

/**
 * 🔧 HELPER: Verificar se a resposta é bem-sucedida
 * @param {Response} response - Resposta da fetch API
 * @returns {boolean} True se sucesso
 */
export const isSuccessResponse = (response) => {
    return response.status >= 200 && response.status < 300;
};

/**
 * 🔧 HELPER: Tratar erros de resposta
 * @param {Response} response - Resposta com erro
 * @returns {Promise<Error>} Error com detalhes
 */
export const handleApiError = async (response) => {
    let errorMessage = `HTTP ${response.status}`;
    
    try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
        errorMessage = response.statusText || errorMessage;
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    error.response = response;
    
    return error;
};

export default API_CONFIG;
