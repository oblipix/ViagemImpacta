import React, { useState, useEffect } from 'react';
import { Button, Input } from './atoms';

const UserProfilePageAtomic = ({ onBack }) => {
  // 🔧 STATE MANAGEMENT
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    preferences: {
      destination: '',
      budget: '',
      travelStyle: ''
    }
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  // 🌐 BACKEND INTEGRATION
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const userData = await response.json();
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          birthDate: userData.birthDate || '',
          preferences: {
            destination: userData.preferences?.destination || '',
            budget: userData.preferences?.budget || '',
            travelStyle: userData.preferences?.travelStyle || ''
          }
        });
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setError(err.message);
        
        // 🎭 FALLBACK - Dados mockados para demonstração
        const mockUser = {
          id: 1,
          name: 'João Silva',
          email: 'joao@email.com',
          phone: '(11) 99999-9999',
          birthDate: '1990-05-15',
          preferences: {
            destination: 'Praia',
            budget: 'R$ 2.000 - R$ 5.000',
            travelStyle: 'Relaxante'
          },
          memberSince: '2023',
          reservations: 5
        };
        
        setUser(mockUser);
        setFormData({
          name: mockUser.name,
          email: mockUser.email,
          phone: mockUser.phone,
          birthDate: mockUser.birthDate,
          preferences: mockUser.preferences
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // 💾 SAVE PROFILE
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditMode(false);
      setMessage({ text: 'Perfil atualizado com sucesso!', type: 'success' });
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
      setMessage({ text: 'Erro ao salvar perfil. Tente novamente.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando perfil...</p>
        </div>
      </section>
    );
  }

  // ❌ ERROR STATE
  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-red-600 mb-4">
            Erro ao carregar perfil
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <Button 
            onClick={() => window.location.reload()}
            variant="primary"
            className="mr-4"
          >
            Tentar Novamente
          </Button>
          <Button 
            onClick={onBack}
            variant="secondary"
          >
            ← Voltar
          </Button>
        </div>
      </section>
    );
  }

  // 🚫 NO USER STATE
  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-gray-600 mb-4">
            Usuário não encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            Não foi possível carregar os dados do usuário.
          </p>
          <Button 
            onClick={onBack}
            variant="secondary"
          >
            ← Voltar
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100">
      {/* 🎨 HERO SECTION */}
      <div 
        className="relative bg-cover bg-center bg-gray-900 text-white h-64 flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://picsum.photos/id/1015/1200/400)` }}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold mb-2">
            Meu Perfil
          </h1>
          <p className="text-xl">
            Bem-vindo, {user.name}!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 📄 NAVIGATION */}
        <div className="mb-6">
          <Button 
            onClick={onBack}
            variant="secondary"
            className="mb-4"
          >
            ← Voltar
          </Button>
          
          {/* 📈 USER STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h3 className="text-gray-800">
                Membro desde
              </h3>
              <p className="text-gray-600">
                {user.memberSince}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-blue-600">{user.reservations || 0}</div>
              <div className="text-gray-600">Reservas realizadas</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-green-600">★★★★☆</div>
              <div className="text-gray-600">Avaliação média</div>
            </div>
          </div>
        </div>

        {/* 📝 MESSAGE DISPLAY */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* 👤 PROFILE FORM */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-gray-800">
              Informações Pessoais
            </h4>
            <Button
              onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
              variant="primary"
              disabled={loading}
            >
              {editMode ? 'Salvar' : 'Editar'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nome Completo
              </label>
              {editMode ? (
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full"
                  placeholder="Seu nome completo"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 p-2 rounded">
                  {user.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              {editMode ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full"
                  placeholder="seu@email.com"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 p-2 rounded">
                  {user.email}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Telefone
              </label>
              {editMode ? (
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full"
                  placeholder="(11) 99999-9999"
                />
              ) : (
                <div className="text-gray-800 bg-gray-50 p-2 rounded">
                  {user.phone || 'Não informado'}
                </div>
              )}
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Data de Nascimento
              </label>
              {editMode ? (
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                  className="w-full"
                />
              ) : (
                <div className="text-gray-800 bg-gray-50 p-2 rounded">
                  {user.birthDate ? new Date(user.birthDate).toLocaleDateString('pt-BR') : 'Não informado'}
                </div>
              )}
            </div>
          </div>

          {/* 🎯 TRAVEL PREFERENCES */}
          <div className="mt-8">
            <h4 className="text-gray-800 mb-4">
              Preferências de Viagem
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Destino Preferido */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Destino Preferido
                </label>
                {editMode ? (
                  <select
                    value={formData.preferences.destination}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      preferences: { ...prev.preferences, destination: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="Praia">Praia</option>
                    <option value="Montanha">Montanha</option>
                    <option value="Cidade">Cidade</option>
                    <option value="Campo">Campo</option>
                  </select>
                ) : (
                  <div className="text-gray-800 bg-gray-50 p-2 rounded">
                    {user.preferences?.destination || 'Não informado'}
                  </div>
                )}
              </div>

              {/* Orçamento */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Orçamento Médio
                </label>
                {editMode ? (
                  <select
                    value={formData.preferences.budget}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      preferences: { ...prev.preferences, budget: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="Até R$ 1.000">Até R$ 1.000</option>
                    <option value="R$ 1.000 - R$ 2.000">R$ 1.000 - R$ 2.000</option>
                    <option value="R$ 2.000 - R$ 5.000">R$ 2.000 - R$ 5.000</option>
                    <option value="Acima de R$ 5.000">Acima de R$ 5.000</option>
                  </select>
                ) : (
                  <div className="text-gray-800 bg-gray-50 p-2 rounded">
                    {user.preferences?.budget || 'Não informado'}
                  </div>
                )}
              </div>

              {/* Estilo de Viagem */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Estilo de Viagem
                </label>
                {editMode ? (
                  <select
                    value={formData.preferences.travelStyle}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      preferences: { ...prev.preferences, travelStyle: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="Relaxante">Relaxante</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Romântico">Romântico</option>
                  </select>
                ) : (
                  <div className="text-gray-800 bg-gray-50 p-2 rounded">
                    {user.preferences?.travelStyle || 'Não informado'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 🔄 CANCEL EDIT */}
          {editMode && (
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => {
                  setEditMode(false);
                  setFormData({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    birthDate: user.birthDate,
                    preferences: user.preferences
                  });
                  setMessage({ text: '', type: '' });
                }}
                variant="secondary"
                className="mr-4"
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfilePageAtomic;
