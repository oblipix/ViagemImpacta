import React from 'react';
import { Button, SVGIcon } from '../atoms';

// 🎯 PÁGINA ATÔMICA - Blog
// 
// Esta página exibe artigos do blog sobre viagens
const BlogPageAtomic = ({ onBack, onBlogPostClick }) => {
  // 🎯 DADOS MOCKADOS DE POSTS DO BLOG
  const blogPosts = [
    {
      id: 1,
      title: '10 Destinos Imperdíveis no Brasil para 2025',
      excerpt: 'Descubra os lugares mais incríveis para visitar no Brasil neste ano, desde praias paradisíacas até cidades históricas.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Ana Silva',
      date: '2025-01-15',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
      category: 'Destinos',
      tags: ['Brasil', 'Viagem', '2025']
    },
    {
      id: 2,
      title: 'Como Planejar uma Viagem Econômica',
      excerpt: 'Dicas práticas para viajar gastando pouco sem abrir mão do conforto e da diversão.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'João Santos',
      date: '2025-01-12',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600',
      category: 'Dicas',
      tags: ['Economia', 'Planejamento', 'Dicas']
    },
    {
      id: 3,
      title: 'As Melhores Praias do Nordeste',
      excerpt: 'Uma seleção especial das praias mais bonitas e preservadas do nordeste brasileiro.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Maria Costa',
      date: '2025-01-10',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      category: 'Praias',
      tags: ['Nordeste', 'Praias', 'Mar']
    },
    {
      id: 4,
      title: 'Turismo Rural: Fugindo da Correria da Cidade',
      excerpt: 'Conheça destinos rurais que oferecem paz, tranquilidade e contato com a natureza.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Pedro Oliveira',
      date: '2025-01-08',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      category: 'Natureza',
      tags: ['Rural', 'Natureza', 'Paz']
    },
    {
      id: 5,
      title: 'Gastronomia Regional: Sabores do Brasil',
      excerpt: 'Uma viagem pelos sabores únicos de cada região do nosso país.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Carla Mendes',
      date: '2025-01-05',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
      category: 'Gastronomia',
      tags: ['Comida', 'Cultura', 'Regional']
    },
    {
      id: 6,
      title: 'Aventuras no Ecoturismo Brasileiro',
      excerpt: 'Trilhas, cachoeiras e aventuras para quem busca adrenalina em meio à natureza.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Rafael Torres',
      date: '2025-01-03',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600',
      category: 'Aventura',
      tags: ['Ecoturismo', 'Aventura', 'Trilhas']
    }
  ];

  // 🎯 CATEGORIAS PARA FILTRO
  const categories = [
    'Todos',
    'Destinos',
    'Dicas',
    'Praias',
    'Natureza',
    'Gastronomia',
    'Aventura'
  ];

  // 🎯 ESTADO PARA FILTRO
  const [selectedCategory, setSelectedCategory] = React.useState('Todos');

  // 🎯 FILTRAR POSTS POR CATEGORIA
  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // 🎯 RENDERIZAR CARD DE POST
  const renderBlogCard = (post) => (
    <article key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
             onClick={() => onBlogPostClick && onBlogPostClick(post.id)}>
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <SVGIcon path="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <SVGIcon path="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
              {new Date(post.date).toLocaleDateString('pt-BR')}
            </span>
            <span className="flex items-center gap-1">
              <SVGIcon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              {post.readTime}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
              <SVGIcon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              Voltar
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Blog de Viagens</h1>
              <p className="text-gray-600">Inspire-se com nossas dicas e histórias</p>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Descubra o Mundo Através das Nossas Histórias</h2>
          <p className="text-xl opacity-90">
            Dicas de viagem, destinos incríveis e experiências únicas para inspirar sua próxima aventura.
          </p>
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts do blog */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(renderBlogCard)}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16 border-t">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Quer compartilhar sua experiência?</h3>
          <p className="text-gray-600 mb-8">
            Envie sua história de viagem e inspire outros viajantes com suas descobertas.
          </p>
          <Button>
            Enviar Sua História
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPageAtomic;
