import Bouton from "../ui/button"
import Input from "../ui/input"

export default function Header() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <nav className="header__nav">
                        <a href="#" className="header__nav__logo">
                            <p className="header__nav__logo--first">Nolhan</p>
                            <p className="header__nav__logo--second">Dev</p>
                        </a>
                        <div className="header__nav-links">
                            <ul className="header__nav-links menubase">
                                <li><a href="#" className="header__nav-link">Accueil</a></li>
                                <li><a href="#Aboutme" className="header__nav-link">À propos</a></li>
                                <li><a href="#service" className="header__nav-link">Services</a></li>
                                <li><a href="#project" className="header__nav-link">Projets</a></li>
                                <li><a href="#contact" className="header__nav-link">Contact</a></li>

                                <div className="header__user-button">
                                    <li>
                                        <Bouton variant="secondary"
                                            onClick={() =>
                                                document.getElementById("Login").showModal()
                                            }
                                        >
                                            Login
                                        </Bouton>
                                    </li>
                                    <li>
                                        <Bouton variant="primary"
                                            onClick={() =>
                                                document.getElementById("Signup").showModal()
                                            }
                                        >
                                            Sign Up
                                        </Bouton>
                                    </li>
                                </div>

                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            <dialog className="auth-popup auth-popup--login" id="Login">
                <h2 className="auth-popup auth-popup__title">Connexion</h2>
                <div className="auth-popup auth-popup__content">
                    <div className="auth-popup auth-popup__inputs">
                        <Input type="email" placeholder="Email"/>
                        <Input type="password" placeholder="Mot de passe"/>
                    </div>

                    <div className="auth-popup auth-popup__buttons">
                        <Bouton variant="secondary">Se connecter</Bouton>

                        <form method="dialog">
                            <Bouton variant="primary">Fermer</Bouton>
                        </form>
                    </div>
                </div>
            </dialog>


            <dialog className="auth-popup auth-popup--signup" id="Signup">
                <h2 className="auth-popup auth-popup__title">Créer un compte</h2>
                <div className="auth-popup auth-popup__content">
                    <div className="auth-popup auth-popup__inputs">
                        <Input type="text" placeholder="Nom"/>
                        <Input type="text" placeholder="Prénom"/>
                        <Input type="email" placeholder="Email"/>
                        <Input type="password" placeholder="Mot de passe"/>
                    </div>

                    <div className="auth-popup auth-popup__buttons">
                        <Bouton variant="secondary">S'inscrire</Bouton>

                        <form method="dialog">
                            <Bouton variant="primary">Fermer</Bouton>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}