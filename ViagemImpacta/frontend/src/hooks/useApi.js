// 🪝 HOOKS PERSONALIZADOS PARA INTEGRAÇÃO COM BACKEND
// React Hooks que integram os serviços de API com componentes atomic

import { useState, useEffect, useCallback } from 'react';
import { hotelService, authService, packageService } from '../services';

/**
 * 🏨 HOOK PARA GERENCIAR HOTÉIS
 * 
 * @param {object} filters - Filtros iniciais (opcional)
 * @returns {object} Estado e funções para gerenciar hotéis
 */
export const useHotels = (filters = {}) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Carregar todos os hotéis
    const loadHotels = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await hotelService.getAllHotels();
            setHotels(data);
        } catch (err) {
            setError(err.message);
            console.error('Erro ao carregar hotéis:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Filtrar hotéis por estrelas
    const filterByStars = useCallback(async (stars) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await hotelService.getHotelsByStars(stars);
            setHotels(data);
        } catch (err) {
            setError(err.message);
            console.error('Erro ao filtrar hotéis por estrelas:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Filtrar hotéis por comodidades
    const filterByAmenities = useCallback(async (amenities) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await hotelService.getHotelsByAmenities(amenities);
            setHotels(data);
        } catch (err) {
            setError(err.message);
            console.error('Erro ao filtrar hotéis por comodidades:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Buscar hotel específico
    const getHotel = useCallback(async (hotelId) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await hotelService.getHotelById(hotelId);
            return data;
        } catch (err) {
            setError(err.message);
            console.error('Erro ao buscar hotel:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Carregar hotéis na inicialização
    useEffect(() => {
        loadHotels();
    }, [loadHotels]);

    return {
        hotels,
        loading,
        error,
        loadHotels,
        filterByStars,
        filterByAmenities,
        getHotel,
        refetch: loadHotels
    };
};

/**
 * 🔐 HOOK PARA GERENCIAR AUTENTICAÇÃO
 * 
 * @returns {object} Estado e funções para autenticação
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar autenticação na inicialização
    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        const authenticated = authService.isAuthenticated();
        
        setUser(currentUser);
        setIsAuthenticated(authenticated);
    }, []);

    // Realizar login
    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await authService.login(email, password);
            setUser(result.user);
            setIsAuthenticated(true);
            return result;
        } catch (err) {
            setError(err.message);
            console.error('Erro no login:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Realizar registro
    const register = useCallback(async (userData) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await authService.register(userData);
            return result;
        } catch (err) {
            setError(err.message);
            console.error('Erro no registro:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Realizar logout
    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
    }, []);

    // Carregar perfil do usuário
    const loadProfile = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        
        try {
            const profile = await authService.getUserProfile(userId);
            setUser(profile);
            return profile;
        } catch (err) {
            setError(err.message);
            console.error('Erro ao carregar perfil:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        loadProfile
    };
};

/**
 * 📦 HOOK PARA GERENCIAR PACOTES DE VIAGEM
 * 
 * @param {object} initialFilters - Filtros iniciais (opcional)
 * @returns {object} Estado e funções para gerenciar pacotes
 */
export const usePackages = (initialFilters = {}) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    // Carregar pacotes com filtros
    const loadPackages = useCallback(async (newFilters = {}) => {
        setLoading(true);
        setError(null);
        
        const searchFilters = { ...filters, ...newFilters };
        setFilters(searchFilters);
        
        try {
            const data = await packageService.getPackages(searchFilters);
            setPackages(data);
        } catch (err) {
            setError(err.message);
            console.error('Erro ao carregar pacotes:', err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Buscar pacote específico
    const getPackage = useCallback(async (packageId) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await packageService.getPackageById(packageId);
            return data;
        } catch (err) {
            setError(err.message);
            console.error('Erro ao buscar pacote:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Carregar pacotes promocionais
    const loadPromotionalPackages = useCallback(async (limit = 10) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await packageService.getPromotionalPackages(limit);
            setPackages(data);
        } catch (err) {
            setError(err.message);
            console.error('Erro ao carregar pacotes promocionais:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Filtrar por destino
    const filterByDestination = useCallback(async (destination, limit = 20) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await packageService.getPackagesByDestination(destination, limit);
            setPackages(data);
        } catch (err) {
            setError(err.message);
            console.error('Erro ao filtrar por destino:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Carregar pacotes na inicialização
    useEffect(() => {
        loadPackages(initialFilters);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        packages,
        loading,
        error,
        filters,
        loadPackages,
        getPackage,
        loadPromotionalPackages,
        filterByDestination,
        refetch: () => loadPackages(filters)
    };
};

/**
 * 📱 HOOK PARA ESTADO GLOBAL DA APLICAÇÃO
 * 
 * @returns {object} Estado e funções globais
 */
export const useAppState = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [backendAvailable, setBackendAvailable] = useState(true);

    // Verificar conectividade
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Verificar disponibilidade do backend
    const checkBackend = useCallback(async () => {
        try {
            const { checkBackendHealth } = await import('../services');
            const available = await checkBackendHealth();
            setBackendAvailable(available);
            return available;
        } catch {
            setBackendAvailable(false);
            return false;
        }
    }, []);

    // Verificar backend na inicialização
    useEffect(() => {
        checkBackend();
    }, [checkBackend]);

    return {
        isOnline,
        backendAvailable,
        checkBackend
    };
};

/**
 * 💾 HOOK PARA CACHE LOCAL (FALLBACK)
 * 
 * @param {string} key - Chave do cache
 * @param {any} defaultValue - Valor padrão
 * @returns {array} [value, setValue, clearValue]
 */
export const useLocalCache = (key, defaultValue = null) => {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const setStoredValue = useCallback((newValue) => {
        try {
            setValue(newValue);
            if (newValue === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(newValue));
            }
        } catch (error) {
            console.error(`Erro ao salvar no cache ${key}:`, error);
        }
    }, [key]);

    const clearValue = useCallback(() => {
        setStoredValue(null);
    }, [setStoredValue]);

    return [value, setStoredValue, clearValue];
};
