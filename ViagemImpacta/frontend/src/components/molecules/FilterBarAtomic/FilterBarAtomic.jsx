import React from 'react';
import { FilterButton } from '../../atoms';

// 🧬 MOLECULAR COMPONENT - FilterBarAtomic
const FilterBarAtomic = ({ 
    activeFilter,
    onSelectPromos,
    onSelectRecommended,
    onNavigateToHotels,
    onNavigateToEvents,
    className = '',
    ...props 
}) => {
    const filters = [
        {
            id: 'promos',
            label: 'Promoção',
            href: '#viagens-promocao',
            onClick: onSelectPromos,
            variant: 'link'
        },
        {
            id: 'recommended',
            label: 'Recomendado por Viajantes',
            href: '#recomendado-viajantes',
            onClick: onSelectRecommended,
            variant: 'link'
        },
        {
            id: 'hotels',
            label: 'Hotéis',
            onClick: onNavigateToHotels,
            variant: 'button'
        },
        {
            id: 'events',
            label: 'Eventos',
            onClick: onNavigateToEvents,
            variant: 'button'
        }
    ];

    return (
        <section 
            className={`bg-white rounded-t-[50px] shadow-md -mt-5 md:-mt-10 relative z-10 py-4 px-6 ${className}`}
            {...props}
        >
            <div className="container mx-auto flex flex-wrap justify-center gap-4">
                {filters.map((filter) => (
                    <FilterButton
                        key={filter.id}
                        isActive={activeFilter === filter.id}
                        onClick={filter.onClick}
                        href={filter.href}
                        variant={filter.variant}
                    >
                        {filter.label}
                    </FilterButton>
                ))}
            </div>
        </section>
    );
};

export default FilterBarAtomic;
