import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './v2/styles/main.scss'
import App from './App.jsx'
import { AuthProvider } from './v2/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
