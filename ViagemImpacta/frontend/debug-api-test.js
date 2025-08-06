// Debug script para testar APIs
console.log('=== TESTE DE DEBUG DA API ===');

// Teste 1: Verificar se a API de hotéis está funcionando
fetch('https://tripzback.azurewebsites.net/api/hotels')
  .then(response => {
    console.log('🏨 Hotéis API Status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('🏨 Hotéis API Data:', data);
  })
  .catch(error => {
    console.error('❌ Erro na API de hotéis:', error);
  });

// Teste 2: Verificar token de autenticação
const token = localStorage.getItem('authToken');
console.log('🔑 Token existe:', !!token);
console.log('🔑 Token (primeiros 50 chars):', token ? token.substring(0, 50) + '...' : 'null');

// Teste 3: Testar criação de reserva (sem Stripe)
const testReservation = {
  UserId: 1, // ID teste
  RoomId: 1,
  HotelId: 1,
  CheckIn: '2025-08-08',
  CheckOut: '2025-08-16',
  NumberOfGuests: 1,
  SpecialRequests: 'Teste de debug',
  Travellers: [
    {
      FirstName: 'Maria',
      LastName: 'Silva',
      Cpf: '12345678901'
    }
  ]
};

if (token) {
  console.log('🧪 Testando criação de reserva...');
  fetch('https://tripzback.azurewebsites.net/api/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(testReservation)
  })
  .then(response => {
    console.log('📝 Reservas API Status:', response.status);
    console.log('📝 Reservas API Headers:', response.headers);
    
    // Se não for JSON, vamos ver o que está sendo retornado
    const contentType = response.headers.get('content-type');
    console.log('📝 Content-Type:', contentType);
    
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return response.text();
    }
  })
  .then(data => {
    console.log('📝 Reservas API Response:', data);
  })
  .catch(error => {
    console.error('❌ Erro na API de reservas:', error);
  });
} else {
  console.log('⚠️ Não é possível testar reservas sem token de autenticação');
}

console.log('=== FIM DO TESTE ===');
