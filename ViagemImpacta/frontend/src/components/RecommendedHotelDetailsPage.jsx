// src/components/RecommendedHotelDetailsPage.js
import React from 'react';
import RatingStars from './RatingStars'; // Importe o componente de estrelas

function RecommendedHotelDetailsPage({ hotel, onBack }) {
  if (!hotel) {
    return (
      <div className="container mx-auto py-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel recomendado não encontrado.</h2>
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 main-action-button"
        >
          Voltar para Recomendados
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <button
        onClick={onBack}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8 transition duration-300 main-action-button"
      >
        ← Voltar para Recomendados
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={hotel.mainImageUrl}
              alt={hotel.title}
              className="w-full h-80 object-cover rounded-lg shadow-md mb-4"
            />
            <h1 className="text-4xl font-extrabold text-blue-800 mb-2">{hotel.title}</h1>
            <p className="text-gray-600 text-lg mb-2">{hotel.location}</p>
            {hotel.rating && (
              <div className="mb-4">
                <RatingStars rating={hotel.rating} />
              </div>
            )}
            <p className="text-gray-700 leading-relaxed text-md">{hotel.description}</p>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">O que dizem os viajantes</h2>
            {hotel.feedbacks && hotel.feedbacks.length > 0 ? (
              <div className="space-y-6">
                {hotel.feedbacks.map(feedback => (
                  <div key={feedback.id} className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <RatingStars rating={feedback.rating} />
                      <span className="text-gray-600 ml-2 text-sm italic">"{feedback.comment}"</span>
                    </div>
                    <p className="text-gray-800 font-semibold">- {feedback.guestName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Nenhuma avaliação encontrada para este hotel ainda.</p>
            )}

            {/* Chamada para Ação */}
            <div className="mt-8 text-center">
                <p className="text-gray-700 text-lg mb-4">Interessado neste hotel? Volte e confira os detalhes completos!</p>
                <button
                    onClick={onBack} // Volta para a lista de recomendados ou home
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 main-action-button"
                >
                    Voltar para a Lista de Hotéis
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendedHotelDetailsPage;