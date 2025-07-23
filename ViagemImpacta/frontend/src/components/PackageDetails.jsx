

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ImageModal from './ImageModal';
import { generateRandomImageUrl } from '../utils/imageHelpers';
import HotelInfoCard from './feature/Hotel/HotelInfoCard';
import BreakfastInfoCard from './feature/Hotel/BreakfastInfoCard';
import PackagePrice from './feature/Packages/PackagePrice';
import HotelDescription from './feature/Hotel/HotelDescription';

function PackageDetails({ packageData, onBack }) {
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  if (!packageData) {
    return (
      <section className="bg-white rounded-t-3xl shadow-md -mt-10 md:-mt-20 relative z-10 py-8 px-6 text-center">
        <p className="text-gray-700 text-xl">Carregando detalhes do pacote ou pacote não encontrado...</p>
        <button
          onClick={onBack}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Voltar para a lista
        </button>
      </section>
    );
  }

  const hotel = Array.isArray(packageData.hotels) && packageData.hotels.length > 0 ? packageData.hotels[0] : null;
  const images = hotel && hotel.ImageUrl
    ? [{ id: 0, url: hotel.ImageUrl, alt: hotel.Name, caption: hotel.Name }]
    : [{ id: 1, url: generateRandomImageUrl(200), alt: 'Imagem do hotel', caption: hotel?.Name || 'Hotel' }];

  return (
    <section className="bg-white rounded-t-3xl shadow-md -mt-10 md:-mt-20 relative z-10 py-8 px-6">
      <div className="container mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Voltar
        </button>

        <div className="bg-blue-50 rounded-lg p-6 shadow-sm mb-12">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">{packageData.title || 'Detalhes do Pacote'}</h1>
          <h2 className="text-xl font-bold text-gray-800 mb-4">{hotel?.name || ''}</h2>
          <p className="text-gray-600 mb-0 max-w-2xl">{packageData.description}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Conheça o Hotel</h3>
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 relative h-[360px] flex flex-col max-w-[400px] mx-auto">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full rounded-md overflow-hidden amenities-swiper"
              >
                {images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div className="relative w-full h-full cursor-pointer">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onClick={() => setSelectedImageModal(image.id)}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3 text-white">
                        <p className="text-sm">{image.caption}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <HotelInfoCard hotel={hotel} />
          </div>

          <div className="w-full md:w-1/2 mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-left">Preço do Pacote</h3>
            <PackagePrice price={packageData.price} />
          </div>
        </div>

        <HotelDescription description={hotel?.description} />

        <BreakfastInfoCard />

      </div>
      {selectedImageModal && (
        <ImageModal
          images={images}
          initialImageId={selectedImageModal}
          onClose={() => setSelectedImageModal(null)}
        />
      )}
    </section>
  );
}

export default PackageDetails;