// src/components/atoms/LoadingMap.jsx
import React from 'react';

const containerStyle = {
    width: '100%',
    height: '500px',
};

function LoadingMap() {
    return (
        <div className="container mx-auto px-6 py-12 text-center">
            <div 
                style={containerStyle} 
                className="bg-gray-200 flex items-center justify-center rounded-lg shadow-lg"
            >
                <p className="text-gray-500">Carregando mapa...</p>
            </div>
        </div>
    );
}

export default LoadingMap;
