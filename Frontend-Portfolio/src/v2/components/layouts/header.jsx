import Bouton from "../ui/bouton";
import { useState, useEffect } from "react";
import PersonneIcon from "../Icon/personne-icon";

const API_URL = import.meta.env.VITE_API_URL

export default function Header() {

    // Menu

    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null);
    const closeMenu = () => setIsOpen(false)

    const token = localStorage.getItem('token')

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    useEffect(() => {
        if (!token) return

        const Read = async () => {
            const response = await fetch(`${API_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                setUser(data[0])
            }
        }
        Read();
    }, [token])

    let userbutton;

    if (!token) {

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

    } else if (!user) {

        userbutton = null

    } else {

        userbutton = (
            <div className="nav__auth">
                <div className="nav__auth--profile">
                    <Bouton variant="secondary" as="a"><PersonneIcon /> {user?.firstname}</Bouton>
                    <div className="nav__auth--dropdown">
                        <a href="/profil" className="nav__auth--dropdown--link">
                            Profil
                        </a>
                        <a href="#" className="nav__auth--dropdown--link">
                            Paramètres
                        </a>
                        <a 
                            onClick={() => 
                                {localStorage.removeItem('token')
                                window.location.reload() 
                            }} 
                            className="nav__auth--dropdown--link nav__auth--dropdown--link-logout"
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
                    <span className="nav__logo--white">Nolhan</span>
                    <span className="nav__logo--red">Dev</span>
                    <span className="nav__logo--white">.</span>
                </a>

                <button
                    type="button"
                    className={`nav__burger ${isOpen ? "nav__burger--open" : ""}`}
                    aria-label="Ouvrir le menu"
                    aria-expanded={isOpen}
                    aria-controls="nav-menu"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav__menu ${isOpen ? "nav__menu--open" : ""}`} id="nav-menu">
                    <a href="#apropos" className="nav__menu--links" onClick={closeMenu}>À Propos</a>
                    <a href="#services" className="nav__menu--links" onClick={closeMenu}>Mes Services</a>
                    <a href="#stack" className="nav__menu--links" onClick={closeMenu}>Stack</a>
                    <a href="#parcours" className="nav__menu--links" onClick={closeMenu}>Parcours</a>
                    <a href="#projets" className="nav__menu--links" onClick={closeMenu}>Projets</a>
                    <a href="#contact" className="nav__menu--links" onClick={closeMenu}>Contact</a>

                    <div className="nav__menu--auth">
                        {userbutton}
                    </div>
                </nav>

                {userbutton}

            </header>
        </div>
    );
}