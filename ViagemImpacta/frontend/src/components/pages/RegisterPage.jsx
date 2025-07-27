// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate(); // Hook para navegação

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [primeiroNome, setPrimeiroNome] = useState('');
    const [ultimoNome, setUltimoNome] = useState('');

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
        colorClass: 'text-gray-500',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
                message = 'Muito Fraca';
                colorClass = 'text-red-500';
                break;
            case 2:
                message = 'Fraca';
                colorClass = 'text-orange-500';
                break;
            case 3:
                message = 'Média';
                colorClass = 'text-yellow-500';
                break;
            case 4:
                message = 'Forte';
                colorClass = 'text-green-500';
                break;
            case 5:
                message = 'Muito Forte';
                colorClass = 'text-green-700';
                break;
            default:
                message = '';
                colorClass = 'text-gray-500';
        }

        setPasswordStrength({ score, message, requirements, colorClass });
    };

    const handleRegister = async () => {
        setError(null);
        setSuccessMessage(null);

        try {
            // Lógica de chamada a API de registro iria aqui...
            // Simulando um delay de rede e sucesso no registro:
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuccessMessage('Seu cadastro foi concluído com sucesso! Bem-vindo à Tripz! 🎉');
            
            setTimeout(() => {
                navigate('/login'); // Navega para a página de login após o sucesso
            }, 1500);

        } catch (apiError) {
            setError(apiError.message || 'Ocorreu um erro no cadastro. Tente novamente.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ... (toda a sua lógica de validação continua exatamente a mesma)
        let isValid = true;
        setError(null);
        setSuccessMessage(null);

        if (!primeiroNome.trim() || !ultimoNome.trim()) {
            setError('Por favor, preencha seu primeiro nome e último nome.');
            isValid = false;
        }

        if (password !== confirmPassword) {
            setPasswordMatchError('As senhas não coincidem!');
            isValid = false;
        } else {
            setPasswordMatchError('');
        }

        if (passwordStrength.score < 3 && password.length > 0) {
            setError('Sua senha é muito fraca. Por favor, crie uma senha mais forte seguindo as sugestões.');
            isValid = false;
        }

        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setError('Por favor, insira um email válido.');
            isValid = false;
        }

        if (isValid) {
            await handleRegister();
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        evaluatePasswordStrength(newPassword);
        if (confirmPassword && newPassword !== confirmPassword) {
            setPasswordMatchError('As senhas não correspondem.');
        } else {
            setPasswordMatchError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (password && newConfirmPassword !== password) {
            setPasswordMatchError('As senhas não correspondem.');
        } else {
            setPasswordMatchError('');
        }
    };

    return (
        <section className="flex items-center justify-center bg-gray-100 py-8 font-sans">
            <div className="bg-white shadow-lg rounded-xl flex max-w-4xl w-full overflow-hidden my-8">
                {/* Coluna da Esquerda: Imagem */}
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://picsum.photos/id/11/800/600"
                        alt="Sinalização de destinos"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Coluna da Direita: Formulário de Cadastro */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Junte-se à Tripz!</h2>
                    <p className="text-gray-600 text-md mb-6 text-center">
                        Descubra um mundo de viagens incríveis. É rápido e fácil!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {successMessage && (
                            <p className="text-green-500 text-sm italic text-center bg-green-100 p-2 rounded-lg">{successMessage}</p>
                        )}
                        {error && (
                            <p className="text-red-500 text-sm italic text-center bg-red-100 p-2 rounded-lg">{error}</p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="primeiroNome" className="block text-gray-700 text-sm font-bold mb-2">
                                    Primeiro Nome
                                </label>
                                <input
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
                                <input
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

                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Seu Melhor Email
                            </label>
                            <input
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
                                Crie uma Senha Forte
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="********"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordStrength.score < 3 && password.length > 0 ? 'border-red-500' : ''}`}
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            {password.length > 0 && (
                                <div className="mt-2">
                                    <p className={`text-xs font-semibold ${passwordStrength.colorClass}`}>
                                        Força da Senha: {passwordStrength.message}
                                    </p>
                                    <ul className="text-xs text-gray-600 mt-1 list-disc pl-4">
                                        <li className={`${passwordStrength.requirements.length ? 'text-green-600' : 'text-red-500'}`}>Pelo menos 8 caracteres</li>
                                        <li className={`${passwordStrength.requirements.uppercase ? 'text-green-600' : 'text-red-500'}`}>Uma letra maiúscula</li>
                                        <li className={`${passwordStrength.requirements.lowercase ? 'text-green-600' : 'text-red-500'}`}>Uma letra minúscula</li>
                                        <li className={`${passwordStrength.requirements.number ? 'text-green-600' : 'text-red-500'}`}>Um número</li>
                                        <li className={`${passwordStrength.requirements.specialChar ? 'text-green-600' : 'text-red-500'}`}>Um caractere especial (!@#$...)</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                Confirme sua Senha
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="********"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordMatchError ? 'border-red-500' : ''}`}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                onBlur={handleConfirmPasswordChange}
                                required
                            />
                            {passwordMatchError && <p className="text-red-500 text-xs italic mt-1">{passwordMatchError}</p>}
                            {password && confirmPassword && password === confirmPassword && !passwordMatchError && (
                                <p className="text-green-600 text-xs italic mt-1">Senhas combinam! ✅</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="submit"
                                className="main-action-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            >
                                Começar Minha Aventura!
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6 text-sm">
                        <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 transition">
                            Já tem uma conta? Faça login aqui.
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;