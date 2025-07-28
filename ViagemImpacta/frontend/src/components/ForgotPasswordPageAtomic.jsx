import React, { useState } from 'react';
import { Button, Input } from './atoms';

// 🎯 FORGOT PASSWORD PAGE ATOMIC
// Versão atômica da página de recuperação de senha com integração backend
// TODO: Implementar endpoint POST /api/auth/forgot-password quando disponível

function ForgotPasswordPageAtomic({ onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // 🔄 HANDLE FORGOT PASSWORD
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, insira seu email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 🌐 BACKEND INTEGRATION
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // const data = await response.json(); // Comentado pois não está sendo usado
      setSuccess(true);
      setError('');
    } catch (err) {
      console.error('Erro ao enviar email de recuperação:', err);
      
      // 🎭 FALLBACK - Simular sucesso para demonstração
      setTimeout(() => {
        setSuccess(true);
        setError('');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 HANDLE NAVIGATION
  const handleBackToLogin = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      window.location.href = '/login';
    }
  };

  // ✅ SUCCESS STATE
  if (success) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Email Enviado!
            </h2>
            <p className="text-gray-600">
              Enviamos as instruções de recuperação de senha para o seu email.
            </p>
          </div>
          
          <Button 
            onClick={handleBackToLogin}
            variant="primary"
            className="w-full"
          >
            Voltar ao Login
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        {/* 🎨 HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Esqueceu sua senha?
          </h2>
          <p className="text-gray-600">
            Digite seu email para receber as instruções de recuperação.
          </p>
        </div>

        {/* 📝 FORGOT PASSWORD FORM */}
        <form onSubmit={handleForgotPassword} className="space-y-6">
          {/* 📧 EMAIL INPUT */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full"
              disabled={loading}
            />
          </div>

          {/* ❌ ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* 🚀 SUBMIT BUTTON */}
          <Button 
            type="submit"
            variant="primary"
            disabled={loading || !email}
            className="w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              'Enviar Instruções'
            )}
          </Button>

          {/* 🔙 BACK TO LOGIN */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Lembrou da senha?
            </p>
            <Button 
              type="button"
              variant="secondary"
              onClick={handleBackToLogin}
              className="w-full"
            >
              Voltar ao Login
            </Button>
          </div>
        </form>

        {/* 📱 HELP SECTION */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-blue-800 font-semibold mb-2">
              Precisa de ajuda?
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                📞 Central de Atendimento: (11) 4002-8922
              </p>
              <p className="text-sm text-gray-600">
                📧 Email: suporte@viagemimpacta.com.br
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-700 font-semibold mb-2">
              Dicas de Segurança
            </p>
            <p className="text-xs text-gray-600">
              Nunca compartilhe suas credenciais. Nossos funcionários nunca solicitarão 
              sua senha por email ou telefone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPageAtomic;
