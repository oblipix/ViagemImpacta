// 🧬 SECTION - FooterAtomic (Idêntica ao legacy)
// Footer como seção - PARIDADE TOTAL com Footer

import React from 'react';
import { Container } from '../atoms';

const FooterAtomic = ({ 
  navigateToLegacy,
  onNavigateToHotels,
  onSelectPromos,
  onNavigateToEvents,
  onNavigateToMyTravels,
  onNavigateToInstitutional,
  onNavigateToBlog,
  isLoaded,
  className = "",
  ...props
}) => {
  
  const handleNavClick = (e, navFunction) => {
    e.preventDefault();
    if (navFunction) {
      navFunction();
    }
  };

  return (
    <footer className={`relative footer-curve w-full bg-slate-900 text-gray-300 py-12 mt-12 ${className}`} {...props}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo e Redes Sociais - IDÊNTICO ao legacy */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="logo text-white text-3xl font-bold">Tripz</span>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              Sua jornada dos sonhos começa aqui. Explore, descubra e viva experiências inesquecíveis.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#/" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
                </svg>
              </a>
              <a href="#/" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.07 4.85-.07 4.85 0 3.584.012 4.85.07zm0-2.163c-3.259 0-3.67.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#/" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.212 3.791 4.649-.69.188-1.433.23-2.187.085.606 1.885 2.364 3.264 4.447 3.302-1.627 1.274-3.684 2.032-5.919 2.032-.385 0-.762-.023-1.134-.067 2.102 1.349 4.596 2.136 7.279 2.136 8.732 0 13.496-7.235 13.496-13.496 0-.205-.005-.408-.014-.612.927-.667 1.732-1.5 2.366-2.448z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navegação - IDÊNTICA ao legacy */}
          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <a href="#/" onClick={(e) => handleNavClick(e, onNavigateToHotels)} className="hover:text-white transition-colors">
                  Hotéis
                </a>
              </li>
              <li>
                <a href="#/" onClick={(e) => handleNavClick(e, onSelectPromos)} className="hover:text-white transition-colors">
                  Promoções
                </a>
              </li>
              <li>
                <a href="#/" onClick={(e) => handleNavClick(e, onNavigateToEvents)} className="hover:text-white transition-colors">
                  Eventos
                </a>
              </li>
              <li>
                <a href="#/" onClick={(e) => handleNavClick(e, onNavigateToMyTravels)} className="hover:text-white transition-colors">
                  Minhas Viagens
                </a>
              </li>
            </ul>
          </div>

          {/* Empresa - IDÊNTICA ao legacy */}
          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#/" onClick={(e) => handleNavClick(e, onNavigateToInstitutional)} className="hover:text-white transition-colors">
                  Sobre Nós (Institucional)
                </a>
              </li>
              <li>
                <a href="#/" onClick={(e) => handleNavClick(e, onNavigateToBlog)} className="hover:text-white transition-colors">
                  Dicas de Viagem (Blog)
                </a>
              </li>
              <li>
                <a href="#/" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          {/* Onde Estamos - IDÊNTICA ao legacy */}
          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Onde Estamos</h4>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-slate-800 w-full h-[150px] flex items-center justify-center text-sm rounded-lg">
                {isLoaded ? 'Carregando mapa...' : 'Mapa indisponível'}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright e Links - IDÊNTICO ao legacy */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-gray-400 sm:flex sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Tripz. Todos os direitos reservados.</p>
          <div className="flex justify-center space-x-4 mt-4 sm:mt-0">
            <a href="#/" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#/" className="hover:text-white transition-colors">Política de Privacidade</a>
            {navigateToLegacy && (
              <button
                onClick={navigateToLegacy}
                className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
              >
                ← Legacy
              </button>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default FooterAtomic;
