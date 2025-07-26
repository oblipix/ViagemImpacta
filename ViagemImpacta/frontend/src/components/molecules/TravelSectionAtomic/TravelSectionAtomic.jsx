import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { SectionTitle, TravelCard } from '../../atoms';

// Importa os estilos principais do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../components/TravelSection.css'; 

// 🧬 MOLECULE - TravelSectionAtomic
// Esta molécula reproduz exatamente a TravelSection do legacy usando átomos
const TravelSectionAtomic = ({ 
    title, 
    travels, 
    id, 
    className = '', 
    onCardClick 
}) => {
    const generateRandomImageUrl = (id, width = 400, height = 300) => {
        return `https://picsum.photos/id/${id % 1000}/${width}/${height + 150}`;
    };

    return (
        <section id={id} className={`py-8 px-6 bg-white ${className}`}>
            <div className="container mx-auto">
                <SectionTitle>{title}</SectionTitle>

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
                    {travels.map((travel) => (
                        <SwiperSlide key={travel.id}>
                            <TravelCard
                                travel={travel}
                                onCardClick={onCardClick}
                                generateRandomImageUrl={generateRandomImageUrl}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TravelSectionAtomic;
