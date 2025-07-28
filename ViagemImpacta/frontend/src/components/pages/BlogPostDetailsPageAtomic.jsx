import React from 'react';
import { Button, SVGIcon } from '../atoms';

// 🎯 PÁGINA ATÔMICA - Detalhes do Post do Blog
// 
// Esta página exibe o conteúdo completo de um post do blog
const BlogPostDetailsPageAtomic = ({ onBack, postId }) => {
  // 🎯 DADOS MOCKADOS DE POSTS DO BLOG (em produção viria do backend)
  const blogPosts = [
    {
      id: 1,
      title: '10 Destinos Imperdíveis no Brasil para 2025',
      excerpt: 'Descubra os lugares mais incríveis para visitar no Brasil neste ano, desde praias paradisíacas até cidades históricas.',
      content: `
        <p>O Brasil é um país de dimensões continentais, repleto de belezas naturais e culturais que encantam viajantes do mundo inteiro. Para 2025, selecionamos os 10 destinos que você não pode deixar de conhecer.</p>
        
        <h3>1. Fernando de Noronha - PE</h3>
        <p>Um paraíso preservado no meio do Atlântico, Fernando de Noronha oferece algumas das praias mais bonitas do mundo. Com águas cristalinas e vida marinha exuberante, é o destino perfeito para quem busca tranquilidade e contato com a natureza.</p>
        
        <h3>2. Chapada dos Veadeiros - GO</h3>
        <p>Para os amantes do ecoturismo, a Chapada dos Veadeiros é um destino obrigatório. Com cachoeiras impressionantes, trilhas desafiadoras e uma energia única, é o local perfeito para se reconectar com a natureza.</p>
        
        <h3>3. Lençóis Maranhenses - MA</h3>
        <p>Um dos lugares mais únicos do Brasil, os Lençóis Maranhenses oferecem uma paisagem surreal de dunas de areia branca e lagoas de água doce cristalina. A melhor época para visitar é entre junho e setembro.</p>
        
        <h3>4. Ouro Preto - MG</h3>
        <p>Rica em história e arquitetura colonial, Ouro Preto é uma viagem no tempo. Suas ruas de paralelepípedo, igrejas barrocas e museus contam a história do Brasil colonial.</p>
        
        <h3>5. Bonito - MS</h3>
        <p>Conhecido como a capital do ecoturismo brasileiro, Bonito oferece experiências únicas como mergulho em rios cristalinos, grutas subterrâneas e observação da fauna local.</p>
        
        <p>Continue lendo para descobrir os outros 5 destinos que completam nossa lista especial para 2025...</p>
      `,
      author: 'Ana Silva',
      date: '2025-01-15',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      category: 'Destinos',
      tags: ['Brasil', 'Viagem', '2025']
    },
    {
      id: 2,
      title: 'Como Planejar uma Viagem Econômica',
      excerpt: 'Dicas práticas para viajar gastando pouco sem abrir mão do conforto e da diversão.',
      content: `
        <p>Viajar não precisa ser caro! Com planejamento e algumas dicas práticas, é possível conhecer lugares incríveis gastando pouco. Confira nossas estratégias para economizar sem abrir mão da qualidade.</p>
        
        <h3>1. Planeje com Antecedência</h3>
        <p>A regra de ouro para economizar é planejar com antecedência. Passagens aéreas e hotéis costumam ter preços mais baixos quando reservados com pelo menos 60 dias de antecedência.</p>
        
        <h3>2. Seja Flexível com as Datas</h3>
        <p>Viajar fora da alta temporada pode resultar em economias significativas. Use ferramentas de busca que mostram os preços em diferentes datas para encontrar as melhores ofertas.</p>
        
        <h3>3. Considere Hospedagens Alternativas</h3>
        <p>Além dos hotéis tradicionais, considere pousadas, hostels, Airbnb ou até mesmo camping. Essas opções podem oferecer experiências únicas por um preço muito menor.</p>
        
        <h3>4. Transporte Local</h3>
        <p>Use transporte público, caminhe ou alugue bicicletas para se locomover. Além de economizar, você terá uma experiência mais autêntica do destino.</p>
        
        <p>Com essas dicas, você pode reduzir seus gastos de viagem em até 50% sem comprometer a qualidade da experiência!</p>
      `,
      author: 'João Santos',
      date: '2025-01-12',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      category: 'Dicas',
      tags: ['Economia', 'Planejamento', 'Dicas']
    }
    // Outros posts podem ser adicionados aqui...
  ];

  // 🎯 ENCONTRAR O POST PELO ID
  const post = blogPosts.find(p => p.id === parseInt(postId)) || blogPosts[0];

  // 🎯 POSTS RELACIONADOS (excluindo o atual)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <Button onClick={onBack} variant="ghost" className="flex items-center gap-2 mb-4">
            <SVGIcon path="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            Voltar ao Blog
          </Button>
        </div>
      </div>

      {/* Artigo */}
      <article className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Imagem principal */}
          <div className="relative h-96">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category}
              </span>
            </div>
          </div>
          
          {/* Conteúdo */}
          <div className="p-8">
            {/* Título */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h1>
            
            {/* Meta informações */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <SVGIcon path="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                <span>Por {post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <SVGIcon path="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <SVGIcon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                <span>{post.readTime} de leitura</span>
              </div>
            </div>
            
            {/* Conteúdo do artigo */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="flex gap-2 mt-8 pt-8 border-t">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Posts relacionados */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Artigos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <img 
                  src={relatedPost.image} 
                  alt={relatedPost.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{relatedPost.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <span>{relatedPost.author}</span>
                    <span>•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-white py-16 border-t">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Gostou do artigo?</h3>
          <p className="text-gray-600 mb-8">
            Assine nossa newsletter e receba as melhores dicas de viagem diretamente no seu email.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              Compartilhar
            </Button>
            <Button>
              Assinar Newsletter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetailsPageAtomic;
