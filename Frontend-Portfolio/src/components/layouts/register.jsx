import { useState } from 'react'
import Bouton from '../ui/button'
import Login from './login'

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [name, setName] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/CreateUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, firstname, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Inscription réussie !')
        setName('')
        setFirstname('')
        setEmail('')
        setPassword('')
        return
      }

      setPassword('')
      setMessage(data.message)
    } catch (error) {
      console.error('Error during registration:', error)
      setMessage('Impossible de contacter le serveur.')
    }
  }

  return (
    <>
      <dialog className="auth-popup auth-popup--signup" id="Signup">
        <h1 className="auth-popup__title">Créer un compte</h1>

        <form className="auth-popup__content" onSubmit={handleSubmit}>
          <div className="auth-popup__inputs">
            <input
              className="input"
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Prenom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {message && <p className="auth-popup__message">{message}</p>}

          <div className="auth-popup__buttons">
            <Bouton
              variant="secondary"
              type="submit"
              onClick={() => {
                setTimeout(() => {
                  document.getElementById('Login').showModal()
                  setMessage('')
                }, 1000)
                document.getElementById('Signup').close()
              }}
            >
              S'inscrire
            </Bouton>
            <Bouton
              variant="primary"
              type="button"
              onClick={() => {
                document.getElementById('Signup').close()
                setMessage('')
                setName('')
                setFirstname('')
                setEmail('')
                setPassword('')
              }}
            >
              Fermer
            </Bouton>
          </div>
        </form>
      </dialog>

      <Login />
    </>
  )
}
