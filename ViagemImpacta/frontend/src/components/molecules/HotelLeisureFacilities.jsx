// src/components/molecules/HotelLeisureFacilities.jsx
import React from 'react';

// Ícones SVG para facilidades de lazer
const LeisureIcons = {
  Pool: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292V15m0 0v2m0-2a4 4 0 100 0m0 0a4 4 0 110 0" /></svg>,
  Gym: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  ArtRoom: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M4 8h16M4 16h16M11 4h2M11 20h2M12 12h.01M12 12v.01M8 12h.01M8 12v.01M16 12h.01M16 12v.01" /></svg>,
  Garden: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M4 8h16M4 16h16M11 4h2M11 20h2M12 12h.01M12 12v.01M8 12h.01M8 12v.01M16 12h.01M16 12v.01" /></svg>,
  Cinema: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M4 8h16M4 16h16M11 4h2M11 20h2M12 12h.01M12 12v.01M8 12h.01M8 12v.01M16 12h.01M16 12v.01" /></svg>,
  Sauna: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Spa: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Bar: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>,
  Saloon: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m4-12h6m-6 4h6m-6 4h6m0 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v3m10-5V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m4-12h6m-6 4h6m-6 4h6m0 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v3" /></svg>,
  KidsArea: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h3a2 2 0 002-2V6zm0 0a2 2 0 012 2h3a2 2 0 012 2v4a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm-7 4h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>,
  Lounge: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2z" /></svg>,
};

function HotelLeisureFacilities({ leisureFacilities }) {
    if (!leisureFacilities || leisureFacilities.length === 0) {
        return null;
    }

    // Mapeamento de nomes de comodidades para componentes de ícone
    const leisureIconMap = {
        'Piscina': LeisureIcons.Pool,
        'Jaguzza': LeisureIcons.Spa,
        'Academia': LeisureIcons.Gym,
        'Spa': LeisureIcons.Spa,
        'Sauna': LeisureIcons.Sauna,
        'Bar na piscina': LeisureIcons.Bar,
        'Salão de Jogos': LeisureIcons.Saloon,
        'Piscina Aquecida': LeisureIcons.Pool,
        'Lareira Comunal': LeisureIcons.Lounge,
        'Jardim Amplo': LeisureIcons.Garden,
        'Trilhas': LeisureIcons.Garden,
        'Piscina natural': LeisureIcons.Pool,
        'Redário': LeisureIcons.Lounge,
        'Salão de Eventos': LeisureIcons.Saloon,
        'Área Kids': LeisureIcons.KidsArea,
        'Sala de Artes': LeisureIcons.ArtRoom,
        'Sala de Cinema': LeisureIcons.Cinema,
        'Bar': LeisureIcons.Bar,
    };

    return (
        <div className="mb-8 bgHotelDetails2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lazer e Entretenimento</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-700">
                {leisureFacilities.map((facility, index) => {
                    const IconComponent = leisureIconMap[facility];
                    return (
                        <p key={index} className="flex items-center">
                            {IconComponent ? <IconComponent /> : <span className="w-5 h-5 mr-2"></span>}
                            {facility}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}

export default HotelLeisureFacilities;
