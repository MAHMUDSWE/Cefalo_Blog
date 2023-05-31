import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from './contexts/AuthContext'

import PageRoutes from './routes/routes'
import LoadingOverlay from './components/loader/loadingOverlay';

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>

        <AuthProvider>
          <PageRoutes />
        </AuthProvider>

        <LoadingOverlay />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
