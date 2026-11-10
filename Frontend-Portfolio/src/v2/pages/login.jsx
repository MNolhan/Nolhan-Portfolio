import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBack from '../components/layouts/headerback'

const API_URL = import.meta.env.VITE_API_URL

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [submit, ISSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    ISSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || 'Connexion réussie !')
        setEmail('')
        setPassword('')
        setTimeout(() => {
          navigate('/')
        }, 1000)
        return
      } else {
        setPassword('')
        setMessage(data.message || 'Une erreur est survenue')
      }
    } catch (error) {
      console.error('Error during login:', error)
      setMessage('Impossible de contacter le serveur.')
    } finally {
      ISSubmitting(false)
    }
  }

  return (
    <>
      <title>NolhanDev - Connexion</title>
      <div className="authcontainer">
        <div className="login">
          <HeaderBack />

          <div className="login__content">
            <h2 className="login__logo">
              Nolhan<span className="login__logo-accent">Dev</span>.
            </h2>
            <h1 className="login__title">
              Content de te <span className="login__title-accent">revoir</span>.
            </h1>
            <p className="login__subtitle">
              Veuillez vous connecter pour continuer.
            </p>

            <form className="login__form" onSubmit={handleSubmit}>
              <div className="login__group">
                <label htmlFor="email" className="login__label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="login__input"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login__group">
                <label htmlFor="password" className="login__label">
                  Mot de passe
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="login__input"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="login__show-password">
                  <input
                    type="checkbox"
                    id="showPassword"
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <label
                    htmlFor="showPassword"
                    className="login__label--password"
                  >
                    Afficher le mot de passe
                  </label>
                </div>
              </div>

              <button type="submit" disabled={submit} className="login__submit">
                Se connecter
              </button>
            </form>

            {message && <p className="login__message">{message}</p>}
            <p className="login__switch">
              {' '}
              Pas encore de compte ?{' '}
              <a className="login__switch-accent" href="/signup">
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
