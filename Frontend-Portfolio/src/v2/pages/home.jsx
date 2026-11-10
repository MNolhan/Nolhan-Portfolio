import Bouton from '../components/ui/bouton'
import DownloadIcon from '../components/Icon/download-icon'
import ArrowRightIcon from '../components/Icon/arrowright-icon'
import Me from '../../assets/NolhanPortfolioPDP.webp'
import CV from '../../assets/CV.pdf'

export default function Home() {
  const date = new Date().toLocaleTimeString()

  let message

  if (date > '19:00' || date < '00:00') {
    message = 'Bonsoir'
  } else {
    message = 'Salut'
  }

  return (
    <div className="container" id="home">
      <div className="home">
        <div className="home__left">
          <p className="home__badge">
            <span className="home__badge-dot"></span>
            Disponible - Fuseau Horaires : UTC+2 (France)
          </p>
          <h1 className="home__title">
            {message}, je suis <br></br> Nolhan
            <span className="home__title-accent">.</span>
          </h1>
          <h2 className="home__subtitle">
            Développeur Junior{' '}
            <span className="home__subtitle-accent">Full-Stack</span>
          </h2>
          <p className="home__description">
            Je conçois des applications web modernes, performantes et bien
            architecturées - du premier trait d'interface jusqu'à la mise en
            production. Basé à Tours, je travaille avec des indépendants et des
            équipes qui veulent du code propre.
          </p>

          <div className="home__actions">
            <Bouton variant="primary" as="a" href="#projets">
              <span>Voir mes projets</span>
              <ArrowRightIcon />
            </Bouton>
            <Bouton variant="secondary" as="a" href={CV} download>
              <span>Télécharger mon CV</span>
              <DownloadIcon />
            </Bouton>
          </div>

          <p className="home__contact">mrt.nolhan@gmail.com - Tours, France</p>
        </div>

        <div className="home__right">
          <div className="home__ring"></div>
          <img src={Me} alt="Nolhan" className="home__img" />

          <div className="home__chip home__chip--1">React</div>
          <div className="home__chip home__chip--2">Node.js</div>
          <div className="home__chip home__chip--3">Laravel</div>
        </div>
      </div>

      <a href="#apropos" className="home__scroll">
        <span>Scroller</span>
        <div className="home__scroll-line">
          <i></i>
        </div>
      </a>
    </div>
  )
}
