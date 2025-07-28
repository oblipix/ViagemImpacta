import React, { useState } from 'react';

// 🌐 COMPONENTES GLOBAIS
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSwiper from './components/HeroSwiper';

// 🎯 PÁGINAS ATÔMICAS ATIVAS
import LoginPageAtomic from './components/LoginPageAtomic';
import RegisterPageAtomic from './components/RegisterPageAtomic';
import UserProfilePageAtomic from './components/UserProfilePageAtomic';
import ForgotPasswordPageAtomic from './components/ForgotPasswordPageAtomic';
import PackagesPageAtomic from './components/PackagesPageAtomic';
import MyTravelsPageAtomic from './components/MyTravelsPageAtomic';
import InstitutionalPageAtomic from './components/InstitutionalPageAtomic';

// 🧪 FERRAMENTA DE TESTE
import TestNewAtomicPagesWithBackend from './components/TestNewAtomicPagesWithBackend';

// 🗺️ GOOGLE MAPS
import { useJsApiLoader } from '@react-google-maps/api';

// 🖼️ IMAGENS PARA PROMOÇÕES
import ImageNatalRS from './assets/images/natal1RS.png';
import ImageAnoNovoRJ from './assets/images/anonovoRJ.png';
import ImageCarnavelPe from './assets/images/carnavalPE.png';

// 🖼️ IMAGENS PARA BLOG
import BlogMala from './assets/images/blog-images/mala.jpg';
import BlogEconomia from './assets/images/blog-images/economia.jpg';
import BlogPet from './assets/images/blog-images/pet.jpg';
import BlogViagem from './assets/images/blog-images/viagem.jpg';

// 🖼️ IMAGENS DE HOTÉIS
import mainImageRio from './assets/images/entradaprincipalRJ.png';
import ImageCorredor from './assets/images/corredorRJ.png';
import ImagePiscina from './assets/images/piscinaRJ.png';
import ImageQuartoCasal from './assets/images/quartoCasalRJ.png';
import ImageRestaurante from './assets/images/restauranteRJ.png';
import ImageJardim from './assets/images/jardimRJ.png';
import ImageQuartoFamilia from './assets/images/quartoFamiliaRJ.png';
import ImageEstacionamento from './assets/images/estacionamentoRJ.png';

// Importações de imagens de destinos...
import mainImagePE from './assets/images/entradaprincipalPE.png';
import ImageCorredorPE from './assets/images/corredorPE.png';
import ImagePiscinaPE from './assets/images/piscinaPE.png';
import ImageQuartoCasalPE from './assets/images/quartoCasalPE.png';
import ImageRestaurantePE from './assets/images/restaurantePE.png';
import ImageJardimPE from './assets/images/jardimPE.png';
import ImageQuartoFamiliaPE from './assets/images/quartoFamiliaPE.png';
import ImageEstacionamentoPE from './assets/images/estacionamentoPE.png';

import mainImageRS from './assets/images/entradaprincipalRS.png';
import ImageCorredorRS from './assets/images/corredorRS.png';
import ImagePiscinaRS from './assets/images/piscinaRS.png';
import ImageQuartoCasalRS from './assets/images/quartoCasalRS.png';
import ImageRestauranteRS from './assets/images/restauranteRS.png';
import ImageJardimRS from './assets/images/jardimRS.png';
import ImageQuartoFamiliaRS from './assets/images/quartoFamiliaRS.png';
import ImageEstacionamentoRS from './assets/images/estacionamentoRS.png';

// 🔧 GOOGLE MAPS CONFIG
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'your-google-maps-api-key-here';
const libraries = ['places'];

