import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// 🎯 ATOMIC COMPONENT - Carousel
const Carousel = ({ 
    children,
    slides = [],
    autoplay = true,
    delay = 5000,
    effect = "fade",
    pagination = true,
    loop = true,
    className = "",
    height = "h-[60vh] md:h-[80vh] lg:h-[90vh]",
    ...props 
}) => {
    const swiperConfig = {
        modules: [Autoplay, Pagination, EffectFade, A11y],
        spaceBetween: 0,
        slidesPerView: 1,
        effect,
        loop,
        ...(autoplay && {
            autoplay: {
                delay,
                disableOnInteraction: false,
            }
        }),
        ...(pagination && {
            pagination: { clickable: true }
        })
    };

    const combinedClassName = `w-full ${height} text-white pb-12 hero-swiper-pagination ${className}`;

    return (
        <Swiper
            {...swiperConfig}
            className={combinedClassName}
            {...props}
        >
            {children || slides.map((slide, index) => (
                <SwiperSlide key={slide.id || index}>
                    {slide}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
