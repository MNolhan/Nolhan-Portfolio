import Bouton from "../components/ui/bouton";
import DownloadIcon from "../components/Icon/download-icon";
import ArrowRightIcon from "../components/Icon/arrowright-icon";
import Me from '../../assets/NolhanPortfolioPDP.png'
import CV from '../../assets/CV.pdf'

export default function Home() {

    const date = new Date().toLocaleTimeString()

    let message

    if (date > '19:00' || date < '00:00') {
        message = "Bonsoir";
    } else {
        message = "Salut";
    }

    return (
        <div className="container" id="home">

            <div className="home">

                <div className="home__left">
                    <p className="home__left-pub">
                        <span className="home__left-pub--dot"></span>
                        Disponible - Fuseau Horaires : UTC+2 (France)
                    </p>
                    <h1 className="home__left-title">{message}, je suis <br></br> Nolhan<span className="home__left-title--red">.</span></h1>
                    <h2 className="home__left-subtitle">Développeur Junior <span className="home__left-subtitle--red">Full-Stack</span></h2>
                    <p className="home__left-description">
                        Je conçois des applications web modernes, performantes et bien 
                        architecturées - du premier trait d'interface jusqu'à la mise en 
                        production. Basé à Tours, je travaille avec des indépendants et des 
                        équipes qui veulent du code propre.
                    </p>

                    <div className="home__left-bouton">
                        <Bouton variant="primary" as="a" href="#projets">
                            <span>Voir mes projets</span><ArrowRightIcon />
                        </Bouton>
                        <Bouton variant="secondary" as="a" href={CV} download>
                            <span>Télécharger mon CV</span><DownloadIcon />
                        </Bouton>
                    </div>

                    <p className="home__left-contact">
                        mrt.nolhan@gmail.com - Tours, France
                    </p>
                </div>

                <div className="home__right">
                    <div className="home__right--ring"></div>
                    <img src={Me} alt="Nolhan" className="home__right--img" />

                    <div className="home__right--chip chip-1">React</div>
                    <div className="home__right--chip chip-2">Node.js</div>
                    <div className="home__right--chip chip-3">Laravel</div>
                </div>

            </div>

            <a href="#apropos" className="home__scroll">
                <span>Scroller</span>
                <div className="home__scroll--line"><i></i></div>
            </a>

        </div>
    );
}