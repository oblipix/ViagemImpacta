import React from 'react';
import { SectionTitle, RecommendedHotelCard } from '../../atoms';

// 🧬 MOLECULE - RecommendedHotelsSectionAtomic
// Esta molécula reproduz exatamente a RecommendedHotelsSection do legacy usando átomos
const RecommendedHotelsSectionAtomic = ({ 
    hotels, 
    onHotelClick,
    id = "recomendado-viajantes",
    title = "Hotéis Mais Avaliados",
    maxHotels = 3,
    className = ''
}) => {
    // Ordena os hotéis pela avaliação (maior primeiro) e pega os primeiros conforme maxHotels
    const topRatedHotels = [...hotels].sort((a, b) => b.rating - a.rating).slice(0, maxHotels);

    return (
        <section id={id} className={`py-12 bg-gray-50 px-6 ${className}`}>
            <div className="container mx-auto">
                <SectionTitle className="TitleSection">
                    {title} <span className="text-yellow-500">★</span>
                </SectionTitle>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topRatedHotels.map(hotel => (
                        <RecommendedHotelCard
                            key={hotel.id}
                            hotel={hotel}
                            onHotelClick={onHotelClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedHotelsSectionAtomic;
