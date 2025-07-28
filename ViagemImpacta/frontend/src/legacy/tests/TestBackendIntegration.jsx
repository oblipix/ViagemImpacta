// 🧪 PÁGINA DE TESTE - INTEGRAÇÃO COM BACKEND
// Demonstra os componentes atomic consumindo dados reais do ASP.NET Core

import React, { useState } from 'react';
import { Button, Text, Card, Alert } from './atoms';
import { useHotels, useAuth, usePackages, useAppState } from '../hooks/useApi';
import HotelListWithBackend from './sections/HotelListWithBackend/HotelListWithBackend';

const TestBackendIntegration = () => {
    const [activeTab, setActiveTab] = useState('hotels');
    const [testResults, setTestResults] = useState([]);

    // 🪝 Hooks para testar integração
    const { hotels, loading: hotelsLoading, error: hotelsError } = useHotels();
    const { user, isAuthenticated, login, logout } = useAuth();
    const { packages, loading: packagesLoading, error: packagesError } = usePackages();
    const { isOnline, backendAvailable, checkBackend } = useAppState();

    // 🧪 Teste de login
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const handleTestLogin = async () => {
        try {
            await login(loginForm.email, loginForm.password);
            setTestResults(prev => [...prev, '✅ Login realizado com sucesso']);
        } catch (error) {
            setTestResults(prev => [...prev, `❌ Erro no login: ${error.message}`]);
        }
    };

    // 🧪 Teste de verificação do backend
    const handleTestBackend = async () => {
        try {
            const available = await checkBackend();
            setTestResults(prev => [...prev, 
                available ? '✅ Backend está disponível' : '❌ Backend não está acessível'
            ]);
        } catch (error) {
            setTestResults(prev => [...prev, `❌ Erro ao verificar backend: ${error.message}`]);
        }
    };

    // 🎨 Renderizar status de conectividade
    const renderConnectivityStatus = () => (
        <Card variant="elevated" className="mb-6 p-4">
            <Text variant="h3" className="mb-4">Status da Conectividade</Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                    <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <Text variant="small">{isOnline ? 'Online' : 'Offline'}</Text>
                </div>
                <div className="text-center">
                    <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${backendAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <Text variant="small">{backendAvailable ? 'Backend OK' : 'Backend Indisponível'}</Text>
                </div>
                <div className="text-center">
                    <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${isAuthenticated ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <Text variant="small">{isAuthenticated ? 'Autenticado' : 'Não autenticado'}</Text>
                </div>
            </div>
            <Button onClick={handleTestBackend} className="mt-4 w-full">
                Verificar Backend
            </Button>
        </Card>
    );

    // 🎨 Renderizar teste de autenticação
    const renderAuthTest = () => (
        <Card variant="elevated" className="mb-6 p-4">
            <Text variant="h3" className="mb-4">Teste de Autenticação</Text>
            
            {isAuthenticated ? (
                <div>
                    <Text variant="body" className="mb-4">
                        Usuário logado: {user?.fullName || user?.email}
                    </Text>
                    <Button onClick={logout} variant="secondary">
                        Logout
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <Button onClick={handleTestLogin} className="w-full">
                            Testar Login
                        </Button>
                    </div>
                    <div>
                        <Text variant="small" className="text-gray-600">
                            Use credenciais do backend ou crie um usuário primeiro.
                        </Text>
                    </div>
                </div>
            )}
        </Card>
    );

    // 🎨 Renderizar estatísticas dos dados
    const renderDataStats = () => (
        <Card variant="elevated" className="mb-6 p-4">
            <Text variant="h3" className="mb-4">Estatísticas dos Dados</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Text variant="h4">Hotéis</Text>
                    <Text variant="body">
                        {hotelsLoading ? 'Carregando...' : 
                         hotelsError ? `Erro: ${hotelsError}` :
                         `${hotels.length} hotéis carregados`}
                    </Text>
                </div>
                <div>
                    <Text variant="h4">Pacotes</Text>
                    <Text variant="body">
                        {packagesLoading ? 'Carregando...' : 
                         packagesError ? `Erro: ${packagesError}` :
                         `${packages.length} pacotes carregados`}
                    </Text>
                </div>
            </div>
        </Card>
    );

    // 🎨 Renderizar log de testes
    const renderTestLog = () => (
        <Card variant="elevated" className="mb-6 p-4">
            <Text variant="h3" className="mb-4">Log de Testes</Text>
            <div className="bg-gray-100 p-4 rounded max-h-40 overflow-y-auto">
                {testResults.length === 0 ? (
                    <Text variant="small" className="text-gray-500">
                        Execute testes para ver os resultados aqui
                    </Text>
                ) : (
                    testResults.map((result, index) => (
                        <div key={index} className="mb-1">
                            <Text variant="small">{result}</Text>
                        </div>
                    ))
                )}
            </div>
            <Button 
                onClick={() => setTestResults([])} 
                variant="secondary" 
                className="mt-2"
            >
                Limpar Log
            </Button>
        </Card>
    );

    // 🎨 Renderizar tabs
    const renderTabs = () => (
        <div className="flex border-b mb-6">
            {[
                { id: 'hotels', label: 'Hotéis' },
                { id: 'packages', label: 'Pacotes' },
                { id: 'tests', label: 'Testes' }
            ].map(tab => (
                <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'primary' : 'ghost'}
                    onClick={() => setActiveTab(tab.id)}
                    className="rounded-none border-b-2"
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );

    // 🎨 Renderizar conteúdo da tab ativa
    const renderTabContent = () => {
        switch (activeTab) {
            case 'hotels':
                return <HotelListWithBackend title="Hotéis do Backend" />;
            
            case 'packages':
                return (
                    <div>
                        <Text variant="h3" className="mb-4">Pacotes de Viagem</Text>
                        {packagesLoading ? (
                            <Text>Carregando pacotes...</Text>
                        ) : packagesError ? (
                            <Alert variant="error">Erro: {packagesError}</Alert>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {packages.map(pkg => (
                                    <Card key={pkg.id} variant="elevated" className="p-4">
                                        <Text variant="h4">{pkg.title}</Text>
                                        <Text variant="small">Destino: {pkg.destination}</Text>
                                        <Text variant="small">Preço: R$ {pkg.price}</Text>
                                        {pkg.isPromotion && (
                                            <Text variant="small" className="text-green-600">
                                                🏷️ Promoção
                                            </Text>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                );
            
            case 'tests':
                return (
                    <div>
                        {renderConnectivityStatus()}
                        {renderAuthTest()}
                        {renderDataStats()}
                        {renderTestLog()}
                    </div>
                );
            
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="container mx-auto max-w-6xl">
                
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <Text variant="h1" className="mb-4">
                        🌐 Teste de Integração com Backend
                    </Text>
                    <Text variant="body" className="text-gray-600">
                        Componentes atomic consumindo dados do ASP.NET Core
                    </Text>
                </div>

                {/* Status geral */}
                {!backendAvailable && (
                    <Alert variant="warning" className="mb-6">
                        ⚠️ Backend não está acessível. Verifique se o servidor ASP.NET Core está rodando na porta 5155.
                    </Alert>
                )}

                {/* Navegação */}
                {renderTabs()}

                {/* Conteúdo */}
                {renderTabContent()}

                {/* Informações técnicas */}
                <Card variant="elevated" className="mt-8 p-4">
                    <Text variant="h4" className="mb-2">Informações Técnicas</Text>
                    <Text variant="small" className="text-gray-600">
                        🔗 Backend: http://localhost:5155/api<br/>
                        🏗️ Arquitetura: Atomic Design + React Hooks + ASP.NET Core<br/>
                        📊 Endpoints: /hotels, /auth/login, /users, /reservationbooks<br/>
                        🔧 Serviços: hotelService, authService, packageService
                    </Text>
                </Card>
            </div>
        </div>
    );
};

export default TestBackendIntegration;
