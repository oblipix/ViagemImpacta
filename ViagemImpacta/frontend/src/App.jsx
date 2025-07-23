  // Add missing handler and data stubs for clean architecture
  const handlePackageClick = () => {};
  const handleSaveTravel = () => {};
  const isTravelSaved = () => false;
  const TravelCard = () => null;
  const allAvailableTravels = [];
  const allPromotionalTravels = [];
  const allRecommendedTravels = [];
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TravelSection from './components/TravelSection';
import HeroSwiper from './components/HeroSwiper';
import PackageDetails from './components/PackageDetails';

  

 

function App() {
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [rawSearchTerm, setRawSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  // Handler stubs for missing functions
  // Handler para busca global: atualiza searchResults e mantém página de resultados
  const handleGlobalSearch = (searchTerm) => {
    setRawSearchTerm(searchTerm);
    // Simulação de busca: filtra allAvailableTravels pelo termo
    // Substitua por chamada real à API se necessário
    const results = allAvailableTravels.filter(travel => {
      const hotel = travel.hotels && travel.hotels.length > 0 ? travel.hotels[0] : null;
      const hotelName = hotel?.Name?.toLowerCase() || '';
      const location = hotel?.Location?.toLowerCase() || '';
      return hotelName.includes(searchTerm.toLowerCase()) || location.includes(searchTerm.toLowerCase());
    });
    setSearchResults(results);
    setCurrentPage('search');
    setSelectedPackageId(null);
  };
  const handleNavigateToMyTravels = () => {};
  const handleNavigateToHome = () => {};
  const handleNavigateToPackages = () => {};
  const handleNavigateToHotels = () => {};
  const handleBackToList = () => setSelectedPackageId(null);
  const handleNavigateToRegister = () => {};
  const handleLoginSuccess = () => {};
  const handleNavigateToLogin = () => {};
  // All logic is now inside the App function

  // Novas funções para os botões "Viagens com Promoção" e "Recomendado por Viajantes"
  const handleNavigateToPromos = () => {
    // Ao clicar em promoções, a página principal deve ser 'home'
    setCurrentPage('home');
    setRawSearchTerm(''); // Limpa a busca para mostrar todas as promoções
    // Removed setProcessedSearchTerm for clean architecture
    setSelectedPackageId(null);
    // Rola a página para a seção de promoções se ela existir
    setTimeout(() => {
        const section = document.getElementById('viagens-promocao');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateToRecommended = () => {
    // Ao clicar em recomendados, a página principal deve ser 'recommended'
    setCurrentPage('recommended'); // Novo valor para currentPage
    setRawSearchTerm(''); // Limpa a busca
    // Removed setProcessedSearchTerm for clean architecture
    setSelectedPackageId(null);
    // Rola a página para a seção de recomendados se ela existir
    setTimeout(() => {
        const section = document.getElementById('recomendado-viajantes');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };


  // Busca detalhes do pacote selecionado nos resultados da API
  const selectedPackage =
    searchResults.find((travel) => travel.id === selectedPackageId) || null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onSearch={handleGlobalSearch}
        onNavigateToMyTravels={handleNavigateToMyTravels}
        onNavigateToHome={handleNavigateToHome}
        // onNavigateToFlights removido
        currentPage={currentPage} // Passe currentPage para o Header se ele também precisar saber
      />

      <main className="flex-grow">
        {/* CONTEÚDO SEMPRE VISÍVEL NO TOPO (Home/Busca/Detalhes/Voos/etc) */}
        {currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'myTravels' && (
          <>
            <HeroSwiper />
            <section className="bg-white rounded-t-[50px] shadow-md -mt-10 md:-mt-18 relative z-10 py-4 px-6">
              <div className="container mx-auto flex flex-wrap justify-center gap-4 text-gray-700 font-medium">

                {/* BOTÃO VIAGENS COM PROMOÇÃO */}
                {/* Convertido de <a> para <button> para controle de estado */}
                <button
                  onClick={handleNavigateToPromos}
                  className={`py-2 px-4 rounded-full whitespace-nowrap
                    ${(currentPage === 'home' && !rawSearchTerm) ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  Viagens com Promoção
                </button>

                {/* BOTÃO RECOMENDADO POR VIAJANTES */}
                {/* Convertido de <a> para <button> para controle de estado */}
                <button
                  onClick={handleNavigateToRecommended}
                  className={`py-2 px-4 rounded-full whitespace-nowrap
                    ${currentPage === 'recommended' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  Recomendado por Viajantes
                </button>

                {/* BOTÃO PACOTES */}
                {/* Convertido de <a> para <button> para controle de estado */}
                <button
                  onClick={handleNavigateToPackages}
                  className={`py-2 px-4 rounded-full whitespace-nowrap
                    ${currentPage === 'packages' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  Pacotes
                </button>

                {/* BOTÃO HOTÉIS */}
                {/* Convertido de <a> para <button> para controle de estado */}
                <button
                  onClick={handleNavigateToHotels}
                  className={`py-2 px-4 rounded-full whitespace-nowrap
                    ${currentPage === 'hotels' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  Hotéis
                </button>
              </div>
            </section>
          </>
        )}

        {/* Botão "Limpar Busca" - Visível apenas quando há uma busca ativa E NÃO estamos em auth/myTravels pages */}
        {rawSearchTerm && currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'myTravels' && (
            <div className="container mx-auto px-6 py-4">
                <button onClick={() => { setRawSearchTerm(''); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">Limpar Busca</button>
            </div>
        )}

        {/* LÓGICA DE RENDERIZAÇÃO DO CONTEÚDO PRINCIPAL (Páginas e Seções) */}
        {selectedPackageId ? ( // Prioridade: Detalhes do Pacote
          <PackageDetails
            packageData={selectedPackage}
            onBack={handleBackToList}
          />
        ) : (
          // Próxima prioridade: Páginas de Autenticação ou Minhas Viagens ou Voos/Hotéis
          currentPage === 'login' ? (
            <LoginPage
              onNavigateToRegister={handleNavigateToRegister}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : currentPage === 'register' ? (
            <RegisterPage
              onNavigateToLogin={handleNavigateToLogin}
            />
          ) : currentPage === 'myTravels' ? (
            <MyTravelsPage
              onCardClick={handlePackageClick}
              // savedUserTravels removed for clean architecture
              allAvailableTravels={allAvailableTravels}
            />
          ) : currentPage === 'hotels' ? ( // === RENDERIZAÇÃO DA PÁGINA DE HOTÉIS ===
            <div className="container mx-auto px-6 py-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Página de Hotéis</h2>
              <p className="text-gray-600">Este é o conteúdo da página de Hotéis. Você precisará criar o componente HotelsPage para uma funcionalidade completa.</p>
            </div>
          ) : (
            // Se nenhuma das anteriores, estamos na Home (com ou sem busca)
            <>
              {rawSearchTerm ? (
                <div id="search-results" className="py-8 px-6 bg-white">
                  <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Resultados da Busca para "{rawSearchTerm}"</h2>
                    {searchResults.length > 0 ? (
                      <>
                        <p className="text-gray-700 text-center text-lg mb-6">
                          Encontramos {searchResults.length} pacotes para você! :)
                        </p>
                        <TravelSection
                          title=""
                          travels={searchResults}
                          onCardClick={handlePackageClick}
                          onSaveTravel={handleSaveTravel}
                          isTravelSaved={isTravelSaved}
                          CardComponent={TravelCard}
                        />
                      </>
                    ) : (
                      <p className="text-gray-600 text-center text-lg mb-6">
                        Não encontramos resultados para "{rawSearchTerm}" :( <br />
                        Tente ajustar sua busca ou explore outros pacotes!
                      </p>
                    )}
                    <div className="text-center mt-6">
                      <button onClick={() => { setRawSearchTerm(''); setSearchResults([]); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">Limpar Busca</button>
                    </div>
                  </div>
                </div>
              ) : (
                  // Exibe "Viagens com Promoção" e "Recomendado por Viajantes" APENAS se NÃO houver termo de busca E se estamos na home/recommended
                  // A exibição dessas seções não muda, mas a ativação do botão sim.
                  <>
                      <TravelSection
                          id="viagens-promocao"
                          title="Viagens com Promoção"
                          travels={allPromotionalTravels}
                          onCardClick={handlePackageClick}
                          onSaveTravel={handleSaveTravel}
                          isTravelSaved={isTravelSaved}
                          CardComponent={TravelCard}
                      />
                      <TravelSection
                          id="recomendado-viajantes"
                          title="Recomendado por Viajantes"
                          travels={allRecommendedTravels}
                          onCardClick={handlePackageClick}
                          onSaveTravel={handleSaveTravel}
                          isTravelSaved={isTravelSaved}
                          CardComponent={TravelCard}
                      />
                  </>
              )}
            </>
          )
        )}
      </main>

      <Footer />
    </div>

  );
}

export default App;
