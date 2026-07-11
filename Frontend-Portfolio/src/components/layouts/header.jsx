import { useState } from 'react'
import Bouton from '../ui/button'
import Login from './login'
import Register from './register'
import ValidationPanel from './validationpanel'
import AdminPanel from './adminpanel'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const token = localStorage.getItem('token')
  let data = null

  if (token) {
    try {
      data = JSON.parse(atob(token.split('.')[1]))
    } catch (error) {
      console.error('Error parsing token:', error)
      localStorage.removeItem('token')
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  let userbutton

  if (!localStorage.getItem('token')) {
    userbutton = (
      <div className="header__user-button">
        <li>
          <Bouton variant="secondary" onClick={() => document.getElementById('Login').showModal()}>
            Login
          </Bouton>
        </li>
        <li>
          <Bouton variant="primary" onClick={() => document.getElementById('Signup').showModal()}>
            Sign Up
          </Bouton>
        </li>
      </div>
    )
  } else if (localStorage.getItem('token') && data.role === 'ADMIN') {
    userbutton = (
      <div className="header__user-button">
        <li>
          <Bouton variant="secondary" onClick={() => document.getElementById('AdminPanel').showModal()}>
            Admin Panel
          </Bouton>
        </li>
        <li>
          <Bouton variant="primary" onClick={() => document.getElementById('ValidationPanel').showModal()}>
            Logout
          </Bouton>
        </li>
      </div>
    )
  } else {
    userbutton = (
      <div className="header__user-button">
        <li>
          <Bouton variant="primary" onClick={() => document.getElementById('ValidationPanel').showModal()}>
            Logout
          </Bouton>
        </li>
      </div>
    )
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="header__nav">
            <a href="#" className="header__nav__logo">
              <p className="header__nav__logo--first">Nolhan</p>
              <p className="header__nav__logo--second">Dev</p>
            </a>

            <button
              className={`header__burger ${isMenuOpen ? 'header__burger--active' : ''}`}
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="header__nav-links">
              <ul className={`header__nav-links menubase ${isMenuOpen ? 'header__nav-links--active' : ''}`}>
                <li>
                  <a href="#" className="header__nav-link">Accueil</a>
                </li>
                <li>
                  <a href="#Aboutme" className="header__nav-link">À propos</a>
                </li>
                <li>
                  <a href="#service" className="header__nav-link">Services</a>
                </li>
                <li>
                  <a href="#project" className="header__nav-link">Projets</a>
                </li>
                <li>
                  <a href="#contact" className="header__nav-link">Contact</a>
                </li>
                {userbutton}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <Login />
      <Register />
      <AdminPanel />
      <ValidationPanel />
    </>
  )
}