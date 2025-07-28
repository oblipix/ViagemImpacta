// 🧬 MOLECULAR COMPONENT - ImageModalAtomic  
// Versão atômica do modal de imagens, reutilizável e modular

import React, { useState, useEffect } from 'react';
import { Button, Image, OverlayContent, IconSVG } from '../../atoms';

const ImageModalAtomic = ({ images, initialImageId, onClose }) => {
    // Encontra o índice inicial da imagem no array
    const initialIndex = images.findIndex(img => img.id === initialImageId);
    // Estado para manter o índice da imagem atual sendo exibida
    const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

    // Funções simples para navegar entre as imagens
    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToSpecificImage = (index) => {
        setCurrentImageIndex(index);
    };

    // Resetar currentImageIndex se initialImageId mudar
    useEffect(() => {
        const newInitialIndex = images.findIndex(img => img.id === initialImageId);
        if (newInitialIndex !== -1 && newInitialIndex !== currentImageIndex) {
            setCurrentImageIndex(newInitialIndex);
        }
    }, [initialImageId, images, currentImageIndex]);

    // Efeito para navegação por teclado
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            } else if (event.key === 'ArrowLeft') {
                setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            } else if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [images.length, onClose]);

    // Se o array de imagens estiver vazio ou o ID inicial não for encontrado
    if (!images || images.length === 0 || initialIndex === -1) {
        return null;
    }

    const currentImage = images[currentImageIndex];

    return (
        <OverlayContent 
            onClose={onClose}
            className="flex items-center justify-center p-4"
        >
            <div
                className="relative max-w-3xl max-h-full bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Imagem atual usando componente atomic Image */}
                <Image
                    src={currentImage.url}
                    alt={currentImage.alt}
                    className="max-w-full max-h-screen object-contain"
                />

                {/* Botão de Fechar usando componente atomic Button */}
                <Button
                    onClick={onClose}
                    variant="ghost"
                    className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-10"
                    aria-label="Fechar modal"
                >
                    <IconSVG className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </IconSVG>
                </Button>

                {/* Botão de Navegação ANTERIOR */}
                {images.length > 1 && (
                    <Button
                        onClick={goToPrevImage}
                        variant="ghost"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-10"
                        aria-label="Imagem anterior"
                    >
                        <IconSVG className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </IconSVG>
                    </Button>
                )}

                {/* Botão de Navegação PRÓXIMO */}
                {images.length > 1 && (
                    <Button
                        onClick={goToNextImage}
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-10"
                        aria-label="Próxima imagem"
                    >
                        <IconSVG className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </IconSVG>
                    </Button>
                )}

                {/* Miniaturas da Galeria no rodapé do modal */}
                {images.length > 1 && (
                    <div className="absolute bottom-0 w-full flex justify-center items-center p-2 bg-gray-800 bg-opacity-70 overflow-x-auto">
                        <div className="flex space-x-2">
                            {images.map((imgObject, index) => (
                                <Image
                                    key={imgObject.id || index}
                                    src={imgObject.url}
                                    alt={imgObject.alt || `Miniatura ${index + 1}`}
                                    className={`w-16 h-12 object-cover rounded-md cursor-pointer border-2 ${
                                        index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                                    } hover:opacity-80 transition`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToSpecificImage(index);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </OverlayContent>
    );
};

export default ImageModalAtomic;
