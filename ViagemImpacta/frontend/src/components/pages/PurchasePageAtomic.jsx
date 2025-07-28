import React from 'react';
import { Button, SVGIcon } from '../atoms';

// 🎯 PÁGINA ATÔMICA - Página de Compra/Checkout
// 
// Esta página permite finalizar a compra de um pacote ou promoção
const PurchasePageAtomic = ({ onBack, promotionToPurchase }) => {
  // 🎯 ESTADOS DO FORMULÁRIO
  const [step, setStep] = React.useState(1); // 1: Dados pessoais, 2: Pagamento, 3: Confirmação
  const [passengers, setPassengers] = React.useState(1);
  const [formData, setFormData] = React.useState({
    // Dados pessoais
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    // Endereço
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    // Pagamento
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: 1
  });

  // 🎯 PROMOÇÃO PADRÃO (caso não seja passada)
  const defaultPromotion = {
    id: 1,
    title: 'Super Oferta Nordeste',
    destination: 'Fortaleza, Porto de Galinhas e Maragogi',
    duration: '7 dias / 6 noites',
    discountedPrice: 1799,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'
  };

  const promotion = promotionToPurchase || defaultPromotion;

  // 🎯 CALCULAR VALORES
  const subtotal = promotion.discountedPrice * passengers;
  const taxes = subtotal * 0.05; // 5% de taxas
  const total = subtotal + taxes;

  // 🎯 ATUALIZAR DADOS DO FORMULÁRIO
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 🎯 AVANÇAR ETAPA
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  // 🎯 VOLTAR ETAPA
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // 🎯 FINALIZAR COMPRA
  const completePurchase = () => {
    alert('Compra realizada com sucesso! Você receberá um email com os detalhes da sua reserva.');
    onBack && onBack();
  };

  // 🎯 RENDERIZAR ETAPA 1 - DADOS PESSOAIS
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dados do Passageiro Principal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              value={formData.cpf}
              onChange={(e) => updateFormData('cpf', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="000.000.000-00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => updateFormData('birthDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Passageiros</label>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                variant="outline"
                size="sm"
                type="button"
              >
                -
              </Button>
              <span className="w-12 text-center font-medium">{passengers}</span>
              <Button 
                onClick={() => setPassengers(passengers + 1)}
                variant="outline"
                size="sm"
                type="button"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 🎯 RENDERIZAR ETAPA 2 - PAGAMENTO
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dados de Pagamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => updateFormData('cardNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome no Cartão</label>
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => updateFormData('cardName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome como está no cartão"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => updateFormData('expiryDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/AA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => updateFormData('cvv', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="000"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Parcelamento</label>
            <select
              value={formData.installments}
              onChange={(e) => updateFormData('installments', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">À vista - R$ {total.toLocaleString()}</option>
              <option value="2">2x de R$ {(total / 2).toLocaleString()}</option>
              <option value="3">3x de R$ {(total / 3).toLocaleString()}</option>
              <option value="6">6x de R$ {(total / 6).toLocaleString()}</option>
              <option value="12">12x de R$ {(total / 12).toLocaleString()}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  // 🎯 RENDERIZAR ETAPA 3 - CONFIRMAÇÃO
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SVGIcon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" className="text-green-600 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirme sua reserva</h2>
        <p className="text-gray-600">Revise os dados antes de finalizar</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Resumo da Reserva</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Passageiro:</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Número de passageiros:</span>
            <span className="font-medium">{passengers}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pagamento:</span>
            <span className="font-medium">
              {formData.installments}x no cartão {formData.cardNumber?.slice(-4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <Button onClick={onBack} variant="ghost" className="flex items-center gap-2 mb-4">
            <SVGIcon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            Voltar
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber}
                    </div>
                    <span className={`ml-2 text-sm ${
                      step >= stepNumber ? 'text-blue-600 font-medium' : 'text-gray-500'
                    }`}>
                      {stepNumber === 1 ? 'Dados' : stepNumber === 2 ? 'Pagamento' : 'Confirmação'}
                    </span>
                    {stepNumber < 3 && (
                      <div className={`ml-4 w-16 h-0.5 ${
                        step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Conteúdo da etapa */}
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              {/* Botões de navegação */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button 
                  onClick={prevStep}
                  variant="outline"
                  disabled={step === 1}
                >
                  Voltar
                </Button>
                {step < 3 ? (
                  <Button onClick={nextStep}>
                    Continuar
                  </Button>
                ) : (
                  <Button onClick={completePurchase} className="bg-green-600 hover:bg-green-700">
                    Finalizar Compra
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Resumo da compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo da Compra</h3>
              
              <div className="flex gap-3 mb-4">
                <img 
                  src={promotion.image} 
                  alt={promotion.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">{promotion.title}</h4>
                  <p className="text-xs text-gray-600">{promotion.destination}</p>
                  <p className="text-xs text-gray-600">{promotion.duration}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor por pessoa:</span>
                  <span>R$ {promotion.discountedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passageiros:</span>
                  <span>{passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>R$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxas:</span>
                  <span>R$ {taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>R$ {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <SVGIcon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <span>Cancelamento gratuito até 48h antes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePageAtomic;
