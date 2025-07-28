import React, { useState, useEffect } from 'react';
import { Button, Input } from './atoms';

// 🎯 PACKAGES PAGE ATOMIC
// Versão atômica da página de pacotes com integração backend completa
// Utiliza os endpoints: GET /api/reservationbooks, GET /api/reservationbooks/{id}

function PackagesPageAtomic({ onBack, onPackageSelect }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    theme: '',
    priceRange: '',
    location: '',
    date: ''
  });

  const packagesPerPage = 6;

  // 🔄 CARREGAR PACOTES DO BACKEND
  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      setError(null);

      try {
        // 🌐 INTEGRAÇÃO BACKEND: GET /api/reservationbooks
        const response = await fetch('http://localhost:5000/api/reservationbooks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const packagesData = await response.json();
        
        // 🔄 TRANSFORMAR DADOS DO BACKEND PARA O FORMATO ESPERADO
        const transformedPackages = packagesData.map(pkg => ({
          id: pkg.id || pkg.reservationBookId,
          title: pkg.name || pkg.title || 'Pacote sem nome',
          description: pkg.description || 'Descrição não disponível',
          imageUrl: pkg.imageUrl || pkg.mainImage || 'https://picsum.photos/id/1036/800/600',
          location: pkg.location || pkg.destination || 'Local não informado',
          eventDate: pkg.startDate || pkg.eventDate || 'Data a definir',
          priceFrom: pkg.price || pkg.priceFrom || 0,
          theme: pkg.category || pkg.theme || 'Geral',
          galleryImages: pkg.galleryImages || [],
          duration: pkg.duration || 'N/A',
          included: pkg.included || [],
          highlights: pkg.highlights || []
        }));

        setPackages(transformedPackages);

      } catch (err) {
        console.error('Erro ao carregar pacotes:', err);
        setError(err.message);
        
        // 🔄 FALLBACK: Usar dados mockados se backend não estiver disponível
        setPackages(getMockPackages());
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  // 📦 DADOS MOCKADOS COMO FALLBACK
  const getMockPackages = () => [
    {
      id: 1,
      title: 'Carnaval Tripz Folia em Recife!',
      description: 'Sinta a energia contagiante do Carnaval em Recife! Pacote completo com hospedagem, transfers e ingressos para os melhores blocos.',
      imageUrl: 'https://picsum.photos/id/13/800/600',
      location: 'Recife, PE',
      eventDate: '15/02/2025',
      priceFrom: 1999.00,
      theme: 'Carnaval',
      duration: '5 dias / 4 noites',
      galleryImages: ['https://picsum.photos/id/14/100/80', 'https://picsum.photos/id/15/100/80'],
      included: ['Hospedagem 4⭐', 'Café da manhã', 'Transfers', 'Ingresso para blocos'],
      highlights: ['Blocos famosos', 'Hotel centro', 'Guia turístico']
    },
    {
      id: 2,
      title: 'Réveillon Tripz: Brilho e Emoção em Copacabana!',
      description: 'Prepare-se para a maior festa de Réveillon do mundo! Vista privilegiada dos fogos em Copacabana.',
      imageUrl: 'https://picsum.photos/id/16/800/600',
      location: 'Rio de Janeiro, RJ',
      eventDate: '31/12/2024',
      priceFrom: 3200.00,
      theme: 'Ano Novo',
      duration: '4 dias / 3 noites',
      galleryImages: ['https://picsum.photos/id/17/100/80', 'https://picsum.photos/id/18/100/80'],
      included: ['Hotel 5⭐', 'Vista para praia', 'Ceia de réveillon', 'Open bar'],
      highlights: ['Vista VIP dos fogos', 'Hotel frente mar', 'Festa privativa']
    },
    {
      id: 3,
      title: 'Natal Mágico na Montanha - Tripz Garanhuns!',
      description: 'Viva a magia do Natal em Garanhuns! Clima de inverno brasileiro e decorações encantadoras.',
      imageUrl: 'https://picsum.photos/id/19/800/600',
      location: 'Garanhuns, PE',
      eventDate: '24/12/2024',
      priceFrom: 1850.00,
      theme: 'Natal',
      duration: '3 dias / 2 noites',
      galleryImages: ['https://picsum.photos/id/20/100/80', 'https://picsum.photos/id/21/100/80'],
      included: ['Pousada charmosa', 'Ceia natalina', 'City tour', 'Atividades temáticas'],
      highlights: ['Clima de montanha', 'Decoração natalina', 'Gastronomia local']
    },
    {
      id: 4,
      title: 'Dia dos Namorados Romântico na Serra',
      description: 'Celebre o amor em um refúgio aconchegante na serra. Pacote especial para casais.',
      imageUrl: 'https://picsum.photos/id/22/800/600',
      location: 'Monte Verde, MG',
      eventDate: '12/06/2025',
      priceFrom: 1200.00,
      theme: 'Romance',
      duration: '2 dias / 1 noite',
      galleryImages: ['https://picsum.photos/id/23/100/80', 'https://picsum.photos/id/24/100/80'],
      included: ['Chalé romântico', 'Jantar à luz de velas', 'Spa para casais', 'Café da manhã na cama'],
      highlights: ['Ambiente romântico', 'Spa relaxante', 'Vista montanha']
    }
  ];

  // 🔍 FUNÇÃO DE BUSCA E FILTRO
  const getFilteredPackages = () => {
    return packages.filter(pkg => {
      const matchesSearch = 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTheme = !filters.theme || pkg.theme === filters.theme;
      const matchesLocation = !filters.location || pkg.location.includes(filters.location);
      
      // Filtro de preço (exemplo: "0-2000", "2000-5000", etc.)
      const matchesPrice = !filters.priceRange || (() => {
        const [min, max] = filters.priceRange.split('-').map(Number);
        return pkg.priceFrom >= min && (!max || pkg.priceFrom <= max);
      })();

      return matchesSearch && matchesTheme && matchesLocation && matchesPrice;
    });
  };

  // 📄 PAGINAÇÃO
  const filteredPackages = getFilteredPackages();
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);
  const startIndex = (currentPage - 1) * packagesPerPage;
  const currentPackages = filteredPackages.slice(startIndex, startIndex + packagesPerPage);

  // 🎯 SELECIONAR PACOTE
  const handlePackageClick = async (packageData) => {
    try {
      // 🌐 CARREGAR DETALHES COMPLETOS DO BACKEND: GET /api/reservationbooks/{id}
      const response = await fetch(`http://localhost:5000/api/reservationbooks/${packageData.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const detailedPackage = await response.json();
        onPackageSelect?.(detailedPackage);
      } else {
        // Fallback para dados básicos se detalhes não estiverem disponíveis
        onPackageSelect?.(packageData);
      }
    } catch (err) {
      console.error('Erro ao carregar detalhes do pacote:', err);
      onPackageSelect?.(packageData);
    }
  };

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div><p className="text-gray-600 text-lg">Carregando pacotes...</p></div>
      </section>
    );
  }

  // ❌ ERROR STATE
  if (error && packages.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-red-600 mb-4">
            Erro ao carregar pacotes
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100">
      {/* 🎨 HERO SECTION */}
      <div 
        className="relative bg-cover bg-center bg-gray-900 text-white h-64 flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://picsum.photos/id/1036/1200/400)` }}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold mb-4">Pacotes de Viagem</h1>
          <p className="text-lg mb-6">Descubra experiências únicas e inesquecíveis</p>
          <button 
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* 🔍 FILTROS E BUSCA */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            
            {/* 🔍 CAMPO DE BUSCA */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Buscar pacotes
              </label>
              <Input
                type="text"
                placeholder="Nome, local, descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            {/* 🎨 FILTRO POR TEMA */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tema
              </label>
              <select
                value={filters.theme}
                onChange={(e) => setFilters(prev => ({ ...prev, theme: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os temas</option>
                <option value="Carnaval">Carnaval</option>
                <option value="Ano Novo">Ano Novo</option>
                <option value="Natal">Natal</option>
                <option value="Romance">Romance</option>
                <option value="Aventura">Aventura</option>
              </select>
            </div>

            {/* 💰 FILTRO POR PREÇO */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Faixa de preço
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Qualquer preço</option>
                <option value="0-1500">Até R$ 1.500</option>
                <option value="1500-3000">R$ 1.500 - R$ 3.000</option>
                <option value="3000-5000">R$ 3.000 - R$ 5.000</option>
                <option value="5000-">Acima de R$ 5.000</option>
              </select>
            </div>

            {/* 📍 FILTRO POR LOCAL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Localização
              </label>
              <Input
                type="text"
                placeholder="Cidade, estado..."
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>

          {/* 📊 RESULTADOS DA BUSCA */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              {filteredPackages.length} {filteredPackages.length === 1 ? 'pacote encontrado' : 'pacotes encontrados'}
            </span>
            {error && (
              <span className="text-yellow-600">
                ⚠️ Dados offline - conecte-se para ver ofertas atualizadas
              </span>
            )}
          </div>
        </div>

        {/* 📦 GRID DE PACOTES */}
        {currentPackages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentPackages.map(pkg => (
                <div 
                  key={pkg.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handlePackageClick(pkg)}
                >
                  <div className="relative">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-green-600">
                      R$ {pkg.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{pkg.location}</span>
                      <span>{pkg.duration} dias</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {pkg.highlights?.slice(0, 2).map((highlight, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 📄 PAGINAÇÃO */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Anterior
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-gray-600 mb-4">
              Nenhum pacote encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              Tente ajustar seus filtros de busca
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchTerm('');
                setFilters({ theme: '', priceRange: '', location: '', date: '' });
                setCurrentPage(1);
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PackagesPageAtomic;
