// src/components/hotels/PromocoesDestaque.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePromotions } from '../../hooks/usePromotions.js';
import PromotionsCard from '../../Promotions/PromotionsCard.jsx';

// Importa Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PromocoesDestaque = () => {
    const { promotions, loading, error } = usePromotions();

    // Exibe loading se estiver carregando promoções
    if (loading) {
        return (
            <section id="promocoes-destaque" className="py-2 sm:py-12 lg:py-16 bg-white px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Carregando promoções...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="promocoes-destaque" className="py-1 sm:py-2 lg:py-3 bg-white px-2 sm:px-3 lg:px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center py-8">
                        <p className="text-red-600">Erro ao carregar promoções</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!promotions || promotions.length === 0) {
        return (
            <section id="promocoes-destaque" className="py-1 sm:py-2 lg:py-3 bg-white px-2 sm:px-3 lg:px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="section-title">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                            Promoções em <span className="text-blue-600">Destaque</span>
                        </h2>
                    </div>
                    <div className="text-center py-8">
                        <p className="text-gray-600">Nenhuma promoção disponível no momento.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="promocoes-destaque" className="py-1 sm:py-2 lg:py-3 bg-white px-2 sm:px-3 lg:px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="section-title">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                        Promoções em <span className="text-blue-600">Destaque</span>
                    </h2>
                </div>
                <div className="flex justify-end mb-6 sm:mb-8">
                    <Link to="/promocoes" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center text-sm sm:text-base">
                        Ver todas
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>

                {/* Mobile Swiper - visível apenas em telas pequenas */}
                <div className="block md:hidden px-4">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={1.1}
                        centeredSlides={true}
                        pagination={{
                            clickable: true,
                            el: '.promocoes-swiper-pagination'
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.3,
                                spaceBetween: 24,
                                centeredSlides: true,
                            },
                        }}
                        className="py-4 overflow-visible"
                        style={{ overflow: 'visible' }}
                    >
                        {promotions.slice(0, 3).map(promotion => (
                            <SwiperSlide key={promotion.id}>
                                <div className="relative w-full px-2">
                                    <PromotionsCard promotion={promotion} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Apenas paginação centralizada */}
                    <div className="promocoes-swiper-pagination flex justify-center mt-6"></div>
                </div>

                {/* Desktop Grid - visível apenas em telas médias e grandes */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12 cards-grid px-2 sm:px-4 lg:px-8 py-4">
                    {promotions.slice(0, 3).map(promotion => (
                        <div key={promotion.id} className="relative card-spacing w-full">
                            <PromotionsCard promotion={promotion} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromocoesDestaque;
