// 🔧 STRIPE SERVICE - Integração com Stripe API
// Serviços para processar pagamentos com Stripe

import { useState } from 'react';
import { apiService } from './apiService';

class StripeService {
  constructor() {
    this.stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_stripe_key_here';
    this.apiUrl = '/api/payments';
  }

  // 🏗️ Criar Payment Intent no Stripe
  async createPaymentIntent(paymentData) {
    try {
      const response = await apiService.post(`${this.apiUrl}/create-payment-intent`, {
        amount: paymentData.amount * 100, // Converter para centavos
        currency: 'brl',
        payment_method_types: ['card'],
        metadata: {
          promotion_id: paymentData.promotionId,
          package_type: paymentData.packageType,
          customer_email: paymentData.customerEmail,
          customer_cpf: paymentData.customerCpf
        },
        description: `${paymentData.promotionTitle} - ${paymentData.packageType}`,
        receipt_email: paymentData.customerEmail
      });

      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar Payment Intent:', error);
      throw new Error('Falha ao inicializar pagamento. Tente novamente.');
    }
  }

  // ✅ Confirmar pagamento
  async confirmPayment(paymentIntentId, paymentMethodId) {
    try {
      const response = await apiService.post(`${this.apiUrl}/confirm-payment`, {
        payment_intent_id: paymentIntentId,
        payment_method_id: paymentMethodId
      });

      return response.data;
    } catch (error) {
      console.error('❌ Erro ao confirmar pagamento:', error);
      throw new Error('Falha ao processar pagamento. Verifique os dados do cartão.');
    }
  }

  // 📱 Criar QR Code PIX
  async createPixPayment(pixData) {
    try {
      const response = await apiService.post(`${this.apiUrl}/create-pix`, {
        amount: pixData.amount,
        description: pixData.description,
        customer: pixData.customer,
        expiration_minutes: 15 // PIX expira em 15 minutos
      });

      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar PIX:', error);
      throw new Error('Falha ao gerar PIX. Tente novamente.');
    }
  }

  // 🔍 Verificar status do pagamento
  async getPaymentStatus(paymentId) {
    try {
      const response = await apiService.get(`${this.apiUrl}/status/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao verificar status:', error);
      throw new Error('Falha ao verificar status do pagamento.');
    }
  }

  // 💰 Listar métodos de pagamento salvos do cliente
  async getCustomerPaymentMethods(customerId) {
    try {
      const response = await apiService.get(`${this.apiUrl}/customer/${customerId}/payment-methods`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar métodos de pagamento:', error);
      return [];
    }
  }

  // 📊 Obter taxas e informações de pagamento
  async getPaymentFees(amount, paymentType = 'card') {
    try {
      const response = await apiService.get(`${this.apiUrl}/fees`, {
        params: { amount, payment_type: paymentType }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao calcular taxas:', error);
      return { fees: 0, total: amount };
    }
  }

  // 🔄 Processar reembolso
  async createRefund(paymentIntentId, amount = null, reason = 'requested_by_customer') {
    try {
      const response = await apiService.post(`${this.apiUrl}/refund`, {
        payment_intent_id: paymentIntentId,
        amount: amount ? amount * 100 : null, // null = reembolso total
        reason,
        metadata: {
          refund_date: new Date().toISOString(),
          processed_by: 'system'
        }
      });

      return response.data;
    } catch (error) {
      console.error('❌ Erro ao processar reembolso:', error);
      throw new Error('Falha ao processar reembolso. Contate o suporte.');
    }
  }

  // 📈 Obter histórico de pagamentos do cliente
  async getPaymentHistory(customerEmail, limit = 10) {
    try {
      const response = await apiService.get(`${this.apiUrl}/history`, {
        params: { customer_email: customerEmail, limit }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar histórico:', error);
      return [];
    }
  }

  // 🎫 Validar cupom de desconto
  async validateCoupon(couponCode, amount) {
    try {
      const response = await apiService.post(`${this.apiUrl}/validate-coupon`, {
        coupon_code: couponCode,
        amount
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao validar cupom:', error);
      throw new Error('Cupom inválido ou expirado.');
    }
  }

  // 💎 Aplicar cupom de desconto
  async applyCoupon(paymentIntentId, couponCode) {
    try {
      const response = await apiService.post(`${this.apiUrl}/apply-coupon`, {
        payment_intent_id: paymentIntentId,
        coupon_code: couponCode
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao aplicar cupom:', error);
      throw new Error('Falha ao aplicar cupom. Verifique o código.');
    }
  }
}

// 🚀 Instância única do serviço
export const stripeService = new StripeService();

// 🎯 Hook personalizado para pagamentos
export const useStripePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const processPayment = async (paymentData) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Criar Payment Intent
      const paymentIntent = await stripeService.createPaymentIntent(paymentData);
      
      // 2. Processar pagamento (isso seria feito com Stripe Elements no frontend)
      // Em produção, o Stripe Elements cuidaria desta parte
      
      return paymentIntent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const processPixPayment = async (pixData) => {
    setIsLoading(true);
    setError(null);

    try {
      const pixPayment = await stripeService.createPixPayment(pixData);
      return pixPayment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processPayment,
    processPixPayment,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};
