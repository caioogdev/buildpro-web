// src/context/AppProvider.tsx
import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <ToastContainer />
    </AuthProvider>
  );
};

export default AppProvider;
