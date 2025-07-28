// 🧬 SECTION - BlogSectionAtomic (Idêntica ao legacy)
// Seção de blog - PARIDADE TOTAL com BlogSection

import React from 'react';
import { Text, Container } from '../atoms';
import { BlogPostCard } from '../atoms';

const BlogSectionAtomic = ({ 
    id = "dicas-de-viagem",
    title = "Dicas de Viagem: Prepare sua Aventura!",
    posts = [],
    onCardClick,
    onCategoryClick,
    maxPosts,
    gridCols = {
        sm: 'sm:grid-cols-2',
        md: 'md:grid-cols-3', 
        lg: 'lg:grid-cols-4'
    },
    className = "",
    ...props
}) => {
    // Limita posts se maxPosts for especificado
    const displayPosts = maxPosts ? (posts || []).slice(0, maxPosts) : (posts || []);

    return (
        <section id={id} className={`bg-white py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 ${className}`} {...props}>
            <Container>
                <Text variant="h2" className="TitleSection text-3xl font-bold text-gray-800 mb-6 text-center">
                    {title}
                </Text>
                
                {/* GRID IDÊNTICO ao legacy */}
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
            </Container>
        </section>
    );
};

export default BlogSectionAtomic;
