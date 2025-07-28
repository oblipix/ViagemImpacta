// 🧬 ORGANISM - PromotionDetailsPageAtomic (Idêntica ao legacy)
// Página de detalhes de promoção - PARIDADE TOTAL com PromotionDetailsPage

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { Text, Container, Button, Image, StarRating, PriceDisplay } from '../atoms';

const PromotionDetailsPageAtomic = ({ 
    promotionData, 
    onBack, 
    onNavigateToPurchase,
    className = "",
    ...props 
}) => { 
  if (!promotionData) {
    return (
      <Container className={`p-4 text-center ${className}`} {...props}>
        <Text variant="h2" className="text-xl text-red-600 mb-4">
          Ops! Promoção não encontrada.
        </Text>
        <Button 
          onClick={onBack} 
          variant="secondary"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          ← Voltar
        </Button>
      </Container>
    );
  }

  // Dados de disponibilidade para o calendário - IDÊNTICOS ao legacy
  const allReservationDates = [
    { promotionId: 18, date: '2025-12-24', status: 'available' },
    { promotionId: 18, date: '2025-12-25', status: 'booked' },    
    { promotionId: 16, date: '2026-12-31', status: 'booked' },    
    { promotionId: 16, date: '2026-01-01', status: 'available' }, 
    { promotionId: 13, date: '2027-02-15', status: 'available' },
    { promotionId: 14, date: '2026-04-05', status: 'booked' }, 
    { promotionId: 15, date: '2026-04-05', status: 'available' },
    { promotionId: 17, date: '2026-06-12', status: 'booked' },
    { promotionId: 17, date: '2026-06-13', status: 'available' },
  ];

  const currentPromotionReservationDates = allReservationDates.filter(
    (item) => item.promotionId === promotionData.id
  );

  // Função para determinar o estilo das datas no calendário - IDÊNTICA ao legacy
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const reservation = currentPromotionReservationDates.find(item => item.date === dateStr);
      
      if (reservation) {
        if (reservation.status === 'available') {
          return 'available-date';
        } else if (reservation.status === 'booked') {
          return 'booked-date';
        }
      }
    }
    return null;
  };

  // Função para desabilitar datas passadas - IDÊNTICA ao legacy
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }
    return false;
  };

  return (
    <Container className={`p-6 bg-white shadow-lg rounded-lg my-8 ${className}`} {...props}>
      {/* Botão para voltar - IDÊNTICO ao legacy */}
      <Button 
        onClick={onBack} 
        variant="primary"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
      >
        ← Voltar para Lista de Promoções
      </Button>

      {/* Header da Promoção - IDÊNTICO ao legacy */}
      <div className="text-center mb-10">
        <Text variant="h1" className="text-4xl font-extrabold text-gray-900 mb-4">
          {promotionData.title}
        </Text>
        <Image 
          src={promotionData.imageUrl} 
          alt={promotionData.title} 
          className="w-full max-w-4xl h-80 object-cover rounded-lg mx-auto shadow-lg"
        />
        <Text variant="body" className="text-xl text-gray-700 mt-6 max-w-4xl mx-auto leading-relaxed">
          {promotionData.description}
        </Text>
      </div>

      {/* Seção de Pacotes - IDÊNTICA ao legacy */}
      {promotionData.packagePrices && (
        <div className="mb-10">
          <Text variant="h2" className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">
            Opções de Pacote
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotionData.packagePrices.solteiro && (
              <div className="border border-blue-200 p-6 rounded-lg bg-blue-50 text-center shadow-md">
                <Text variant="h3" className="text-xl font-semibold text-blue-800 mb-2">
                  Pacote Individual
                </Text>
                <PriceDisplay 
                  price={promotionData.packagePrices.solteiro} 
                  className="text-3xl font-bold text-blue-700"
                />
                <Text variant="small" className="text-gray-600 text-sm mt-1">por pessoa</Text>
              </div>
            )}
            {promotionData.packagePrices.casal && (
              <div className="border border-purple-200 p-6 rounded-lg bg-purple-50 text-center shadow-md">
                <Text variant="h3" className="text-xl font-semibold text-purple-800 mb-2">
                  Pacote Casal
                </Text>
                <PriceDisplay 
                  price={promotionData.packagePrices.casal} 
                  className="text-3xl font-bold text-purple-700"
                />
                <Text variant="small" className="text-gray-600 text-sm mt-1">por casal</Text>
              </div>
            )}
            {promotionData.packagePrices.familia && (
              <div className="border border-green-200 p-6 rounded-lg bg-green-50 text-center shadow-md">
                <Text variant="h3" className="text-xl font-semibold text-green-800 mb-2">
                  Pacote Família
                </Text>
                <PriceDisplay 
                  price={promotionData.packagePrices.familia} 
                  className="text-3xl font-bold text-green-700"
                />
                <Text variant="small" className="text-gray-600 text-sm mt-1">
                  para 2 adultos + 2 crianças*
                </Text>
              </div>
            )}
          </div>
          <Text variant="small" className="text-sm text-gray-500 mt-4 text-center">
            *Consulte condições e número de pessoas incluídas no pacote família.
          </Text>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Seção de Disponibilidade e Reservas - IDÊNTICA ao legacy */}
        <div>
          <Text variant="h2" className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">
            Disponibilidade e Reservas
          </Text>
          <div className="border border-gray-300 p-6 rounded-lg bg-gray-50 shadow-inner">
            <Text variant="h3" className="text-2xl font-semibold text-gray-700 mb-4">
              Escolha sua data:
            </Text>
            <div className="flex justify-center">
              <Calendar
                tileClassName={tileClassName}
                tileDisabled={tileDisabled}
                className="custom-calendar"
              />
            </div>
            {currentPromotionReservationDates.length > 0 && (
              <div className="mt-6 text-sm text-gray-600">
                <div className="flex items-center space-x-4 justify-center">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-200 border border-green-400 rounded mr-2"></div>
                    <span>Disponível</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-200 border border-red-400 rounded mr-2"></div>
                    <span>Reservado</span>
                  </div>
                </div>
              </div>
            )}
            <Text variant="small" className="text-red-500 text-sm mt-4 font-medium">
              **Lembre-se:** A disponibilidade real deve vir do seu sistema de reservas.
            </Text>
          </div>
        </div>

        {/* Detalhes Adicionais da Promoção - IDÊNTICOS ao legacy */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <Text variant="h2" className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">
                Mais Detalhes
            </Text>
            <ul className="list-none text-gray-700 space-y-5 text-lg">
                <li className="flex items-center p-3 rounded-md bg-blue-50 hover:bg-blue-100 transition duration-200">
                    <span className="material-icons mr-4 text-blue-600 text-3xl"> </span> 
                    <div>
                        <strong className="block text-gray-900">Tipo de Pacote:</strong> 
                        <span>{promotionData.type || 'Nacional'}</span>
                    </div>
                </li>
                <li className="flex items-center p-3 rounded-md bg-green-50 hover:bg-green-100 transition duration-200">
                    <span className="material-icons mr-4 text-green-600 text-3xl">✈️</span> 
                    <div>
                        <strong className="block text-gray-900">Status:</strong> 
                        <span className="text-green-600 font-semibold">{promotionData.status || 'Ativo'}</span>
                    </div>
                </li>
                <li className="flex items-center p-3 rounded-md bg-yellow-50 hover:bg-yellow-100 transition duration-200">
                    <span className="material-icons mr-4 text-yellow-600 text-3xl">📅</span> 
                    <div>
                        <strong className="block text-gray-900">Data do Evento:</strong> 
                        <span>{promotionData.eventDate || 'A definir'}</span>
                    </div>
                </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Avaliações dos Clientes - IDÊNTICAS ao legacy */}
      {promotionData.reviews && promotionData.reviews.length > 0 && (
        <div className="mt-12">
          <Text variant="h2" className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200">
            O que Nossos Clientes Dizem
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotionData.reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <StarRating rating={review.rating} />
                  <Text variant="small" className="text-gray-600 text-sm font-semibold">
                    {review.guestName}
                  </Text>
                </div>
                <Text variant="body" className="text-gray-700 italic">
                  "{review.comment}"
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão de Reservar Agora no final da página - IDÊNTICO ao legacy */}
      <div className="mt-12 text-center">
        <Button 
          onClick={() => onNavigateToPurchase(promotionData)} 
          variant="primary"
          className="px-10 py-4 bg-green-600 text-white font-bold text-xl rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 promotion-data-button"
        >
          Reservar Agora!
        </Button>
      </div>
    </Container>
  );
};

export default PromotionDetailsPageAtomic;
