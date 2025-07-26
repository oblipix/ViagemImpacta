// 🌐 SERVIÇO DE API BASE - ATOMIC DESIGN INTEGRATION
// Classe base para comunicação com o backend ASP.NET Core

import { 
    API_CONFIG, 
    buildUrl, 
    buildQueryString, 
    getAuthHeaders, 
    isSuccessResponse, 
    handleApiError 
} from './apiConfig.js';

/**
 * 🎯 CLASSE BASE PARA TODOS OS SERVIÇOS DE API
 * 
 * Fornece métodos genéricos para operações HTTP (GET, POST, PUT, DELETE)
 * com tratamento de erros, autenticação e parsing automático de JSON.
 * 
 * 🏗️ PADRÃO UTILIZADO:
 * - Repository Pattern para acesso a dados
 * - Async/Await para operações assíncronas
 * - Error handling padronizado
 * - Interceptação de requests/responses
 */
export class ApiService {
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }

    /**
     * 🔧 MÉTODO GENÉRICO PARA REQUISIÇÕES HTTP
     * @param {string} url - URL completa da requisição
     * @param {object} options - Opções da requisição (method, headers, body, etc.)
     * @returns {Promise<any>} Dados da resposta ou erro
     */
    async request(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const config = {
                ...options,
                headers: {
                    ...getAuthHeaders(),
                    ...options.headers
                },
                signal: controller.signal
            };

            console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
            
            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            // Verificar se a resposta é bem-sucedida
            if (!isSuccessResponse(response)) {
                throw await handleApiError(response);
            }

            // Tentar fazer parse do JSON (se houver conteúdo)
            if (response.status === 204) {
                return null; // No Content
            }

            const data = await response.json();
            console.log(`✅ API Response: ${response.status}`, data);
            
            return data;

        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                console.error('⏱️ API Timeout:', url);
                throw new Error('Timeout: A requisição demorou muito para responder');
            }
            
            console.error('❌ API Error:', error);
            throw error;
        }
    }

    /**
     * 🔧 GET REQUEST
     * @param {string} endpoint - Endpoint relativo
     * @param {object} params - Parâmetros da URL
     * @param {object} queryParams - Parâmetros de query string
     * @returns {Promise<any>} Dados da resposta
     */
    async get(endpoint, params = {}, queryParams = {}) {
        const url = buildUrl(endpoint, params) + buildQueryString(queryParams);
        return this.request(url, { method: 'GET' });
    }

    /**
     * 🔧 POST REQUEST
     * @param {string} endpoint - Endpoint relativo
     * @param {object} data - Dados para enviar no body
     * @param {object} params - Parâmetros da URL
     * @returns {Promise<any>} Dados da resposta
     */
    async post(endpoint, data = {}, params = {}) {
        const url = buildUrl(endpoint, params);
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * 🔧 PUT REQUEST
     * @param {string} endpoint - Endpoint relativo
     * @param {object} data - Dados para enviar no body
     * @param {object} params - Parâmetros da URL
     * @returns {Promise<any>} Dados da resposta
     */
    async put(endpoint, data = {}, params = {}) {
        const url = buildUrl(endpoint, params);
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * 🔧 DELETE REQUEST
     * @param {string} endpoint - Endpoint relativo
     * @param {object} params - Parâmetros da URL
     * @returns {Promise<any>} Dados da resposta
     */
    async delete(endpoint, params = {}) {
        const url = buildUrl(endpoint, params);
        return this.request(url, { method: 'DELETE' });
    }

    /**
     * 🔧 UPLOAD DE ARQUIVO
     * @param {string} endpoint - Endpoint relativo
     * @param {FormData} formData - Dados do formulário com arquivo
     * @param {object} params - Parâmetros da URL
     * @returns {Promise<any>} Dados da resposta
     */
    async upload(endpoint, formData, params = {}) {
        const url = buildUrl(endpoint, params);
        const headers = getAuthHeaders();
        delete headers['Content-Type']; // Deixar o browser definir para FormData
        
        return this.request(url, {
            method: 'POST',
            headers,
            body: formData
        });
    }
}

// 🎯 INSTÂNCIA SINGLETON PARA USO GLOBAL
export const apiService = new ApiService();

export default apiService;
