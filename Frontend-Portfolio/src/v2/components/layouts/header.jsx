import Bouton from '../ui/bouton'
import { useState, useEffect } from 'react'
import PersonneIcon from '../Icon/personne-icon'

const API_URL = import.meta.env.VITE_API_URL

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const closeMenu = () => setIsOpen(false)

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

  // --- Logout ---

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        setIsLogged(false)
        window.location.reload()
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  // --- Menu ---

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // --- User Button ---

  let userbutton

  if (!isLogged) {
    userbutton = (
      <div className="nav__auth">
        <Bouton variant="secondary" as="a" href="/login">
          Login
        </Bouton>
        <Bouton variant="primary" as="a" href="/signup">
          Sign Up
        </Bouton>
      </div>
    )
  } else {
    userbutton = (
      <div className="nav__auth">
        <div className="nav__profile">
          <Bouton variant="secondary" as="a">
            <PersonneIcon /> Compte
          </Bouton>
          <div className="nav__dropdown">
            <a href="/profil" className="nav__dropdown-link">
              Profil
            </a>
            <a
              onClick={() => {
                handleLogout()
              }}
              className="nav__dropdown-link nav__dropdown-link--logout"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="navcontainer">
      <header className="nav" id="nav">
        <a href="#home" className="nav__logo" onClick={closeMenu}>
          <span className="nav__logo-text">Nolhan</span>
          <span className="nav__logo-accent">Dev</span>
          <span className="nav__logo-text">.</span>
        </a>

        <button
          type="button"
          className={`nav__burger ${isOpen ? 'nav__burger--open' : ''}`}
          aria-label="Ouvrir le menu"
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={`nav__menu ${isOpen ? 'nav__menu--open' : ''}`}
          id="nav-menu"
        >
          <a href="#apropos" className="nav__link" onClick={closeMenu}>
            À Propos
          </a>
          <a href="#services" className="nav__link" onClick={closeMenu}>
            Mes Services
          </a>
          <a href="#stack" className="nav__link" onClick={closeMenu}>
            Stack
          </a>
          <a href="#parcours" className="nav__link" onClick={closeMenu}>
            Parcours
          </a>
          <a href="#projets" className="nav__link" onClick={closeMenu}>
            Projets
          </a>
          <a href="#contact" className="nav__link" onClick={closeMenu}>
            Contact
          </a>

          <div className="nav__menu-auth">{userbutton}</div>
        </nav>

        {userbutton}
      </header>
    </div>
  )
}
