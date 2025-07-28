import React, { useState } from 'react';
import {
  Container,
  Card,
  Text,
  Button,
  Input,
  FormGroup,
  IconSVG,
  StarRating,
  OverlayContent,
  PriceDisplay,
  AmenityItem,
  ResultDisplay,
  AvatarUpload
} from '../atoms';

/**
 * 🧪 Demonstração dos Novos Atoms Reutilizáveis
 * 
 * Esta página demonstra o uso dos novos atoms criados para
 * melhorar a reutilização de código na aplicação
 */
const NewAtomsDemo = ({ onBack }) => {
  const [demoData, setDemoData] = useState({
    rating: 4.5,
    price: 299.99,
    avatar: "https://via.placeholder.com/150",
    formData: { name: "", email: "" },
    apiResult: null,
    loading: false
  });

  // Demo: FormGroup
  const handleFormChange = (field, value) => {
    setDemoData(prev => ({
      ...prev,
      formData: { ...prev.formData, [field]: value }
    }));
  };

  // Demo: API Result
  const simulateApiCall = () => {
    setDemoData(prev => ({ ...prev, loading: true, apiResult: null }));
    
    setTimeout(() => {
      setDemoData(prev => ({
        ...prev,
        loading: false,
        apiResult: {
          status: "success",
          data: { hotels: 15, rooms: 42 },
          timestamp: new Date().toISOString()
        }
      }));
    }, 2000);
  };

  // Demo: Avatar Upload
  const handleAvatarUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setDemoData(prev => ({ ...prev, avatar: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container className="py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Text variant="h1" className="text-3xl font-bold text-blue-800">
          🧩 Demonstração: Novos Atoms Reutilizáveis
        </Text>
        <Button onClick={onBack} variant="secondary">
          ← Voltar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* FormGroup Demo */}
        <Card className="p-6">
          <Text variant="h2" className="text-xl font-semibold mb-4">
            1. FormGroup Atom
          </Text>
          <Text variant="body" className="text-gray-600 mb-4">
            Agrupa label, input e mensagem de erro de forma consistente.
          </Text>
          
          <FormGroup
            label="Nome Completo"
            htmlFor="demo-name"
            required
            error={!demoData.formData.name ? "Campo obrigatório" : null}
          >
            <Input
              id="demo-name"
              value={demoData.formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              placeholder="Digite seu nome"
            />
          </FormGroup>

          <FormGroup
            label="Email"
            htmlFor="demo-email"
            error={demoData.formData.email && !demoData.formData.email.includes('@') ? "Email inválido" : null}
          >
            <Input
              id="demo-email"
              type="email"
              value={demoData.formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              placeholder="seu@email.com"
            />
          </FormGroup>
        </Card>

        {/* IconSVG & StarRating Demo */}
        <Card className="p-6">
          <Text variant="h2" className="text-xl font-semibold mb-4">
            2. IconSVG & StarRating
          </Text>
          <Text variant="body" className="text-gray-600 mb-4">
            Ícones SVG reutilizáveis e rating com estrelas.
          </Text>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <IconSVG className="h-6 w-6 text-blue-500">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                <path d="m8 6 4-4 4 4"/>
              </IconSVG>
              <Text>Ícone de upload</Text>
            </div>
            
            <StarRating 
              rating={demoData.rating} 
              showText 
              showReviewCount 
              reviewCount={245}
              size="lg"
            />
            
            <div className="flex items-center gap-2">
              <Text>Avaliação:</Text>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.1"
                value={demoData.rating}
                onChange={(e) => setDemoData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                className="flex-1"
              />
            </div>
          </div>
        </Card>

        {/* PriceDisplay Demo */}
        <Card className="p-6">
          <Text variant="h2" className="text-xl font-semibold mb-4">
            3. PriceDisplay Atom
          </Text>
          <Text variant="body" className="text-gray-600 mb-4">
            Exibição consistente de preços com descontos.
          </Text>
          
          <div className="space-y-4">
            <PriceDisplay 
              price={demoData.price}
              period="/noite"
              size="lg"
            />
            
            <PriceDisplay 
              price={demoData.price * 0.8}
              originalPrice={demoData.price}
              discount={20}
              period="/noite"
              size="md"
            />
            
            <div className="flex items-center gap-2">
              <Text>Preço:</Text>
              <input 
                type="range" 
                min="99" 
                max="999" 
                value={demoData.price}
                onChange={(e) => setDemoData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="flex-1"
              />
              <Text>R$ {demoData.price}</Text>
            </div>
          </div>
        </Card>

        {/* AmenityItem Demo */}
        <Card className="p-6">
          <Text variant="h2" className="text-xl font-semibold mb-4">
            4. AmenityItem Atom
          </Text>
          <Text variant="body" className="text-gray-600 mb-4">
            Items de amenidades e facilidades.
          </Text>
          
          <div className="space-y-3">
            <AmenityItem 
              icon={<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>}
              label="Wi-Fi Gratuito"
              available={true}
            />
            
            <AmenityItem 
              icon={<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>}
              label="Capacidade"
              value="4 pessoas"
              available={true}
            />
            
            <AmenityItem 
              icon={<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>}
              label="Pet Friendly"
              available={false}
            />
          </div>
        </Card>

        {/* AvatarUpload Demo */}
        <Card className="p-6">
          <Text variant="h2" className="text-xl font-semibold mb-4">
            5. AvatarUpload Atom
          </Text>
          <Text variant="body" className="text-gray-600 mb-4">
            Upload de avatar com preview interativo.
          </Text>
          
          <div className="flex justify-center">
            <AvatarUpload
              src={demoData.avatar}
              alt="Avatar Demo"
              onChange={handleAvatarUpload}
              editable={true}
              size="lg"
            />
          </div>
        </Card>

        {/* ResultDisplay Demo */}
        <Card className="p-6">
          <Text variant="h2" className="text-xl font-semibold mb-4">
            6. ResultDisplay Atom
          </Text>
          <Text variant="body" className="text-gray-600 mb-4">
            Exibição de resultados de API com status.
          </Text>
          
          <div className="space-y-4">
            <Button onClick={simulateApiCall} disabled={demoData.loading}>
              {demoData.loading ? 'Carregando...' : 'Simular Chamada API'}
            </Button>
            
            <ResultDisplay
              title="Busca de Hotéis"
              data={demoData.apiResult?.data}
              loading={demoData.loading}
              success={demoData.apiResult?.status === 'success'}
              status={demoData.apiResult?.status}
              timestamp={demoData.apiResult?.timestamp}
            />
          </div>
        </Card>

        {/* OverlayContent Demo */}
        <Card className="p-6 col-span-full">
          <Text variant="h2" className="text-xl font-semibold mb-4">
            7. OverlayContent Atom
          </Text>
          <Text variant="body" className="text-gray-600 mb-4">
            Overlay com conteúdo sobre imagens/backgrounds.
          </Text>
          
          <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">
            <OverlayContent
              overlayOpacity="40"
              contentPosition="center"
              className="w-full h-full"
            >
              <div className="text-center">
                <Text variant="h2" className="text-white text-2xl font-bold mb-2">
                  Conteúdo sobre Overlay
                </Text>
                <Text variant="body" className="text-white opacity-90">
                  Este conteúdo está sobreposto ao background com overlay escuro
                </Text>
                <Button className="mt-4 bg-white text-blue-600 hover:bg-gray-100">
                  Ação
                </Button>
              </div>
            </OverlayContent>
          </div>
        </Card>

      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <Text variant="body" className="text-blue-800 text-center">
          🎯 <strong>Atoms Criados:</strong> FormGroup, IconSVG, StarRating, OverlayContent, 
          PriceDisplay, AmenityItem, ResultDisplay, AvatarUpload
        </Text>
        <Text variant="body" className="text-blue-600 text-center text-sm mt-2">
          Todos os atoms são totalmente reutilizáveis e seguem o padrão Atomic Design
        </Text>
      </div>
    </Container>
  );
};

export default NewAtomsDemo;
