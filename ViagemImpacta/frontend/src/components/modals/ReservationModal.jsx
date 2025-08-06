/* eslint-disable no-unused-vars */
// src/components/modals/ReservationModal.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { reservationService } from '../../services/reservationService.js';
import { paymentService } from '../../services/paymentService.js';
import { Icons } from '../layout/Icons.jsx';
import DateErrorModal from './DateErrorModal.jsx'; // Importa o modal de erro de data

const ReservationModal = ({ isOpen, onClose, hotel, room, onSuccess, isPromotion = false, promotionDates = null }) => {
  const { currentUser, isLoggedIn, addReservationToHistory } = useAuth();
  
  // Função para obter a data mínima permitida (amanhã)
  const getMinDate = () => {
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Função para obter a data de hoje para comparação
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    checkIn: isPromotion && promotionDates ? promotionDates.checkIn : '',
    checkOut: isPromotion && promotionDates ? promotionDates.checkOut : '',
    numberOfGuests: 1,
    specialRequests: '',
    travellers: [
      {
        firstName: '',
        lastName: '',
        cpf: ''
      }
    ]
  });

  // Debug log para verificar as datas da promoção
  React.useEffect(() => {
    console.log('ReservationModal - isPromotion:', isPromotion);
    console.log('ReservationModal - promotionDates:', promotionDates);
    console.log('ReservationModal - formData.checkIn:', formData.checkIn);
    console.log('ReservationModal - formData.checkOut:', formData.checkOut);
    
    // Para promoções, define o total fixo imediatamente
    if (isPromotion && room?.price) {
      setCalculatedTotal({
        nights: 1, // Não importa o número real de noites para promoções
        basePrice: room.price,
        total: room.price
      });
    }
  }, [isPromotion, promotionDates, formData.checkIn, formData.checkOut, room?.price]);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [calculatedTotal, setCalculatedTotal] = useState(null);

  // Estado para o modal de erro de data
  const [dateErrorModal, setDateErrorModal] = useState({
    isOpen: false,
    message: '',
    title: 'Data não permitida'
  });

  // Verifica se o usuário está logado
  if (!isLoggedIn || !currentUser) {
    return null; // Não renderiza o modal se não estiver logado
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Se for promoção, não permitir alteração das datas
    if (isPromotion && (name === 'checkIn' || name === 'checkOut')) {
      return; // Não faz nada, mantém as datas bloqueadas
    }
    
    // Validação para campos de data
    if (name === 'checkIn' || name === 'checkOut') {
      const today = getTodayDate();
      const minDate = getMinDate();
      
      // Valida se a data não é anterior a amanhã (ou igual a hoje)
      if (value && (value < minDate || value === today)) {
        setDateErrorModal({
          isOpen: true,
          message: 'Só é permitido agendar em datas posteriores ao dia de hoje!',
          title: 'Data não permitida'
        });
        return;
      }
      
      // Validação adicional para check-out: deve ser posterior ao check-in
      if (name === 'checkOut' && formData.checkIn && value && value <= formData.checkIn) {
        setDateErrorModal({
          isOpen: true,
          message: 'A data de check-out deve ser posterior à data de check-in!',
          title: 'Data inválida'
        });
        return;
      }
      
      // Se check-in for alterado e check-out for anterior, limpar check-out
      if (name === 'checkIn' && formData.checkOut && value && formData.checkOut <= value) {
        setFormData(prev => ({
          ...prev,
          checkIn: value,
          checkOut: ''
        }));
        setCalculatedTotal(null);
        return;
      }
    }
    
    if (name === 'numberOfGuests') {
      const guestCount = parseInt(value);
      const newTravellers = [];
      
      // Ajusta a lista de viajantes baseado no número de hóspedes
      for (let i = 0; i < guestCount; i++) {
        newTravellers.push(formData.travellers[i] || {
          firstName: '',
          lastName: '',
          cpf: ''
        });
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: guestCount,
        travellers: newTravellers
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Recalcula o total quando as datas mudam (apenas para reservas normais, não promoções)
    const checkIn = name === 'checkIn' ? value : formData.checkIn;
    const checkOut = name === 'checkOut' ? value : formData.checkOut;
    
    if (!isPromotion && checkIn && checkOut && checkOut > checkIn) {
      const total = reservationService.calculateReservationTotal(room.price, checkIn, checkOut);
      setCalculatedTotal(total);
    } else if (isPromotion) {
      // Para promoções, usa o preço fixo do room sem cálculos
      setCalculatedTotal({
        nights: 1, // Não importa o número real de noites para promoções
        basePrice: room.price,
        total: room.price
      });
    }
  };

  const handleTravellerChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      travellers: prev.travellers.map((traveller, i) => 
        i === index ? { ...traveller, [field]: value } : traveller
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      // Debug: vamos ver os dados que estão sendo enviados
      console.log('Room data:', room);
      console.log('Hotel data:', hotel);
      console.log('Current user:', currentUser);

      // Prepara os dados da reserva usando o paymentService
      const reservationData = paymentService.formatReservationData(
        formData, 
        room, 
        hotel, 
        currentUser.id || currentUser.userId
      );

      console.log('Reservation data being sent:', reservationData);

      // Valida os dados
      const validation = reservationService.validateReservationData({
        ...reservationData,
        userId: currentUser.id || currentUser.userId,
        roomId: room.id || 1,
        hotelId: hotel.id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        numberOfGuests: parseInt(formData.numberOfGuests),
        specialRequests: formData.specialRequests,
        travellers: formData.travellers
      });

      if (!validation.isValid) {
        console.log('Validation errors:', validation.errors);
        setErrors(validation.errors);
        setLoading(false);
        return;
      }

      // Processa a reserva e redireciona para o pagamento
      // Salva imediatamente no histórico (como "pendente" até o pagamento ser confirmado)
      const reservationForHistory = {
        reservationId: Date.now(), // Temporário até receber o ID real
        hotelId: hotel.id || hotel.hotelId,
        hotelName: hotel.name || hotel.title,
        hotelImage: hotel.mainImageUrl || hotel.image,
        roomType: room.type || room.name || 'Quarto Padrão',
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        totalPrice: calculatedTotal?.total || 0,
        numberOfGuests: parseInt(formData.numberOfGuests),
        travellers: formData.travellers,
        location: hotel.location,
        status: 'pending' // Marcamos como pendente até confirmação do pagamento
      };
      
      addReservationToHistory(reservationForHistory);
      
      await paymentService.processReservationAndPayment(reservationData);
      
      // Se chegou até aqui, o processo foi iniciado com sucesso
      // O usuário será redirecionado para o Stripe, então fechamos o modal
      onClose();

    } catch (error) {
      console.error('Error creating reservation:', error);
      setErrors([error.message]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      checkIn: '',
      checkOut: '',
      numberOfGuests: 1,
      specialRequests: '',
      travellers: [
        {
          firstName: '',
          lastName: '',
          cpf: ''
        }
      ]
    });
    setErrors([]);
    setCalculatedTotal(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white/95 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl border border-gray-200 my-8">
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Fazer Reserva</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6" style={{maxHeight: 'calc(90vh - 200px)'}}>
          {/* Info do Hotel e Quarto */}
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-800">{hotel.title}</h3>
            <p className="text-gray-600 text-sm flex items-center">
              <Icons.Location />
              <span className="ml-1">{hotel.location}</span>
            </p>
            <div className="mt-4 pt-2 border-t border-gray-200">
              <p className="font-medium text-gray-800">{room.type}</p>
              <p className="text-sm text-gray-600">{room.description}</p>
              <p className="text-xl font-bold text-blue-800 mt-2">
                R$ {room.price.toFixed(2).replace('.', ',')} / noite
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form id="reservation-form" onSubmit={handleSubmit}>
            {/* Erros */}
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <ul className="text-red-600 text-sm">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in {isPromotion && <span className="text-red-600 text-xs">(Data da Promoção - Não Alterável)</span>}
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  min={getMinDate()}
                  onChange={handleInputChange}
                  readOnly={isPromotion}
                  onBlur={(e) => {
                    const { value } = e.target;
                    const today = getTodayDate();
                    const minDate = getMinDate();
                    
                    if (value && (value < minDate || value === today)) {
                      e.target.setCustomValidity('Só é permitido agendar em datas posteriores ao dia de hoje!');
                    } else {
                      e.target.setCustomValidity('');
                    }
                  }}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('Só é permitido agendar em datas posteriores ao dia de hoje!');
                  }}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isPromotion ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out {isPromotion && <span className="text-red-600 text-xs">(Data da Promoção - Não Alterável)</span>}
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  min={formData.checkIn || getMinDate()}
                  onChange={handleInputChange}
                  readOnly={isPromotion}
                  onBlur={(e) => {
                    const { value } = e.target;
                    const today = getTodayDate();
                    const minDate = getMinDate();
                    const checkInDate = formData.checkIn;
                    
                    if (value && (value < minDate || value === today)) {
                      e.target.setCustomValidity('Só é permitido agendar em datas posteriores ao dia de hoje!');
                    } else if (value && checkInDate && value <= checkInDate) {
                      e.target.setCustomValidity('A data de check-out deve ser posterior à data de check-in!');
                    } else {
                      e.target.setCustomValidity('');
                    }
                  }}
                  onInvalid={(e) => {
                    const checkInDate = formData.checkIn;
                    if (formData.checkOut && checkInDate && formData.checkOut <= checkInDate) {
                      e.target.setCustomValidity('A data de check-out deve ser posterior à data de check-in!');
                    } else {
                      e.target.setCustomValidity('Só é permitido agendar em datas posteriores ao dia de hoje!');
                    }
                  }}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isPromotion ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  required
                />
              </div>
            </div>

            {/* Número de hóspedes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Hóspedes
              </label>
              <select
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'hóspede' : 'hóspedes'}</option>
                ))}
              </select>
            </div>

            {/* Dados dos viajantes */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Dados dos Hóspedess</h4>
              {formData.travellers.map((traveller, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-3">
                    Viajante {index + 1} {index === 0 && '(Responsável pela reserva)'}
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={traveller.firstName}
                        onChange={(e) => handleTravellerChange(index, 'firstName', e.target.value)}
                        placeholder="Nome"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sobrenome *
                      </label>
                      <input
                        type="text"
                        value={traveller.lastName}
                        onChange={(e) => handleTravellerChange(index, 'lastName', e.target.value)}
                        placeholder="Sobrenome"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CPF * (apenas números)
                    </label>
                    <input
                      type="text"
                      value={traveller.cpf}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                        handleTravellerChange(index, 'cpf', value);
                      }}
                      placeholder="00000000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      maxLength="11"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Solicitações especiais */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Solicitações Especiais (opcional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="3"
                placeholder="Ex: quarto no andar alto, cama extra..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Resumo do valor */}
            {calculatedTotal && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {isPromotion ? 'Resumo da Promoção' : 'Resumo da Reserva'}
                </h4>
                <div className="space-y-1 text-sm">
                  {isPromotion ? (
                    <div className="flex justify-between">
                      <span>Valor da Promoção (Datas Fixas)</span>
                      <span>R$ {calculatedTotal.total.toFixed(2).replace('.', ',')}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span>{calculatedTotal.days} {calculatedTotal.days === 1 ? 'noite' : 'noites'} × R$ {calculatedTotal.dailyPrice.toFixed(2).replace('.', ',')}</span>
                      <span>R$ {calculatedTotal.subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  {/* TAXAS REMOVIDAS - NÃO MOSTRAR MAIS
                  <div className="flex justify-between">
                    <span>Taxas e impostos</span>
                    <span>R$ {calculatedTotal.taxes.toFixed(2).replace('.', ',')}</span>
                  </div>
                  */}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ {calculatedTotal.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {isPromotion && (
                    <div className="text-xs text-red-600 mt-2 font-medium">
                      🔥 Valor promocional fixo - Datas não alteráveis
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="flex-shrink-0 p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="main-action-button flex-1 px-4 py-2 text-white rounded-md transition disabled:bg-blue-300"
              form="reservation-form"
            >
              {loading ? 'Processando...' : 'Reservar e Pagar'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de erro de data */}
      <DateErrorModal
        isOpen={dateErrorModal.isOpen}
        onClose={() => setDateErrorModal({ ...dateErrorModal, isOpen: false })}
        message={dateErrorModal.message}
        title={dateErrorModal.title}
      />
    </div>
  );
};

export default ReservationModal;
