import Bouton from "../ui/button"

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <nav class="header__nav">
                    <a href="#" class="header__nav__logo">
                        <p class="header__nav__logo--first">Nolhan</p>
                        <p className="header__nav__logo--second">Dev</p>
                    </a>
                    <div class="header__nav-links">
                        <ul class="header__nav-links menubase">
                            <li><a href="#" class="header__nav-link">Accueil</a></li>
                            <li><a href="#Aboutme" class="header__nav-link">À propos</a></li>
                            <li><a href="#" class="header__nav-link">Services</a></li>
                            <li><a href="#" class="header__nav-link">Projets</a></li>
                            <li><a href="#" class="header__nav-link">Contact</a></li>
                            <li><a href="#" class="header__nav-link">Login</a></li>
                            <li><Bouton variant="primary">Sign Up</Bouton></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}
