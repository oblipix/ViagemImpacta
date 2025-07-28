// 🧬 SECTION - TravelSectionAtomic (Idêntica ao legacy)
// Seção de viagens com cards em Swiper - PARIDADE TOTAL com TravelSection

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Text, Button, Image } from '../atoms';

// Importa os estilos principais do Swiper (igual ao legacy)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TravelSectionAtomic = ({ 
    title = "Nossas Promoções",
    travels = [],
    id,
    className = "",
    onCardClick,
    ...props 
}) => {
    
    // Função para gerar URLs aleatórias (IDÊNTICA ao legacy)
    const generateRandomImageUrl = (id, width = 400, height = 300) => {
        return `https://picsum.photos/id/${id % 1000}/${width}/${height + 150}`;
    };

    return (
        <section id={id} className={`py-8 px-6 bg-white ${className}`} {...props}>
            <div className="container mx-auto">
                <Text variant="h2" className="TitleSection text-3xl font-bold text-gray-800 mb-6">
                    {title}
                </Text>

                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={0} 
                    slidesPerView={1} 
                    navigation 
                    pagination={{ clickable: true }} 
                    scrollbar={{ draggable: true }} 
                    breakpoints={{
                        320: { 
                            slidesPerView: 1, 
                            spaceBetween: 0, 
                        },
                        640: { 
                            slidesPerView: 2, 
                            spaceBetween: 0, 
                        },
                        768: { 
                            slidesPerView: 3, 
                            spaceBetween: 0, 
                        },
                        1024: { 
                            slidesPerView: 4, 
                            spaceBetween: 0, 
                        },
                        1280: { 
                            slidesPerView: 4,
                            spaceBetween: 0,
                        }
                    }}
                    className="mySwiper travel-pagination-bottom" 
                >
                    {(travels || []).map((travel) => (
                        <SwiperSlide key={travel.id}>
                            {/* ESTRUTURA IDÊNTICA AO LEGACY */}
                            <div className="cardSombra bg-white rounded-lg border border-gray-200 p-2 transform transition duration-300 hover:scale-105 max-w-[620px] mx-2 relative h-full flex flex-col">
                                <div className="relative w-full h-92 overflow-hidden rounded-md">
                                    <Image
                                        src={travel.imageUrl || generateRandomImageUrl(travel.id)}
                                        alt={travel.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50"></div> 

                                    <div className="absolute inset-0 p-4 text-white flex flex-col justify-center items-start text-left">
                                        <div>
                                            <Text variant="h3" className="TittleCards">
                                                {travel.title}
                                            </Text>
                                            <Text variant="small" className="text-xs mb-3 line-clamp-2">
                                                {travel.description}
                                            </Text>
                                        </div>
                                        <Button
                                            variant="primary"
                                            className="main-action-button bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm mt-4 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onCardClick) {
                                                    onCardClick(travel.id);
                                                }
                                            }}
                                        >
                                            Ver Detalhes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TravelSectionAtomic;
