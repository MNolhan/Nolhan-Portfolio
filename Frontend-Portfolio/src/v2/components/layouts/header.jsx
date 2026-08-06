import Bouton from "../ui/bouton";

export default function Header() {
    return (
        <div className="navcontainer">
            <header className="nav" id="nav">

                <a href="#home" className="nav__logo">
                    <span className="nav__logo--white">Nolhan</span>
                    <span className="nav__logo--red">Dev</span>
                    <span className="nav__logo--white">.</span>
                </a>

                <nav className="nav__menu">
                    <a href="#apropos" className="nav__menu--links">À Propos</a>
                    <a href="#services" className="nav__menu--links">Mes Services</a>
                    <a href="#stack" className="nav__menu--links">Stack</a>
                    <a href="#parcours" className="nav__menu--links">Parcours</a>
                    <a href="#projets" className="nav__menu--links">Projets</a>
                    <a href="#contact" className="nav__menu--links">Contact</a>
                </nav>

                <div className="nav__auth">
                    <Bouton variant="secondary" as="a" href="#contact">
                        <span>Login</span>
                    </Bouton>
                    <Bouton variant="primary" as="a" href="#contact">
                        <span>Sign Up</span>
                    </Bouton>
                </div>

            </header>
        </div>
    );
}