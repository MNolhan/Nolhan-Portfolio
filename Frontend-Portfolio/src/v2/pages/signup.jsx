import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBack from '../components/layouts/headerback'
import confetti from 'canvas-confetti'

const API_URL = import.meta.env.VITE_API_URL

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [submit, ISSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    ISSubmitting(true)

    const rect = e.nativeEvent.submitter.getBoundingClientRect()

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, firstname, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || 'Inscription réussie !')
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
        })
        setName('')
        setFirstname('')
        setEmail('')
        setPassword('')
        setTimeout(() => {
          navigate('/login')
        }, 1000)
        return
      } else {
        setPassword('')
        setMessage(data.message || 'Une erreur est survenue')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setMessage('Impossible de contacter le serveur.')
    } finally {
      ISSubmitting(false)
    }
  }

  return (
    <>
      <title>NolhanDev - Inscription</title>
      <div className="authcontainer">
        <div className="signup">
          <HeaderBack />

          <div className="signup__content">
            <h2 className="signup__logo">
              Nolhan<span className="signup__logo-accent">Dev</span>.
            </h2>
            <h1 className="signup__title">
              Bienvenue sur mon <span className="signup__title-accent">site</span>
              .
            </h1>
            <p className="signup__subtitle">
              Veuillez créer un compte pour continuer.
            </p>

            <form className="signup__form" onSubmit={handleSubmit}>
              <div className="signup__group">
                <label htmlFor="firstname" className="signup__label">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="signup__input"
                  placeholder="Entrez votre prénom"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>

              <div className="signup__group">
                <label htmlFor="name" className="signup__label">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="signup__input"
                  placeholder="Entrez votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="signup__group">
                <label htmlFor="email" className="signup__label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="signup__input"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="signup__group">
                <label htmlFor="password" className="signup__label">
                  Mot de passe
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="signup__input"
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

              <button type="submit" disabled={submit} className="signup__submit">
                S'inscrire
              </button>
            </form>

            {message && <p className="signup__message">{message}</p>}
            <p className="signup__switch">
              {' '}
              Déjà un compte ?{' '}
              <a className="signup__switch-accent" href="/login">
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
