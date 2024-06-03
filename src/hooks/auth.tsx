// src/context/authContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import api from '../services/api';

interface AuthContextProps {
  user: string | null;
  login: (email: string, password: string) => Promise<{ status: number; }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });

      if (response.data.status === 'success') {
        const { user, token, refreshToken } = response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);
      } else {
        toast.error(response.data.message || 'Erro ao fazer login.');
      }

      return { status: response.status };
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.status === 401) {
        toast.error('Credenciais inválidas.');
      } else {
        toast.error('Erro ao fazer login. Tente novamente mais tarde.');
      }
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout realizado com sucesso.');
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
