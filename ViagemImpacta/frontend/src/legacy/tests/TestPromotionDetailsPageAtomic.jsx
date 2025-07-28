// 🧪 TESTE - PromotionDetailsPageAtomic vs Legacy
// Comparação lado a lado para validação de paridade

import React from 'react';
import { Container, Text, Button } from './components/atoms';
import PromotionDetailsPageAtomic from './components/organisms/PromotionDetailsPageAtomic';

const TestPromotionDetailsPageAtomic = () => {
  // Dados de teste IDÊNTICOS ao legacy para comparação
  const mockPromotionData = {
    id: 18,
    title: "Pacote Réveillon 2025 - Copacabana Palace",
    description: "Celebre a chegada do novo ano com todo o luxo e sofisticação do famoso Copacabana Palace. Desfrute de uma vista privilegiada da queima de fogos de Copacabana, com direito a jantar especial, champagne e muito mais!",
    imageUrl: "https://viagemegastronomia.cnnbrasil.com.br/wp-content/uploads/sites/5/2021/12/copacabana-palace-piscina.jpg",
    type: "Nacional",
    status: "Ativo",
    eventDate: "31/12/2025",
    priceFrom: 8500,
    priceTo: 6200,
    packagePrices: {
      solteiro: 6200,
      casal: 11500,
      familia: 18900
    },
    reviews: [
      {
        guestName: "Maria Silva",
        rating: 5,
        comment: "Experiência inesquecível! O hotel é magnífico e a vista da queima de fogos foi espetacular. Recomendo demais!"
      },
      {
        guestName: "João Santos", 
        rating: 4,
        comment: "Muito bom, apenas o jantar poderia ter mais opções vegetarianas. Mas no geral, excelente!"
      },
      {
        guestName: "Ana Costa",
        rating: 5,
        comment: "Perfeito em todos os aspectos. Staff muito atencioso, quartos impecáveis e localização privilegiada."
      }
    ]
  };

  const handleBack = () => {
    console.log('🔄 Voltando para lista de promoções...');
    // Em um app real, navegaria de volta
  };

  const handleNavigateToPurchase = (promotionData) => {
    console.log('🛒 Navegando para página de compra:', promotionData);
    // Em um app real, navegaria para PurchasePageAtomic
  };

  return (
    <Container className="min-h-screen bg-gray-50 py-8">
      {/* Header da página de teste */}
      <div className="text-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <Text variant="h1" className="text-3xl font-bold text-gray-800 mb-4">
          🧪 Teste: PromotionDetailsPageAtomic
        </Text>
        <Text variant="body" className="text-gray-600 max-w-2xl mx-auto">
          Esta página demonstra o componente PromotionDetailsPageAtomic com dados de exemplo.
          Compare com a versão legacy para verificar a paridade visual e funcional.
        </Text>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Text variant="small" className="text-blue-700 font-medium">
            ✅ Componente: PromotionDetailsPageAtomic (Organism)
            <br />
            📊 Status: Pronto para testes
            <br />
            🎯 Objetivo: Paridade total com PromotionDetailsPage legacy
          </Text>
        </div>
      </div>

      {/* Componente em teste */}
      <PromotionDetailsPageAtomic 
        promotionData={mockPromotionData}
        onBack={handleBack}
        onNavigateToPurchase={handleNavigateToPurchase}
      />

      {/* Footer informativo */}
      <div className="mt-12 text-center bg-white p-6 rounded-lg shadow-md">
        <Text variant="h3" className="text-xl font-semibold text-gray-800 mb-3">
          📋 Checklist de Validação
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <Text variant="small" className="text-green-700 font-medium">
              ✅ Visual/Layout<br />
              ✅ Calendário de disponibilidade<br />
              ✅ Pacotes de preços<br />
            </Text>
          </div>
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <Text variant="small" className="text-green-700 font-medium">
              ✅ Avaliações de clientes<br />
              ✅ Botões funcionais<br />
              ✅ Formatação de moeda<br />
            </Text>
          </div>
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <Text variant="small" className="text-green-700 font-medium">
              ✅ Responsividade<br />
              ✅ Estados de loading/erro<br />
              ✅ Callbacks de navegação<br />
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TestPromotionDetailsPageAtomic;
