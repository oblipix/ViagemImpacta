// 🧪 EXEMPLO DE USO - Como usar os componentes atomic
import React from 'react';
import { Button, Text, Image, Input, Card } from './atoms';
import { HotelCard, SearchForm, TravelCard } from './molecules';
import { HotelList } from './sections';

// 🎯 EXEMPLO DE DADOS DE TESTE
const sampleHotel = {
    id: 1,
    title: 'Hotel Teste Atomic',
    description: 'Este é um hotel criado com componentes atomic design.',
    mainImageUrl: './assets/images/default-hotel.png',
    price: 299.99,
    rating: 4.5
};

const sampleHotels = [sampleHotel];

// 🎯 EXEMPLO DE COMPONENTE USANDO ATOMIC DESIGN
export const AtomicExample = () => {
    const handleSearch = (searchData) => {
        console.log('Busca realizada:', searchData);
    };

    const handleHotelSave = (hotel) => {
        console.log('Hotel salvo:', hotel);
    };

    const isHotelSaved = (hotelId) => {
        return false; // Exemplo simples
    };

    return (
        <div className="space-y-8 p-6">
            {/* 🎯 TESTE DOS ATOMS */}
            <div className="space-y-4">
                <Text variant="h2">🧪 Teste dos Atoms</Text>
                
                <div className="flex space-x-4">
                    <Button variant="primary">Botão Primary</Button>
                    <Button variant="active">Botão Active</Button>
                    <Button variant="ghost">Botão Ghost</Button>
                </div>
                
                <Input placeholder="Digite algo aqui..." />
                
                <Card variant="elevated" className="p-4">
                    <Text variant="h3">Card Elevado</Text>
                    <Text variant="body">Este é um exemplo de card atom.</Text>
                </Card>
            </div>

            {/* 🎯 TESTE DAS MOLECULES */}
            <div className="space-y-4">
                <Text variant="h2">🧬 Teste das Molecules</Text>
                
                <SearchForm 
                    title="Formulário de Busca Atomic"
                    onSearch={handleSearch}
                />
                
                <HotelCard 
                    hotel={sampleHotel}
                    onSaveHotel={handleHotelSave}
                    isHotelSaved={isHotelSaved}
                />
            </div>

            {/* 🎯 TESTE DAS SECTIONS */}
            <div className="space-y-4">
                <Text variant="h2">🏗️ Teste das Sections</Text>
                
                <HotelList 
                    hotels={sampleHotels}
                    title="Lista de Hotéis Atomic"
                    onSaveHotel={handleHotelSave}
                    isHotelSaved={isHotelSaved}
                />
            </div>
        </div>
    );
};

// 🎯 COMO USAR EM OUTROS COMPONENTES:
/*
import { Button, Text } from './components/atoms';
import { HotelCard } from './components/molecules';
import { HotelList } from './components/sections';

// Em qualquer componente:
<Button variant="primary" onClick={handleClick}>
    Clique aqui
</Button>

<HotelCard 
    hotel={hotelData}
    onSaveHotel={handleSave}
    isHotelSaved={isHotelSaved}
/>
*/
