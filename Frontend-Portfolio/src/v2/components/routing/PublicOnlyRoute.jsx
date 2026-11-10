import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function PublicOnlyRoute({ children }) {
  const [isLogged, setIsLogged] = useState(false)

  // Test pour savoir si l'utilisateur est connecté

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const read = await fetch(`${API_URL}/users/me`, {
          method: 'GET',
          credentials: 'include',
        })

        if (read.ok) {
          setIsLogged(true)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchUser()
  }, [])

  if (isLogged) {
    return <Navigate to="/" />
  }

  return children
}
