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
    
    // Usar navigate de forma segura
    let navigate;
    try {
        navigate = useNavigate();
    } catch (error) {
        console.warn('useNavigate não está disponível, navegação será ignorada');
        navigate = () => console.warn('Navegação ignorada - fora do contexto do router');
    }

    // Efeito para verificar autenticação no localStorage ao carregar a aplicação
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        
        if (storedToken && storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && typeof user === 'object' && user.email) {
                    setCurrentUser(user);
                    setToken(storedToken);
                    setIsLoggedIn(true);
                    // Em um cenário real, você carregaria saved/visited hotels do backend aqui após a autenticação
                    // Por enquanto, continuam mockados ou persistidos de alguma forma se houver
                    setSavedHotels(mockSavedHotels); // Mantém mockado por enquanto
                    setVisitedHotels(mockVisitedHotels); // Mantém mockado por enquanto
                } else {
                    // Se os dados do usuário são inválidos, limpa o localStorage
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('authUser');
                }
            } catch (e) {
                console.error("Falha ao analisar dados de usuário armazenados:", e);
                // Se houver erro, assume que os dados estão corrompidos e desloga
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
                setCurrentUser(null);
                setIsLoggedIn(false);
                setToken(null);
            }
        }
        setIsLoadingAuth(false); // A checagem inicial terminou
    }, []); // Array de dependências vazio para rodar apenas uma vez no mount

    // <<<<<<<<<<<< FUNÇÃO DE LOGIN COM CHAMADA AO BACKEND >>>>>>>>>>>>
    const login = async (email, password) => {
        // Validações básicas antes da requisição
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios");
        }

        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new Error("Email e senha devem ser strings válidas");
        }

        try {
            const response = await fetch('http://localhost:5155/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email: email.trim(), 
                    password: password 
                })
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                // Tenta extrair mensagem de erro da resposta
                let errorMessage = 'Erro no login';
                
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || `Erro ${response.status}: ${response.statusText}`;
                } catch {
                    // Se não conseguir parsear o JSON do erro
                    errorMessage = `Erro ${response.status}: ${response.statusText}`;
                }
                
                throw new Error(errorMessage);
            }

            // Parse da resposta JSON
            const data = await response.json();
            console.log('Login bem-sucedido (dados do backend):', data);

            // Verificação mais robusta dos dados recebidos
            if (!data || typeof data !== 'object') {
                throw new Error("Resposta inválida do servidor");
            }

            // Tenta extrair token de diferentes possíveis propriedades
            const receivedToken = data.token || data.accessToken || data.jwt || data.authToken;
            
            // Tenta extrair informações do usuário de diferentes possíveis propriedades
            const userInfo = data.user || data.profile || data.userData || data;

            // Validação mais rigorosa dos dados recebidos
            if (!userInfo || typeof userInfo !== 'object') {
                throw new Error("Informações do usuário não encontradas na resposta");
            }

            if (!userInfo.email || typeof userInfo.email !== 'string') {
                throw new Error("Email do usuário inválido recebido da API");
            }

            // Atualiza estados locais
            setToken(receivedToken || null);
            setCurrentUser(userInfo);
            setIsLoggedIn(true);

            // Salva no localStorage para persistência da sessão
            if (receivedToken) {
                localStorage.setItem('authToken', receivedToken);
            }
            localStorage.setItem('authUser', JSON.stringify(userInfo));

            // Em um cenário real, aqui você faria chamadas para carregar
            // os hotéis salvos e visitados do usuário real, usando o token.
            // Por enquanto, continuam mockados
            setSavedHotels(mockSavedHotels);
            setVisitedHotels(mockVisitedHotels);

            // Redireciona para a página principal após o login
            try {
                navigate('/minhas-viagens');
            } catch (navError) {
                console.error('Erro na navegação:', navError);
                // Se a navegação falhar, ainda considera o login bem-sucedido
            }

        } catch (error) {
            console.error('Erro no login:', error);
            
            // Limpa dados em caso de erro
            setCurrentUser(null);
            setIsLoggedIn(false);
            setToken(null);
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
            
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
        
        // Navega para login de forma segura
        try {
            navigate('/login');
        } catch (error) {
            console.warn('Não foi possível navegar para /login:', error);
            // Fallback: recarregar a página para ir para a rota padrão
            window.location.href = '/login';
        }
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