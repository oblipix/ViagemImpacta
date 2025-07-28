import React from 'react';
import { Button, Container, Text } from '../atoms';

const HotelTestPageAtomic = ({ onBack }) => {
    const [testData, setTestData] = React.useState(null);
    const [availabilityData, setAvailabilityData] = React.useState(null);
    const [multiDateAvailability, setMultiDateAvailability] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const API_BASE_URL = 'http://localhost:5155/api';

    const seedTestData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/HotelTest/seed-test-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            setTestData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadHotelsWithRoomTypes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/HotelTest/hotels-with-room-types`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            setAvailabilityData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMultiDateAvailability = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/HotelTest/multi-date-availability?days=7`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            setMultiDateAvailability(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const simulateReservation = async (roomTypeId) => {
        setLoading(true);
        setError(null);
        try {
            const checkIn = new Date();
            const checkOut = new Date();
            checkOut.setDate(checkIn.getDate() + 3); // Reserva de 3 dias

            const reservationData = {
                roomTypeId: roomTypeId,
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
                quantity: 1
            };

            const response = await fetch(`${API_BASE_URL}/HotelTest/simulate-reservation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }
            
            const data = await response.json();
            alert(`Reserva realizada com sucesso! ${data.message}`);
            
            // Recarregar dados para ver a atualização da disponibilidade
            loadHotelsWithRoomTypes();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Text variant="h1" className="text-3xl font-bold mb-2">
                        🧪 Teste de Hotéis & Tipos de Quartos
                    </Text>
                    <Text variant="body" className="text-gray-600">
                        Página de teste para verificar o comportamento da nova arquitetura de RoomTypes e Availability
                    </Text>
                </div>
                <Button variant="ghost" onClick={onBack}>
                    ← Voltar
                </Button>
            </div>

            {/* Explicação da Evolução */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 border border-blue-200">
                <Text variant="h2" className="text-xl font-bold mb-4 text-blue-900">
                    🔄 Evolução da Arquitetura: Antes vs. Agora
                </Text>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <Text variant="h3" className="font-bold text-red-800 mb-2">
                            ❌ ANTES - Arquitetura Limitada
                        </Text>
                        <ul className="space-y-1 text-sm text-red-700">
                            <li>• RoomType como ENUM (Standard, Deluxe, Suite)</li>
                            <li>• Tipos fixos para todos os hotéis</li>
                            <li>• Sem controle de quantidade por tipo</li>
                            <li>• Sem controle de disponibilidade por data</li>
                            <li>• Preços fixos no Room</li>
                            <li>• Impossível ter hotéis com configurações diferentes</li>
                        </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <Text variant="h3" className="font-bold text-green-800 mb-2">
                            ✅ AGORA - Arquitetura Flexível
                        </Text>
                        <ul className="space-y-1 text-sm text-green-700">
                            <li>• RoomType como ENTIDADE independente</li>
                            <li>• Cada hotel define seus próprios tipos</li>
                            <li>• Controle de TotalQuantity por tipo</li>
                            <li>• Availability por RoomType/Data</li>
                            <li>• Preços dinâmicos por tipo e demanda</li>
                            <li>• Escalabilidade para N hotéis diferentes</li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Text variant="body" className="text-yellow-800 text-sm">
                        <strong>💡 Próximos passos:</strong> Sistema de preços dinâmicos baseado em disponibilidade, 
                        sazonalidade e demanda histórica para otimizar receita.
                    </Text>
                </div>
            </div>

            {/* Ações */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <Text variant="h2" className="text-xl font-bold mb-4">
                    🎬 Ações de Teste
                </Text>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                        variant="primary" 
                        onClick={seedTestData}
                        disabled={loading}
                        className="h-12"
                    >
                        {loading ? '⏳ Processando...' : '🌱 Criar Dados de Teste'}
                    </Button>
                    
                    <Button 
                        variant="secondary" 
                        onClick={loadHotelsWithRoomTypes}
                        disabled={loading}
                        className="h-12"
                    >
                        {loading ? '⏳ Carregando...' : '🏨 Carregar Hotéis'}
                    </Button>

                    <Button 
                        variant="outline" 
                        onClick={loadMultiDateAvailability}
                        disabled={loading}
                        className="h-12"
                    >
                        {loading ? '⏳ Carregando...' : '📅 Ver 7 Dias'}
                    </Button>
                </div>

                {testData && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <Text variant="body" className="font-semibold text-green-800">
                            ✅ Dados criados com sucesso!
                        </Text>
                        <Text variant="body" className="text-green-700 mt-1">
                            {testData.hotelsCreated} hotéis, {testData.roomTypesCreated} tipos de quartos, {testData.availabilityRecordsCreated} registros de disponibilidade
                        </Text>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <Text variant="body" className="font-semibold text-red-800">
                            ❌ Erro:
                        </Text>
                        <Text variant="body" className="text-red-700 mt-1">
                            {error}
                        </Text>
                    </div>
                )}
            </div>

            {/* Dados dos Hotéis */}
            {availabilityData && (
                <div className="space-y-6">
                    <Text variant="h2" className="text-2xl font-bold">
                        🏨 Hotéis e Tipos de Quartos
                    </Text>
                    
                    {availabilityData.map(hotel => (
                        <div key={hotel.hotelId} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Header do Hotel */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                                <Text variant="h3" className="text-xl font-bold mb-2">
                                    {hotel.name}
                                </Text>
                                <Text variant="body" className="opacity-90">
                                    📍 {hotel.city} • ⭐ {hotel.stars} estrelas
                                </Text>
                                <Text variant="body" className="opacity-80 text-sm mt-1">
                                    {hotel.hotelAddress}
                                </Text>
                            </div>

                            {/* Tipos de Quartos */}
                            <div className="p-6">
                                <Text variant="h4" className="text-lg font-semibold mb-4">
                                    💼 Tipos de Quartos ({hotel.roomTypes.length})
                                </Text>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {hotel.roomTypes.map(roomType => (
                                        <div 
                                            key={roomType.roomTypeId} 
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                        >
                                            <Text variant="h5" className="font-bold text-lg mb-2">
                                                {roomType.name}
                                            </Text>
                                            
                                            <Text variant="body" className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {roomType.description}
                                            </Text>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex justify-between">
                                                    <Text variant="body" className="text-sm">Capacidade:</Text>
                                                    <Text variant="body" className="text-sm font-semibold">{roomType.maxOccupancy} pessoas</Text>
                                                </div>
                                                
                                                <div className="flex justify-between">
                                                    <Text variant="body" className="text-sm">Preço base:</Text>
                                                    <Text variant="body" className="text-sm font-semibold text-green-600">
                                                        R$ {roomType.basePrice}
                                                    </Text>
                                                </div>
                                                
                                                <div className="flex justify-between">
                                                    <Text variant="body" className="text-sm">Total quartos:</Text>
                                                    <Text variant="body" className="text-sm font-semibold">{roomType.totalQuantity}</Text>
                                                </div>
                                                
                                                <div className="flex justify-between">
                                                    <Text variant="body" className="text-sm">Disponível hoje:</Text>
                                                    <Text variant="body" className={`text-sm font-semibold ${
                                                        roomType.availableToday > 0 ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {roomType.availableToday || roomType.totalQuantity}
                                                    </Text>
                                                </div>
                                            </div>

                                            <Button 
                                                variant={roomType.availableToday > 0 ? "primary" : "secondary"}
                                                size="sm"
                                                className="w-full"
                                                disabled={loading || (roomType.availableToday === 0)}
                                                onClick={() => simulateReservation(roomType.roomTypeId)}
                                            >
                                                {roomType.availableToday > 0 ? '📅 Simular Reserva' : '❌ Indisponível'}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Disponibilidade de Múltiplas Datas */}
            {multiDateAvailability && (
                <div className="space-y-6">
                    <Text variant="h2" className="text-2xl font-bold">
                        📅 Disponibilidade dos Próximos 7 Dias
                    </Text>
                    
                    {/* Agrupar por hotel */}
                    {Object.entries(
                        multiDateAvailability.reduce((acc, item) => {
                            if (!acc[item.hotelId]) {
                                acc[item.hotelId] = {
                                    hotelName: item.hotelName,
                                    dates: []
                                };
                            }
                            acc[item.hotelId].dates.push(item);
                            return acc;
                        }, {})
                    ).map(([hotelId, hotelData]) => (
                        <div key={hotelId} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Header do Hotel */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
                                <Text variant="h3" className="text-lg font-bold">
                                    🏨 {hotelData.hotelName} - Ocupação por Data
                                </Text>
                            </div>

                            {/* Grid de Datas */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {hotelData.dates.map((dateInfo, index) => (
                                        <div 
                                            key={index} 
                                            className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100"
                                        >
                                            <div className="text-center mb-3">
                                                <Text variant="h5" className="font-bold text-gray-800">
                                                    {dateInfo.date}
                                                </Text>
                                                <Text variant="body" className="text-xs text-gray-600 capitalize">
                                                    {dateInfo.dayOfWeek}
                                                </Text>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                {dateInfo.roomTypes.map(roomType => {
                                                    const occupancyColor = roomType.occupancyPercentage > 80 ? 'text-red-600' : 
                                                                          roomType.occupancyPercentage > 50 ? 'text-yellow-600' : 'text-green-600';
                                                    
                                                    return (
                                                        <div key={roomType.roomTypeId} className="bg-white rounded p-2 border">
                                                            <Text variant="body" className="text-xs font-semibold text-gray-800">
                                                                {roomType.roomTypeName}
                                                            </Text>
                                                            <div className="flex justify-between items-center mt-1">
                                                                <Text variant="body" className="text-xs text-gray-600">
                                                                    {roomType.availableQuantity}/{roomType.totalQuantity}
                                                                </Text>
                                                                <Text variant="body" className={`text-xs font-bold ${occupancyColor}`}>
                                                                    {roomType.occupancyPercentage}% ocupado
                                                                </Text>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                <div 
                                                                    className={`h-1.5 rounded-full ${
                                                                        roomType.occupancyPercentage > 80 ? 'bg-red-500' : 
                                                                        roomType.occupancyPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                                                    }`}
                                                                    style={{ width: `${roomType.occupancyPercentage}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="mt-12 space-y-6">
                {/* Como Testar */}
                <div className="p-6 bg-gray-50 rounded-lg">
                    <Text variant="h4" className="font-bold mb-2">
                        📝 Como Testar:
                    </Text>
                    <div className="space-y-1 text-sm text-gray-700">
                        <Text variant="body">1. Clique em "Criar Dados de Teste" para popular o banco com hotéis e tipos de quartos diferentes</Text>
                        <Text variant="body">2. Clique em "Carregar Hotéis" para ver os dados criados (disponibilidade apenas para hoje)</Text>
                        <Text variant="body">3. Clique em "Ver 7 Dias" para visualizar disponibilidade de múltiplas datas</Text>
                        <Text variant="body">4. Teste reservas clicando em "Simular Reserva" - veja a disponibilidade diminuir</Text>
                        <Text variant="body">5. Cada hotel tem configurações diferentes de tipos e quantidades de quartos</Text>
                    </div>
                </div>

                {/* Preços Dinâmicos */}
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <Text variant="h4" className="font-bold mb-3 text-blue-900">
                        💰 Sistema de Preços Dinâmicos (Próxima Implementação)
                    </Text>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Text variant="h5" className="font-semibold text-blue-800 mb-2">
                                📊 Estrutura Necessária:
                            </Text>
                            <ul className="space-y-1 text-sm text-blue-700">
                                <li>• <strong>Tabela PricingRules:</strong> Regras de precificação</li>
                                <li>• <strong>Tabela SeasonalPricing:</strong> Preços sazonais</li>
                                <li>• <strong>Tabela DemandMultiplier:</strong> Multiplicadores por demanda</li>
                                <li>• <strong>Tabela PriceHistory:</strong> Histórico de preços</li>
                            </ul>
                        </div>
                        
                        <div>
                            <Text variant="h5" className="font-semibold text-blue-800 mb-2">
                                ⚙️ Lógica de Cálculo:
                            </Text>
                            <ul className="space-y-1 text-sm text-blue-700">
                                <li>• <strong>BasePrice:</strong> Preço base do RoomType</li>
                                <li>• <strong>Ocupação:</strong> Multiplicador por % ocupação</li>
                                <li>• <strong>Sazonalidade:</strong> Férias, feriados, eventos</li>
                                <li>• <strong>Antecedência:</strong> Desconto/acréscimo por prazo</li>
                                <li>• <strong>Demanda:</strong> Histórico de procura</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300">
                        <Text variant="body" className="text-blue-800 text-sm">
                            <strong>💡 Exemplo:</strong> Quarto Deluxe (R$ 300 base) + 80% ocupado (×1.4) + Feriado (×1.2) + 
                            Reserva antecipada (×0.9) = <strong>R$ 453,60</strong>
                        </Text>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default HotelTestPageAtomic;