function App() {
  // 🎯 ESTADO DA APLICAÇÃO
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  // 🗺️ GOOGLE MAPS LOADER
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey,
    libraries,
  });

  // 🎯 RENDERIZAR PÁGINA ATUAL
  const renderCurrentPage = () => {
    switch (currentPage) {
      // 🔐 AUTENTICAÇÃO
      case 'login':
        return (
          <LoginPageAtomic 
            onNavigateToRegister={() => setCurrentPage('register')}
            onNavigateToForgotPassword={() => setCurrentPage('forgot-password')}
            onLoginSuccess={(userData) => {
              setUser(userData);
              setCurrentPage('home');
            }}
          />
        );

      case 'register':
        return (
          <RegisterPageAtomic 
            onNavigateToLogin={() => setCurrentPage('login')}
            onRegisterSuccess={() => setCurrentPage('login')}
          />
        );

      case 'forgot-password':
        return (
          <ForgotPasswordPageAtomic 
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );

      // 👤 USUÁRIO
      case 'profile':
        return (
          <UserProfilePageAtomic 
            onBack={() => setCurrentPage('home')}
            user={user}
          />
        );

      case 'my-travels':
        return (
          <MyTravelsPageAtomic 
            onBack={() => setCurrentPage('home')}
            user={user}
          />
        );

      // 📦 PRODUTOS
      case 'packages':
        return (
          <PackagesPageAtomic 
            onBack={() => setCurrentPage('home')}
          />
        );

      // 📄 INSTITUCIONAIS
      case 'institutional':
        return (
          <InstitutionalPageAtomic 
            onBack={() => setCurrentPage('home')}
          />
        );

      // 🧪 TESTE
      case 'test-atomic-pages':
        return <TestNewAtomicPagesWithBackend />;

      // 🏠 HOME (LANDING PAGE)
      default:
        return (
          <div className="min-h-screen">
            {/* 🎨 HERO SECTION */}
            <HeroSwiper />
            
            {/* 📄 CONTEÚDO PRINCIPAL */}
            <main className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                  Bem-vindo ao ViagemImpacta
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Sua próxima aventura começa aqui!
                </p>
                
                {/* 🎯 NAVEGAÇÃO RÁPIDA */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  
                  <button
                    onClick={() => setCurrentPage('packages')}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-lg transition-colors"
                  >
                    <div className="text-3xl mb-2">📦</div>
                    <h3 className="text-lg font-semibold">Pacotes</h3>
                    <p className="text-sm">Explore destinos incríveis</p>
                  </button>

                  <button
                    onClick={() => setCurrentPage('institutional')}
                    className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-lg transition-colors"
                  >
                    <div className="text-3xl mb-2">🏢</div>
                    <h3 className="text-lg font-semibold">Sobre Nós</h3>
                    <p className="text-sm">Conheça nossa história</p>
                  </button>

                  {user ? (
                    <button
                      onClick={() => setCurrentPage('my-travels')}
                      className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-lg transition-colors"
                    >
                      <div className="text-3xl mb-2">✈️</div>
                      <h3 className="text-lg font-semibold">Minhas Viagens</h3>
                      <p className="text-sm">Gerencie suas reservas</p>
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentPage('login')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg shadow-lg transition-colors"
                    >
                      <div className="text-3xl mb-2">🔐</div>
                      <h3 className="text-lg font-semibold">Entrar</h3>
                      <p className="text-sm">Acesse sua conta</p>
                    </button>
                  )}

                  <button
                    onClick={() => setCurrentPage('test-atomic-pages')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 rounded-lg shadow-lg transition-colors"
                  >
                    <div className="text-3xl mb-2">🧪</div>
                    <h3 className="text-lg font-semibold">Teste</h3>
                    <p className="text-sm">Páginas atômicas</p>
                  </button>

                </div>
              </div>
            </main>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {/* 🌐 HEADER GLOBAL */}
      <Header 
        user={user}
        onNavigateToLogin={() => setCurrentPage('login')}
        onNavigateToRegister={() => setCurrentPage('register')}
        onNavigateToProfile={() => setCurrentPage('profile')}
        onNavigateToHome={() => setCurrentPage('home')}
        onNavigateToPackages={() => setCurrentPage('packages')}
        onNavigateToInstitutional={() => setCurrentPage('institutional')}
        onLogout={() => {
          setUser(null);
          setCurrentPage('home');
        }}
      />

      {/* 📄 CONTEÚDO PRINCIPAL */}
      {renderCurrentPage()}

      {/* 🌐 FOOTER GLOBAL */}
      <Footer />
    </div>
  );
}

export default App;
