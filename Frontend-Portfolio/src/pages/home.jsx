import Header from "../components/layouts/header";
import Foot from "../components/layouts/footer";
import Bouton from "../components/ui/button";
import Me from "../assets/me.jpg";

export default function Home() {
    return (
        <div className="home">
            <Header />
                <section className="home">
                    <div className="container">
                        <div className="home__content">
                            <div className="home__content--left">
                                <h2 className="home__subtitle">
                                    <p className="home__subtitle home--first">Hey, I'm </p>
                                    <p className="home__subtitle home--second">Nolhan</p>
                                </h2>   
                                <h1 className="home__title">
                                    <p className="home__title home--first">I'm a </p>
                                    <p className="home__title home__title__typing home--second">
                                        <span>Developper</span>
                                        <span>Designer</span>
                                    </p>
                                </h1>
                                <p className="home__description">Développeur full-stack JavaScript & PHP, je conçois des applications 
                                    modernes, performantes et durables. De l'architecture au déploiement, j'accorde une attention 
                                    rigoureuse à la qualité du code, à la fluidité de l'expérience utilisateur et à la fiabilité 
                                    de chaque fonctionnalité.
                                </p>
                                <div className="home__list">
                                    <Bouton variant="primary">Projects</Bouton>
                                    <Bouton variant="secondary">Contact</Bouton>
                                </div>
                            </div>
                            <div className="home__content--right">
                                <img className="home__image" src={Me} alt="Photo de Nolhan"/>
                            </div>
                        </div>
                    </div>
                </section>
            <Foot />
        </div>
    );
}