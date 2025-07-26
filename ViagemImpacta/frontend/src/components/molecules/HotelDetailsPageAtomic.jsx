// src/components/molecules/HotelDetailsPageAtomic.jsx
import React, { useState } from 'react';
import BackButton from '../atoms/BackButton';
import HotelImage from '../atoms/HotelImage';
import HotelTitle from '../atoms/HotelTitle';
import HotelDescription from '../atoms/HotelDescription';
import HotelGallery from './HotelGallery';
import HotelAmenities from './HotelAmenities';
import HotelLeisureFacilities from './HotelLeisureFacilities';
import HotelRoomsSection from './HotelRoomsSection';
import ImageModal from '../ImageModal';

function HotelDetailsPageAtomic({ hotel, onBack, onReserveRoom }) {
    // Estados para o modal de imagens
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [initialImageId, setInitialImageId] = useState(null);

    if (!hotel) {
        return (
            <div className="container mx-auto py-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel não encontrado.</h2>
                <BackButton onBack={onBack}>
                    Voltar para Hotéis
                </BackButton>
            </div>
        );
    }

    // Função para abrir o modal de imagem
    const handleImageClick = (imagesArray, clickedImageId) => {
        setModalImages(imagesArray);
        setInitialImageId(clickedImageId);
        setIsModalOpen(true);
    };

    // Função para fechar o modal de imagem
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalImages([]);
        setInitialImageId(null);
    };

    return (
        <div className="container mx-auto py-8 px-6">
            <BackButton onBack={onBack}>
                ← Voltar para Hotéis
            </BackButton>

            <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Imagem Principal do Hotel - Clicável para abrir modal */}
                <HotelImage
                    src={hotel.mainImageUrl}
                    alt={hotel.title}
                    onClick={() => handleImageClick(hotel.galleryImages || [], hotel.galleryImages?.[0]?.id)}
                    isMain={true}
                />
                
                <HotelTitle 
                    title={hotel.title}
                    location={hotel.location}
                />
                
                <HotelDescription 
                    description={hotel.description}
                />

                {/* Galeria de Imagens do Hotel */}
                <HotelGallery 
                    galleryImages={hotel.galleryImages}
                    onImageClick={handleImageClick}
                />

                {/* Informações Gerais do Hotel */}
                <HotelAmenities hotel={hotel} />

                {/* Facilidades de Lazer */}
                <HotelLeisureFacilities 
                    leisureFacilities={hotel.leisureFacilities}
                />

                {/* Opções de Quartos e Preços */}
                <HotelRoomsSection 
                    roomOptions={hotel.roomOptions}
                    hotel={hotel}
                    onReserveRoom={onReserveRoom}
                />

                {/* Link para o Mapa (opcional) */}
                {hotel.mapUrl && (
                    <div className="text-center mt-8">
                        <a
                            href={hotel.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline text-lg font-semibold"
                        >
                            Ver localização no mapa
                        </a>
                    </div>
                )}
            </div>

            {/* === MODAL DE IMAGENS === */}
            {isModalOpen && (
                <ImageModal
                    images={modalImages}
                    initialImageId={initialImageId}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default HotelDetailsPageAtomic;
