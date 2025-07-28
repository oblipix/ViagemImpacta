/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Input, Text, Container, Image } from './atoms';
import { authService } from '../services';

// 🎯 LOGIN PAGE ATOMIC
// Versão atômica da página de login com integração backend completa
// Utiliza o endpoint: POST /api/auth/login

function LoginPageAtomic({ onNavigateToRegister, onNavigateToForgotPassword, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // 🌐 INTEGRAÇÃO BACKEND: POST /api/auth/login
      const result = await authService.login(email.trim().toLowerCase(), password);
      
      if (result && result.user) {
        setSuccessMessage('✅ Login realizado com sucesso! Redirecionando...');
        
        // Notifica o componente pai sobre o sucesso do login
        setTimeout(() => {
          onLoginSuccess?.(result.user);
        }, 1000);
      }
      
    } catch (error) {
      console.error('Erro no login:', error);
      
      // Tratar diferentes tipos de erro
      if (error.message.includes('401') || error.message.includes('não encontrado') || error.message.includes('inválidos')) {
        setErrorMessage('Email ou senha incorretos. Verifique suas credenciais e tente novamente.');
      } else if (error.message.includes('desativado')) {
        setErrorMessage('Sua conta foi desativada. Entre em contato com o suporte.');
      } else if (error.message.includes('500')) {
        setErrorMessage('Erro no servidor. Tente novamente em alguns minutos.');
      } else {
        setErrorMessage('Erro ao fazer login. Verifique sua conexão e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (onNavigateToForgotPassword) {
      onNavigateToForgotPassword();
    } else {
      // Fallback se a navegação não estiver disponível
      alert('Link de recuperação de senha enviado para o seu email (funcionalidade simulada)!');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {/* Coluna da Esquerda: Imagem */}
        <div className="w-1/2 hidden md:block">
          <Image
            src="https://picsum.photos/id/10/800/600"
            alt="Vista da janela do avião"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Coluna da Direita: Formulário de Login */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <Text 
            as="h2" 
            className="text-3xl font-bold text-gray-800 mb-6 text-center"
          >
            Login
          </Text>
          <Text className="text-gray-600 text-sm mb-6 text-center">
            Bem-vindo de volta! Por favor, insira suas credenciais.
          </Text>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="seuemail@exemplo.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Senha
              </label>
              <Input
                type="password"
                id="password"
                placeholder="********"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* 💬 MENSAGENS DE FEEDBACK */}
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {successMessage}
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              {/* Link Esqueceu Senha? */}
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isLoading}
                className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 transition disabled:opacity-50"
              >
                Esqueceu sua senha?
              </button>

              <Button
                type="submit"
                disabled={isLoading || !email.trim() || !password.trim()}
                className="main-action-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
          </form>

          <div className="text-center mt-6 text-sm">
            <Text className="text-gray-600">Não tem uma conta?</Text>
            <button
              onClick={onNavigateToRegister}
              className="font-bold text-blue-600 hover:text-blue-800 transition"
            >
              Cadastrar-se
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPageAtomic;
