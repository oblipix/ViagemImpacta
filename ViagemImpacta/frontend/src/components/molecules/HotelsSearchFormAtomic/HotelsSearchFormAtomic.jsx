import React, { useState } from 'react';
import { OverlaySearchForm, InputWithIcon, SVGIcon } from '../../atoms';
import { Button } from '../../atoms/Button/Button';
import '../../SearchForms.css';


// 🧬 MOLECULAR COMPONENT - HotelsSearchFormAtomic
// Reproduz exatamente a estrutura e funcionalidade do HotelsSearchForm legacy
const HotelsSearchFormAtomic = ({ 
    onSearch, 
    allHotelsData = [],
    className = '',
    ...props 
}) => {
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(2);
    const [roomType, setRoomType] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

    // Coleta todos os tipos de quartos únicos de todos os hotéis para as opções de dropdown
    const availableRoomTypes = Array.from(new Set(
        allHotelsData.flatMap(hotel => hotel.roomOptions ? hotel.roomOptions.map(room => room.type) : [])
    )).sort();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch({
                destination,
                checkInDate,
                checkOutDate,
                guests,
                roomType,
                minRating: parseFloat(minRating),
                maxPrice: parseFloat(maxPrice),
            });
        }
    };

    return (
        <section>
            <div className="container mx-auto max-w-full">
                <form onSubmit={handleSubmit} className="HotelsSeachForm p-8 rounded-xl shadow-lg px-6 -mt-10 md:-mt-10 relative z-0">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Encontre o Hotel Perfeito</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {/* Destino */}
                        <div className="relative">
                            <label htmlFor="destination" className="labelForms">
                                <SVGIcon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                Destino
                            </label>
                            <InputWithIcon
                                type="text"
                                id="destination"
                                placeholder="Para onde vai?"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                required
                                className="pl-10"
                            />
                        </div>

                        {/* Check-in */}
                        <div className="relative">
                            <label htmlFor="checkIn" className="labelForms">
                                <SVGIcon path="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                                Check-in
                            </label>
                            <InputWithIcon
                                type="date"
                                id="checkIn"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                required
                                className="pl-10"
                            />
                        </div>

                        {/* Check-out */}
                        <div className="relative">
                            <label htmlFor="checkOut" className="labelForms">
                                <SVGIcon path="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                                Check-out
                            </label>
                            <InputWithIcon
                                type="date"
                                id="checkOut"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                required
                                className="pl-10"
                            />
                        </div>

                        {/* Hóspedes */}
                        <div className="relative">
                            <label htmlFor="guests" className="labelForms">
                                <SVGIcon path="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.99 2.99 0 0 0 17.08 7H16.5c-.69 0-1.26.38-1.58.93L13 11.5v3.5c0 .55-.45 1-1 1s-1-.45-1-1v-6.5c0-1.1-.9-2-2-2H6C4.9 7 4 7.9 4 9v11H2v2h18v-2h-2zM12.5 11.5L15 8" />
                                Hóspedes
                            </label>
                            <InputWithIcon
                                type="number"
                                id="guests"
                                min="1"
                                max="10"
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                required
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Segunda linha - Filtros adicionais */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Tipo de Quarto */}
                        <div className="relative">
                            <label htmlFor="roomType" className="labelForms">
                                <SVGIcon path="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H9v3h8V10h2V7z" />
                                Tipo de Quarto
                            </label>
                            <select
                                id="roomType"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option value="">Todos os tipos</option>
                                {availableRoomTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Classificação Mínima */}
                        <div className="relative">
                            <label htmlFor="minRating" className="labelForms">
                                <SVGIcon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                Classificação Mín.
                            </label>
                            <select
                                id="minRating"
                                value={minRating}
                                onChange={(e) => setMinRating(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option value={0}>Qualquer classificação</option>
                                <option value={1}>1+ estrelas</option>
                                <option value={2}>2+ estrelas</option>
                                <option value={3}>3+ estrelas</option>
                                <option value={4}>4+ estrelas</option>
                                <option value={5}>5 estrelas</option>
                            </select>
                        </div>

                        {/* Preço Máximo */}
                        <div className="relative">
                            <label htmlFor="maxPrice" className="labelForms">
                                <SVGIcon path="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                                Preço Máximo (R$)
                            </label>
                            <InputWithIcon
                                type="number"
                                id="maxPrice"
                                min="0"
                                step="50"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Botão de Busca */}
                    <div className="flex justify-center">
                        <Button 
                            type="submit" 
                            className="btn-common-style bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                        >
                            <SVGIcon path="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            🔍 Buscar Hotéis
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default HotelsSearchFormAtomic;
