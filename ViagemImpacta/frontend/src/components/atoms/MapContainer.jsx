// src/components/atoms/MapContainer.jsx
import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

const defaultCenter = { lat: -15.779720, lng: -47.929720 };

const createMarkerIcon = (color) => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

function MapContainer({ hotels, onHotelSelect, selectedHotel, onMarkerClick, onMapClick }) {
    const [, setMap] = useState(null);

    const onLoad = useCallback((map) => setMap(map), []);
    const onUnmount = useCallback(() => setMap(null), []);

    return (
        <div className="rounded-lg shadow-xl overflow-hidden">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={4.5}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{ disableDefaultUI: true, zoomControl: true }}
                onClick={onMapClick}
            >
                {hotels.map(hotel => (
                    <Marker
                        key={hotel.id}
                        position={{ lat: hotel.lat, lng: hotel.lng }}
                        title={hotel.title}
                        icon={{
                            url: createMarkerIcon(hotel.markerColor),
                            scaledSize: new window.google.maps.Size(40, 40),
                            anchor: new window.google.maps.Point(20, 40),
                        }}
                        onClick={() => onMarkerClick(hotel)}
                    />
                ))}
                {selectedHotel && (
                    <InfoWindow
                        position={{ lat: selectedHotel.lat, lng: selectedHotel.lng }}
                        onCloseClick={() => onMarkerClick(null)}
                    >
                        <div className="p-1 max-w-xs">
                            <img src={selectedHotel.mainImageUrl} alt={selectedHotel.title} className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="p-2">
                                <h3 className="text-lg font-bold text-gray-900">{selectedHotel.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{selectedHotel.location}</p>
                                <button
                                    onClick={() => onHotelSelect(selectedHotel)}
                                    className="main-action-button w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm transition duration-300"
                                >
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}

export default MapContainer;
