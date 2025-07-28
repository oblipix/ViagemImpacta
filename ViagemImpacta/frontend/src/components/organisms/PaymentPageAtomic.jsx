// 🧬 ORGANISM - PaymentPageAtomic (Preparado para Stripe)
// Página de pagamento integrada com Stripe API - MODERNA E SEGURA

import React, { useState } from 'react';
import { Text, Container, Button, Input, FormGroup } from '../atoms';

// 💳 SIMULAÇÃO: Componente de Cartão de Crédito (Stripe Elements seria usado aqui)
const StripeCardElement = ({ onCardChange, disabled = false }) => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  const handleChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, '').length > 16) return;
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
      if (formattedValue.length > 5) return;
    } else if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    const newCardData = { ...cardData, [field]: formattedValue };
    setCardData(newCardData);
    
    // Validar se o cartão está completo
    const isComplete = newCardData.number.replace(/\s/g, '').length === 16 &&
                      newCardData.expiry.length === 5 &&
                      newCardData.cvc.length >= 3 &&
                      newCardData.name.length > 0;
    
    onCardChange?.(newCardData, isComplete);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <Text variant="h3" className="text-lg font-semibold text-gray-800 mb-4">
        💳 Dados do Cartão de Crédito
      </Text>
      
      <div className="space-y-4">
        <FormGroup label="Nome no cartão" required>
          <Input
            placeholder="Nome no cartão"
            value={cardData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={disabled}
            className="w-full"
          />
        </FormGroup>
        
        <FormGroup label="Número do cartão" required>
          <Input
            placeholder="1234 5678 9012 3456"
            value={cardData.number}
            onChange={(e) => handleChange('number', e.target.value)}
            disabled={disabled}
            className="w-full"
          />
        </FormGroup>
        
        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Validade" required>
            <Input
              placeholder="MM/AA"
              value={cardData.expiry}
              onChange={(e) => handleChange('expiry', e.target.value)}
              disabled={disabled}
            />
          </FormGroup>
          <FormGroup label="CVC" required>
            <Input
              placeholder="CVC"
              value={cardData.cvc}
              onChange={(e) => handleChange('cvc', e.target.value)}
              disabled={disabled}
            />
          </FormGroup>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <Text variant="small" className="text-blue-700 text-xs">
          🔒 <strong>Ambiente de Teste:</strong> Use qualquer número de cartão válido. 
          Em produção, esta área será substituída pelo Stripe Elements.
        </Text>
      </div>
    </div>
  );
};

// 🏧 DADOS PIX para pagamento alternativo
const PixPaymentOption = ({ onPixSelected }) => {
  const pixKey = "viagem@impacta.com.br"; // Chave PIX exemplo

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <Text variant="h3" className="text-lg font-semibold text-gray-800 mb-4">
        📱 PIX - Pagamento Instantâneo
      </Text>
      
      <div className="text-center space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <Text variant="small" className="text-gray-600 block mb-2">Chave PIX:</Text>
          <Text variant="body" className="font-mono text-sm bg-white p-2 rounded border">
            {pixKey}
          </Text>
        </div>
        
        <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-xs">
          QR Code simulado aqui
          <br />
          (Integrate com API PIX real)
        </div>
        
        <Button
          onClick={() => onPixSelected(pixKey)}
          variant="secondary"
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          Pagar com PIX
        </Button>
      </div>
    </div>
  );
};

