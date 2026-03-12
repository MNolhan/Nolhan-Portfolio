import Bouton from "../ui/button";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <nav class="footer__content">
                    <a href="#" class="footer__content-logo">
                        <p class="footer__content-logo--first">Nolhan</p>
                        <p className="footer__content-logo--second">Dev</p>
                    </a>
                    <h1 className="footer__content-title">Let's Build Something</h1>
                    <p className="footer__content-description">Une idée, un besoin ou un projet ? Parlons-en et voyons comment je peux le transformer en solution concrète.</p>
                    <div className="footer__list">
                        <Bouton variant="primary">Contact</Bouton><br></br>
                        <Bouton variant="secondary">Mention Légales</Bouton>
                        <Bouton variant="secondary">Gestion des Cookies</Bouton>
                    </div>
                </nav>
            </div>
        </footer>
    );
}