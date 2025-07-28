import React from 'react';
import HeroSwiper from '../HeroSwiper';
import TravelSectionAtomic from '../sections/TravelSectionAtomic';
import RecommendedHotelsSectionAtomic from '../sections/RecommendedHotelsSectionAtomic';
import BlogSectionAtomic from '../sections/BlogSectionAtomic';
import HotelsMapSectionAtomic from '../sections/HotelsMapSectionAtomic';
import NewsletterSectionAtomic from '../sections/NewsletterSectionAtomic';
import { Button } from '../atoms';
import { useHomePageData } from '../../hooks/useHomePageData';

function HomePageAtomic({
  onNavigateToInstitutional = () => {},
  onNavigateToMyTravels = () => {},
  onNavigateToTest = () => {}
}) {
  // 📡 CARREGAR DADOS DO BACKEND + MOCK
  const { hotels, packages, blogPosts, mapHotels, loading, error } = useHomePageData();

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando dados da homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ⚠️ ERROR BANNER (se houver falha parcial) */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* 🎨 HERO SECTION */}
      <HeroSwiper />
      
      {/* 🧭 TRAVEL SECTION - Busca e destinos */}
      <TravelSectionAtomic packages={packages} />
      
      {/* 🏨 HOTÉIS RECOMENDADOS */}
      <RecommendedHotelsSectionAtomic hotels={hotels} />
      
      {/* 📝 BLOG SECTION */}
      <BlogSectionAtomic posts={blogPosts} />
      
      {/* 🗺️ MAPA DE HOTÉIS */}
      <HotelsMapSectionAtomic hotels={mapHotels} />
      
      {/* 📧 NEWSLETTER */}
      <NewsletterSectionAtomic />
      
      {/* 🎯 NAVEGAÇÃO RÁPIDA - Seção adicional */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Explore Nossas Funcionalidades
            </h2>
            <p className="text-xl text-gray-600">
              Descubra tudo que o ViagemImpacta tem a oferecer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            <Button
              onClick={onNavigateToInstitutional}
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-lg transition-colors h-auto flex flex-col items-center"
            >
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="text-lg font-semibold mb-2">Sobre Nós</h3>
              <p className="text-sm opacity-90">Conheça nossa história</p>
            </Button>

            <Button
              onClick={onNavigateToMyTravels}
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-lg transition-colors h-auto flex flex-col items-center"
            >
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="text-lg font-semibold mb-2">Minhas Viagens</h3>
              <p className="text-sm opacity-90">Gerencie suas reservas</p>
            </Button>

            <Button
              onClick={onNavigateToTest}
              className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 rounded-lg shadow-lg transition-colors h-auto flex flex-col items-center"
            >
              <div className="text-4xl mb-3">🧪</div>
              <h3 className="text-lg font-semibold mb-2">Teste</h3>
              <p className="text-sm opacity-90">Páginas atômicas</p>
            </Button>

          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePageAtomic;
