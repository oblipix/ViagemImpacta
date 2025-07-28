/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Input, Text, Container, Image } from './atoms';
import { authService } from '../services';

// 🎯 REGISTER PAGE ATOMIC
// Versão atômica da página de registro com integração backend completa
// Utiliza o endpoint: POST /api/users/createUser

function RegisterPageAtomic({ onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Estados para feedback e validação
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    },
  });

  // Função para avaliar a força da senha
  const evaluatePasswordStrength = (passwordValue) => {
    let score = 0;
    const requirements = {
      length: passwordValue.length >= 8,
      uppercase: /[A-Z]/.test(passwordValue),
      lowercase: /[a-z]/.test(passwordValue),
      number: /[0-9]/.test(passwordValue),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
    };

    if (requirements.length) score++;
    if (requirements.uppercase) score++;
    if (requirements.lowercase) score++;
    if (requirements.number) score++;
    if (requirements.specialChar) score++;

    let message = '';
    let colorClass = 'text-gray-500';

    switch (score) {
      case 0:
      case 1:
        message = 'Muito fraca';
        colorClass = 'text-red-600';
        break;
      case 2:
        message = 'Fraca';
        colorClass = 'text-orange-600';
        break;
      case 3:
        message = 'Boa';
        colorClass = 'text-yellow-600';
        break;
      case 4:
        message = 'Forte';
        colorClass = 'text-green-600';
        break;
      case 5:
        message = 'Muito forte';
        colorClass = 'text-green-700';
        break;
      default:
        message = '';
    }

    setPasswordStrength({
      score,
      message,
      colorClass,
      requirements,
    });
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);
    
    // Verificar se as senhas coincidem
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordMatchError('As senhas não coincidem');
    } else {
      setPasswordMatchError('');
    }
    
    setErrorMessage('');
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    
    if (password && password !== newConfirmPassword) {
      setPasswordMatchError('As senhas não coincidem');
    } else {
      setPasswordMatchError('');
    }
    
    setErrorMessage('');
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    // Validações
    if (!primeiroNome || !ultimoNome || !email || !password || !confirmPassword) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    if (passwordStrength.score < 3) {
      setErrorMessage('Por favor, use uma senha mais forte.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // 🌐 INTEGRAÇÃO BACKEND: POST /api/users/createUser
      const userData = {
        firstName: primeiroNome.trim(),
        lastName: ultimoNome.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        role: 'User' // Role padrão para novos usuários
      };

      const result = await authService.register(userData);
      
      if (result) {
        setSuccessMessage('🎉 Conta criada com sucesso! Bem-vindo à Tripz! Redirecionando para o login...');
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          onNavigateToLogin();
        }, 2000);
      }
      
    } catch (error) {
      console.error('Erro no registro:', error);
      
      // Tratar diferentes tipos de erro
      if (error.message.includes('já existe') || error.message.includes('already exists')) {
        setErrorMessage('Este email já está cadastrado. Tente fazer login ou use outro email.');
      } else if (error.message.includes('400')) {
        setErrorMessage('Dados inválidos. Verifique os campos e tente novamente.');
      } else if (error.message.includes('500')) {
        setErrorMessage('Erro no servidor. Tente novamente em alguns minutos.');
      } else {
        setErrorMessage('Erro ao criar conta. Verifique sua conexão e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthBarColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      case 5:
        return 'bg-green-600';
      default:
        return 'bg-gray-300';
    }
  };

  const getPasswordStrengthWidth = () => {
    return `${(passwordStrength.score / 5) * 100}%`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {/* Coluna da Esquerda: Imagem */}
        <div className="w-1/2 hidden md:block">
          <Image
            src="https://picsum.photos/id/11/800/600"
            alt="Sinalização de destinos"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Coluna da Direita: Formulário de Cadastro */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <Text 
            as="h2" 
            className="text-3xl font-bold text-gray-800 mb-4 text-center"
          >
            Junte-se à Tripz!
          </Text>
          <Text className="text-gray-600 text-md mb-6 text-center">
            Descubra um mundo de viagens incríveis. É rápido e fácil!
          </Text>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Campos Primeiro Nome e Último Nome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="primeiroNome" className="block text-gray-700 text-sm font-bold mb-2">
                        Primeiro Nome
                    </label>
                    <Input
                        type="text"
                        id="primeiroNome"
                        placeholder="Ex: Maria"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={primeiroNome}
                        onChange={(e) => setPrimeiroNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ultimoNome" className="block text-gray-700 text-sm font-bold mb-2">
                        Último Nome
                    </label>
                    <Input
                        type="text"
                        id="ultimoNome"
                        placeholder="Ex: da Silva"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={ultimoNome}
                        onChange={(e) => setUltimoNome(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Seu Melhor Email
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

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Crie uma Senha Forte
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-gray-600">Mostrar senha</label>
              </div>
              
              {/* Exibir indicador de força da senha */}
              {password && (
                <div className="mt-2">
                  <Text className={`text-sm font-medium ${passwordStrength.colorClass}`}>
                    Força da senha: {passwordStrength.message}
                  </Text>
                  <div className="text-xs text-gray-500 mt-1">
                    <div>✓ Pelo menos 8 caracteres: {passwordStrength.requirements.length ? '✅' : '❌'}</div>
                    <div>✓ Letra maiúscula: {passwordStrength.requirements.uppercase ? '✅' : '❌'}</div>
                    <div>✓ Letra minúscula: {passwordStrength.requirements.lowercase ? '✅' : '❌'}</div>
                    <div>✓ Número: {passwordStrength.requirements.number ? '✅' : '❌'}</div>
                    <div>✓ Caractere especial: {passwordStrength.requirements.specialChar ? '✅' : '❌'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Campo Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirme sua Senha
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="********"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showConfirmPassword"
                  checked={showConfirmPassword}
                  onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="mr-2"
                />
                <label htmlFor="showConfirmPassword" className="text-sm text-gray-600">Mostrar confirmação de senha</label>
              </div>
              
              {/* Erro de correspondência de senhas */}
              {passwordMatchError && (
                <Text className="text-sm text-red-500 mt-1">{passwordMatchError}</Text>
              )}
            </div>

            <div className="flex items-center justify-center mt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="main-action-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? 'Criando conta...' : 'Criar Conta Tripz'}
              </Button>
            </div>
          </form>

          <div className="text-center mt-6 text-sm">
            <Text className="text-gray-600">Já tem uma conta?</Text>
            <button
              onClick={onNavigateToLogin}
              className="font-bold text-blue-600 hover:text-blue-800 transition"
            >
              Faça login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPageAtomic;
