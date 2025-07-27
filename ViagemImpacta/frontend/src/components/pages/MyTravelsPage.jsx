

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HotelCard from '../hotels/HotelCard'; // Usando o card unificado

function MyTravelsPage() {
  const navigate = useNavigate();
  // Pegando TUDO do contexto, incluindo as listas de hotéis e a função de remover
  const { 
    currentUser, 
    isLoggedIn,
    savedHotels, 
    visitedHotels,
    logout, 
    updateUser,
    removeSavedHotel
  } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});

  useEffect(() => {
    if(currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!currentUser) {
    return <div className="text-center p-10">Carregando perfil...</div>;
  }
  
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    updateUser(formData);
    setIsEditing(false);
  };
  
  return (
    <div className="container mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg my-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
            <button
                onClick={() => navigate(-1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
            >
                ← Voltar
            </button>
            <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                Sair
            </button>
        </div>

        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Meu Perfil Tripz</h1>

        {/* ==================================================================== */}
        {/* INÍCIO DO JSX DO PERFIL (agora usando o estado 'formData')          */}
        {/* ==================================================================== */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          {/* Coluna do Avatar e Edição de Perfil */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative mb-6 group">
              <img
                src={formData.avatar}
                alt="Avatar do Usuário"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-md"
              />
              {isEditing && (
                <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" title="Mudar Avatar">
                  <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.218A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.218A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </label>
              )}
            </div>
            <div className="text-center w-full px-4">
              {isEditing ? (
                <>
                  <input id="name" type="text" value={formData.name} onChange={handleFormChange} className="mt-1 block w-full p-2 border rounded-md mb-2" placeholder="Nome completo" />
                  <input id="email" type="email" value={formData.email} onChange={handleFormChange} className="mt-1 block w-full p-2 border rounded-md mb-2" placeholder="Seu email" />
                  <input id="phone" type="text" value={formData.phone} onChange={handleFormChange} className="mt-1 block w-full p-2 border rounded-md mb-4" placeholder="Telefone" />
                  <button onClick={handleSaveChanges} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full">Salvar Alterações</button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{formData.name}</h2>
                  <p className="text-lg text-gray-600 mb-4">{formData.email}</p>
                  <button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">Editar Perfil</button>
                </>
              )}
            </div>
          </div>

          {/* Coluna do Club de Pontuação */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-xl md:w-2/3 flex flex-col items-center justify-center text-center">
            <h3 className="text-3xl font-extrabold mb-3">Tripz Club Fidelidade</h3>
            <p className="text-lg mb-4">Seus pontos valem experiências incríveis!</p>
            <div className="flex items-baseline mb-4">
              <span className="text-6xl font-black text-yellow-300">{formData.points}</span>
              <span className="text-2xl font-semibold ml-2">pontos</span>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg">Ver Recompensas</button>
          </div>
        </div>
        {/* ==================================================================== */}
        {/* FIM DO JSX DO PERFIL                                               */}
        {/* ==================================================================== */}

        <hr className="my-12" />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Hotéis que Você Já Visitou</h2>
          {visitedHotels?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visitedHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
          ) : (
            <p className="text-center text-gray-600">Você ainda não tem hotéis visitados.</p>
          )}
        </section>

        <hr className="my-12" />

        <section>
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Sua Lista de Desejos</h2>
          {savedHotels?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedHotels.map(hotel => (
                <div key={hotel.id} className="relative group">
                  <HotelCard hotel={hotel} />
                  <button onClick={() => removeSavedHotel(hotel.id)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" title="Remover da lista de desejos">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Sua lista de desejos está vazia.</p>
          )}
        </section>
    </div>
  );
}

export default MyTravelsPage;