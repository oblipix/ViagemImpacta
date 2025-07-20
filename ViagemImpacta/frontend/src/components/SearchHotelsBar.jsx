// src/components/SearchHotelsBar.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Estilos para o datepicker

// Ícones SVG para os campos de entrada
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);


// Array de opções para o dropdown de Quartos e Hóspedes
const roomGuestOptions = [
  { rooms: 1, adults: 1, children: 0, label: "1 Quarto, 1 adulto" },
  { rooms: 1, adults: 2, children: 0, label: "1 Quarto, 2 adultos (Casal)" },
  { rooms: 1, adults: 2, children: 1, label: "1 Quarto, 2 adultos, 1 criança" },
  { rooms: 1, adults: 2, children: 2, label: "1 Quarto, 2 adultos, 2 crianças (Família)" }, // Max 4 pessoas
  { rooms: 1, adults: 3, children: 0, label: "1 Quarto, 3 adultos" },
  { rooms: 1, adults: 4, children: 0, label: "1 Quarto, 4 adultos" }, // Max 4 pessoas
];

function SearchHotelsBar({ onSearch }) {
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestsInfo, setGuestsInfo] = useState(roomGuestOptions[1]); // Padrão: 1 Quarto, 2 adultos (Casal)
  const [searchType, setSearchType] = useState('oneHotel'); // 'oneHotel' ou 'multipleHotels'
  const [priceRange, setPriceRange] = useState(5000); // NOVO: Estado para o valor máximo do preço (Ex: R$5000)

  const minPrice = 0; // Preço mínimo fixo
  const maxOverallPrice = 10000; // Preço máximo geral para o slider

  const handleSearch = () => {
    const searchParams = {
      destination,
      checkInDate: checkInDate ? checkInDate.toISOString().split('T')[0] : null,
      checkOutDate: checkOutDate ? checkOutDate.toISOString().split('T')[0] : null,
      guestsInfo,
      searchType,
      priceRange // NOVO: Inclui o preço no objeto de busca
    };
    onSearch(searchParams);
  };

  return (
    // Alterado bg-yellow-500 para bg-blue-200 e ajustado mt-4 md:-mt-8
    <div className="searchHotelsBar p-4 rounded-b-lg shadow-md">
      <div className="max-w-6xl mx-auto py-4 px-6"> {/* Adicionado py-4 aqui para espaçamento vertical */}
        {/* Opções de Tipo de Busca (Um hotel / Múltiplos hotéis) */}
        <div className="flex space-x-4 mb-6">
          <label className="flex items-center text-blue-800 font-semibold cursor-pointer"> {/* Ajustado para text-blue-800 para contraste */}
            <input
              type="radio"
              name="hotelSearchType"
              value="oneHotel"
              checked={searchType === 'oneHotel'}
              onChange={() => setSearchType('oneHotel')}
              className="mr-2 h-4 w-4 text-blue-800 focus:ring-blue-800"
            />
            Um hotel
          </label>
          <label className="flex items-center text-blue-800 font-semibold cursor-pointer"> {/* Ajustado para text-blue-800 para contraste */}
            <input
              type="radio"
              name="hotelSearchType"
              value="multipleHotels"
              checked={searchType === 'multipleHotels'}
              onChange={() => setSearchType('multipleHotels')}
              className="mr-2 h-4 w-4 text-blue-800 focus:ring-blue-800"
            />
            Múltiplos hotéis
          </label>
        </div>

        {/* Campos de Busca */}
        <div className="flex flex-wrap items-end -mx-2">
          {/* Destino */}
          <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
            <label className="block text-blue-800 text-sm font-semibold mb-1">Destino</label> {/* Ajustado para text-blue-800 */}
            <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
              <LocationIcon />
              <input
                type="text"
                placeholder="Para onde vai?"
                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
            <label className="block text-blue-800 text-sm font-semibold mb-1">Check-in</label> {/* Ajustado para text-blue-800 */}
            <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
              <CalendarIcon />
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                placeholderText="..."
                dateFormat="dd/MM/yyyy"
                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 cursor-pointer w-full"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Check-out */}
          <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
            <label className="block text-blue-800 text-sm font-semibold mb-1">Check-out</label> {/* Ajustado para text-blue-800 */}
            <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
              <CalendarIcon />
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
                placeholderText="..."
                dateFormat="dd/MM/yyyy"
                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 cursor-pointer w-full"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Passageiros */}
          <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
            <label className="block text-blue-800 text-sm font-semibold mb-1">Passageiros</label> {/* Ajustado para text-blue-800 */}
            <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
              <UserIcon />
              <select
                className="flex-grow pl-2 bg-transparent focus:outline-none text-gray-800 cursor-pointer appearance-none w-full"
                value={guestsInfo.label}
                onChange={(e) => setGuestsInfo(roomGuestOptions.find(option => option.label === e.target.value))}
              >
                {roomGuestOptions.map((option, index) => (
                  <option key={index} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* NOVO: Barra Deslizante de Preço */}
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0"> {/* Aumentado para md:w-1/2 para ocupar mais espaço */}
            <label className="block text-blue-800 text-sm font-semibold mb-1">
              Preço Máximo: R$ {priceRange.toLocaleString('pt-BR')}
            </label>
            <div className="relative flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
              <MoneyIcon />
              <input
                type="range"
                min={minPrice}
                max={maxOverallPrice}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="flex-grow ml-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-blue"
                style={{
                  '--range-progress': `${((priceRange - minPrice) / (maxOverallPrice - minPrice)) * 100}%`
                }}
              />
            </div>
          </div>


          {/* Botão Pesquisar */}
          <div className="w-full px-2 mt-4 md:mt-8 md:w-auto flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 w-full md:w-auto search-button"
            >
              Pesquisar
            </button>
          </div>
        </div>
        <p className="text-right text-blue-800 text-sm mt-4 psearchhotelsbar"> 
          Ao continuar, estou de acordo com os <a href="#" className="underline font-bold text-blue-800">Termos de Uso</a> 
        </p>
      </div>
    </div>
  );
}

export default SearchHotelsBar;