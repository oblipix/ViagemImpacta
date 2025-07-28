import React, { useState } from 'react';
import { Button, SVGIcon } from '../atoms';

// 🎯 PÁGINA ATÔMICA - Resultados de Busca de Hotéis
// 
// Esta página exibe os resultados da busca de hotéis
// integrando com o backend de forma robusta
const HotelsSearchResultsPageAtomic = ({ 
  searchParams, 
  onBack, 
  onHotelSelect, 
  onModifySearch 
}) => {
  const [hotels] = useState(searchParams?.results || []);
  const [loading] = useState(false);
  const [error] = useState(null);

  // 🎯 RENDERIZAR ESTADO DE CARREGAMENTO
  const renderLoading = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Buscando hotéis disponíveis...</h2>
        <p className="text-gray-500 mt-2">Aguarde um momento</p>
      </div>
    </div>
  );

  // 🎯 RENDERIZAR ESTADO DE ERRO
  const renderError = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto">
        <div className="text-red-500 mb-4">
          <SVGIcon 
            path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
            className="w-16 h-16 mx-auto"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Ops! Algo deu errado</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onBack} variant="secondary">
            Voltar
          </Button>
          <Button onClick={onModifySearch}>
            Nova Busca
          </Button>
        </div>
      </div>
    </div>
  );

  // 🎯 RENDERIZAR NENHUM RESULTADO
  const renderNoResults = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header com busca */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
              <SVGIcon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              Voltar
            </Button>
            <h1 className="text-xl font-semibold text-gray-800">Resultados da Busca</h1>
            <Button onClick={onModifySearch} variant="outline">
              Modificar Busca
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo - Nenhum resultado */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="text-center">
          <div className="text-gray-400 mb-6">
            <SVGIcon 
              path="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" 
              className="w-24 h-24 mx-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Nenhum hotel encontrado
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Não encontramos hotéis disponíveis para os critérios da sua busca. 
            Tente modificar as datas ou destino.
          </p>
          
          {/* Parâmetros da busca */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-700 mb-4">Sua busca:</h3>
            <div className="text-left space-y-2">
              {searchParams.destination && (
                <p><span className="text-gray-500">Destino:</span> {searchParams.destination}</p>
              )}
              {searchParams.checkInDate && (
                <p><span className="text-gray-500">Check-in:</span> {new Date(searchParams.checkInDate).toLocaleDateString('pt-BR')}</p>
              )}
              {searchParams.checkOutDate && (
                <p><span className="text-gray-500">Check-out:</span> {new Date(searchParams.checkOutDate).toLocaleDateString('pt-BR')}</p>
              )}
              {searchParams.guests && (
                <p><span className="text-gray-500">Hóspedes:</span> {searchParams.guests}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={onModifySearch}>
              Modificar Busca
            </Button>
            <Button onClick={onBack} variant="secondary">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // 🎯 RENDERIZAR CARD DE HOTEL
  const renderHotelCard = (hotel) => (
    <div key={hotel.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Imagem */}
        <div className="md:w-1/3">
          <img 
            src={hotel.mainImageUrl || 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400'} 
            alt={hotel.title}
            className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        
        {/* Conteúdo */}
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{hotel.title}</h3>
              <p className="text-gray-600 flex items-center gap-1">
                <SVGIcon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                {hotel.location}
              </p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <SVGIcon 
                  key={i}
                  path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  className={`w-4 h-4 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">({hotel.rating})</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
          
          {/* Comodidades */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.wifi && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                WiFi
              </span>
            )}
            {hotel.parking && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Estacionamento
              </span>
            )}
            {hotel.gym && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Academia
              </span>
            )}
          </div>
          
          {/* Quartos disponíveis */}
          {hotel.rooms && hotel.rooms.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quartos disponíveis:</p>
              <div className="space-y-1">
                {hotel.rooms.slice(0, 2).map((room) => (
                  <div key={room.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{room.type} (até {room.capacity} pessoas)</span>
                    <span className="font-semibold text-green-600">R$ {room.price}/noite</span>
                  </div>
                ))}
                {hotel.rooms.length > 2 && (
                  <p className="text-xs text-gray-500">+{hotel.rooms.length - 2} outros quartos</p>
                )}
              </div>
            </div>
          )}
          
          {/* Ações */}
          <div className="flex justify-between items-center">
            <div>
              {hotel.rooms && hotel.rooms.length > 0 && (
                <p className="text-lg font-semibold text-green-600">
                  A partir de R$ {Math.min(...hotel.rooms.map(r => r.price))}/noite
                </p>
              )}
            </div>
            <Button 
              onClick={() => onHotelSelect(hotel.id)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // 🎯 RENDERIZAR RESULTADOS
  const renderResults = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header com busca */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
              <SVGIcon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              Voltar
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {hotels.length} {hotels.length === 1 ? 'hotel encontrado' : 'hotéis encontrados'}
              </h1>
              {searchParams.destination && (
                <p className="text-gray-600">em {searchParams.destination}</p>
              )}
            </div>
            <Button onClick={onModifySearch} variant="outline">
              Modificar Busca
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de hotéis */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="space-y-6">
          {hotels.map(renderHotelCard)}
        </div>
      </div>
    </div>
  );

  // 🎯 RENDERIZAÇÃO PRINCIPAL
  if (loading) return renderLoading();
  if (error) return renderError();
  if (!hotels || hotels.length === 0) return renderNoResults();
  return renderResults();
};

export default HotelsSearchResultsPageAtomic;
