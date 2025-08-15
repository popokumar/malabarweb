import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import App from './App';
import './index.css';

console.log('🚀 OnSpace Commerce starting up...');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

console.log('📊 Query client initialized');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);

console.log('✅ Application mounted successfully');