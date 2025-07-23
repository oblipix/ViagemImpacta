import React from 'react';

// Função auxiliar para gerar URLs de imagem aleatórias (pode ser movida para utilitários se usada em vários lugares)
const generateRandomImageUrl = (id, width = 400, height = 300) => {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height + 150}`;
};

// TravelCard: Usado na Home, Resultados de Busca e Pacotes
// Recebe as props: travel, onCardClick, onSaveTravel, isTravelSaved

function TravelCard({ travel, onCardClick, onSaveTravel, isTravelSaved }) {
  const isSaved = isTravelSaved ? isTravelSaved(travel.id) : false;
  // Sempre priorizar dados do backend (DTO): Hotels[0] é obrigatório para exibição
  const hotel = travel.hotels && travel.hotels.length > 0 ? travel.hotels[0] : null;
  // Nome e localização do hotel sempre do backend
  const hotelName = hotel?.Name || '';
  const location = hotel?.Location || '';
  let city = '', state = '';
  if (location) {
    const parts = location.split(',').map(s => s.trim());
    city = parts[0] || '';
    state = parts[1] || '';
  }
  return (
    <div
      className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 max-w-[260px] mx-auto relative h-auto flex flex-col cursor-pointer"
      onClick={() => onCardClick(travel.id)}
    >
      {onSaveTravel && (
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition z-10"
          onClick={(e) => {
            e.stopPropagation();
            onSaveTravel(travel);
          }}
          aria-label={isSaved ? "Remover dos salvos" : "Salvar pacote"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isSaved ? 'text-red-500' : 'text-white'}`}
            fill={isSaved ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
// This file has been moved to the components directory.
// The content remains unchanged.
// Please ensure to update your imports accordingly.
          </svg>
        </button>
      )}

      {/* Imagem do pacote ou do hotel */}
      <div className="relative w-full h-48 overflow-hidden rounded-md">
        <img
<<<<<<< HEAD
          src={travel.mainImage|| generateRandomImageUrl(travel.id)}
          alt={travel.title}
=======
          src={hotel?.ImageUrl || generateRandomImageUrl(travel.id)}
          alt={hotelName}
>>>>>>> origin/MeloR
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-blue-800 mb-1 truncate text-left">{hotelName}</h3>
          {(city || state) && (
            <div className="text-sm text-gray-500 mb-2 text-left">{city}{city && state ? ', ' : ''}{state}</div>
          )}
          <div className="mt-2 text-blue-800 font-bold">Preço: R$ {travel.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </div>
        <button
          className="main-action-button text-white px-4 py-2 rounded-md transition duration-300 text-sm mt-auto self-start cursor-pointer bg-blue-600 hover:bg-blue-700"
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(travel.id);
          }}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}

export default TravelCard;