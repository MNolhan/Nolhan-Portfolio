import Bouton from '../components/ui/button'
import Me from '../assets/NolhanPortfolioPDP.png'
import CV from '../assets/CV.pdf'

export default function Home() {
  return (
    <>
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
              <p className="home__description">
                Développeur full-stack passionné par la création d'applications
                web modernes. Je travaille principalement avec React, Node.js et
                Laravel pour concevoir des plateformes performantes, évolutives
                et bien architecturées. J'accorde une grande importance à la
                qualité du code, aux bonnes pratiques et à l'expérience
                utilisateur.
              </p>
              <div className="home__list">
                <a href="#project">
                  <Bouton variant="primary">Projects</Bouton>
                </a>
                <Bouton as="a" href={CV} download variant="secondary">
                  Télécharger Mon CV
                </Bouton>
              </div>
            </div>
            <div className="home__content--right">
              <img className="home__image" src={Me} alt="Photo de Nolhan" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
