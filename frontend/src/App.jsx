import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import PageRoutes from './routes/routes'

function App() {

  return (
    <>
      <AuthProvider>
        <PageRoutes />
      </AuthProvider>
    </>
  )
}

export default App
