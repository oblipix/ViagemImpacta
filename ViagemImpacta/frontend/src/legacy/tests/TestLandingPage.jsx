import React, { useState } from 'react';
import { Button, Text, Card } from './atoms';
import { HotelsSearchFormAtomic, TravelCard, EventReservationFormAtomic, HeaderAtomic, FooterAtomic, HeroAtomic, FilterBarAtomic, TravelSectionAtomic, RecommendedHotelsSectionAtomic, BlogSectionAtomic, NewsletterSectionAtomic, HotelsMapSectionAtomic } from './molecules';
import { HotelList } from './sections';

// 🎯 NOVA LANDING PAGE - 100% ARQUITETURA ATÔMICA
const TestLandingPage = ({ 
    allHotelsData, 
    allPromotionalTravels, 
    blogPosts = [],
    onHotelSearch,
    onPromotionClick,
    onBlogPostClick,
    onBlogCategoryClick,
    onHotelSelectFromMap, // Nova prop para o mapa
    isMapLoaded = false, // Nova prop para o estado do mapa
    onNavigateToComponentsTest,
    onNavigateToHome,
    onNavigateToInstitutional,
    onNavigateToMyTravels,
    currentPage = 'atomic-landing'
}) => {
    const [testMode, setTestMode] = useState(true);
    const [showEventForm, setShowEventForm] = useState(false);
    const [activeFilter, setActiveFilter] = useState('promos'); // Estado para o filtro ativo

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 🚨 INDICADOR DE TESTE */}
            {testMode && (
                <div className="bg-green-500 text-white text-center py-2 px-4 relative">
                    <Text variant="small" className="font-bold">
                        🧪 MODO TESTE - Nova Arquitetura Atômica | 
                        <button 
                            onClick={() => setTestMode(false)}
                            className="ml-2 underline hover:no-underline"
                        >
                            Ocultar Aviso
                        </button>
                    </Text>
                </div>
            )}

            {/* 🧬 HEADER ATÔMICO - Usando a nova molecule */}
            <HeaderAtomic
                onNavigateToHome={onNavigateToHome}
                onNavigateToInstitutional={onNavigateToInstitutional}
                onNavigateToMyTravels={onNavigateToMyTravels}
                onNavigateToTestAtomic={onNavigateToComponentsTest}
                onNavigateToComponentsTest={onNavigateToComponentsTest}
                currentPage={currentPage}
            />

            {/* 🧬 HERO ATÔMICO - Idêntico ao HeroSwiper legacy */}
            <HeroAtomic />

            {/* 🧬 FILTER BAR ATÔMICA - Idêntica à barra de filtros legacy (ACIMA do form como no legacy) */}
            <FilterBarAtomic
                activeFilter={activeFilter}
                onSelectPromos={() => setActiveFilter('promos')}
                onSelectRecommended={() => setActiveFilter('recommended')}
                onNavigateToHotels={() => setActiveFilter('hotels')}
                onNavigateToEvents={() => setActiveFilter('events')}
            />

            {/* 🎯 SEARCH FORM COM NOVA ESTRUTURA DE SOBREPOSIÇÃO */}
            <HotelsSearchFormAtomic 
                onSearch={onHotelSearch} 
                allHotelsData={allHotelsData}
            />

            {/* 🎯 SEÇÃO DE PROMOÇÕES ATÔMICA - Usando TravelSectionAtomic */}
            <TravelSectionAtomic
                id="viagens-promocao"
                title="Nossas Promoções"
                travels={allPromotionalTravels}
                onCardClick={onPromotionClick}
                className=""
            />

            {/* 🎯 TESTE DO FORMULÁRIO DE EVENTOS */}
            <section className="py-8 px-6 bg-gray-50">
                <div className="container mx-auto text-center">
                    <Button 
                        variant="secondary"
                        onClick={() => setShowEventForm(true)}
                        className="px-8 py-3"
                    >
                        🎉 Teste do Formulário de Eventos Atômico
                    </Button>
                </div>
            </section>

            {/* 🎯 SEÇÃO DE HOTÉIS RECOMENDADOS ATÔMICA - Usando RecommendedHotelsSectionAtomic */}
            <RecommendedHotelsSectionAtomic
                hotels={allHotelsData}
                onHotelClick={(hotelId) => console.log('Hotel clicked:', hotelId)}
                title="Hotéis Mais Avaliados"
                maxHotels={3}
            />

            {/* 🎯 SEÇÃO DE BLOG ATÔMICA - Usando BlogSectionAtomic */}
            <BlogSectionAtomic
                id="dicas-de-viagem"
                title="Dicas de Viagem: Prepare sua Aventura!"
                posts={blogPosts}
                onCardClick={onBlogPostClick || ((postId) => console.log('Blog post clicked:', postId))}
                onCategoryClick={onBlogCategoryClick || ((category) => console.log('Category clicked:', category))}
                maxPosts={4}
            />

            {/* 🎯 SEÇÃO DE MAPA ATÔMICA - Usando HotelsMapSectionAtomic */}
            <HotelsMapSectionAtomic 
                hotels={allHotelsData}
                onHotelSelect={onHotelSelectFromMap || ((hotel) => console.log('Hotel selected from map:', hotel))}
                isLoaded={isMapLoaded}
            />

            {/* 🎯 SEÇÃO DE NEWSLETTER ATÔMICA - Usando NewsletterSectionAtomic */}
            <NewsletterSectionAtomic />

            {/* 🧬 FOOTER ATÔMICO - Usando a nova molecule */}
            <FooterAtomic
                navigateToLegacy={onNavigateToHome}
                onNavigateToHotels={() => console.log('Navigate to hotels')}
                onSelectPromos={() => console.log('Navigate to promos')}
                onNavigateToEvents={() => console.log('Navigate to events')}
                onNavigateToMyTravels={onNavigateToMyTravels}
                onNavigateToInstitutional={onNavigateToInstitutional}
                onNavigateToBlog={() => console.log('Navigate to blog')}
                isLoaded={false}
            />

            {/* 🎯 FORMULÁRIO DE EVENTOS ATÔMICO */}
            <EventReservationFormAtomic 
                isOpen={showEventForm}
                onClose={() => setShowEventForm(false)}
            />
        </div>
    );
};

export default TestLandingPage;
