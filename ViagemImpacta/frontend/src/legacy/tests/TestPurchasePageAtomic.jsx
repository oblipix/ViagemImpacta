// 🧪 TESTE - PurchasePageAtomic vs Legacy
// Comparação lado a lado para validação de paridade

import React from 'react';
import { Container, Text, Button } from './components/atoms';
import PurchasePageAtomic from './components/organisms/PurchasePageAtomic';

const TestPurchasePageAtomic = () => {
  // Dados de teste IDÊNTICOS ao legacy para comparação
  const mockPromotionData = {
    id: 18,
    title: "Pacote Réveillon 2025 - Copacabana Palace",
    description: "Celebre a chegada do novo ano com todo o luxo e sofisticação do famoso Copacabana Palace. Desfrute de uma vista privilegiada da queima de fogos de Copacabana, com direito a jantar especial, champagne e muito mais!",
    imageUrl: "https://viagemegastronomia.cnnbrasil.com.br/wp-content/uploads/sites/5/2021/12/copacabana-palace-piscina.jpg",
    packagePrices: {
      solteiro: 6200,
      casal: 11500,
      familia: 18900
    }
  };

  const handleBack = () => {
    console.log('🔄 Voltando para detalhes da promoção...');
    // Em um app real, navegaria de volta para PromotionDetailsPageAtomic
  };

  const handleContinueToPayment = (purchaseData) => {
    console.log('💳 Navegando para página de pagamento:', purchaseData);
    // Em um app real, navegaria para PaymentPageAtomic com os dados da compra
  };

  return (
    <Container className="min-h-screen bg-gray-50 py-8">
      {/* Header da página de teste */}
      <div className="text-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <Text variant="h1" className="text-3xl font-bold text-gray-800 mb-4">
          🧪 Teste: PurchasePageAtomic
        </Text>
        <Text variant="body" className="text-gray-600 max-w-2xl mx-auto">
          Esta página demonstra o componente PurchasePageAtomic com dados de exemplo.
          Compare com a versão legacy para verificar a paridade visual e funcional.
        </Text>
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <Text variant="small" className="text-green-700 font-medium">
            ✅ Componente: PurchasePageAtomic (Organism)
            <br />
            📊 Status: Pronto para testes
            <br />
            🎯 Objetivo: Paridade total com PurchasePage legacy
          </Text>
        </div>
      </div>

      {/* Componente em teste */}
      <PurchasePageAtomic 
        promotionData={mockPromotionData}
        onBack={handleBack}
        onContinueToPayment={handleContinueToPayment}
      />

      {/* Footer informativo */}
      <div className="mt-12 text-center bg-white p-6 rounded-lg shadow-md">
        <Text variant="h3" className="text-xl font-semibold text-gray-800 mb-3">
          📋 Checklist de Validação
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <Text variant="small" className="text-green-700 font-medium">
              ✅ Seleção de pacotes<br />
              ✅ Visual de seleção<br />
              ✅ Formatação de preços<br />
            </Text>
          </div>
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <Text variant="small" className="text-green-700 font-medium">
              ✅ Resumo da seleção<br />
              ✅ Botão continuar<br />
              ✅ Estados interativos<br />
            </Text>
          </div>
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <Text variant="small" className="text-green-700 font-medium">
              ✅ Responsividade<br />
              ✅ Callbacks funcionais<br />
              ✅ Estado de erro<br />
            </Text>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Text variant="small" className="text-blue-700 font-medium">
            💡 Teste: Selecione diferentes pacotes e veja o resumo da seleção sendo atualizado dinamicamente.
          </Text>
        </div>
      </div>
    </Container>
  );
};

export default TestPurchasePageAtomic;
