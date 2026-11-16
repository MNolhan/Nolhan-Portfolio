import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function PublicOnlyRoute({ children }) {
  
  // Test pour savoir si l'utilisateur est connecté

  const { isLogged } = useAuth()

  if (isLogged) {
    return <Navigate to="/" />
  }
  
  return children
}
