/* eslint-disable react-refresh/only-export-components */
// src/components/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// --- DADOS DE EXEMPLO (usados apenas para saved/visited se não vierem do backend no login) ---
// Em um cenário real, mockVisitedHotels e mockSavedHotels seriam carregados do backend após o login
// ou gerenciados via outras chamadas de API.
const mockVisitedHotels = [
    { id: 1, mainImageUrl: 'https://picsum.photos/id/1000/800/600', title: 'Hotel Grandioso', location: 'Paris, França', price: 1200, rating: 4.8, description: 'Estadia de luxo inesquecível.', feedbacks: [] },
    { id: 2, mainImageUrl: 'https://picsum.photos/id/1002/800/600', title: 'Pousada da Mata', location: 'Bonito, Brasil', price: 800, rating: 4.9, description: 'Natureza exuberante e tranquilidade.', feedbacks: [] },
];

const mockSavedHotels = [
    { id: 3, mainImageUrl: 'https://picsum.photos/id/1004/800/600', title: 'Resort Ilha Bela', location: 'Maldivas', price: 3500, rating: 4.9, description: 'Praias privativas e mergulho.', feedbacks: [] },
    { id: 4, mainImageUrl: 'https://picsum.photos/id/1006/800/600', title: 'Hotel Urbano', location: 'Nova York, EUA', price: 2200, rating: 4.7, description: 'Moderno e central, para explorar a cidade.', feedbacks: [] },
];
// --- FIM DOS DADOS DE EXEMPLO ---


export const AuthProvider = ({ children }) => {
    // Estados do contexto
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null); // Adicionado para armazenar o token JWT
    const [savedHotels, setSavedHotels] = useState([]);
    const [visitedHotels, setVisitedHotels] = useState([]);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Para indicar que a checagem inicial está acontecendo
    const navigate = useNavigate();

    // Efeito para verificar autenticação no localStorage ao carregar a aplicação
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        if (storedToken && storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setCurrentUser(user);
                setToken(storedToken);
                setIsLoggedIn(true);
                // Em um cenário real, você carregaria saved/visited hotels do backend aqui após a autenticação
                // Por enquanto, continuam mockados ou persistidos de alguma forma se houver
                setSavedHotels(mockSavedHotels); // Mantém mockado por enquanto
                setVisitedHotels(mockVisitedHotels); // Mantém mockado por enquanto

            } catch (e) {
                console.error("Falha ao analisar dados de usuário armazenados:", e);
                // Se houver erro, assume que os dados estão corrompidos e desloga
                logout();
            }
        }
        setIsLoadingAuth(false); // A checagem inicial terminou
    }, []); // Array de dependências vazio para rodar apenas uma vez no mount

    // <<<<<<<<<<<< FUNÇÃO DE LOGIN COM CHAMADA AO BACKEND >>>>>>>>>>>>
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5155/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.text();
                // Assumindo que o backend pode retornar mensagens de erro específicas
                throw new Error(errorData || 'Falha ao fazer login. Verifique suas credenciais.');
            }

            const data = await response.json();
            console.log('Login bem-sucedido (dados do backend):', data);

            // Ajuste aqui conforme a estrutura REAL da sua resposta do backend
            // Por exemplo, se o backend retorna { accessToken: "...", user: { id: ..., name: ... } }
            const receivedToken = data.token || data.accessToken || data.jwt; // Tenta pegar de várias propriedades
            const userInfo = data.user || data.profile || data.userData; // Tenta pegar de várias propriedades

            if (!receivedToken || !userInfo) {
                throw new Error("Resposta do servidor incompleta: token ou informações do usuário ausentes.");
            }

            // Atualiza estados locais
            setToken(receivedToken);
            setCurrentUser(userInfo);
            setIsLoggedIn(true);

            // Salva no localStorage para persistência da sessão
            localStorage.setItem('authToken', receivedToken);
            localStorage.setItem('authUser', JSON.stringify(userInfo));

            // Em um cenário real, aqui você faria chamadas para carregar
            // os hotéis salvos e visitados do usuário real, usando o token.
            // Por enquanto, continuam mockados ou baseados em alguma lógica.
            setSavedHotels(mockSavedHotels);
            setVisitedHotels(mockVisitedHotels);

            // Redireciona para a página principal após o login
            navigate('/minhas-viagens'); // Ou '/dashboard', '/' etc.

        } catch (error) {
            console.error('Erro no login:', error);
            // Re-lança o erro para que o componente de Login possa exibir a mensagem
            throw error;
        }
    };

    // <<<<<<<<<<<< FUNÇÃO DE LOGOUT >>>>>>>>>>>>
    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setToken(null);
        setSavedHotels([]); // Limpa hotéis salvos/visitados ao deslogar
        setVisitedHotels([]);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        navigate('/login'); // Redireciona para a página de login
    };

    const updateUser = (updatedData) => {
        // Em um cenário real, aqui você faria uma chamada PATCH/PUT para a API
        // para atualizar os dados do usuário no backend, usando o token de autenticação.
        // Por exemplo: fetch('/api/user', { method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(updatedData) });
        setCurrentUser(prevUser => ({ ...prevUser, ...updatedData }));
        // Se a atualização for bem-sucedida, atualize também no localStorage
        localStorage.setItem('authUser', JSON.stringify({ ...currentUser, ...updatedData }));
        alert("Dados atualizados com sucesso!");
    };

    const removeSavedHotel = (hotelId) => {
        // Em um cenário real, você faria uma chamada de API para remover o hotel do backend.
        setSavedHotels(prevHotels => prevHotels.filter(hotel => hotel.id !== hotelId));
        alert("Hotel removido da sua lista de desejos!"); // Considere usar uma toast notification aqui.
    };

    const addSavedHotel = (hotel) => {
        // Em um cenário real, você faria uma chamada de API para adicionar o hotel no backend.
        setSavedHotels(prevHotels => [...prevHotels, hotel]);
        alert("Hotel adicionado à sua lista de desejos!"); // Considere usar uma toast notification aqui.
    }

    const value = {
        currentUser,
        isLoggedIn,
        token, // Expor o token se outros componentes precisarem dele para APIs
        savedHotels,
        visitedHotels,
        isLoadingAuth, // Expor para que a aplicação possa mostrar um loader enquanto checa a sessão
        login,
        logout,
        updateUser,
        addSavedHotel,
        removeSavedHotel
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};