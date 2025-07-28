import React from 'react';
import { Button, SVGIcon } from '../atoms';

// 🎯 PÁGINA ATÔMICA - Detalhes da Promoção
// 
// Esta página exibe os detalhes de uma promoção específica
const PromotionDetailsPageAtomic = ({ onBack, promotionId, onPurchase }) => {
  // 🎯 DADOS MOCKADOS DE PROMOÇÕES (em produção viria do backend)
  const promotions = [
    {
      id: 1,
      title: 'Super Oferta Nordeste',
      subtitle: 'Pacote completo para as melhores praias do Brasil',
      description: 'Descubra as belezas do Nordeste brasileiro com este pacote completo que inclui hospedagem, transporte e passeios guiados pelas praias mais paradisíacas da região.',
      originalPrice: 2499,
      discountedPrice: 1799,
      discount: 28,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600'
      ],
      destination: 'Fortaleza, Porto de Galinhas e Maragogi',
      duration: '7 dias / 6 noites',
      includes: [
        'Passagem aérea ida e volta',
        'Hospedagem em hotel 4 estrelas',
        'Café da manhã todos os dias',
        'Transfers aeroporto-hotel-aeroporto',
        'Passeio de buggy pelas dunas',
        'Mergulho com cilindro',
        'City tour pelos principais pontos turísticos',
        'Seguro viagem',
        'Acompanhamento de guia local'
      ],
      validUntil: '2025-03-31',
      availableSeats: 15,
      category: 'Praia'
    },
    {
      id: 2,
      title: 'Aventura na Amazônia',
      subtitle: 'Expedição completa pela maior floresta tropical do mundo',
      description: 'Viva uma experiência única na Amazônia com este pacote de ecoturismo que inclui hospedagem em lodge ecológico, passeios de barco, trilhas na floresta e encontro com comunidades ribeirinhas.',
      originalPrice: 3299,
      discountedPrice: 2499,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'
      ],
      destination: 'Manaus e Região Amazônica',
      duration: '5 dias / 4 noites',
      includes: [
        'Passagem aérea ida e volta',
        'Hospedagem em lodge ecológico',
        'Todas as refeições',
        'Transfers aeroporto-lodge-aeroporto',
        'Passeios de barco pelo Rio Negro',
        'Trilhas guiadas na floresta',
        'Visita a comunidades ribeirinhas',
        'Pesca de piranha',
        'Observação de vida selvagem',
        'Guia especializado em ecoturismo'
      ],
      validUntil: '2025-04-15',
      availableSeats: 8,
      category: 'Ecoturismo'
    }
  ];

  // 🎯 ENCONTRAR A PROMOÇÃO PELO ID
  const promotion = promotions.find(p => p.id === parseInt(promotionId)) || promotions[0];

  // 🎯 ESTADO PARA GALERIA DE IMAGENS
  const [selectedImage, setSelectedImage] = React.useState(0);

  // 🎯 ESTADO PARA QUANTIDADE DE PESSOAS
  const [passengers, setPassengers] = React.useState(1);

  // 🎯 CALCULAR PREÇO TOTAL
  const totalPrice = promotion.discountedPrice * passengers;
  const totalOriginalPrice = promotion.originalPrice * passengers;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <Button onClick={onBack} variant="ghost" className="flex items-center gap-2 mb-4">
            <SVGIcon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            Voltar às Promoções
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria de imagens */}
          <div>
            <div className="relative mb-4">
              <img 
                src={promotion.gallery[selectedImage]} 
                alt={promotion.title}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                  -{promotion.discount}%
                </span>
              </div>
            </div>
            
            {/* Miniaturas */}
            <div className="flex gap-2">
              {promotion.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações da promoção */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="mb-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                  {promotion.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{promotion.title}</h1>
                <p className="text-lg text-gray-600">{promotion.subtitle}</p>
              </div>

              {/* Preços */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-bold text-green-600">R$ {totalPrice.toLocaleString()}</span>
                  <span className="text-lg text-gray-500 line-through">R$ {totalOriginalPrice.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Economia de R$ {(totalOriginalPrice - totalPrice).toLocaleString()} ({promotion.discount}% de desconto)
                </p>
              </div>

              {/* Informações básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <SVGIcon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  <span className="text-sm text-gray-600">{promotion.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SVGIcon path="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                  <span className="text-sm text-gray-600">{promotion.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SVGIcon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  <span className="text-sm text-gray-600">Válido até {new Date(promotion.validUntil).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SVGIcon path="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  <span className="text-sm text-gray-600">{promotion.availableSeats} vagas disponíveis</span>
                </div>
              </div>

              {/* Seletor de passageiros */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de passageiros
                </label>
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    variant="outline"
                    size="sm"
                    disabled={passengers <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{passengers}</span>
                  <Button 
                    onClick={() => setPassengers(Math.min(promotion.availableSeats, passengers + 1))}
                    variant="outline"
                    size="sm"
                    disabled={passengers >= promotion.availableSeats}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Botão de compra */}
              <Button 
                onClick={() => onPurchase && onPurchase(promotion)}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                size="lg"
              >
                Reservar Agora
              </Button>

              <p className="text-xs text-gray-500 text-center mt-2">
                Reserva sem compromisso. Cancele gratuitamente até 48h antes da viagem.
              </p>
            </div>
          </div>
        </div>

        {/* Descrição e o que está incluso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Descrição */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Sobre esta promoção</h2>
            <p className="text-gray-600 leading-relaxed">{promotion.description}</p>
          </div>

          {/* O que está incluso */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">O que está incluso</h2>
            <ul className="space-y-2">
              {promotion.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <SVGIcon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetailsPageAtomic;
