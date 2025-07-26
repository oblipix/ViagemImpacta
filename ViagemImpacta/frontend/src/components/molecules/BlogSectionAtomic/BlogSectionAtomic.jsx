import React from 'react';
import { SectionTitle, BlogPostCard } from '../../atoms';

// 🧬 MOLECULE - BlogSectionAtomic
// Esta molécula reproduz exatamente a BlogSection do legacy usando átomos
const BlogSectionAtomic = ({ 
    id = "dicas-de-viagem",
    title = "Dicas de Viagem: Prepare sua Aventura!",
    posts,
    onCardClick,
    onCategoryClick,
    maxPosts,
    gridCols = {
        sm: 'sm:grid-cols-2',
        md: 'md:grid-cols-3', 
        lg: 'lg:grid-cols-4'
    },
    className = ''
}) => {
    // Limita posts se maxPosts for especificado
    const displayPosts = maxPosts ? posts.slice(0, maxPosts) : posts;

    return (
        <section id={id} className={`bg-white py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 ${className}`}>
            <div className="container mx-auto">
                <SectionTitle className="text-center mb-6">
                    {title}
                </SectionTitle>
                
                <div className={`grid grid-cols-1 ${gridCols.sm} ${gridCols.md} ${gridCols.lg} gap-6`}>
                    {displayPosts.map((post) => (
                        <BlogPostCard
                            key={post.id}
                            post={post}
                            onCardClick={onCardClick}
                            onCategoryClick={onCategoryClick}
                            wrapperClasses="w-full"
                            showCategory={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSectionAtomic;
