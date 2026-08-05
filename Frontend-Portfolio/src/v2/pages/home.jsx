import Bouton from "../components/ui/bouton";
import Me from '../../assets/NolhanPortfolioPDP.png'

export default function Home() {
    return (
        <div className="container">

            <div className="home">

                <div className="home__left">
                    <p className="home__left-pub">
                        <span className="home__left-pub--dot"></span>
                        Disponible pour de nouvelles missions
                    </p>
                    <h1 className="home__left-title">Salut, je suis <br></br> Nolhan<span className="home__left-title--red">.</span></h1>
                    <h2 className="home__left-subtitle">Développeur <span className="home__left-subtitle--red">Full-Stack</span></h2>
                    <p className="home__left-description">
                        Je conçois des applications web modernes, performantes et bien 
                        architecturées - du premier trait d'interface jusqu'à la mise en 
                        production. Basé à Tours, je travaille avec des indépendants et des 
                        équipes qui veulent du code propre.
                    </p>

                    <div className="home__left-bouton">
                        <Bouton variant="primary" as="a" href="#contact">
                            Voir mes projets
                        </Bouton>
                        <Bouton variant="secondary" as="a" href="#contact">
                            Télécharger mon CV
                        </Bouton>
                    </div>

                    <p className="home__left-contact">
                        nolhan.marteau@gmail.com - Tours, France
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