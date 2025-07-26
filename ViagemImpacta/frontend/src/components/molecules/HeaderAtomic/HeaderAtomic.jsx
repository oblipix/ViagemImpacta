import React from 'react';
import { Button, Text } from '../../atoms';

// 🧬 MOLECULAR COMPONENT - Header Atomic
const HeaderAtomic = ({ 
    onNavigateToMyTravels, 
    onNavigateToHome, 
    onNavigateToInstitutional, 
    onNavigateToTestAtomic,
    onNavigateToComponentsTest,
    currentPage 
}) => {
    
    const getButtonClasses = (pageName) => {
        let isActive = currentPage === pageName;

        // Condição especial para o botão 'Minhas Viagens'
        if (pageName === 'myTravels') {
            isActive = ['myTravels', 'login', 'register'].includes(currentPage);
        }

        // ✅ Usando as mesmas classes CSS do legacy
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
                
                {/* 🎯 LOGO ATÔMICO */}
                <div
                    className="flex items-center cursor-pointer"
                    onClick={onNavigateToHome}
                >
                    <Text className="logo">
                        Tripz
                    </Text>
                    <Text variant="small" className="text-green-400 ml-2">
                        [Atomic]
                    </Text>
                </div>

                {/* 🎯 NAVEGAÇÃO ATÔMICA */}
                <nav>
                    <ul className="flex items-center space-x-8">
                        
                        {/* Botão Início */}
                        <li>
                            <Button
                                onClick={onNavigateToHome}
                                className={getButtonClasses('home')}
                                variant="ghost"
                            >
                                Início
                            </Button>
                        </li>
                        
                        {/* Botão Institucional */}
                        <li>
                            <Button
                                onClick={onNavigateToInstitutional}
                                className={getButtonClasses('institutional')}
                                variant="ghost"
                            >
                                Institucional
                            </Button>
                        </li>

                        {/* Botão Minhas Viagens */}
                        <li>
                            <Button
                                onClick={onNavigateToMyTravels}
                                className={getButtonClasses('myTravels')}
                                variant="ghost"
                            >
                                Minhas Viagens
                            </Button>
                        </li>
                        
                        {/* Botão Nova Landing Atômica */}
                        <li>
                            <Button
                                onClick={onNavigateToTestAtomic}
                                className={getButtonClasses('testAtomic')}
                                variant="primary"
                                style={{ 
                                    backgroundColor: '#10B981', 
                                    borderRadius: '4px', 
                                    padding: '6px 12px',
                                    color: 'white'
                                }}
                            >
                                🧪 Nova Landing
                            </Button>
                        </li>
                        
                        {/* Botão Componentes */}
                        <li>
                            <Button
                                onClick={onNavigateToComponentsTest}
                                className={getButtonClasses('testComponents')}
                                variant="ghost"
                                style={{ 
                                    color: '#fbbf24',
                                    fontWeight: 'normal'
                                }}
                            >
                                🔧 Componentes
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HeaderAtomic;
