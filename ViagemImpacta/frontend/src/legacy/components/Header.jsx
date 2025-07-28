import React from 'react';
import { Button, Text } from './atoms';

function Header({
  currentPage = 'home',
  onNavigateToHome = () => {},
  onNavigateToLogin = () => {},
  onNavigateToRegister = () => {},
  onNavigateToProfile = () => {},
  onNavigateToPackages = () => {},
  onNavigateToInstitutional = () => {},
  onNavigateToTest = () => {}
}) {
  
  const getButtonClasses = (pageName) => {
    let isActive = currentPage === pageName;

    // Condição especial para o botão 'Minhas Viagens'
    if (pageName === 'myTravels') {
      isActive = ['myTravels', 'login', 'register'].includes(currentPage);
    }

    // ✅ Lógica atualizada para usar a nova classe CSS para o efeito
    return `
      buttonHeader 
      text-gray-300 hover:text-white 
      font-medium focus:outline-none 
      transition-colors duration-300
      ${isActive ? 'active-link' : ''}
    `;
  };

  return (
    <header className="w-full bg-slate-900 shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* 🏠 LOGO */}
        <div
          className="flex items-center cursor-pointer"
          onClick={onNavigateToHome}
        >
          <span className="logo">
            Tripz
          </span>
        </div>

        <nav>
          <ul className="flex items-center space-x-8">
            
            {/* 📱 NAVEGAÇÃO PRINCIPAL (Sistema Real) */}
            <li>
              <Button
                onClick={onNavigateToHome}
                className={getButtonClasses('home')}
              >
                🏠 Início
              </Button>
            </li>
            
            <li>
              <Button
                onClick={onNavigateToInstitutional}
                className={getButtonClasses('institutional')}
                variant="ghost"
              >
                🏢 Institucional
              </Button>
            </li>

            <li>
              <Button
                onClick={onNavigateToMyTravels}
                className={getButtonClasses('myTravels')}
                variant="ghost"
              >
                ✈️ Minhas Viagens
              </Button>
            </li>
            
            {/* �‍💻 ÁREA DE DESENVOLVEDOR - TEMPORÁRIA */}
            <li className="border-l border-gray-600 pl-6 ml-6">
              <span className="text-xs text-blue-400 font-semibold">
                �‍💻 DEV AREA (Temporário)
              </span>
            </li>
            
            {/* 🎯 1. ATOMIC DESIGN - Arquitetura de Componentes */}
            <li>
              <Button
                onClick={onNavigateToTestAtomic}
                className={getButtonClasses('testAtomic')}
                variant="primary"
                style={{ backgroundColor: '#10B981', borderRadius: '4px', padding: '6px 12px' }}
                title="Landing Page completa usando Atomic Design"
              >
                🎯 Atomic Design
              </Button>
            </li>
            
            {/* 🌐 2. BACKEND INTEGRATION - APIs */}
            <li>
              <Button
                onClick={onNavigateToBackendTest}
                className={getButtonClasses('testBackend')}
                variant="primary"
                style={{ backgroundColor: '#F59E0B', borderRadius: '4px', padding: '6px 12px' }}
                title="Demonstração de integração com backend/APIs"
              >
                🌐 Backend
              </Button>
            </li>

            {/* 🧪 3. COMPONENTES - Debug & Testing */}
            <li className="relative group">
              <Button
                variant="primary"
                style={{ backgroundColor: '#6366F1', borderRadius: '4px', padding: '6px 12px' }}
                title="Componentes em desenvolvimento e testes"
              >
                🧪 Debug ▼
              </Button>
              
              {/* Dropdown Menu para Componentes */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <button
                    onClick={onNavigateToHotelDetailsTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🏨 Hotel Details
                  </button>
                  <button
                    onClick={onNavigateToTravelSectionTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🎯 Travel Section
                  </button>
                  <button
                    onClick={onNavigateToEventBlogSectionTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🎉 Event Blog
                  </button>
                  <button
                    onClick={onNavigateToNewsletterSectionTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    📧 Newsletter
                  </button>
                  <button
                    onClick={onNavigateToRecommendedHotelsSectionTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🏨 Recomendados
                  </button>
                  <button
                    onClick={onNavigateToHotelsMapSectionTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🗺️ Mapa
                  </button>
                  <button
                    onClick={onNavigateToBlogSectionTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    📝 Blog
                  </button>
                  <button
                    onClick={onNavigateToPromotionDetailsPageTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🎫 Promotion Details
                  </button>
                  <button
                    onClick={onNavigateToPurchasePageTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🛒 Purchase Page
                  </button>
                  <button
                    onClick={onNavigateToPaymentPageTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    💳 Payment + Stripe
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={onNavigateToAuthAndUserPagesTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🔐 Auth & User Pages
                  </button>
                  <button
                    onClick={onNavigateToNewAtomicPagesTest}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    🆕 New Atomic Pages + Backend
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* � BANNER DESENVOLVEDOR - Removível no futuro */}
      <div className="bg-blue-50 border-t border-blue-200 py-2 px-6">
        <div className="container mx-auto">
          <p className="text-xs text-blue-800 text-center">
            � <strong>Dev Mode:</strong> Área de desenvolvimento e testes de arquitetura. 
            <span className="font-semibold"> Temporário - será removido em produção!</span>
            <span className="ml-4">🎯 Atomic Design ➜ Backend Integration ➜ Component Testing</span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;