const PaymentPageAtomic = ({ 
    purchaseData, 
    onBack, 
    onPaymentSuccess,
    onPaymentError,
    className = "",
    ...props 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'pix'
  const [cardComplete, setCardComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingData, setBillingData] = useState({
    email: '',
    cpf: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  // Se não há dados de compra
  if (!purchaseData || !purchaseData.promotionData) {
    return (
      <Container className={`p-4 text-center ${className}`} {...props}>
        <Text variant="h2" className="text-xl text-red-600 mb-4">
          Erro: Dados da compra não encontrados.
        </Text>
        <Button onClick={onBack} variant="secondary">
          ← Voltar
        </Button>
      </Container>
    );
  }

  const { promotionData, selectedPackageType, selectedPrice } = purchaseData;

  // 💰 Função para formatar moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  // 💳 Processar pagamento com cartão (Stripe)
  const processCardPayment = async () => {
    setIsProcessing(true);
    
    try {
      // 🚀 AQUI SERIA A INTEGRAÇÃO REAL COM STRIPE
      const stripePaymentData = {
        amount: selectedPrice * 100, // Stripe trabalha em centavos
        currency: 'brl',
        payment_method_types: ['card'],
        metadata: {
          promotion_id: promotionData.id,
          package_type: selectedPackageType,
          customer_email: billingData.email
        }
      };

      // Simulação de chamada para Stripe
      console.log('🔄 Processando pagamento Stripe:', stripePaymentData);
      
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular sucesso (90% das vezes)
      if (Math.random() > 0.1) {
        const paymentResult = {
          id: `pi_stripe_${Date.now()}`,
          status: 'succeeded',
          amount: selectedPrice * 100,
          currency: 'brl',
          created: new Date().toISOString(),
          payment_method: 'card'
        };
        
        onPaymentSuccess?.(paymentResult);
      } else {
        throw new Error('Cartão recusado pelo banco');
      }
      
    } catch (error) {
      console.error('❌ Erro no pagamento:', error);
      onPaymentError?.(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // 📱 Processar pagamento PIX
  const processPixPayment = async (pixKey) => {
    setIsProcessing(true);
    
    try {
      // 🚀 AQUI SERIA A INTEGRAÇÃO COM API PIX
      const pixPaymentData = {
        amount: selectedPrice,
        pix_key: pixKey,
        description: `${promotionData.title} - ${selectedPackageType}`,
        customer: billingData
      };

      console.log('🔄 Processando pagamento PIX:', pixPaymentData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const paymentResult = {
        id: `pix_${Date.now()}`,
        status: 'pending', // PIX inicia como pendente
        amount: selectedPrice,
        currency: 'brl',
        created: new Date().toISOString(),
        payment_method: 'pix',
        pix_key: pixKey
      };
      
      onPaymentSuccess?.(paymentResult);
      
    } catch (error) {
      console.error('❌ Erro no PIX:', error);
      onPaymentError?.(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container className={`p-6 bg-gray-50 min-h-screen ${className}`} {...props}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Button onClick={onBack} variant="secondary" className="mb-4">
          ← Voltar para Seleção de Pacote
        </Button>
        
        <Text variant="h1" className="text-3xl font-bold text-gray-900 text-center">
          💳 Finalizar Pagamento
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumo da Compra */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <Text variant="h2" className="text-xl font-bold text-gray-800 mb-4">
              📋 Resumo da Compra
            </Text>
            
            <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between">
                <Text variant="small" className="text-gray-600">Promoção:</Text>
                <Text variant="small" className="font-medium">{promotionData.title}</Text>
              </div>
              <div className="flex justify-between">
                <Text variant="small" className="text-gray-600">Pacote:</Text>
                <Text variant="small" className="font-medium capitalize">
                  {selectedPackageType === 'solteiro' ? 'Individual' : 
                   selectedPackageType === 'casal' ? 'Casal' : 'Família'}
                </Text>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Text variant="h3" className="text-lg font-bold text-gray-900">Total:</Text>
              <Text variant="h2" className="text-2xl font-bold text-green-600">
                {formatCurrency(selectedPrice)}
              </Text>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
              <Text variant="small" className="text-green-700 text-xs">
                ✅ Preço garantido por 15 minutos
                <br />
                🔒 Pagamento 100% seguro
              </Text>
            </div>
          </div>
        </div>

        {/* Formulário de Pagamento */}
        <div className="lg:col-span-2">
          {/* Dados do Cliente */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <Text variant="h3" className="text-lg font-semibold text-gray-800 mb-4">
              👤 Dados do Cliente
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup label="Email" required>
                <Input
                  placeholder="Email"
                  type="email"
                  value={billingData.email}
                  onChange={(e) => setBillingData({...billingData, email: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup label="CPF" required>
                <Input
                  placeholder="CPF"
                  value={billingData.cpf}
                  onChange={(e) => setBillingData({...billingData, cpf: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup label="Telefone" required>
                <Input
                  placeholder="Telefone"
                  value={billingData.phone}
                  onChange={(e) => setBillingData({...billingData, phone: e.target.value})}
                  required
                />
              </FormGroup>
            </div>
          </div>

          {/* Seletor de Método de Pagamento */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <Text variant="h3" className="text-lg font-semibold text-gray-800 mb-4">
              💰 Método de Pagamento
            </Text>
            
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={() => setPaymentMethod('card')}
                variant={paymentMethod === 'card' ? 'primary' : 'secondary'}
                className="flex-1"
              >
                💳 Cartão de Crédito
              </Button>
              <Button
                onClick={() => setPaymentMethod('pix')}
                variant={paymentMethod === 'pix' ? 'primary' : 'secondary'}
                className="flex-1"
              >
                📱 PIX
              </Button>
            </div>

            {/* Formulário de Pagamento */}
            {paymentMethod === 'card' ? (
              <StripeCardElement 
                onCardChange={(cardData, isComplete) => setCardComplete(isComplete)}
                disabled={isProcessing}
              />
            ) : (
              <PixPaymentOption 
                onPixSelected={processPixPayment}
              />
            )}
          </div>

          {/* Botão de Finalizar */}
          {paymentMethod === 'card' && (
            <div className="text-center">
              <Button
                onClick={processCardPayment}
                disabled={!cardComplete || isProcessing || !billingData.email || !billingData.cpf}
                variant="primary"
                className="px-8 py-4 text-lg font-bold bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
              >
                {isProcessing ? (
                  <>🔄 Processando...</>
                ) : (
                  <>🔒 Finalizar Pagamento {formatCurrency(selectedPrice)}</>
                )}
              </Button>
              
              <div className="mt-4 flex justify-center items-center space-x-4 text-gray-500">
                <span>🔒</span>
                <Text variant="small">Powered by Stripe</Text>
                <span>💳</span>
                <Text variant="small">SSL Seguro</Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PaymentPageAtomic;
