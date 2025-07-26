// src/components/molecules/HotelGallery.jsx
import React from 'react';
import HotelImage from '../atoms/HotelImage';

function HotelGallery({ galleryImages, onImageClick }) {
    if (!galleryImages || galleryImages.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map(img => (
                    <HotelImage
                        key={img.id}
                        src={img.url}
                        alt={img.alt}
                        onClick={() => onImageClick(galleryImages, img.id)}
                        isMain={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default HotelGallery;
