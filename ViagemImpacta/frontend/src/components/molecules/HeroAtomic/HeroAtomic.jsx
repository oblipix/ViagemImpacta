import React from 'react';
import { Carousel, HeroSlide } from '../../atoms';
import { SwiperSlide } from 'swiper/react';
import restauranteImage from '../../../assets/images/restaurantePE.png';
import entradaprincipalImage from '../../../assets/images/entradaprincipalPE.png';
import piscinaImageRJ from '../../../assets/images/piscinaRJ.png';
import cinemalRSImage from '../../../assets/images/salacinemaRS.png';
import piscinaGAImage from '../../../assets/images/piscinaGA.png';

// 🧬 MOLECULAR COMPONENT - HeroAtomic
const HeroAtomic = ({
    slides,
    autoplay = true,
    delay = 5000,
    effect = "fade",
    pagination = true,
    loop = true,
    className = "",
    ...props
}) => {
    // Dados padrão dos slides (idênticos ao HeroSwiper original)
    const defaultSlides = [
        {
            id: 1,
            imageUrl: entradaprincipalImage,
            title: 'Sua Próxima Viagem Começa Aqui.',
            subtitle: 'Ofertas exclusivas para explorar o mundo sem sair de casa.',
        },
        {
            id: 2,
            imageUrl: restauranteImage,
            title: 'Aventura Inesquecível Espera por Você!',
            subtitle: 'Descubra destinos paradisíacos e paisagens de tirar o fôlego.',
        },
        {
            id: 3,
            imageUrl: piscinaImageRJ,
            title: 'Relaxe e Desconecte-se.',
            subtitle: 'Pacotes de viagem completos para você aproveitar cada momento.',
        },
        {
            id: 4,
            imageUrl: cinemalRSImage,
            title: 'Entretenimento de Primeira Classe.',
            subtitle: 'Desfrute de sessões de cinema privativas com toda a qualidade que você merece.',
        },
        {
            id: 5,
            imageUrl: piscinaGAImage,
            title: 'Oásis de Lazer e Relaxamento.',
            subtitle: 'Mergulhe em momentos inesquecíveis na nossa piscina, perfeita para toda a família.',
        },
    ];

    const heroSlides = slides || defaultSlides;

    return (
        <Carousel
            autoplay={autoplay}
            delay={delay}
            effect={effect}
            pagination={pagination}
            loop={loop}
            className={className}
            {...props}
        >
            {heroSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <HeroSlide
                        imageUrl={slide.imageUrl}
                        title={slide.title}
                        subtitle={slide.subtitle}
                        alignment="left"
                    />
                </SwiperSlide>
            ))}
        </Carousel>
    );
};

export default HeroAtomic;
