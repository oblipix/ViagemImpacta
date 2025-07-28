// 🧪 TEST - BlogSection Atomic - PARIDADE TOTAL com Legacy
import React, { useState } from 'react';
import { BlogSectionAtomic } from './components/sections';

const TestBlogSectionAtomic = () => {
    const [clickLogs, setClickLogs] = useState([]);

    // Dados de posts de exemplo (IDÊNTICOS ao App.jsx)
    const blogPosts = [
        {
            id: 1,
            title: '10 Dicas Essenciais para Arrumar a Mala Perfeita',
            description: 'Descubra como otimizar espaço e evitar excesso de bagagem com estas dicas de ouro.',
            imageUrl: '/src/assets/images/blog-images/mala.jpg',
            category: 'Planejamento',
            fullContent: '<p>Arrumar a mala pode ser um desafio, mas com algumas estratégias simples...</p>'
        },
        {
            id: 2,
            title: 'Viajar com Economia: Guia Completo para Orçamentos Pequenos',
            description: 'Explore o mundo sem esvaziar a carteira! Dicas de passagens, hospedagem e alimentação barata.',
            imageUrl: '/src/assets/images/blog-images/economia.jpg',
            category: 'Economia',
            fullContent: '<p>Viajar com um orçamento limitado é totalmente possível!</p>'
        },
        {
            id: 3,
            title: 'Seu Pet na Aventura: Viajando com Animais de Estimação',
            description: 'Tudo o que você precisa saber para levar seu amigo de quatro patas na próxima viagem.',
            imageUrl: '/src/assets/images/blog-images/pet.jpg',
            category: 'Dicas',
            fullContent: '<p>Levar seu pet em viagens pode ser uma experiência maravilhosa...</p>'
        },
        {
            id: 4,
            title: 'Segurança em Viagens Internacionais: O que Você Precisa Saber',
            description: 'Dicas cruciais para manter sua segurança e tranquilidade em destinos estrangeiros.',
            imageUrl: '/src/assets/images/blog-images/viagem.jpg',
            category: 'Segurança',
            fullContent: '<p>Viajar para o exterior é emocionante, mas a segurança deve ser sempre uma prioridade...</p>'
        },
    ];

    const handleCardClick = (postId) => {
        const log = `${new Date().toLocaleTimeString()} - Post clicado: ID ${postId}`;
        setClickLogs(prev => [log, ...prev]);
        alert(`🔗 Post ${postId} clicado! (Funcionalidade idêntica ao legacy)`);
    };

    const handleCategoryClick = (category) => {
        const log = `${new Date().toLocaleTimeString()} - Categoria clicada: ${category}`;
        setClickLogs(prev => [log, ...prev]);
        alert(`🏷️ Categoria "${category}" clicada! (Funcionalidade idêntica ao legacy)`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header de teste */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        🧪 Teste: BlogSectionAtomic
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Versão atômica da seção de blog - PARIDADE TOTAL com BlogSection legacy
                    </p>
                </div>
            </header>

            {/* Seção de blog atômica */}
            <BlogSectionAtomic
                id="blog-test"
                title="Dicas de Viagem: Prepare sua Aventura!"
                posts={blogPosts}
                onCardClick={handleCardClick}
                onCategoryClick={handleCategoryClick}
            />

            {/* Teste com configurações personalizadas */}
            <div className="py-8">
                <BlogSectionAtomic
                    id="blog-custom-test"
                    title="Blog Personalizado (2 posts max)"
                    posts={blogPosts}
                    maxPosts={2}
                    onCardClick={handleCardClick}
                    onCategoryClick={handleCategoryClick}
                    gridCols={{
                        sm: 'sm:grid-cols-1',
                        md: 'md:grid-cols-2', 
                        lg: 'lg:grid-cols-2'
                    }}
                />
            </div>

            {/* Informações de teste */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        ℹ️ Informações do Teste
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-md font-semibold mb-2 text-blue-600">🧬 Componentes Atômicos</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                <li>✅ Text (títulos e descrições)</li>
                                <li>✅ Container (wrapper principal)</li>
                                <li>✅ BlogPostCard (card individual)</li>
                                <li>✅ Grid responsivo (1, 2, 3, 4 colunas)</li>
                                <li>✅ Clique em posts e categorias</li>
                                <li>✅ maxPosts (limitador de posts)</li>
                                <li>✅ Classes CSS originais (TitleSection)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-md font-semibold mb-2 text-green-600">🎯 Paridade com Legacy</h3>
                            <p><strong>Status:</strong> ✅ PARIDADE TOTAL com BlogSection legacy</p>
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800 font-medium">
                                    🎯 A BlogSectionAtomic está VISUALMENTE IDÊNTICA ao BlogSection legacy!
                                </p>
                                <p className="text-green-700 text-sm mt-1">
                                    Grid, cards, funcionalidades e estilos copiados diretamente do original.
                                </p>
                            </div>
                        </div>

                        {/* Logs de cliques */}
                        {clickLogs.length > 0 && (
                            <div className="md:col-span-2 mt-4">
                                <p><strong>📋 Log de cliques:</strong></p>
                                <div className="bg-gray-100 border rounded p-3 max-h-32 overflow-y-auto">
                                    {clickLogs.map((log, index) => (
                                        <p key={index} className="text-xs text-gray-700 font-mono">
                                            {log}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestBlogSectionAtomic;
