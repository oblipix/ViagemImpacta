// src/components/pages/PromocoesPage.jsx

import React from 'react';
import { usePromotions } from '../hooks/usePromotions.js';
import PromotionsCard from './PromotionsCard.jsx';
import ScrollReveal from '../components/common/ScrollReveal.jsx';
import AnimatedSection from '../components/common/AnimatedSection.jsx';
import AnimatedHotelCard from '../components/common/AnimatedHotelCard.jsx';

function PromocoesPage() {
    const { promotions: promocoes, loading, error } = usePromotions();

    if (loading) {
        return (
            <div className="bg-white py-12 px-6">
                <div className="container mx-auto">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Carregando promoções...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-50 py-12 px-6">
                <div className="container mx-auto">
                    <div className="text-center py-20">
                        <div className="bg-red-100 p-4 rounded-lg">
                            <p className="text-red-600 text-lg">Erro ao carregar promoções. Por favor, tente novamente mais tarde.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12 px-6">
            <div className="container mx-auto">
                <ScrollReveal animation="fadeUp" delay={200}>
                    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Promoções <span className="text-blue-600">Especiais</span>
                        </h1>
                        <p className="text-gray-600">
                            Aproveite nossas melhores ofertas e economize em sua próxima viagem!
                        </p>
                    </div>
                </ScrollReveal>

                {promocoes.length === 0 ? (
                    <ScrollReveal animation="fadeUp" delay={400}>
                        <div className="text-center py-12 bg-white shadow-md rounded-lg">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a3 3 0 100-6 3 3 0 000 6z"></path>
                            </svg>
                            <p className="text-gray-500 text-xl">Nenhuma promoção disponível no momento.</p>
                            <p className="text-gray-400 mt-2">Volte em breve para conferir novas ofertas!</p>
                        </div>
                    </ScrollReveal>
                ) : (
                    <>
                        <ScrollReveal animation="slideLeft" delay={400}>
                            <div className="mb-8 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                <p className="text-blue-800">
                                    <span className="font-bold">{promocoes.length}</span> promoções especiais encontradas. Aproveite essas ofertas imperdíveis!
                                </p>
                            </div>
                        </ScrollReveal>

                        <AnimatedSection animation="fadeUp" delay={600}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {promocoes.map((promotion, index) => (
                                    <AnimatedHotelCard key={promotion.id} index={index}>
                                        <div className="relative">
                                            {/* Badge de promoção */}
                                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold z-10 shadow-lg transform rotate-12">
                                                -{promotion.discountPercent}%
                                            </div>
                                            <PromotionsCard promotion={promotion} />
                                        </div>
                                    </AnimatedHotelCard>
                                ))}
                            </div>
                        </AnimatedSection>
                    </>
                )}
            </div>
        </div>
    );
}

export default PromocoesPage;
