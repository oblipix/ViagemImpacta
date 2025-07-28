// 🧪 TEST - Atomic Hotel Details Page
import React from 'react';
import { HotelDetailsPageAtomic } from './components/molecules';
import { HeaderAtomic, FooterAtomic } from './components/molecules';

const TestAtomicHotelDetails = () => {
  // Mock hotel data for testing
  const mockHotelData = {
    id: 1,
    name: "Hotel Luxo São Paulo",
    description: "Um hotel de luxo no coração de São Paulo, oferecendo conforto excepcional e serviços de primeira classe.",
    location: "Avenida Paulista, 1000 - São Paulo, SP",
    rating: 4.8,
    pricePerNight: 450.00,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop"
    ],
    amenities: [
      "Wi-Fi gratuito",
      "Piscina",
      "Academia",
      "Spa",
      "Restaurante",
      "Bar",
      "Estacionamento",
      "Room service 24h"
    ],
    leisureFacilities: [
      "Centro de bem-estar",
      "Sauna",
      "Jacuzzi",
      "Sala de jogos",
      "Biblioteca",
      "Terraço panorâmico"
    ],
    rooms: [
      {
        id: 1,
        type: "Standard",
        description: "Quarto confortável com vista da cidade",
        price: 350.00,
        capacity: 2,
        amenities: ["Wi-Fi", "TV", "Ar condicionado", "Frigobar"],
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        type: "Deluxe",
        description: "Quarto espaçoso com vista panorâmica",
        price: 450.00,
        capacity: 3,
        amenities: ["Wi-Fi", "TV 55\"", "Ar condicionado", "Frigobar", "Cofre"],
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        type: "Suite",
        description: "Suíte luxuosa com sala de estar",
        price: 750.00,
        capacity: 4,
        amenities: ["Wi-Fi", "TV 65\"", "Ar condicionado", "Frigobar", "Cofre", "Banheira"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderAtomic />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            🧪 Teste - Hotel Details Page Atômica
          </h1>
          <p className="text-blue-700">
            Esta página demonstra o HotelDetailsPageAtomic como uma molécula reutilizável.
            Compare com a versão legacy para verificar paridade visual e funcional.
          </p>
        </div>

        <HotelDetailsPageAtomic hotel={mockHotelData} />
      </div>
      
      <FooterAtomic />
    </div>
  );
};

export default TestAtomicHotelDetails;
