import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../services/api';

interface AuthContextProps {
  user: string | null;
  login: (email: string, password: string) => Promise<{ status: number, message?: string }>;
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
      }

      return { status: response.status, message: response.data.message };
    } catch (error: unknown) {
      let message = 'Erro ao fazer login. Tente novamente mais tarde.';
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          message = 'Credenciais inválidas.';
        }
        return { status: error.response.status, message };
      }
      return { status: 500, message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
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
