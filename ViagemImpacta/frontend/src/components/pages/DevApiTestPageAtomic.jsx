import React, { useState } from 'react';
import { Button, SVGIcon } from '../atoms';
import HotelTestPageAtomic from './HotelTestPageAtomic';

// 🛠️ IMPORTAR TODOS OS SERVIÇOS
import { hotelService } from '../../services/hotelService';
import { authService } from '../../services/authService';
import { packageService } from '../../services/packageService';
import { API_CONFIG } from '../../services/apiConfig';

// 🧪 ÁREA DE DESENVOLVIMENTO - TESTE DE APIS
// 
// Esta página permite testar todas as chamadas de API já integradas
const DevApiTestPageAtomic = ({ onBack }) => {
  // 🎯 ESTADOS PARA RESULTADOS DOS TESTES
  const [activeTab, setActiveTab] = useState('hotels');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState(null);

  // 🎯 ESTADOS PARA FORMULÁRIOS DE TESTE
  const [testForms, setTestForms] = useState({
    // Auth
    loginEmail: 'test@example.com',
    loginPassword: 'password123',
    registerName: 'Teste Usuario',
    registerEmail: 'novo@example.com',
    registerPassword: 'senha123',
    
    // Hotels
    hotelId: '1',
    hotelStars: '5',
    hotelAmenities: 'wifi,parking',
    
    // Packages
    packageId: '1',
    packageDestination: 'Rio de Janeiro',
    packageMinPrice: '500',
    packageMaxPrice: '2000'
  });

  // 🎯 ATUALIZAR CAMPOS DOS FORMULÁRIOS
  const updateForm = (field, value) => {
    setTestForms(prev => ({ ...prev, [field]: value }));
  };

  // 🎯 EXECUTAR TESTE DE API
  const executeTest = async (testName, apiCall) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🧪 Executando teste: ${testName}`);
      const startTime = performance.now();
      
      const result = await apiCall();
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      setResults(prev => ({
        ...prev,
        [testName]: {
          success: true,
          data: result,
          duration: `${duration}ms`,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
      
      console.log(`✅ Teste ${testName} concluído em ${duration}ms`, result);
    } catch (err) {
      console.error(`❌ Erro no teste ${testName}:`, err);
      setResults(prev => ({
        ...prev,
        [testName]: {
          success: false,
          error: err.message,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  // 🏨 TESTES DE HOTÉIS
  const testHotels = {
    getAllHotels: () => executeTest('getAllHotels', () => hotelService.getAllHotels()),
    getHotelById: () => executeTest('getHotelById', () => hotelService.getHotelById(testForms.hotelId)),
    getHotelsByStars: () => executeTest('getHotelsByStars', () => hotelService.getHotelsByStars(testForms.hotelStars)),
    searchAvailableHotels: () => executeTest('searchAvailableHotels', () => 
      hotelService.searchAvailableHotels({
        destination: testForms.packageDestination,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        guests: 2
      })
    )
  };

  // 🔐 TESTES DE AUTENTICAÇÃO
  const testAuth = {
    login: () => executeTest('login', () => authService.login(testForms.loginEmail, testForms.loginPassword)),
    register: () => executeTest('register', () => 
      authService.register({
        name: testForms.registerName,
        email: testForms.registerEmail,
        password: testForms.registerPassword
      })
    )
  };

  // 📦 TESTES DE PACOTES
  const testPackages = {
    getAllPackages: () => executeTest('getAllPackages', () => packageService.getPackages()),
    getPackageById: () => executeTest('getPackageById', () => packageService.getPackageById(testForms.packageId)),
    searchPackages: () => executeTest('searchPackages', () => 
      packageService.getPackages({
        destination: testForms.packageDestination,
        minPrice: parseFloat(testForms.packageMinPrice),
        maxPrice: parseFloat(testForms.packageMaxPrice)
      })
    )
  };

  // 🎯 RENDERIZAR RESULTADO DO TESTE
  const renderTestResult = (testName) => {
    const result = results[testName];
    if (!result) return null;

    return (
      <div className={`mt-2 p-3 rounded-md text-sm ${
        result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <SVGIcon 
            path={result.success ? 
              "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : 
              "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 6.5c-.77.833.192 2.5 1.732 2.5z"
            }
            className={result.success ? 'text-green-600' : 'text-red-600'}
          />
          <span className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
            {result.success ? 'Sucesso' : 'Erro'}
          </span>
          <span className="text-gray-500">• {result.timestamp}</span>
          {result.duration && <span className="text-gray-500">• {result.duration}</span>}
        </div>
        
        {result.success ? (
          <details className="cursor-pointer">
            <summary className="font-medium text-green-700 hover:text-green-800">
              Ver dados retornados ({Array.isArray(result.data) ? result.data.length : 1} item{Array.isArray(result.data) && result.data.length !== 1 ? 's' : ''})
            </summary>
            <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-32 border">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </details>
        ) : (
          <p className="text-red-700">{result.error}</p>
        )}
      </div>
    );
  };

  // 🎯 RENDERIZAR SEÇÃO DE HOTÉIS
  const renderHotelsSection = () => (
    <div className="space-y-6">
      {/* Listar todos os hotéis */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">📋 Listar Todos os Hotéis</h3>
        <p className="text-sm text-gray-600 mb-3">GET /api/hotels</p>
        <Button onClick={testHotels.getAllHotels} disabled={loading}>
          Testar getAllHotels()
        </Button>
        {renderTestResult('getAllHotels')}
      </div>

      {/* Buscar hotel por ID */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">🔍 Buscar Hotel por ID</h3>
        <p className="text-sm text-gray-600 mb-3">GET /api/hotels/{testForms.hotelId}</p>
        <div className="flex gap-3 items-end mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID do Hotel</label>
            <input
              type="number"
              value={testForms.hotelId}
              onChange={(e) => updateForm('hotelId', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md w-24"
              placeholder="1"
            />
          </div>
          <Button onClick={testHotels.getHotelById} disabled={loading}>
            Testar getHotelById()
          </Button>
        </div>
        {renderTestResult('getHotelById')}
      </div>

      {/* Buscar hotéis por estrelas */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">⭐ Filtrar por Estrelas</h3>
        <p className="text-sm text-gray-600 mb-3">GET /api/hotels/stars/{testForms.hotelStars}</p>
        <div className="flex gap-3 items-end mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Estrelas</label>
            <select
              value={testForms.hotelStars}
              onChange={(e) => updateForm('hotelStars', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="1">1 estrela</option>
              <option value="2">2 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="5">5 estrelas</option>
            </select>
          </div>
          <Button onClick={testHotels.getHotelsByStars} disabled={loading}>
            Testar getHotelsByStars()
          </Button>
        </div>
        {renderTestResult('getHotelsByStars')}
      </div>

      {/* Buscar hotéis disponíveis */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">🏨 Buscar Hotéis Disponíveis</h3>
        <p className="text-sm text-gray-600 mb-3">GET /api/hotels/search-available</p>
        <div className="flex gap-3 items-end mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
            <input
              type="text"
              value={testForms.packageDestination}
              onChange={(e) => updateForm('packageDestination', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Rio de Janeiro"
            />
          </div>
          <Button onClick={testHotels.searchAvailableHotels} disabled={loading}>
            Testar searchAvailableHotels()
          </Button>
        </div>
        {renderTestResult('searchAvailableHotels')}
      </div>
    </div>
  );

  // 🎯 RENDERIZAR SEÇÃO DE AUTENTICAÇÃO
  const renderAuthSection = () => (
    <div className="space-y-6">
      {/* Login */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">🔐 Login</h3>
        <p className="text-sm text-gray-600 mb-3">POST /api/auth/login</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={testForms.loginEmail}
              onChange={(e) => updateForm('loginEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="test@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={testForms.loginPassword}
              onChange={(e) => updateForm('loginPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="password123"
            />
          </div>
        </div>
        <Button onClick={testAuth.login} disabled={loading}>
          Testar login()
        </Button>
        {renderTestResult('login')}
      </div>

      {/* Registro */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">📝 Registro</h3>
        <p className="text-sm text-gray-600 mb-3">POST /api/users/createUser</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={testForms.registerName}
              onChange={(e) => updateForm('registerName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Nome Completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={testForms.registerEmail}
              onChange={(e) => updateForm('registerEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="novo@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={testForms.registerPassword}
              onChange={(e) => updateForm('registerPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="senha123"
            />
          </div>
        </div>
        <Button onClick={testAuth.register} disabled={loading}>
          Testar register()
        </Button>
        {renderTestResult('register')}
      </div>
    </div>
  );

  // 🎯 RENDERIZAR SEÇÃO DE PACOTES
  const renderPackagesSection = () => (
    <div className="space-y-6">
      {/* Listar todos os pacotes */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">📦 Listar Todos os Pacotes</h3>
        <p className="text-sm text-gray-600 mb-3">GET /api/reservationbooks</p>
        <Button onClick={testPackages.getAllPackages} disabled={loading}>
          Testar getPackages()
        </Button>
        {renderTestResult('getAllPackages')}
      </div>

      {/* Buscar pacote por ID */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">🔍 Buscar Pacote por ID</h3>
        <p className="text-sm text-gray-600 mb-3">GET /api/reservationbooks/{testForms.packageId}</p>
        <div className="flex gap-3 items-end mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID do Pacote</label>
            <input
              type="number"
              value={testForms.packageId}
              onChange={(e) => updateForm('packageId', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md w-24"
              placeholder="1"
            />
          </div>
          <Button onClick={testPackages.getPackageById} disabled={loading}>
            Testar getPackageById()
          </Button>
        </div>
        {renderTestResult('getPackageById')}
      </div>

      {/* Buscar pacotes com filtros */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">🔍 Buscar com Filtros</h3>
        <p className="text-sm text-gray-600 mb-3">GET /api/reservationbooks?destination=...&minPrice=...&maxPrice=...</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
            <input
              type="text"
              value={testForms.packageDestination}
              onChange={(e) => updateForm('packageDestination', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Rio de Janeiro"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço Mínimo</label>
            <input
              type="number"
              value={testForms.packageMinPrice}
              onChange={(e) => updateForm('packageMinPrice', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço Máximo</label>
            <input
              type="number"
              value={testForms.packageMaxPrice}
              onChange={(e) => updateForm('packageMaxPrice', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="2000"
            />
          </div>
        </div>
        <Button onClick={testPackages.searchPackages} disabled={loading}>
          Testar searchPackages()
        </Button>
        {renderTestResult('searchPackages')}
      </div>
    </div>
  );

  // 🎯 RENDERIZAR INFORMAÇÕES DA API
  const renderApiInfo = () => (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-semibold text-gray-800 mb-4">📡 Configuração da API</h3>
      <div className="space-y-2 text-sm">
        <div className="flex">
          <span className="font-medium text-gray-700 w-32">Base URL:</span>
          <span className="text-blue-600">{API_CONFIG.BASE_URL}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-32">Timeout:</span>
          <span>{API_CONFIG.TIMEOUT}ms</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-32">Content-Type:</span>
          <span>{API_CONFIG.DEFAULT_HEADERS['Content-Type']}</span>
        </div>
      </div>
      
      <h4 className="font-medium text-gray-800 mt-6 mb-3">🛣️ Endpoints Disponíveis</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <h5 className="font-medium text-gray-700 mb-2">🏨 Hotéis</h5>
          <ul className="space-y-1 text-gray-600 font-mono">
            <li>GET /api/hotels</li>
            <li>GET /api/hotels/{'{id}'}</li>
            <li>GET /api/hotels/stars/{'{stars}'}</li>
            <li>GET /api/hotels/search-available</li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-gray-700 mb-2">🔐 Autenticação</h5>
          <ul className="space-y-1 text-gray-600 font-mono">
            <li>POST /api/auth/login</li>
            <li>POST /api/users/createUser</li>
            <li>GET /api/users/{'{id}'}</li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-gray-700 mb-2">📦 Pacotes</h5>
          <ul className="space-y-1 text-gray-600 font-mono">
            <li>GET /api/reservationbooks</li>
            <li>GET /api/reservationbooks/{'{id}'}</li>
            <li>POST /api/reservationbooks</li>
            <li>PUT /api/reservationbooks/{'{id}'}</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // 🧪 RENDERIZAR SEÇÃO DE TESTE HOTEL/ROOMTYPE
  const renderHotelTestSection = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-4">🏨 Teste Hotel/RoomType/Availability</h3>
        <p className="text-gray-600 mb-4">
          Esta página testa a nova estrutura de hotéis com tipos de quarto e disponibilidade.
        </p>
      </div>
      
      <HotelTestPageAtomic />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
              <SVGIcon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              Voltar
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">🛠️ Área de Desenvolvimento</h1>
              <p className="text-gray-600">Teste de APIs e Integração Backend</p>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Indicador de loading global */}
        {loading && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-800">Executando teste de API...</span>
          </div>
        )}

        {/* Tabs de navegação */}
        <div className="mb-6">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { id: 'hotels', name: '🏨 Hotéis', count: Object.keys(results).filter(k => k.includes('Hotel')).length },
              { id: 'hotel-test', name: '🧪 Hotel Test', count: Object.keys(results).filter(k => k.includes('test')).length },
              { id: 'auth', name: '🔐 Autenticação', count: Object.keys(results).filter(k => k.includes('login') || k.includes('register')).length },
              { id: 'packages', name: '📦 Pacotes', count: Object.keys(results).filter(k => k.includes('Package')).length },
              { id: 'info', name: '📡 API Info', count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className="bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo das tabs */}
        <div>
          {activeTab === 'hotels' && renderHotelsSection()}
          {activeTab === 'hotel-test' && renderHotelTestSection()}
          {activeTab === 'auth' && renderAuthSection()}
          {activeTab === 'packages' && renderPackagesSection()}
          {activeTab === 'info' && renderApiInfo()}
        </div>
      </div>
    </div>
  );
};

export default DevApiTestPageAtomic;
