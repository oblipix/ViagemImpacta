import React from 'react';
// 🎯 MIGRAÇÃO GRADUAL - Importando atoms para coexistir com legacy
import { Button, Text } from './atoms';

function Header({ onNavigateToMyTravels, onNavigateToHome, onNavigateToInstitutional, onNavigateToTestAtomic, currentPage }) {
  
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
            <li>
              {/* 🧪 TESTE GRADUAL - Usando atom Button */}
              <Button
                onClick={onNavigateToHome}
                className={getButtonClasses('home')}
              >
                Início
              </Button>
            </li>
            
            <li>
              {/* 🎯 MIGRAÇÃO GRADUAL - Botão Institucional usando atom Button */}
              <Button
                onClick={onNavigateToInstitutional}
                className={getButtonClasses('institutional')}
                variant="ghost"
              >
                Institucional
              </Button>
            </li>

            <li>
              {/* 🎯 MIGRAÇÃO GRADUAL - Botão Minhas Viagens usando atom Button */}
              <Button
                onClick={onNavigateToMyTravels}
                className={getButtonClasses('myTravels')}
                variant="ghost"
              >
                Minhas Viagens
              </Button>
            </li>
            
            {/* 🧪 BOTÃO TEMPORÁRIO PARA TESTE - Usando atom Button */}
            <li>
              <Button
                onClick={onNavigateToTestAtomic}
                className={getButtonClasses('testAtomic')}
                variant="primary"
                style={{ backgroundColor: '#10B981', borderRadius: '4px', padding: '6px 12px' }}
              >
                🧪 Nova Landing
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;