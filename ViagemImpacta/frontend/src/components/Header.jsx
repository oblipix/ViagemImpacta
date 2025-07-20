import React from 'react';

function Header({ onNavigateToMyTravels, onNavigateToHome, onNavigateToInstitutional, currentPage }) { // Adicionado onNavigateToInstitutional
  return (
    <header className="w-full bg-white shadow-md py-4 sticky top-0 z-20">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo - Clicável para ir para a Home */}
        <div
          className="flex items-center cursor-pointer"
          onClick={onNavigateToHome}
        >
          <span className="logo">Tripz</span>
        </div>

        {/* Navegação Principal */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={onNavigateToHome}
                className={`text-gray-700 hover:text-blue-600 font-medium focus:outline-none ${currentPage === 'home' ? 'text-blue-600' : ''}`}
              >
                Início
              </button>
            </li>
           
            {/* NOVO: Botão Institucional */}
            <li>
              <button
                onClick={onNavigateToInstitutional} // Chama a nova função de navegação
                className={`text-gray-700 hover:text-blue-600 font-medium focus:outline-none ${currentPage === 'institutional' ? 'text-blue-600' : ''}`}
              >
                Institucional
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateToMyTravels}
                className={`text-gray-700 hover:text-blue-600 font-medium focus:outline-none ${currentPage === 'myTravels' || currentPage === 'login' || currentPage === 'register' ? 'text-blue-600' : ''}`}
              >
                Minhas Viagens
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;