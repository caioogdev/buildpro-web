// src/context/AppProvider.tsx
import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { Toaster } from 'sonner';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
};

export default AppProvider;
