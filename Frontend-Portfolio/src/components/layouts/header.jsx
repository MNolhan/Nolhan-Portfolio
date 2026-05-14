import Bouton from "../ui/button"

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

            <dialog id="Login">
                <h2>Connexion</h2>

                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Mot de passe" />

                <Bouton variant="secondary">Se connecter</Bouton>

                <form method="dialog">
                    <Bouton variant="primary">Fermer</Bouton>
                </form>
            </dialog>


            <dialog id="Signup">
                <h2>Créer un compte</h2>

                <input type="text" placeholder="Nom" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Mot de passe" />

                <Bouton variant="secondary">S'inscrire</Bouton>

                <form method="dialog">
                    <Bouton variant="primary">Fermer</Bouton>
                </form>
            </dialog>
        </>
    );
}