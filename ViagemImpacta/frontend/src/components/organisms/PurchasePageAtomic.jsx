// 🧬 ORGANISM - PurchasePageAtomic (Idêntica ao legacy)
// Página de compra/seleção de pacotes - PARIDADE TOTAL com PurchasePage

import React, { useState } from 'react';
import { Text, Container, Button, Image } from '../atoms';

// Função auxiliar para formatar moeda - IDÊNTICA ao legacy
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const PurchasePageAtomic = ({ 
    promotionData, 
    onBack, 
    onContinueToPayment,
    className = "",
    ...props 
}) => {
  // Estado para armazenar o tipo de pacote selecionado - IDÊNTICO ao legacy
  const [selectedPackageType, setSelectedPackageType] = useState(null);

  // Se por algum motivo os dados da promoção não forem carregados - IDÊNTICO ao legacy
  if (!promotionData) {
    return (
      <Container className={`p-4 text-center ${className}`} {...props}>
        <Text variant="h2" className="text-xl text-red-600 mb-4">
          Erro: Dados da promoção não carregados para compra.
        </Text>
        <Button 
          onClick={onBack} 
          variant="secondary"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Voltar
        </Button>
      </Container>
    );
  }

  // Função para lidar com o clique em continuar para pagamento
  const handleContinueToPayment = () => {
    if (selectedPackageType && onContinueToPayment) {
      onContinueToPayment({
        promotionData,
        selectedPackageType,
        selectedPrice: promotionData.packagePrices[selectedPackageType]
      });
    }
  };

  return (
    <Container className={`p-6 bg-white shadow-lg rounded-lg my-8 ${className}`} {...props}>
      {/* Botão para voltar para a página de detalhes da promoção - IDÊNTICO ao legacy */}
      <Button 
        onClick={onBack} 
        variant="primary"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
      >
        ← Voltar para {promotionData.title}
      </Button>

      {/* Título da Página de Compra - IDÊNTICO ao legacy */}
      <Text variant="h1" className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Finalizar Compra: {promotionData.title}
      </Text>

      {/* Resumo visual da promoção (imagem e descrição curta) - IDÊNTICO ao legacy */}
      <div className="mb-8 text-center">
        <Image 
          src={promotionData.imageUrl} 
          alt={promotionData.title} 
          className="w-full max-w-lg h-64 object-cover rounded-lg mx-auto shadow-md"
        />
        <Text variant="body" className="text-xl text-gray-700 mt-4">
          {promotionData.description.substring(0, 150)}...
        </Text>
      </div>

      {/* Título da Seção de Seleção de Pacotes - IDÊNTICO ao legacy */}
      <Text variant="h2" className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 pb-2 border-gray-200 text-center">
        Selecione o Tipo de Pacote
      </Text>

      {/* Renderiza as opções de pacote (Casal, Individual, Família) - IDÊNTICO ao legacy */}
      {promotionData.packagePrices ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Mapeia sobre os preços dos pacotes e cria um botão para cada - IDÊNTICO ao legacy */}
          {Object.entries(promotionData.packagePrices).map(([type, price]) => (
            <button
              key={type} // Chave única para cada botão
              onClick={() => setSelectedPackageType(type)} // Define o tipo de pacote selecionado no estado
              // Aplica estilos condicionais para destacar o pacote selecionado - IDÊNTICOS ao legacy
              className={`p-6 border-2 rounded-lg text-center cursor-pointer transition duration-300 ease-in-out
                ${selectedPackageType === type ? 'border-green-500 bg-green-100 shadow-lg transform scale-105' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'}`
              }
            >
              <Text variant="h3" className="text-2xl font-bold capitalize mb-2">
                {/* Exibe o nome do pacote de forma amigável - IDÊNTICO ao legacy */}
                {type === 'solteiro' ? 'Pacote Individual' : type === 'casal' ? 'Pacote Casal' : 'Pacote Família'}
              </Text>
              <Text variant="h2" className="text-4xl font-extrabold text-blue-700">
                {formatCurrency(price)} {/* Formata e exibe o preço */}
              </Text>
              <Text variant="small" className="text-sm text-gray-500 mt-1">
                {/* Informação adicional sobre o preço - IDÊNTICA ao legacy */}
                {type === 'solteiro' ? 'por pessoa' : type === 'casal' ? 'por casal' : 'para família'}
              </Text>
            </button>
          ))}
        </div>
      ) : (
        // Mensagem se não houver opções de pacote - IDÊNTICA ao legacy
        <Text variant="body" className="text-center text-gray-600">
          Nenhuma opção de pacote disponível para esta promoção.
        </Text>
      )}

      {/* Box de Resumo da Seleção (aparece apenas se um pacote for selecionado) - IDÊNTICO ao legacy */}
      {selectedPackageType && (
        <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-200 shadow-inner text-center">
          <Text variant="h3" className="text-2xl font-bold text-blue-800 mb-4">
            Resumo da Sua Seleção:
          </Text>
          <Text variant="body" className="text-xl text-gray-700 mb-2">
            **Promoção:** {promotionData.title}
          </Text>
          <Text variant="body" className="text-xl text-gray-700 mb-4">
            **Tipo de Pacote:** <span className="capitalize font-semibold ml-2">
              {selectedPackageType === 'solteiro' ? 'Individual' : selectedPackageType === 'casal' ? 'Casal' : 'Família'}
            </span>
          </Text>
          {/* Você pode adicionar aqui as datas selecionadas do calendário, se as estiver passando */}
          {/* <Text variant="body" className="text-xl text-gray-700 mb-4">
            **Datas Selecionadas:** {selectedDates.length > 0 ? selectedDates.map(d => d.toLocaleDateString('pt-BR')).join(', ') : 'Nenhuma data selecionada'}
          </Text> */}

          <Text variant="h2" className="text-4xl font-extrabold text-green-700">
            Total: {formatCurrency(promotionData.packagePrices[selectedPackageType])}
          </Text>
          
          {/* Botão para continuar para o pagamento (próxima etapa) - IDÊNTICO ao legacy */}
          <div className="mt-8">
            <Button 
              onClick={handleContinueToPayment}
              variant="primary"
              className="px-10 py-4 bg-green-600 text-white font-bold text-xl rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 next-purchase"
            >
              Continuar para Pagamento
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PurchasePageAtomic;
