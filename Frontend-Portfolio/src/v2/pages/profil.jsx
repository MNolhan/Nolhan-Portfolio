import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBack from '../components/layouts/headerback'

const API_URL = import.meta.env.VITE_API_URL

export default function Profil() {
  const navigate = useNavigate()

  // Lecture

  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    try {
      const read = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
      })

      const data = await read.json()

      if (read.status === 401) {
        navigate('/login')
        return
      }

      if (read.ok) {
        setUser(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  // Update

  const [firstname, setFirstname] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const udapte = await fetch(`${API_URL}/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ firstname, name, email }),
      })

      const data = await udapte.json()

      if (udapte.status === 401) {
        navigate('/login')
        return
      }

      if (udapte.ok) {
        setMessage('Profil mis à jour avec succès')
        setFirstname('')
        setName('')
        setEmail('')
        fetchUser()
      } else {
        setMessage(data.message || 'Une erreur est survenue')
      }
    } catch (err) {
      console.error(err)
      setMessage('Une erreur est survenue')
    }
  }

  return (
    <>
      <title>NolhanDev - Profil</title>
      <div className="authcontainer">
        <div className="profil">
          <div className="profil__header">
            <HeaderBack />
          </div>

          <div className="profil__content">
            <h2 className="profil__logo">
              Nolhan<span className="profil__logo-accent">Dev</span>.
            </h2>
            <h1 className="profil__title">
              Voici votre profil{' '}
              <span className="profil__title-accent">{user?.firstname}</span>.
            </h1>
            <p className="profil__subtitle">
              Vos informations personnelles. Modifiez-les à tout moment, puis
              enregistrez.
            </p>

            <form className="profil__form" onSubmit={handleSubmit}>
              <div className="profil__group">
                <label htmlFor="firstname" className="profil__label">
                  Votre Prénom
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="profil__input"
                  placeholder={user?.firstname}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="profil__group">
                <label htmlFor="name" className="profil__label">
                  Votre Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="profil__input"
                  placeholder={user?.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="profil__group">
                <label htmlFor="email" className="profil__label">
                  Votre Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="profil__input"
                  placeholder={user?.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="profil__submit">
                Confirmer la modification
              </button>
              {message && <p className="profil__message">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
