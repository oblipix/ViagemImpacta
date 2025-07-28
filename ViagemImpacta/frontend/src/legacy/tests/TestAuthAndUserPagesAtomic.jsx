import React, { useState } from 'react';
import LoginPageAtomic from './LoginPageAtomic';
import RegisterPageAtomic from './RegisterPageAtomic';
import MyTravelsPageAtomic from './MyTravelsPageAtomic';
import InstitutionalPageAtomic from './InstitutionalPageAtomic';

// Mock data for testing
const mockSavedHotels = [
  {
    id: 1,
    name: "Hotel Paradiso",
    image: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Hotel+Paradiso",
    price: 250,
    rating: 4.8,
    location: "São Paulo, SP"
  },
  {
    id: 2,
    name: "Resort Marina",
    image: "https://via.placeholder.com/300x200/059669/FFFFFF?text=Resort+Marina",
    price: 380,
    rating: 4.9,
    location: "Rio de Janeiro, RJ"
  }
];

const mockVisitedHotels = [
  {
    id: 3,
    name: "Pousada Sol Nascente",
    image: "https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Pousada+Sol",
    price: 180,
    rating: 4.5,
    location: "Búzios, RJ"
  }
];

function TestAuthAndUserPagesAtomic() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [savedHotels, setSavedHotels] = useState(mockSavedHotels);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentPage('mytravels');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleRemoveSavedHotel = (hotelId) => {
    setSavedHotels(prev => prev.filter(hotel => hotel.id !== hotelId));
  };

  const renderNavigation = () => (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-800">Teste Páginas Atomic</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentPage('login')}
            className={`px-4 py-2 rounded transition duration-300 ${
              currentPage === 'login' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentPage('register')}
            className={`px-4 py-2 rounded transition duration-300 ${
              currentPage === 'register' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Registro
          </button>
          <button
            onClick={() => setCurrentPage('institutional')}
            className={`px-4 py-2 rounded transition duration-300 ${
              currentPage === 'institutional' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Institucional
          </button>
          {isLoggedIn && (
            <button
              onClick={() => setCurrentPage('mytravels')}
              className={`px-4 py-2 rounded transition duration-300 ${
                currentPage === 'mytravels' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Minhas Viagens
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPageAtomic
            onNavigateToRegister={() => setCurrentPage('register')}
            onNavigateToRecoverPassword={() => alert('Funcionalidade de recuperação de senha ainda não implementada')}
            onLogin={handleLogin}
          />
        );
      
      case 'register':
        return (
          <RegisterPageAtomic
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );
      
      case 'institutional':
        return <InstitutionalPageAtomic />;
      
      case 'mytravels':
        return (
          <MyTravelsPageAtomic
            user={user}
            onUpdateUser={handleUpdateUser}
            onBack={() => setCurrentPage('login')}
            onLogout={handleLogout}
            savedHotels={savedHotels}
            visitedHotels={mockVisitedHotels}
            onRemoveSavedHotel={handleRemoveSavedHotel}
          />
        );
      
      default:
        return <LoginPageAtomic onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      <div className="pt-20">
        {renderCurrentPage()}
      </div>
      
      {/* Status bar para debug */}
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-2 text-sm">
        <div className="container mx-auto flex justify-between">
          <span>Página Atual: {currentPage}</span>
          <span>Logado: {isLoggedIn ? 'Sim' : 'Não'}</span>
          {user && <span>Usuário: {user.name}</span>}
        </div>
      </div>
    </div>
  );
}

export default TestAuthAndUserPagesAtomic;
