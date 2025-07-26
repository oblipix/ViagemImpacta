import React from 'react';
import ActionButton from '../ActionButton/ActionButton';
import CategoryTag from '../CategoryTag/CategoryTag';

// 🎯 ATOMIC COMPONENT - BlogPostCard
// Este átomo reproduz exatamente o card de post do blog do legacy
const BlogPostCard = ({ 
    post,
    onCardClick,
    onCategoryClick,
    wrapperClasses = '',
    showCategory = true,
    className = '',
    ...props 
}) => {
    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick(post.id);
        }
    };

    const handleCategoryClick = (category) => {
        if (onCategoryClick) {
            onCategoryClick(category);
        }
    };

    return (
        <div className={wrapperClasses}>
            <div
                className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer h-full flex flex-col transition-transform duration-200 hover:scale-[1.02] ${className}`}
                onClick={handleCardClick}
                {...props}
            >
                <div className="relative w-full h-40 overflow-hidden">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    {showCategory && post.category && (
                        <div className="absolute top-2 left-2">
                            <CategoryTag
                                category={post.category}
                                onClick={handleCategoryClick}
                                variant="primary"
                            />
                        </div>
                    )}
                </div>
                
                <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-lg mb-1 text-gray-800">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{post.description}</p>
                    </div>
                    
                    <ActionButton
                        onClick={handleCardClick}
                        variant="primary"
                        className="text-sm mt-auto self-start"
                    >
                        Ler Mais
                    </ActionButton>
                </div>
            </div>
        </div>
    );
};

export default BlogPostCard;
