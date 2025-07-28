import React from 'react';
import { Button, NavigationButton } from './atoms';

function HeaderAtomic({
  currentPage = 'home',
  onNavigateToHome = () => {},
  onNavigateToInstitutional = () => {},
  onNavigateToMyTravels = () => {},
  onNavigateToTest = () => {}
}) {
  
  const getButtonClasses = (pageName) => {
    let isActive = currentPage === pageName;

    // Condição especial para o botão 'Minhas Viagens'
    if (pageName === 'myTravels') {
      isActive = ['myTravels', 'login', 'register', 'profile', 'packages'].includes(currentPage);
    }

    return isActive;
  };

  return (
    <header className="w-full bg-slate-900 shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={onNavigateToHome}
        >
          <span className="logo">
            Tripz
          </span>
        </div>

        <nav>
          <ul className="flex items-center space-x-6">
            
            {/* Navegação Principal */}
            <li>
              <NavigationButton
                onClick={onNavigateToHome}
                isActive={getButtonClasses('home')}
              >
                Início
              </NavigationButton>
            </li>
            
            <li>
              <NavigationButton
                onClick={onNavigateToInstitutional}
                isActive={getButtonClasses('institutional')}
              >
                Institucional
              </NavigationButton>
            </li>

            <li>
              <NavigationButton
                onClick={onNavigateToMyTravels}
                isActive={getButtonClasses('myTravels')}
              >
                Minhas Viagens
              </NavigationButton>
            </li>

            {/* Área de Testes */}
            <li className="border-l border-gray-600 pl-6 ml-6">
              <Button
                onClick={onNavigateToTest}
                className={`${getButtonClasses('test') ? 'active-link' : ''}`}
                variant="primary"
                style={{ backgroundColor: '#10B981', borderRadius: '4px', padding: '6px 12px' }}
              >
                🛠️ Dev API
              </Button>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderAtomic;
