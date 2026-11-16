import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Loader from '../ui/loader.jsx'

export default function AdminOnlyRoute({ children }) {
  
    // Test pour savoir si l'utilisateur est administrateur

    const { isAdmin, loading } = useAuth()
  
    if (loading) {
        return <Loader />
    }

    if (!isAdmin) {
        return <Navigate to="/" />
    }

    return children
}
