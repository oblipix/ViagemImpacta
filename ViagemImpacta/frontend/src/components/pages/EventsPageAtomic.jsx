import React from 'react';
import { Button, SVGIcon } from '../atoms';

// 🎯 PÁGINA ATÔMICA - Eventos
// 
// Esta página exibe eventos e atividades
const EventsPageAtomic = ({ onBack }) => {
  // 🎯 DADOS MOCKADOS DE EVENTOS
  const events = [
    {
      id: 1,
      title: 'Festival de Inverno - Gramado',
      description: 'Desfrute do melhor festival de inverno do Brasil com shows, gastronomia e muito mais.',
      date: '2025-07-15',
      location: 'Gramado, RS',
      price: 299,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
      category: 'Festival'
    },
    {
      id: 2,
      title: 'Rock in Rio 2025',
      description: 'O maior festival de música do mundo está de volta! Não perca os melhores shows.',
      date: '2025-09-15',
      location: 'Rio de Janeiro, RJ',
      price: 450,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
      category: 'Música'
    },
    {
      id: 3,
      title: 'Festival de Parintins',
      description: 'Viva a magia do folclore brasileiro no coração da Amazônia.',
      date: '2025-06-28',
      location: 'Parintins, AM',
      price: 380,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
      category: 'Folclore'
    },
    {
      id: 4,
      title: 'Oktoberfest Blumenau',
      description: 'A maior festa alemã do Brasil com muita cerveja, música e tradição.',
      date: '2025-10-10',
      location: 'Blumenau, SC',
      price: 220,
      image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400',
      category: 'Tradição'
    }
  ];

  // 🎯 RENDERIZAR CARD DE EVENTO
  const renderEventCard = (event) => (
    <div key={event.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <SVGIcon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          <span className="text-sm">{event.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <SVGIcon path="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
          <span className="text-sm">{new Date(event.date).toLocaleDateString('pt-BR')}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-green-600">R$ {event.price}</p>
            <p className="text-sm text-gray-500">por pessoa</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );

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
              <h1 className="text-2xl font-bold text-gray-800">Eventos e Festivais</h1>
              <p className="text-gray-600">Descubra experiências únicas pelo Brasil</p>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Viva Momentos Inesquecíveis</h2>
          <p className="text-xl opacity-90">
            Participe dos melhores eventos e festivais do Brasil. 
            Cultura, música, gastronomia e muito mais te esperam!
          </p>
        </div>
      </div>

      {/* Lista de eventos */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {events.map(renderEventCard)}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16 border-t">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Não encontrou o que procurava?</h3>
          <p className="text-gray-600 mb-8">
            Entre em contato conosco e ajudaremos você a encontrar o evento perfeito para sua viagem.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              Fale Conosco
            </Button>
            <Button>
              Ver Mais Eventos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPageAtomic;
