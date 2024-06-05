import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppProvider from './hooks';
import AppRoutes from './routes/routes';
import { Toaster } from 'sonner';
import './index.css';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
        <Toaster />
      </AppProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
