import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { promotionService } from '../../services/promotionService.js';
import { hotelService } from '../../services/hotelService.js';
import ReservationModal from '../modals/ReservationModal.jsx';
import { Icons } from '../layout/Icons.jsx';
import ScrollReveal from '../common/ScrollReveal.jsx';
import '../styles/HotelDetailsPage.css';

// --- COMPONENTES E FUNÇÕES AUXILIARES ---
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

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
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
    // Amenidades de lazer
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
    
    // Serviços
    'Wi-Fi Grátis': Icons.Wifi,
    'Wi-Fi': Icons.Wifi,
    'Internet': Icons.Wifi,
    'Estacionamento': Icons.TotalRooms, 
    'Estacionamento Grátis': Icons.TotalRooms,
    'Serviço de Quarto': BroomIcon, 
    'Café da Manhã Incluso': CoffeeIcon,
    'Room Service': BroomIcon,
    'Limpeza': BroomIcon,
    'Acessibilidade': Icons.User,
    'Pet Friendly': PetIcon,
    'Pet': PetIcon,
    'Animais Permitidos': PetIcon,
};
// --- FIM DOS AUXILIARES ---

const PromotionDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, currentUser } = useAuth();
    
    const [promotion, setPromotion] = useState(null);
    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Estados para o modal de reserva
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const loadPromotion = async () => {
            try {
                setLoading(true);
                // Buscar a promoção por ID da API
                const promotionData = await promotionService.getPromotionById(parseInt(id));
                
                console.log('Dados brutos da API:', promotionData);
                console.log('BannerPromotion no dado bruto:', promotionData.bannerPromotion || promotionData.BannerPromotion);
                
                // Usar apenas os dados formatados da API, sem adicionar dados fictícios
                const formattedPromotion = promotionService.formatPromotionData(promotionData);
                
                console.log('Dados formatados:', formattedPromotion);
                console.log('BannerPromotion formatado:', formattedPromotion.bannerPromotion);
                
                setPromotion(formattedPromotion);

                // Buscar dados do hotel se disponível
                if (promotionData.hotel?.hotelId || promotionData.hotelId) {
                    try {
                        const hotelId = promotionData.hotel?.hotelId || promotionData.hotelId;
                        const hotelInfo = await hotelService.getHotelById(hotelId);
                        console.log('Dados do hotel:', hotelInfo);
                        setHotelData(hotelInfo);
                    } catch (hotelError) {
                        console.warn('Não foi possível carregar dados do hotel:', hotelError);
                    }
                }
            } catch (err) {
                console.error('Erro ao carregar promoção:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadPromotion();
        }
    }, [id]);

    // Handlers para o modal de reserva
    const handleReserveRoom = (room) => {
        if (!isLoggedIn) {
            alert('Você precisa estar logado para fazer uma reserva. Redirecionando para o login...');
            navigate('/login');
            return;
        }

        console.log('Selected room data:', room);
        console.log('Promotion data:', promotion);
        console.log('Current user:', currentUser);
        console.log('Promotion dates to pass to modal:', {
            checkIn: formatDateForInput(promotion.checkIn),
            checkOut: formatDateForInput(promotion.checkOut)
        });

        setSelectedRoom(room);
        setIsReservationModalOpen(true);
    };

    const handleCloseReservationModal = () => {
        setIsReservationModalOpen(false);
        setSelectedRoom(null);
    };

    // Helper function to format date for input
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        
        console.log('Original date string:', dateString);
        
        // Se já está no formato YYYY-MM-DD, retorna como está
        if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            console.log('Date already in correct format:', dateString);
            return dateString;
        }
        
        // Se está no formato DD/MM/YYYY, converte
        if (dateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            const [day, month, year] = dateString.split('/');
            const formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            console.log('Converted DD/MM/YYYY to YYYY-MM-DD:', formatted);
            return formatted;
        }
        
        // Tenta criar uma data e formatar
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return '';
            }
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formatted = `${year}-${month}-${day}`;
            console.log('Formatted date:', formatted);
            return formatted;
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    const handleReservationSuccess = (reservation) => {
        alert(`Reserva criada com sucesso! ID: ${reservation.id}`);
        console.log('Reserva criada:', reservation);
        setIsReservationModalOpen(false);
    };

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8 animate-fade-in">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando detalhes da promoção...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !promotion) {
        return (
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-xl text-red-600 mb-4">Ops! Promoção não encontrada.</p>
                    <button 
                        onClick={() => navigate('/promocoes')} 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        ← Ver Todas as Promoções
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
            {/* Botão Voltar - Padrão do Site */}
            <button onClick={() => navigate(-1)} className="main-action-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 sm:px-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mb-6 sm:mb-8 text-sm sm:text-base">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Voltar
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* Título da Promoção - Padrão do Site */}
            <ScrollReveal animation="fadeUp" delay={200}>
                <div className="text-center mb-8 p-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        {promotion.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">{promotion.hotelName}</p>
                    
                    {/* Card de Preço - Estilo Padronizado */}
                    <div className="bg-gray-50 rounded-2xl p-8 max-w-lg mx-auto shadow-sm border border-gray-200 relative">
                        {/* Badge de Desconto - Posicionado corretamente */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                                -{promotion.discountPercent || 20}% OFF
                            </span>
                        </div>
                        
                        {/* Preços */}
                        <div className="mt-4 mb-4">
                            <div className="text-center mb-3">
                                <p className="text-sm text-gray-500 mb-1">De:</p>
                                <p className="text-lg text-gray-400 line-through font-medium">
                                    {formatCurrency(promotion.originalPrice || 0)}
                                </p>
                            </div>
                            
                            <div className="text-center mb-3">
                                <p className="text-sm text-red-600 mb-1 font-medium">Por apenas:</p>
                                <p className="text-4xl text-red-600 font-bold">
                                    {formatCurrency(promotion.finalPrice || 0)}
                                </p>
                            </div>
                        </div>
                        
                        {/* Economia */}
                        <div className="flex items-center justify-center space-x-2 text-green-600 font-medium">
                            <span>💰</span>
                            <span>Você economiza: {formatCurrency((promotion.originalPrice || 0) - (promotion.finalPrice || 0))}</span>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Datas de Check-in e Check-out - Padrão do Site */}
            <ScrollReveal animation="fadeUp" delay={400}>
                <div className="text-center mb-8">
                    <div className="flex justify-center space-x-6 text-sm">
                        <div className="flex items-center bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span className="font-medium text-blue-600">Check-in: {promotion.checkIn}</span>
                        </div>
                        <div className="flex items-center bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                            <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span className="font-medium text-red-600">Check-out: {promotion.checkOut}</span>
                        </div>
                    </div>
                </div>
            </ScrollReveal>


            {/* Banner Promotion - igual HotelDetailsPage */}
            <ScrollReveal animation="slideUp" delay={600}>
                <div className="mb-8 relative">
                    <img
                        src={promotion.bannerPromotion || promotion.mainImageUrl || promotion.imageUrl || '/default-promotion.jpg'}
                        alt={promotion.title}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 rounded-2xl">
                        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-lg">
                            {promotion.title}
                        </h1>
                        <p className="text-white text-base sm:text-lg md:text-xl mb-4 flex items-center">
                            <Icons.Location className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            <span>{promotion.hotelName}</span>
                        </p>
                    </div>
                </div>
            </ScrollReveal>

            {/* Galeria de Fotos - Estilo HotelDetailsPage */}
            <ScrollReveal animation="slideUp" delay={750}>
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        📷 Galeria de Fotos
                    </h2>
                    
                    {/* Se temos dados do hotel, usa as imagens reais */}
                    {hotelData && hotelData.galleryImages && hotelData.galleryImages.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                            {hotelData.galleryImages.slice(0, 8).map(img => (
                                <div key={img.id} className="overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    <img
                                        src={img.url}
                                        alt={img.alt}
                                        className="w-full h-32 sm:h-40 object-cover cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Fallback com imagens da promoção */
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative overflow-hidden rounded-lg">
                                <img 
                                    src={promotion.bannerPromotion || promotion.mainImageUrl || promotion.imageUrl || '/default-hotel1.jpg'} 
                                    alt="Vista do hotel" 
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                            <div className="relative overflow-hidden rounded-lg">
                                <img 
                                    src={promotion.bannerPromotion || promotion.mainImageUrl || promotion.imageUrl || '/default-hotel2.jpg'} 
                                    alt="Instalações do hotel" 
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollReveal>

            {/* O que o hotel oferece - Estilo HotelDetailsPage */}
            {(hotelData?.leisureFacilities && hotelData.leisureFacilities.length > 0) || (promotion.leisureFacilities && promotion.leisureFacilities.length > 0) ? (
                <ScrollReveal animation="slideUp" delay={800}>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                            </svg>
                            O que o hotel oferece
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Usa primeiro os dados do hotel, depois da promoção */}
                            {(hotelData?.leisureFacilities || promotion.leisureFacilities || []).map((facility, index) => {
                                // Usar o mapeamento de ícones existente
                                let IconComponent = leisureIconMap[facility];
                                
                                // Fallback para ícones baseado em palavras-chave
                                if (!IconComponent) {
                                    const facilityLower = facility.toLowerCase();
                                    if (facilityLower.includes('wi-fi') || facilityLower.includes('wifi')) IconComponent = Icons.Wifi;
                                    else if (facilityLower.includes('piscina')) IconComponent = Icons.Pool;
                                    else if (facilityLower.includes('estacion')) IconComponent = Icons.TotalRooms;
                                    else if (facilityLower.includes('restaurante') || facilityLower.includes('café')) IconComponent = CoffeeIcon;
                                    else if (facilityLower.includes('jardim')) IconComponent = FlowerIcon;
                                    else if (facilityLower.includes('pet')) IconComponent = PetIcon;
                                    else if (facilityLower.includes('academia')) IconComponent = Icons.Gym;
                                    else if (facilityLower.includes('bar')) IconComponent = Icons.Bar;
                                    else if (facilityLower.includes('sala de cinema')) IconComponent = Icons.Cinema;
                                    else if (facilityLower.includes('acessibilidade')) IconComponent = Icons.User;
                                    else IconComponent = Icons.User;
                                }
                                
                                return (
                                    <div key={index} className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                                        <div className="mr-4 p-3 bg-blue-50 rounded-full">
                                            <IconComponent className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <span className="text-gray-800 font-medium">{facility}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>
            ) : null}

              {/* Tipo do Quarto - Estilo HotelDetailsPage */}
            <ScrollReveal animation="fadeUp" delay={700}>
                <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Tipo do Quarto
                    </h2>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {promotion.roomType || (promotion.roomOptions && promotion.roomOptions[0]?.type) || 'Quarto Standard'}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {promotion.roomOptions && promotion.roomOptions[0]?.description 
                                ? promotion.roomOptions[0].description
                                : "Quarto confortável e bem equipado, perfeito para sua estadia."
                            }
                        </p>
                        <div className="mt-4 text-sm text-gray-500">
                            <p><strong>Tipo:</strong> {promotion.roomType || (promotion.roomOptions && promotion.roomOptions[0]?.type) || 'Quarto Standard'}</p>
                            {promotion.roomOptions && promotion.roomOptions[0]?.capacity && (
                                <p><strong>Capacidade:</strong> {promotion.roomOptions[0].capacity} pessoas</p>
                            )}
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Sobre o hotel - Estilo HotelDetailsPage */}
            <ScrollReveal animation="fadeUp" delay={775}>
                <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Sobre o hotel
                    </h2>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{promotion.hotelName}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {/* Usa a descrição do hotel se disponível, senão usa a descrição da promoção ou padrão */}
                            {hotelData?.description || promotion.description || `Desfrute de uma experiência única no ${promotion.hotelName}. Este hotel oferece acomodações confortáveis e serviços de qualidade para tornar sua estadia inesquecível. Com localização privilegiada e comodidades modernas, é a escolha perfeita para sua viagem.`}
                        </p>
                        <div className="mt-4 text-sm text-gray-500">
                            <p><strong>Hotel:</strong> {promotion.hotelName}</p>
                            {(hotelData?.location || promotion.location) && <p><strong>Localização:</strong> {hotelData?.location || promotion.location}</p>}
                            {hotelData?.stars && (
                                <p><strong>Classificação:</strong> {hotelData.stars} ⭐</p>
                            )}
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Localização do hotel - Estilo HotelDetailsPage */}
            <ScrollReveal animation="fadeUp" delay={800}>
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        📍 Localização do hotel
                    </h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{promotion.hotelName}</h3>
                                <p className="text-gray-600 mt-1">
                                    { hotelData?.address || promotion.location || 'Localização privilegiada com fácil acesso aos principais pontos turísticos da cidade.'}
                                </p>
                                {hotelData?.city && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        <strong>Cidade:</strong> {hotelData.city}
                                    </p>
                                )}
                                {hotelData?.phone && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        <strong>Telefone:</strong> {hotelData.phone}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Seção "Opções de Quartos" - Apenas se tiver opções na API */}
            {promotion.roomOptions && promotion.roomOptions.length > 0 && (
                <ScrollReveal animation="slideUp" delay={850}>
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Opções de Quartos
                        </h2>
                        <div className="space-y-4 sm:space-y-6">
                            {promotion.roomOptions.map((room, index) => (
                                <div key={room.id || index} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row justify-between items-start lg:items-center group">
                                    <div className="flex-1 mb-4 lg:mb-0">
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">{room.type}</h3>
                                        <p className="text-gray-600 text-sm mt-2">{room.description}</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {room.amenities?.map((amenity, idx) => (
                                                <span key={idx} className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    {amenity}
                                                </span>
                                            ))}
                                            {promotion.discountPercent && (
                                                <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    🔥 -{promotion.discountPercent}% OFF
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-auto lg:ml-6 flex flex-col lg:flex-col items-center lg:items-end">
                                        <div className="bg-blue-600 text-white font-bold text-lg sm:text-xl lg:text-2xl px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl mb-3 shadow-md">
                                            {formatCurrency(room.price)}
                                        </div>
                                        <button
                                            onClick={() => handleReserveRoom(room)}
                                            className={`reservation-button font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base w-full lg:w-auto ${
                                                isLoggedIn 
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                                    : 'bg-gray-400 hover:bg-gray-500 text-white'
                                            }`}
                                        >
                                            {isLoggedIn ? 'Reservar' : 'Fazer Login para Reservar'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {/* Se não houver opções de quartos, mostra um botão geral de reserva */}
            {(!promotion.roomOptions || promotion.roomOptions.length === 0) && (
                <ScrollReveal animation="zoomIn" delay={900}>
                    <div className="text-center mb-8">
                        <button 
                            onClick={() => handleReserveRoom({
                                id: 1,
                                type: 'Promoção',
                                price: promotion.finalPrice,
                                capacity: 2
                            })}
                            className={`px-10 py-4 font-bold text-xl rounded-full transition duration-300 shadow-lg transform hover:scale-105 ${
                                isLoggedIn 
                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                    : 'bg-gray-400 hover:bg-gray-500 text-white'
                            }`}
                        >
                            {isLoggedIn ? '🎉 Reservar Esta Promoção!' : 'Fazer Login para Reservar'}
                        </button>
                    </div>
                </ScrollReveal>
            )}

            {/* Modal de Reserva */}
            {isReservationModalOpen && promotion && selectedRoom && (
                <ReservationModal
                    isOpen={isReservationModalOpen}
                    onClose={handleCloseReservationModal}
                    hotel={{
                        id: promotion.hotelId || 1,
                        title: promotion.hotelName,
                        name: promotion.hotelName,
                        location: promotion.location || 'Brasil',
                        mainImageUrl: promotion.mainImageUrl || promotion.imageUrl
                    }}
                    room={selectedRoom}
                    onSuccess={handleReservationSuccess}
                    isPromotion={true}
                    promotionDates={{
                        checkIn: formatDateForInput(promotion.checkIn),
                        checkOut: formatDateForInput(promotion.checkOut)
                    }}
                />
            )}
            </div>
        </div>
    );
};

export default PromotionDetailsPage;