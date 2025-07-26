// 🔐 SERVIÇO DE AUTENTICAÇÃO - INTEGRAÇÃO COM BACKEND
// Comunicação com os endpoints de autenticação do ASP.NET Core

import { apiService } from './apiService.js';
import { API_CONFIG } from './apiConfig.js';

/**
 * 🎯 SERVIÇO PARA OPERAÇÕES DE AUTENTICAÇÃO
 * 
 * Integra com os endpoints do AuthController e UsersController do backend:
 * - POST /api/auth/login - Login do usuário
 * - POST /api/users/createUser - Registro de novo usuário
 * - GET /api/users/{id} - Buscar dados do usuário
 * 
 * 🔗 BACKEND ENDPOINTS:
 * c:\backend\ViagemImpacta\Controllers\ApiControllers\AuthController.cs
 * c:\backend\ViagemImpacta\Controllers\ApiControllers\UsersController.cs
 */
export class AuthService {
    
    /**
     * 🔐 REALIZAR LOGIN
     * 
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     * @returns {Promise<object>} Dados do usuário autenticado e token
     * @throws {Error} Credenciais inválidas ou erro de servidor
     * 
     * 🌐 ENDPOINT: POST /api/auth/login
     * 📊 REQUEST: { email, password }
     * 📊 RESPONSE: { user, token, role }
     */
    async login(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Email e senha são obrigatórios');
            }

            const loginData = {
                email: email.trim().toLowerCase(),
                password: password
            };

            console.log('🔐 Tentando login:', { email: loginData.email });

            const response = await apiService.post(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN, 
                loginData
            );

            // Salvar token no localStorage
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userRole', response.role || 'User');
                localStorage.setItem('userId', response.user?.id || '');
                localStorage.setItem('userEmail', response.user?.email || loginData.email);
            }

            console.log('✅ Login realizado com sucesso');
            
            return {
                user: this.transformUserData(response.user),
                token: response.token,
                role: response.role
            };

        } catch (error) {
            console.error('❌ Erro no login:', error);
            
            if (error.status === 401) {
                throw new Error('Email ou senha incorretos');
            } else if (error.status === 404) {
                throw new Error('Usuário não encontrado');
            }
            
            throw new Error('Falha ao realizar login. Tente novamente.');
        }
    }

    /**
     * 🆕 REGISTRAR NOVO USUÁRIO
     * 
     * @param {object} userData - Dados do novo usuário
     * @param {string} userData.email - Email
     * @param {string} userData.password - Senha
     * @param {string} userData.firstName - Primeiro nome
     * @param {string} userData.lastName - Sobrenome
     * @returns {Promise<object>} Dados do usuário criado
     * @throws {Error} Dados inválidos ou usuário já existe
     * 
     * 🌐 ENDPOINT: POST /api/users/createUser
     * 📊 REQUEST: { email, password, firstName, lastName, roles }
     * 📊 RESPONSE: UserDto
     */
    async register(userData) {
        try {
            // Validação dos dados
            const { email, password, firstName, lastName } = userData;
            
            if (!email || !password || !firstName || !lastName) {
                throw new Error('Todos os campos são obrigatórios');
            }

            if (password.length < 6) {
                throw new Error('A senha deve ter pelo menos 6 caracteres');
            }

            const registrationData = {
                email: email.trim().toLowerCase(),
                password: password,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                roles: 0 // Roles.User = 0 (enum do backend)
            };

            console.log('🆕 Registrando usuário:', { 
                email: registrationData.email, 
                firstName: registrationData.firstName,
                lastName: registrationData.lastName 
            });

            const response = await apiService.post(
                API_CONFIG.ENDPOINTS.AUTH.REGISTER, 
                registrationData
            );

            console.log('✅ Usuário registrado com sucesso');
            
            return this.transformUserData(response);

        } catch (error) {
            console.error('❌ Erro no registro:', error);
            
            if (error.status === 400) {
                throw new Error('Dados inválidos. Verifique as informações fornecidas');
            } else if (error.message.includes('Email')) {
                throw new Error('Este email já está em uso');
            }
            
            throw new Error('Falha ao criar conta. Tente novamente.');
        }
    }

    /**
     * 👤 BUSCAR DADOS DO USUÁRIO
     * 
     * @param {number} userId - ID do usuário
     * @returns {Promise<object>} Dados do usuário
     * @throws {Error} Usuário não encontrado ou não autorizado
     * 
     * 🌐 ENDPOINT: GET /api/users/{id}
     * 📊 RESPONSE: UserDto
     */
    async getUserProfile(userId) {
        try {
            if (!userId) {
                userId = localStorage.getItem('userId');
            }

            if (!userId) {
                throw new Error('ID do usuário não fornecido');
            }

            const response = await apiService.get(
                API_CONFIG.ENDPOINTS.USERS.PROFILE,
                { id: userId }
            );

            return this.transformUserData(response);

        } catch (error) {
            console.error('❌ Erro ao buscar perfil:', error);
            
            if (error.status === 401) {
                throw new Error('Não autorizado. Faça login novamente');
            } else if (error.status === 404) {
                throw new Error('Usuário não encontrado');
            }
            
            throw new Error('Falha ao carregar dados do usuário');
        }
    }

    /**
     * 🚪 REALIZAR LOGOUT
     * 
     * Remove tokens e dados do usuário do localStorage
     */
    logout() {
        try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            
            console.log('✅ Logout realizado com sucesso');
        } catch (error) {
            console.error('❌ Erro no logout:', error);
        }
    }

    /**
     * 🔍 VERIFICAR SE USUÁRIO ESTÁ AUTENTICADO
     * 
     * @returns {boolean} True se usuário está logado
     */
    isAuthenticated() {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        
        return !!(token && userId);
    }

    /**
     * 👤 OBTER DADOS DO USUÁRIO ATUAL
     * 
     * @returns {object|null} Dados do usuário atual ou null
     */
    getCurrentUser() {
        if (!this.isAuthenticated()) {
            return null;
        }

        return {
            id: localStorage.getItem('userId'),
            email: localStorage.getItem('userEmail'),
            role: localStorage.getItem('userRole')
        };
    }

    /**
     * 🔧 TRANSFORMAR DADOS DO BACKEND PARA FRONTEND
     * 
     * @param {object} backendUser - Dados do usuário do backend
     * @returns {object} Usuário no formato do frontend
     */
    transformUserData = (backendUser) => {
        if (!backendUser) return null;

        return {
            id: backendUser.id || backendUser.userId,
            email: backendUser.email,
            firstName: backendUser.firstName,
            lastName: backendUser.lastName,
            fullName: `${backendUser.firstName || ''} ${backendUser.lastName || ''}`.trim(),
            role: backendUser.role || backendUser.roles || 'User',
            active: backendUser.active !== false, // Default true se não especificado
            createdAt: backendUser.createdAt,
            updatedAt: backendUser.updatedAt
        };
    };
}

// 🎯 INSTÂNCIA SINGLETON PARA USO GLOBAL
export const authService = new AuthService();

export default authService;
