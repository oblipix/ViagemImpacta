// 🧪 TESTE - PaymentPageAtomic vs Legacy
// Página completa de teste para validação do sistema de pagamento Stripe

import React from 'react';
import { Container, Text, Button } from './components/atoms';
import PaymentPageAtomic from './components/organisms/PaymentPageAtomic';

const TestPaymentPageAtomic = () => {
  // Dados de teste simulando fluxo completo: Promotion → Purchase → Payment
  const mockPurchaseData = {
    promotionData: {
      id: 18,
      title: "Pacote Réveillon 2025 - Copacabana Palace",
      description: "Celebre a chegada do novo ano com todo o luxo e sofisticação do famoso Copacabana Palace.",
      imageUrl: "https://viagemegastronomia.cnnbrasil.com.br/wp-content/uploads/sites/5/2021/12/copacabana-palace-piscina.jpg"
    },
    selectedPackageType: 'casal',
    selectedPrice: 11500
  };

  const handleBack = () => {
    console.log('🔄 Voltando para página de compra...');
    // Em um app real, navegaria de volta para PurchasePageAtomic
  };

  const handlePaymentSuccess = (paymentResult) => {
    console.log('✅ Pagamento realizado com sucesso!', paymentResult);
    
    // Simular notificação de sucesso
    alert(`🎉 Pagamento aprovado!\n\nID: ${paymentResult.id}\nValor: R$ ${(paymentResult.amount / 100).toFixed(2)}\nMétodo: ${paymentResult.payment_method}`);
    
    // Em um app real, redirecionaria para página de confirmação
  };

  const handlePaymentError = (errorMessage) => {
    console.error('❌ Erro no pagamento:', errorMessage);
    
    // Simular notificação de erro
    alert(`❌ Falha no pagamento\n\n${errorMessage}\n\nTente novamente ou use outro método de pagamento.`);
  };

  return (
    <Container className="min-h-screen bg-gray-50">
      {/* Header da página de teste */}
      <div className="text-center py-8 bg-white shadow-md mb-6">
        <Text variant="h1" className="text-3xl font-bold text-gray-800 mb-4">
          🧪 Teste: PaymentPageAtomic + Stripe Integration
        </Text>
        <Text variant="body" className="text-gray-600 max-w-3xl mx-auto">
          Esta página demonstra o sistema completo de pagamento integrado com Stripe API.
          Teste tanto pagamento por cartão quanto PIX em ambiente seguro.
        </Text>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Text variant="small" className="text-blue-700 font-medium">
              💳 <strong>Stripe Integration</strong>
              <br />
              Payment Intent API
              <br />
              Cartões de teste aceitos
            </Text>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <Text variant="small" className="text-green-700 font-medium">
              📱 <strong>PIX Payment</strong>
              <br />
              QR Code generation
              <br />
              Instant payment
            </Text>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Text variant="small" className="text-purple-700 font-medium">
              🔒 <strong>Security</strong>
              <br />
              SSL/TLS encryption
              <br />
              PCI DSS compliance
            </Text>
          </div>
        </div>
      </div>

      {/* Componente em teste */}
      <PaymentPageAtomic 
        purchaseData={mockPurchaseData}
        onBack={handleBack}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />

      {/* Footer informativo para desenvolvedores */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
        <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🛠️ Guia de Implementação Stripe
        </Text>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Frontend Setup */}
          <div>
            <Text variant="h3" className="text-lg font-semibold text-gray-800 mb-4">
              🎨 Frontend (React + Stripe Elements)
            </Text>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <Text variant="small">
                {`# Instalar Stripe
npm install @stripe/stripe-js @stripe/react-stripe-js

# Variáveis de ambiente (.env)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Configurar Stripe Elements
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(publishableKey);`}
              </Text>
            </div>
          </div>

          {/* Backend Setup */}
          <div>
            <Text variant="h3" className="text-lg font-semibold text-gray-800 mb-4">
              ⚙️ Backend (ASP.NET Core + Stripe)
            </Text>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <Text variant="small">
                {`# Instalar Stripe.net
dotnet add package Stripe.net

# Controller endpoint
[HttpPost("create-payment-intent")]
public async Task<IActionResult> CreatePaymentIntent(
    PaymentIntentRequest request)
{
    var options = new PaymentIntentCreateOptions
    {
        Amount = request.Amount,
        Currency = "brl",
        PaymentMethodTypes = new List<string> { "card" }
    };
    
    var service = new PaymentIntentService();
    var paymentIntent = await service.CreateAsync(options);
    
    return Ok(new { ClientSecret = paymentIntent.ClientSecret });
}`}
              </Text>
            </div>
          </div>
        </div>

        {/* Checklist de Implementação */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <Text variant="h3" className="text-lg font-semibold text-yellow-800 mb-4">
            ✅ Checklist de Produção
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Text variant="small" className="text-yellow-700">
                <strong>Segurança:</strong><br />
                ☐ Chaves de produção configuradas<br />
                ☐ Webhooks implementados<br />
                ☐ Validação server-side<br />
                ☐ Rate limiting ativo
              </Text>
            </div>
            <div>
              <Text variant="small" className="text-yellow-700">
                <strong>UX/UI:</strong><br />
                ☐ Loading states<br />
                ☐ Error handling<br />
                ☐ Success confirmations<br />
                ☐ Responsive design
              </Text>
            </div>
          </div>
        </div>

        {/* Cartões de teste */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <Text variant="h3" className="text-lg font-semibold text-blue-800 mb-4">
            🧪 Cartões de Teste Stripe
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <Text variant="small" className="text-blue-700">
                <strong>✅ Sucesso:</strong><br />
                4242 4242 4242 4242<br />
                <span className="text-gray-600">CVC: qualquer 3 dígitos</span>
              </Text>
            </div>
            <div className="bg-white p-3 rounded border">
              <Text variant="small" className="text-blue-700">
                <strong>❌ Cartão Recusado:</strong><br />
                4000 0000 0000 0002<br />
                <span className="text-gray-600">Simula falha de pagamento</span>
              </Text>
            </div>
            <div className="bg-white p-3 rounded border">
              <Text variant="small" className="text-blue-700">
                <strong>🔄 3D Secure:</strong><br />
                4000 0027 6000 3184<br />
                <span className="text-gray-600">Requer autenticação</span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TestPaymentPageAtomic;
