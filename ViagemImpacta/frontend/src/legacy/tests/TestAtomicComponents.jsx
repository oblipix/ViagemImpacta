import React, { useState } from 'react';
import { Button, Text, Image, Input, Card, Select, Textarea, Label, Modal, Alert, Carousel, HeroSlide, FilterButton } from './atoms';
import { HotelCard, SearchForm, TravelCard, EventReservationFormAtomic, HeroAtomic, FilterBarAtomic, HotelDetailsPageAtomic } from './molecules';
import { HotelList } from './sections';

const TestAtomicComponents = () => {
    const [testMessage, setTestMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [, setAlertType] = useState('success');
    const [showEventForm, setShowEventForm] = useState(false);
    const [selectValue, setSelectValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [showHotelDetails, setShowHotelDetails] = useState(false);

    // 🎯 DADOS DE TESTE
    const testHotel = {
        id: 999,
        title: 'Hotel Teste Atomic Design',
        description: 'Este hotel foi criado usando nossos novos componentes atomic. Teste de descrição mais longa para ver como fica o layout e funcionalidade dos novos componentes.',
        mainImageUrl: 'https://via.placeholder.com/400x300/0EA5E9/FFFFFF?text=Hotel+Teste',
        price: 299.99,
        rating: 4.5,
        location: 'Teste City, Brasil',
        totalRooms: 50,
        totalBathrooms: 50,
        parking: true,
        elevators: 2,
        hasRestaurant: true,
        hasWifi: true,
        leisureFacilities: ['Piscina', 'Academia', 'Spa', 'Bar'],
        galleryImages: [
            { id: 't1', url: 'https://via.placeholder.com/400x300/0EA5E9/FFFFFF?text=Galeria+1', alt: 'Teste Galeria 1' },
            { id: 't2', url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Galeria+2', alt: 'Teste Galeria 2' },
            { id: 't3', url: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Galeria+3', alt: 'Teste Galeria 3' },
        ],
        roomOptions: [
            { type: 'Quarto Teste Standard', description: 'Quarto padrão para teste dos componentes.', price: 200.00, capacity: 2, minCapacity: 1, available: 5, bathrooms: 1, beds: '1 Cama Queen' },
            { type: 'Suíte Teste Premium', description: 'Suíte premium para teste avançado.', price: 400.00, capacity: 2, minCapacity: 1, available: 2, bathrooms: 2, beds: '1 Cama King' },
        ],
        mapUrl: 'https://maps.google.com'
    };

    const testTravel = {
        id: 998,
        title: 'Viagem Teste Atomic',
        description: 'Esta é uma viagem de teste criada com TravelCard atomic.',
        imageUrl: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Viagem+Teste',
        type: 'Nacional',
        status: 'Disponível',
        eventDate: '25/12/2025',
        priceFrom: 500.00,
        priceTo: 399.99
    };

    // 🎯 FUNÇÕES DE TESTE
    const handleTestSearch = (searchData) => {
        console.log('🔍 Teste de busca:', searchData);
        setTestMessage(`Busca realizada: ${searchData.destination}`);
    };

    const handleTestSave = (item) => {
        console.log('💾 Teste de save:', item);
        setTestMessage(`${item.title} foi salvo!`);
    };

    const isTestSaved = (id) => {
        return id === 999; // Hotel teste sempre aparece como salvo
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="container mx-auto max-w-6xl">
                
                {/* Header de Teste */}
                <div className="text-center mb-8">
                    <Text variant="h1" className="mb-4">
                        🧪 Teste dos Componentes Atomic
                    </Text>
                    <Text variant="body" className="text-gray-600">
                        Testando atoms, molecules e sections criados
                    </Text>
                    
                    {testMessage && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                            {testMessage}
                        </div>
                    )}
                </div>

                {/* 🔧 TESTE DOS ATOMS */}
                <Card variant="elevated" className="mb-8 p-6">
                    <Text variant="h2" className="mb-6">
                        🔧 Teste dos Atoms
                    </Text>
                    
                    {/* Botões */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Buttons:</Text>
                        <div className="flex flex-wrap gap-3">
                            <Button 
                                variant="primary" 
                                onClick={() => setTestMessage('Botão Primary clicado!')}
                            >
                                Primary
                            </Button>
                            <Button 
                                variant="active"
                                onClick={() => setTestMessage('Botão Active clicado!')}
                            >
                                Active
                            </Button>
                            <Button 
                                variant="ghost"
                                onClick={() => setTestMessage('Botão Ghost clicado!')}
                            >
                                Ghost
                            </Button>
                            <Button 
                                disabled
                                onClick={() => setTestMessage('Este botão está desabilitado')}
                            >
                                Disabled
                            </Button>
                        </div>
                    </div>

                    {/* Textos */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Texts:</Text>
                        <div className="space-y-2">
                            <Text variant="h1">Heading 1 - Muito Grande</Text>
                            <Text variant="h2">Heading 2 - Grande</Text>
                            <Text variant="h3">Heading 3 - Médio</Text>
                            <Text variant="h4">Heading 4 - Pequeno</Text>
                            <Text variant="body">Body text - Texto normal do corpo</Text>
                            <Text variant="small">Small text - Texto pequeno</Text>
                            <Text variant="caption">Caption - Legendas</Text>
                            <Text variant="price">R$ 1.299,99</Text>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Inputs:</Text>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input placeholder="Input normal" />
                            <Input type="email" placeholder="Email input" />
                            <Input type="date" />
                        </div>
                    </div>

                    {/* Select */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Select:</Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="test-select">Escolha uma opção:</Label>
                                <Select 
                                    id="test-select"
                                    value={selectValue} 
                                    onChange={(e) => setSelectValue(e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="opcao1">Opção 1</option>
                                    <option value="opcao2">Opção 2</option>
                                    <option value="opcao3">Opção 3</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="test-select-error">Select com erro:</Label>
                                <Select id="test-select-error" variant="error">
                                    <option value="">Com erro...</option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Textarea */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Textarea:</Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="test-textarea">Mensagem:</Label>
                                <Textarea 
                                    id="test-textarea"
                                    placeholder="Digite sua mensagem aqui..."
                                    value={textareaValue}
                                    onChange={(e) => setTextareaValue(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="test-textarea-success">Textarea sucesso:</Label>
                                <Textarea 
                                    id="test-textarea-success" 
                                    variant="success"
                                    placeholder="Campo validado com sucesso"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Alerts:</Text>
                        <div className="space-y-3">
                            <Button onClick={() => setShowAlert(!showAlert)}>
                                Toggle Alert
                            </Button>
                            {showAlert && (
                                <>
                                    <Alert variant="success" title="Sucesso!">
                                        Operação realizada com sucesso!
                                    </Alert>
                                    <Alert variant="error" title="Erro!">
                                        Ops! Algo deu errado.
                                    </Alert>
                                    <Alert variant="warning" title="Atenção!">
                                        Verifique os dados antes de continuar.
                                    </Alert>
                                    <Alert variant="info">
                                        Esta é uma informação importante.
                                    </Alert>
                                </>
                            )}
                            <div className="flex gap-2">
                                <Button 
                                    variant="secondary" 
                                    onClick={() => { setAlertType('success'); setShowAlert(true); }}
                                >
                                    Sucesso
                                </Button>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => { setAlertType('error'); setShowAlert(true); }}
                                >
                                    Erro
                                </Button>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => { setAlertType('warning'); setShowAlert(true); }}
                                >
                                    Aviso
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Modal */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Modal:</Text>
                        <Button onClick={() => setShowModal(true)}>
                            Abrir Modal
                        </Button>
                        <Modal 
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            title="Modal de Teste"
                        >
                            <p className="text-gray-600 mb-4">
                                Este é um modal criado com o componente atomic Modal.
                            </p>
                            <Button onClick={() => setShowModal(false)}>
                                Fechar
                            </Button>
                        </Modal>
                    </div>

                    {/* Cards */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Cards:</Text>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card variant="default" className="p-4">
                                <Text variant="small">Default</Text>
                            </Card>
                            <Card variant="elevated" className="p-4">
                                <Text variant="small">Elevated</Text>
                            </Card>
                            <Card variant="outlined" className="p-4">
                                <Text variant="small">Outlined</Text>
                            </Card>
                            <Card variant="flat" className="p-4">
                                <Text variant="small">Flat</Text>
                            </Card>
                        </div>
                    </div>

                    {/* FilterButtons */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">FilterButton:</Text>
                        <div className="flex flex-wrap gap-4">
                            <FilterButton isActive={false}>
                                Normal
                            </FilterButton>
                            <FilterButton isActive={true}>
                                Ativo
                            </FilterButton>
                            <FilterButton 
                                variant="link" 
                                href="#test"
                                onClick={() => setTestMessage('FilterButton link clicado!')}
                            >
                                Link
                            </FilterButton>
                        </div>
                    </div>
                </Card>

                {/* 🧬 TESTE DAS MOLECULES */}
                <Card variant="elevated" className="mb-8 p-6">
                    <Text variant="h2" className="mb-6">
                        🧬 Teste das Molecules
                    </Text>
                    
                    {/* SearchForm */}
                    <div className="mb-8">
                        <Text variant="h4" className="mb-3">SearchForm:</Text>
                        <SearchForm 
                            title="Teste do Formulário de Busca"
                            onSearch={handleTestSearch}
                        />
                    </div>

                    {/* HotelCard e TravelCard */}
                    <div className="mb-6">
                        <Text variant="h4" className="mb-3">Cards:</Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Text variant="small" className="mb-2">HotelCard:</Text>
                                <HotelCard
                                    hotel={testHotel}
                                    onImageClick={(hotel) => setTestMessage(`Imagem do ${hotel.title} clicada!`)}
                                    onSaveHotel={handleTestSave}
                                    isHotelSaved={isTestSaved}
                                />
                            </div>
                            <div>
                                <Text variant="small" className="mb-2">TravelCard:</Text>
                                <TravelCard
                                    travel={testTravel}
                                    onCardClick={(id) => setTestMessage(`TravelCard ${id} clicado!`)}
                                    onSaveTravel={handleTestSave}
                                    isTravelSaved={() => false}
                                />
                            </div>
                        </div>
                    </div>

                    {/* EventReservationFormAtomic */}
                    <div className="mb-8">
                        <Text variant="h4" className="mb-3">EventReservationFormAtomic:</Text>
                        <Button onClick={() => setShowEventForm(true)}>
                            🎉 Abrir Formulário de Eventos
                        </Button>
                    </div>

                    {/* HeroAtomic */}
                    <div className="mb-8">
                        <Text variant="h4" className="mb-3">HeroAtomic (Carousel completo):</Text>
                        <div className="h-[40vh] border rounded-lg overflow-hidden">
                            <HeroAtomic />
                        </div>
                    </div>

                    {/* HeroSlide isolado */}
                    <div className="mb-8">
                        <Text variant="h4" className="mb-3">HeroSlide (isolado):</Text>
                        <div className="h-[30vh] border rounded-lg overflow-hidden">
                            <HeroSlide
                                imageUrl="https://via.placeholder.com/1200x600/0EA5E9/FFFFFF?text=Teste+Hero+Slide"
                                title="Teste de Hero Slide Atômico"
                                subtitle="Este é um slide individual usando o componente atômico HeroSlide"
                            />
                        </div>
                    </div>

                    {/* Carousel customizado */}
                    <div className="mb-8">
                        <Text variant="h4" className="mb-3">Carousel (customizado):</Text>
                        <div className="h-[25vh] border rounded-lg overflow-hidden">
                            <Carousel autoplay={true} delay={3000} height="h-[25vh]">
                                <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                                    <Text variant="h3">Slide 1 - Personalizado</Text>
                                </div>
                                <div className="w-full h-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
                                    <Text variant="h3">Slide 2 - Personalizado</Text>
                                </div>
                                <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white">
                                    <Text variant="h3">Slide 3 - Personalizado</Text>
                                </div>
                            </Carousel>
                        </div>
                    </div>

                    {/* FilterBarAtomic */}
                    <div className="mb-8">
                        <Text variant="h4" className="mb-3">FilterBarAtomic (Barra de Filtros):</Text>
                        <FilterBarAtomic
                            activeFilter="promos"
                            onSelectPromos={() => setTestMessage('Promoções selecionadas!')}
                            onSelectRecommended={() => setTestMessage('Recomendados selecionados!')}
                            onNavigateToHotels={() => setTestMessage('Navegando para Hotéis!')}
                            onNavigateToEvents={() => setTestMessage('Navegando para Eventos!')}
                        />
                    </div>
                </Card>

                {/* 🏗️ TESTE DAS SECTIONS */}
                <Card variant="elevated" className="mb-8 p-6">
                    <Text variant="h2" className="mb-6">
                        🏗️ Teste das Sections
                    </Text>
                    
                    <HotelList 
                        hotels={[testHotel]}
                        title="Lista de Hotéis Teste"
                        onHotelClick={(hotel) => setTestMessage(`Hotel ${hotel.title} selecionado da lista!`)}
                        onSaveHotel={handleTestSave}
                        isHotelSaved={isTestSaved}
                    />
                </Card>

                {/* Estados de Loading e Error */}
                <Card variant="elevated" className="mb-8 p-6">
                    <Text variant="h2" className="mb-6">
                        ⚡ Teste de Estados
                    </Text>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Text variant="h4" className="mb-3">Loading State:</Text>
                            <HotelList 
                                hotels={[]}
                                title="Carregando..."
                                loading={true}
                            />
                        </div>
                        <div>
                            <Text variant="h4" className="mb-3">Error State:</Text>
                            <HotelList 
                                hotels={[]}
                                title="Com Erro"
                                error="Erro de teste: Não foi possível carregar os dados"
                            />
                        </div>
                    </div>
                </Card>

                {/* Hotel Details Page Test */}
                <Card variant="elevated" className="mb-8 p-6">
                    <Text variant="h2" className="mb-6">
                        🏨 Hotel Details Page Test
                    </Text>
                    
                    <div className="flex gap-4 mb-4">
                        <Button 
                            onClick={() => setShowHotelDetails(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Show Hotel Details Page
                        </Button>
                        <Button 
                            onClick={() => setShowHotelDetails(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Hide Hotel Details Page
                        </Button>
                    </div>

                    {showHotelDetails && (
                        <div className="border border-gray-300 rounded-lg p-4">
                            <HotelDetailsPageAtomic hotel={testHotel} />
                        </div>
                    )}
                </Card>

                {/* Botão para voltar */}
                <div className="text-center">
                    <Button 
                        variant="primary"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-8 py-3"
                    >
                        ⬆️ Voltar ao Topo
                    </Button>
                </div>
            </div>

            {/* 🎯 FORMULÁRIO DE EVENTOS ATÔMICO */}
            <EventReservationFormAtomic 
                isOpen={showEventForm}
                onClose={() => setShowEventForm(false)}
            />
        </div>
    );
};

export default TestAtomicComponents;
