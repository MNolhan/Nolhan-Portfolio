import Bouton from "../ui/bouton";
import { useState, useEffect } from "react";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)
    const closeMenu = () => setIsOpen(false)

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    let userbutton;

    if(!localStorage.getItem('token')) {
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
                <Bouton
                    variant="primary" as="a"
                    onClick={() => {localStorage.removeItem('token')
                    window.location.reload()
                }}>
                    Logout
                </Bouton>
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