import React from 'react';
import { Button, SVGIcon } from '../atoms';
import RecommendedHotelCard from '../atoms/RecommendedHotelCard';
import { useHomePageData } from '../../hooks/useHomePageData';

// 🎯 PÁGINA ATÔMICA - Lista de Todos os Hotéis
// 
// Esta página exibe todos os hotéis disponíveis
const HotelsPageAtomic = ({ 
  onBack, 
  onHotelSelect,
  searchFilters = {}
}) => {
  // 📡 CARREGAR DADOS DO BACKEND + MOCK
  const { hotels, loading, error } = useHomePageData();

  // 🎯 FILTRAR HOTÉIS BASEADO NOS FILTROS
  const filteredHotels = hotels ? hotels.filter(hotel => {
    if (searchFilters.destination) {
      const destination = searchFilters.destination.toLowerCase();
      return hotel.location?.toLowerCase().includes(destination) ||
             hotel.title?.toLowerCase().includes(destination);
    }
    return true;
  }) : [];

  // 🎯 RENDERIZAR ESTADO DE CARREGAMENTO
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Carregando hotéis...</h2>
        </div>
      </div>
    );
  }

  // 🎯 RENDERIZAR ESTADO DE ERRO
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <SVGIcon 
              path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
              className="w-16 h-16 mx-auto"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Erro ao carregar hotéis</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Button onClick={onBack} variant="primary">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
              <SVGIcon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              Voltar
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Todos os Hotéis</h1>
              <p className="text-gray-600">{filteredHotels.length} hotéis encontrados</p>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Lista de hotéis */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {filteredHotels.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <SVGIcon 
                path="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" 
                className="w-24 h-24 mx-auto"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Nenhum hotel encontrado
            </h2>
            <p className="text-gray-500 mb-8">
              Tente ajustar os filtros de busca ou explore outros destinos.
            </p>
            <Button onClick={onBack} variant="primary">
              Voltar ao Início
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map(hotel => (
              <div key={hotel.id} className="transform hover:scale-105 transition-transform">
                <RecommendedHotelCard 
                  hotel={hotel}
                  onHotelClick={() => onHotelSelect(hotel.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPageAtomic;
