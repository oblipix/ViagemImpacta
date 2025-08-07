/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotels } from '../hooks/useHotels.js';
import { useAuth } from '../context/AuthContext.jsx';
import { reviewService } from '../../services/reviewService';
import ImageModal from '../common/ImageModal.jsx';
import ReservationModal from '../modals/ReservationModal.jsx';
import { Icons } from '../layout/Icons.jsx';
import '../styles/HotelDetailsPage.css';


// Importa o carrossel e seus estilos
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




// Componente para renderizar estrelas de avaliação
const RatingDisplay = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <Icons.Star key={`full-${i}`} className="w-5 h-5 text-yellow-400" />)}
            {[...Array(emptyStars)].map((_, i) => <Icons.Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)}
        </div>
    );
};


// Componente personalizado para ícone de xícara (café/restaurante)
const CoffeeIcon = () => (
    <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8h1a4 4 0 110 8h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Componente personalizado para ícone de vassoura (serviço de quarto/limpeza)
const BroomIcon = () => (
    <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 22h14M12 18v4M5 9l7-7 7 7M9 9v4m6-4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13h8v5a2 2 0 01-2 2h-4a2 2 0 01-2-2v-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Componente personalizado para ícone de flor (jardim)
const FlowerIcon = () => (
    <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C12 4 9 1 4 1C4 6 6 9 6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4C12 4 15 1 20 1C20 6 18 9 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4C12 4 9 7 9 12C4 12 1 15 1 20C6 20 9 18 9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4C12 4 15 7 15 12C20 12 23 15 23 20C18 20 15 18 15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Componente personalizado para ícone de pet (pet friendly)
const PetIcon = () => (
    <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9.5C8.1 9.5 9 8.6 9 7.5C9 6.4 8.1 5.5 7 5.5C5.9 5.5 5 6.4 5 7.5C5 8.6 5.9 9.5 7 9.5Z" stroke="currentColor" strokeWidth="2" />
        <path d="M17 9.5C18.1 9.5 19 8.6 19 7.5C19 6.4 18.1 5.5 17 5.5C15.9 5.5 15 6.4 15 7.5C15 8.6 15.9 9.5 17 9.5Z" stroke="currentColor" strokeWidth="2" />
        <path d="M7 19.5C8.1 19.5 9 18.6 9 17.5C9 16.4 8.1 15.5 7 15.5C5.9 15.5 5 16.4 5 17.5C5 18.6 5.9 19.5 7 19.5Z" stroke="currentColor" strokeWidth="2" />
        <path d="M17 19.5C18.1 19.5 19 18.6 19 17.5C19 16.4 18.1 15.5 17 15.5C15.9 15.5 15 16.4 15 17.5C15 18.6 15.9 19.5 17 19.5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
);

// Mapeamento de nomes de comodidades para componentes de ícone
const leisureIconMap = {
    'Piscina': Icons.Pool,
    'Academia': Icons.Gym,
    'Spa': Icons.Spa,
    'Sauna': Icons.Sauna,
    'Sala de Cinema': Icons.Cinema,
    'Cinema': Icons.Cinema,
    'Teatro': Icons.Cinema,
    'Bar': Icons.Bar,
    'Bar na piscina': Icons.Bar,
    'Restaurante': CoffeeIcon,
    'Jardim': FlowerIcon,
    'Jardim Amplo': FlowerIcon,
    'Salão de Jogos': Icons.Saloon,
    'Área Kids': Icons.KidsArea,
    'Piscina Aquecida': Icons.Pool,
    'Jacuzzi': Icons.Spa,
    'Área de Lazer': Icons.KidsArea,
    'Áreas Comuns': Icons.KidsArea,
    'Sala de Arte': Icons.ArtRoom,
    'Salão': Icons.Lounge,
    'Lounge': Icons.Lounge,
    'Sala de Reuniões': Icons.Lounge,
    'Business Center': Icons.Lounge,
    'Salão de Festas': Icons.Lounge,
    'Wi-Fi Grátis': Icons.Wifi,
    'Wi-Fi': Icons.Wifi,
    'Internet': Icons.Wifi,
    'Estacionamento': Icons.TotalRooms,
    'Estacionamento Grátis': Icons.TotalRooms,
    'Serviço de Quarto': BroomIcon,
    'Acessibilidade': Icons.User,
    'Pet Friendly': PetIcon,
    'Aceita Animais': PetIcon,
    'Aceita Pets': PetIcon,
    'Café da Manhã Incluso': CoffeeIcon,
    'Café da Manhã': CoffeeIcon,
    'Recepção 24h': Icons.User,
    'Recepção': Icons.User,
    'Serviço de Limpeza': Icons.RoomType,
    'Limpeza diária': Icons.RoomType,
    'Elevador': Icons.Elevator,
    'Elevadores': Icons.Elevator,
    'Ar-Condicionado': Icons.Wifi,
    'Frigobar': Icons.Bar,
    'Cofre': Icons.RoomType,
    'Vista para o Mar': Icons.Location,
    'Serviço de Concierge': Icons.User,
    'Concierge': Icons.User,
    'estacionamento': Icons.TotalRooms,
    'restaurante': CoffeeIcon,
    'quarto': Icons.RoomType,
    'serviço': BroomIcon,
    'cafe': CoffeeIcon,
    'café': CoffeeIcon,
    'jardim': FlowerIcon,
    'piscina': Icons.Pool,
    'wi-fi': Icons.Wifi,
    'wifi': Icons.Wifi,
    'pet': PetIcon,
    'animais': PetIcon
};


function HotelDetailsPage() {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const { getHotelById } = useHotels();
    const { isLoggedIn, currentUser } = useAuth();

    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [initialImageId, setInitialImageId] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState(null);

    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);


    useEffect(() => {
        const loadHotel = async () => {
            try {
                setLoading(true);
                const hotelData = await getHotelById(parseInt(hotelId));
                setHotel(hotelData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        if (hotelId) {
            loadHotel();
        }
    }, [hotelId, getHotelById]);

    const loadReviews = async () => {
        if (!hotelId || !isLoggedIn) return;

        try {
            setReviewsLoading(true);
            setReviewsError(null);
            const reviewData = await reviewService.getHotelReviews(parseInt(hotelId));

            const reviewsArray = reviewData.reviews || [];


            setReviews(reviewsArray);
        } catch (error) {
            console.error('Erro ao carregar reviews:', error);
            setReviewsError('Erro ao carregar avaliações');
            setReviews([]);
        } finally {
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        if (hotel && isLoggedIn) {
            loadReviews();
        }
    }, [hotel, isLoggedIn, hotelId]);

    if (loading) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando hotel...</p>
            </div>
        );
    }


    if (error || !hotel) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <h2 className="text-2xl font-bold">Hotel não encontrado.</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button onClick={() => navigate('/hoteis')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md">
                    Ver todos os Hotéis
                </button>
            </div>
        );
    }


    const handleImageClick = (imagesArray, clickedImageId) => {
        setModalImages(imagesArray);
        setInitialImageId(clickedImageId);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleReserveRoom = (room) => {
        if (!isLoggedIn) {
            alert('Você precisa estar logado para fazer uma reserva. Redirecionando para o login...');
            navigate('/login');
            return;
        }
        setSelectedRoom(room);
        setIsReservationModalOpen(true);
    };

    const handleCloseReservationModal = () => {
        setIsReservationModalOpen(false);
        setSelectedRoom(null);
    };

    const handleReservationSuccess = (reservation) => {
        alert(`Reserva criada com sucesso! ID: ${reservation.id}`);
        console.log('Reserva criada:', reservation);
    };

    // CORREÇÃO: Lógica do carrossel refeita para ser dinâmica e robusta.
    const numReviews = reviews.length;
    const slidesToShowDesktop = Math.min(numReviews, 2);
    const slidesToShowTablet = Math.min(numReviews, 2);
    const slidesToShowMobile = 1;

    const sliderSettings = {
        dots: true,
        speed: 500,
        infinite: numReviews > slidesToShowMobile,
        arrows: numReviews > slidesToShowMobile,
        slidesToShow: slidesToShowMobile,
        slidesToScroll: 1,
        autoplay: numReviews > 1,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesToShowDesktop,
                    slidesToScroll: 1,
                    infinite: numReviews > slidesToShowDesktop,
                    arrows: numReviews > slidesToShowDesktop,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: slidesToShowTablet,
                    slidesToScroll: 1,
                    infinite: numReviews > slidesToShowTablet,
                    arrows: numReviews > slidesToShowTablet,
                }
            }
        ]
    };


    return (
        <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
            <button onClick={() => navigate(-1)} className="main-action-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 sm:px-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mb-6 sm:mb-8 text-sm sm:text-base">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Voltar
            </button>


            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                    <img
                        src={hotel.mainImageUrl}
                        alt={hotel.title}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover cursor-pointer"
                        onClick={() => handleImageClick(hotel.galleryImages || [], hotel.galleryImages?.[0]?.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
                        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-lg">
                            {hotel.title}
                        </h1>
                        <p className="text-white text-base sm:text-lg md:text-xl mb-4 flex items-center">
                            <Icons.Location className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            <span>{hotel.location}</span>
                        </p>
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <div className="bg-blue-50 border-l-4 border-blue-600 text-gray-800 leading-relaxed p-4 sm:p-6 rounded-r-lg mb-6 sm:mb-8 shadow-sm">
                        <h3 className="text-blue-800 font-semibold mb-2 text-sm sm:text-base">Sobre o hotel</h3>
                        <p className="text-sm sm:text-base">{hotel.description}</p>
                    </div>


                    {hotel.galleryImages && hotel.galleryImages.length > 0 && (
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                Galeria de Fotos
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                                {hotel.galleryImages.map(img => (
                                    <div key={img.id} className="overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        <img
                                            src={img.url}
                                            alt={img.alt}
                                            className="w-full h-32 sm:h-40 object-cover cursor-pointer"
                                            onClick={() => handleImageClick(hotel.galleryImages, img.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    <div className="my-6 sm:my-8 py-4 sm:py-6 border-t border-b border-gray-200">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            O que o hotel oferece
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-gray-700">
                            {hotel.leisureFacilities.map((facility, index) => {
                                let IconComponent = leisureIconMap[facility.toLowerCase()] || leisureIconMap[facility] || Icons.User;
                                return (
                                    <div key={index} className="flex items-center bg-gray-100 border border-gray-200 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300">
                                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
                                        <span className="font-medium text-sm sm:text-base truncate">{facility}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    {hotel.roomOptions?.length > 0 && (
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                Opções de Quartos
                            </h2>
                            <div className="space-y-4 sm:space-y-6">
                                {hotel.roomOptions.map((room, index) => (
                                    <div key={room.id || index} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row justify-between items-start lg:items-center group">
                                        <div className="flex-1 mb-4 lg:mb-0">
                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">{room.type}</h3>
                                            <p className="text-gray-600 text-sm mt-2">{room.description}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Café da manhã</span>
                                                <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Wi-Fi grátis</span>
                                                <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Café da manhã</span>
                                                <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Wi-Fi grátis</span>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-auto lg:ml-6 flex flex-col lg:flex-col items-center lg:items-end">
                                            <div className="bg-blue-600 text-white font-bold text-lg sm:text-xl lg:text-2xl px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl mb-3 shadow-md">
                                                R$ {room.price.toFixed(2).replace('.', ',')}
                                            </div>
                                            <button onClick={() => handleReserveRoom(room)} className={`reservation-button font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base w-full lg:w-auto ${isLoggedIn ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 hover:bg-gray-500 text-white'}`}>
                                                {isLoggedIn ? 'Reservar' : 'Fazer Login para Reservar'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {isLoggedIn && (
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                Avaliações dos Hóspedes
                                {reviews.length > 0 && (
                                    <span className="ml-2 text-sm text-gray-500">({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})</span>
                                )}
                            </h2>

                            {reviewsLoading ? (
                                <div className="bg-gray-50 rounded-lg p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div><p className="text-gray-600">Carregando avaliações...</p></div>
                            ) : reviewsError ? (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4"><p className="text-red-600">{reviewsError}</p></div>
                            ) : reviews.length > 0 ? (
                                <div className="bg-gray-50 rounded-lg sm:rounded-2xl overflow-visible p-4 sm:p-6 md:p-8">
                                    <Slider {...sliderSettings}>
                                        {reviews.map(review => (
                                            <div key={review.reviewID} className="p-2 sm:p-4">
                                                <div className="feedback-bubble">
                                                    <div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                                                            <RatingDisplay rating={review.rating} />
                                                            <span className="text-xs sm:text-sm font-semibold text-gray-700 bg-blue-50 py-1 px-2 sm:px-3 rounded-full self-start sm:self-auto">Hóspede Verificado</span>
                                                        </div>
                                                        <p className="text-gray-600 italic text-sm sm:text-base leading-relaxed">"{review.comment}"</p>
                                                    </div>
                                                    <div className="text-right mt-3 sm:mt-4">
                                                        <span className="text-xs text-gray-400">
                                                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-lg p-8 text-center">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                    </svg>
                                    <p className="text-gray-600">Este hotel ainda não possui avaliações.</p>
                                    <p className="text-gray-500 text-sm mt-2">Seja o primeiro a avaliar!</p>
                                </div>
                            )}
                        </div>
                    )}


                    {!isLoggedIn && (
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                Avaliações dos Hóspedes
                            </h2>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                                <svg className="w-12 h-12 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                <p className="text-blue-800 font-medium mb-2">Faça login para ver as avaliações</p>
                                <p className="text-blue-600 text-sm">As avaliações reais dos hóspedes estão disponíveis apenas para usuários logados.</p>
                                <button onClick={() => navigate('/login')} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">Fazer Login</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {isModalOpen && (
                <ImageModal
                    images={modalImages}
                    initialImageId={initialImageId}
                    onClose={handleCloseModal}
                />
            )}

            {isReservationModalOpen && selectedRoom && (
                <ReservationModal
                    isOpen={isReservationModalOpen}
                    onClose={handleCloseReservationModal}
                    hotel={hotel}
                    room={selectedRoom}
                    onSuccess={handleReservationSuccess}
                />
            )}
        </div>
    );
}

export default HotelDetailsPage;

