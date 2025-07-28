import React, { useState } from 'react';
import { Button } from './atoms';
import UserProfilePageAtomic from './UserProfilePageAtomic';
import ForgotPasswordPageAtomic from './ForgotPasswordPageAtomic';
import PackagesPageAtomic from './PackagesPageAtomic';
import LoginPageAtomic from './LoginPageAtomic';
import RegisterPageAtomic from './RegisterPageAtomic';

// 🧪 TESTE SIMPLES DAS PÁGINAS ATÔMICAS
function TestNewAtomicPagesWithBackend() {
  const [currentPage, setCurrentPage] = useState('menu');

  // 🎯 RENDERIZAR PÁGINA ATUAL
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPageAtomic onNavigateToRegister={() => setCurrentPage('register')} onNavigateToForgotPassword={() => setCurrentPage('forgotPassword')} />;
      
      case 'register':
        return <RegisterPageAtomic onNavigateToLogin={() => setCurrentPage('login')} />;
      
      case 'forgotPassword':
        return <ForgotPasswordPageAtomic onNavigateToLogin={() => setCurrentPage('login')} />;
      
      case 'profile':
        return <UserProfilePageAtomic onBack={() => setCurrentPage('menu')} />;
      
      case 'packages':
        return <PackagesPageAtomic onBack={() => setCurrentPage('menu')} />;

      default:
        return (
          <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              
              {/* 🎨 CABEÇALHO */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  🧪 Teste das Páginas Atômicas
                </h1>
                <p className="text-xl text-gray-600">
                  Teste todas as páginas com integração backend
                </p>
              </div>

              {/* 🎯 BOTÕES DE TESTE */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl mb-3">🔐</div>
                  <h3 className="text-lg font-semibold mb-3">Login</h3>
                  <Button onClick={() => setCurrentPage('login')} className="w-full">
                    Testar Login
                  </Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-lg font-semibold mb-3">Registro</h3>
                  <Button onClick={() => setCurrentPage('register')} className="w-full">
                    Testar Registro
                  </Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl mb-3">🔑</div>
                  <h3 className="text-lg font-semibold mb-3">Esqueci Senha</h3>
                  <Button onClick={() => setCurrentPage('forgotPassword')} className="w-full">
                    Testar Recuperação
                  </Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl mb-3">👤</div>
                  <h3 className="text-lg font-semibold mb-3">Perfil</h3>
                  <Button onClick={() => setCurrentPage('profile')} className="w-full">
                    Testar Perfil
                  </Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="text-lg font-semibold mb-3">Pacotes</h3>
                  <Button onClick={() => setCurrentPage('packages')} className="w-full">
                    Testar Pacotes
                  </Button>
                </div>

                <div className="bg-green-50 p-6 rounded-lg shadow text-center border-2 border-green-200">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-lg font-semibold mb-3 text-green-800">Todas Prontas</h3>
                  <p className="text-sm text-green-600">5 páginas atômicas funcionais</p>
                </div>

              </div>
            </div>
          </div>
        );
    }
  };

  return renderCurrentPage();
}

export default TestNewAtomicPagesWithBackend;
