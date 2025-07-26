import React, { useState } from 'react';
import { Button, Input, Card, Text } from '../../atoms';

export const SearchForm = ({ 
    onSearch, 
    title = "Encontre o hotel perfeito",
    className = '' 
}) => {
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const searchData = {
            destination,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            guests: parseInt(guests)
        };
        
        if (onSearch) {
            onSearch(searchData);
        }
    };
    
    return (
        <Card variant="elevated" className={`p-6 ${className}`}>
            {title && (
                <Text variant="h3" className="mb-6 text-center">
                    {title}
                </Text>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:-mt-30 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Destino
                        </label>
                        <Input
                            type="text"
                            placeholder="Para onde você vai?"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-in
                        </label>
                        <Input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-out
                        </label>
                        <Input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hóspedes
                        </label>
                        <Input
                            type="number"
                            min="1"
                            max="10"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <div className="flex justify-center pt-4">
                    <Button 
                        type="submit" 
                        variant="primary"
                        className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                        🔍 Buscar Hotéis
                    </Button>
                </div>
            </form>
        </Card>
    );
};
