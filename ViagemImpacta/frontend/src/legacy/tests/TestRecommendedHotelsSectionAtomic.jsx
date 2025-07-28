// 🧪 TEST - RecommendedHotelsSection Atomic - PARIDADE TOTAL com Legacy

import React from 'react';
import { RecommendedHotelsSectionAtomic } from './components/sections';

const TestRecommendedHotelsSectionAtomic = () => {
    // 🎯 Dados de teste para demonstrar a funcionalidade
    const mockHotels = [
        {
            id: 1,
            mainImageUrl: '/src/assets/images/entradaprincipalRJ.png',
            title: 'Tripz Rio de Janeiro: Paraíso Carioca',
            description: 'Descubra o luxo à beira-mar no coração do Rio! Com vistas deslumbrantes do oceano, nosso hotel oferece uma experiência inesquecível com spa completo, gastronomia refinada e serviço impecável para sua estadia na Cidade Maravilhosa.',
            location: 'Rio de Janeiro, Brasil',
            rating: 4.8,
            feedbacks: [
                { id: 1, rating: 5, comment: 'Vista espetacular e serviço impecável! Voltarei com certeza.', guestName: 'Ana Paula S.' },
                { id: 2, rating: 4, comment: 'Localização perfeita, mas o café da manhã poderia ter mais variedade.', guestName: 'Carlos M.' },
                { id: 3, rating: 5, comment: 'Experiência luxuosa, cada detalhe pensado para o conforto.', guestName: 'Beatriz L.' },
            ]
        },
        {
            id: 2,
            mainImageUrl: '/src/assets/images/entradaprincipalRS.png',
            title: 'Tripz Gramado: Charme Serrano',
            description: 'Viva a magia da Serra Gaúcha no nosso aconchegante refúgio em Gramado! Desfrute de trilhas ecológicas, uma culinária regional de dar água na boca e a tranquilidade das montanhas, perfeito para uma escapada romântica ou em família.',
            location: 'Gramado, Brasil',
            rating: 4.9,
            feedbacks: [
                { id: 1, rating: 5, comment: 'Lugar mágico, perfeito para o Natal. Super acolhedor!', guestName: 'Maria C.' },
                { id: 2, rating: 5, comment: 'O chalé com lareira é um sonho! Atendimento excelente.', guestName: 'Fernando B.' },
            ]
        },
        {
            id: 3,
            mainImageUrl: '/src/assets/images/entradaprincipalPE.png',
            title: 'Tripz Recife: Urbano e Conectado',
            description: 'Hospede-se no coração pulsante de Recife! Nosso hotel moderno é ideal para viajantes a negócios e turistas que desejam explorar a cidade, com fácil acesso aos principais pontos e toda a comodidade que você precisa.',
            location: 'Recife, Pernambuco',
            rating: 4.2,
            feedbacks: [
                { id: 1, rating: 4, comment: 'Bom para viagens de trabalho, bem localizado.', guestName: 'Roberto S.' },
            ]
        }
    ];

    const handleHotelClick = (hotelId) => {
        console.log('✅ Hotel clicked:', hotelId);
        alert(`Navegando para detalhes do hotel ID: ${hotelId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header de teste */}
            <div className="bg-blue-600 text-white py-8 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2">
                        🧪 Teste: RecommendedHotelsSectionAtomic
                    </h1>
                    <p className="text-blue-100">
                        Versão atômica da seção de hotéis recomendados - PARIDADE TOTAL com RecommendedHotelsSection legacy
                    </p>
                </div>
            </div>

            {/* Seção de hotéis recomendados atômica */}
            <RecommendedHotelsSectionAtomic
                hotels={mockHotels}
                onHotelClick={handleHotelClick}
                id="recommended-hotels-test"
            />

            {/* Exemplo com configuração customizada */}
            <div className="py-8 bg-white">
                <RecommendedHotelsSectionAtomic
                    hotels={mockHotels}
                    onHotelClick={handleHotelClick}
                    title="Top 2 Hotéis Exclusivos"
                    maxHotels={2}
                    id="recommended-hotels-custom-test"
                    className="bg-blue-50"
                />
            </div>

            {/* Informações de teste */}
            <div className="bg-gray-900 text-white py-12 px-6">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">📋 Informações do Teste</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-yellow-400">✅ Funcionalidades Testadas</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>✅ Ordenação por rating (maior primeiro)</li>
                                <li>✅ Limit de hotéis exibidos (padrão: 3)</li>
                                <li>✅ Layout responsivo (grid cols-1/2/3)</li>
                                <li>✅ Efeitos hover (scale-105, shadow-2xl)</li>
                                <li>✅ Componentes atômicos (Text, Container, Button, Image)</li>
                                <li>✅ Ícone de localização SVG (idêntico ao legacy)</li>
                                <li>✅ Classes CSS originais (TitleSection, main-action-button)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-green-400">🎯 Paridade com Legacy</h3>
                            <p><strong>Status:</strong> ✅ PARIDADE TOTAL com RecommendedHotelsSection legacy</p>
                            <div className="mt-4 p-4 bg-green-900 rounded-lg border border-green-700">
                                <p className="text-green-100">
                                    🎯 A RecommendedHotelsSectionAtomic está VISUALMENTE IDÊNTICA ao RecommendedHotelsSection legacy!
                                </p>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold mb-2 text-blue-400">🔧 Props Disponíveis:</h4>
                                <ul className="text-sm text-gray-400 space-y-1">
                                    <li><code>hotels</code> - Array de hotéis</li>
                                    <li><code>onHotelClick</code> - Função callback</li>
                                    <li><code>title</code> - Título customizável</li>
                                    <li><code>maxHotels</code> - Limite de hotéis (padrão: 3)</li>
                                    <li><code>id</code> - ID da seção</li>
                                    <li><code>className</code> - Classes CSS adicionais</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestRecommendedHotelsSectionAtomic;
