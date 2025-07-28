import React, { useState } from 'react';

// 🌐 COMPONENTES GLOBAIS
import HeaderAtomic from './components/HeaderAtomic';
import Footer from './components/Footer';
import HeroSwiper from './components/HeroSwiper';

// 🎯 PÁGINAS ATÔMICAS ATIVAS
import HomePageAtomic from './components/pages/HomePageAtomic';
import LoginPageAtomic from './components/LoginPageAtomic';
import RegisterPageAtomic from './components/RegisterPageAtomic';
import UserProfilePageAtomic from './components/UserProfilePageAtomic';
import ForgotPasswordPageAtomic from './components/ForgotPasswordPageAtomic';
import PackagesPageAtomic from './components/PackagesPageAtomic';
import MyTravelsPageAtomic from './components/MyTravelsPageAtomic';
import InstitutionalPageAtomic from './components/InstitutionalPageAtomic';

// 🧪 FERRAMENTA DE TESTE
import DevApiTestPageAtomic from './components/pages/DevApiTestPageAtomic';

// 🏨 PÁGINA DE DETALHES
import HotelDetailsPageWithBackend from './components/pages/HotelDetailsPageWithBackend';

// 🔍 PÁGINA DE RESULTADOS DE BUSCA
import HotelsSearchResultsPageAtomic from './components/pages/HotelsSearchResultsPageAtomic';

// 🏨 PÁGINA DE TODOS OS HOTÉIS
import HotelsPageAtomic from './components/pages/HotelsPageAtomic';

// 🎉 PÁGINA DE EVENTOS
import EventsPageAtomic from './components/pages/EventsPageAtomic';

// 📝 PÁGINA DE BLOG
import BlogPageAtomic from './components/pages/BlogPageAtomic';

// 📝 PÁGINA DE DETALHES DO POST DO BLOG
import BlogPostDetailsPageAtomic from './components/pages/BlogPostDetailsPageAtomic';

// 🎁 PÁGINA DE DETALHES DA PROMOÇÃO
import PromotionDetailsPageAtomic from './components/pages/PromotionDetailsPageAtomic';

// 💳 PÁGINA DE COMPRA
import PurchasePageAtomic from './components/pages/PurchasePageAtomic';

function App() {
  // 🎯 ESTADO DA APLICAÇÃO
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState(null);
  const [promotionToPurchase, setPromotionToPurchase] = useState(null);

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

      // 🧪 ÁREA DE DESENVOLVIMENTO
      case 'test':
        return <DevApiTestPageAtomic onBack={() => setCurrentPage('home')} />;

      // 🏨 DETALHES DO HOTEL
      case 'hotel-details':
        return (
          <HotelDetailsPageWithBackend 
            hotelId={selectedHotelId}
            onBack={() => setCurrentPage('home')}
            onReserveRoom={(roomData) => {
              console.log('🏨 Reserva solicitada:', roomData);
              // TODO: Implementar navegação para página de reserva
            }}
          />
        );

      // 🔍 RESULTADOS DE BUSCA DE HOTÉIS
      case 'search-results':
        return (
          <HotelsSearchResultsPageAtomic 
            searchParams={searchResults}
            onBack={() => setCurrentPage('home')}
            onHotelSelect={(hotelId) => {
              setSelectedHotelId(hotelId);
              setCurrentPage('hotel-details');
            }}
            onModifySearch={() => setCurrentPage('home')}
          />
        );

      // 🏨 LISTA DE HOTÉIS
      case 'hotels':
        return (
          <HotelsPageAtomic 
            onBack={() => setCurrentPage('home')}
            onHotelClick={(hotelId) => {
              setSelectedHotelId(hotelId);
              setCurrentPage('hotel-details');
            }}
          />
        );

      // 🎉 EVENTOS
      case 'events':
        return (
          <EventsPageAtomic 
            onBack={() => setCurrentPage('home')}
          />
        );

      // 📝 BLOG
      case 'blog':
        return (
          <BlogPageAtomic 
            onBack={() => setCurrentPage('home')}
            onBlogPostClick={(postId) => {
              setSelectedBlogPostId(postId);
              setCurrentPage('blog-post-details');
            }}
          />
        );

      // 📝 DETALHES DO POST DO BLOG
      case 'blog-post-details':
        return (
          <BlogPostDetailsPageAtomic 
            postId={selectedBlogPostId}
            onBack={() => setCurrentPage('blog')}
          />
        );

      // 🎁 DETALHES DA PROMOÇÃO
      case 'promotion-details':
        return (
          <PromotionDetailsPageAtomic 
            promotionId={selectedPromotionId}
            onBack={() => setCurrentPage('home')}
            onPurchase={(promotion) => {
              setPromotionToPurchase(promotion);
              setCurrentPage('purchase');
            }}
          />
        );

      // 💳 PÁGINA DE COMPRA
      case 'purchase':
        return (
          <PurchasePageAtomic 
            promotionToPurchase={promotionToPurchase}
            onBack={() => setCurrentPage('promotion-details')}
          />
        );

      // 🏠 HOME (LANDING PAGE)
      default:
        return (
          <HomePageAtomic 
            onNavigateToInstitutional={() => setCurrentPage('institutional')}
            onNavigateToMyTravels={() => setCurrentPage('my-travels')}
            onNavigateToTest={() => setCurrentPage('test')}
            onHotelClick={(hotelId) => {
              setSelectedHotelId(hotelId);
              setCurrentPage('hotel-details');
            }}
            onHotelSearch={(searchData) => {
              console.log('🔍 Busca de hotéis realizada:', searchData);
              setSearchResults(searchData);
              setCurrentPage('search-results');
            }}
            onPromotionClick={(promotionId) => {
              setSelectedPromotionId(promotionId);
              setCurrentPage('promotion-details');
            }}
          />
        );
    }
  };

  return (
    <div className="App">
      {/* 🌐 HEADER GLOBAL */}
      <HeaderAtomic 
        currentPage={currentPage}
        onNavigateToHome={() => setCurrentPage('home')}
        onNavigateToInstitutional={() => setCurrentPage('institutional')}
        onNavigateToMyTravels={() => setCurrentPage('my-travels')}
        onNavigateToTest={() => setCurrentPage('test')}
        onNavigateToTestAtomic={() => setCurrentPage('test')}
        onNavigateToComponentsTest={() => setCurrentPage('test')}
      />

      {/* 📄 CONTEÚDO PRINCIPAL */}
      {renderCurrentPage()}

      {/* 🌐 FOOTER GLOBAL */}
      <Footer />
    </div>
  );
}

export default App;
