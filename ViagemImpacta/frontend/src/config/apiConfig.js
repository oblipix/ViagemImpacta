// src/config/apiConfig.js
// Configuração centralizada da API

const getApiBaseUrl = () => {
  // Em produção, usa a variável de ambiente ou a URL fixa da Azure
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_BASE_URL || 'https://tripzback.azurewebsites.net/api';
  }
  
  // Em desenvolvimento, pode usar localhost ou a URL da Azure
  return import.meta.env.VITE_API_BASE_URL || 'https://tripzback.azurewebsites.net/api';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    HOTELS: '/hotels',
    RESERVATIONS: '/reservations',
    AUTH: '/auth',
    USERS: '/users',
    REVIEWS: '/reviews',
    STRIPE: '/Stripe'
  },
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default API_CONFIG;
