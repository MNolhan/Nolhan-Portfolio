import Bouton from '../components/ui/button'
import Card from '../components/ui/contactCard'
import Email from '../components/Icon/email-icon'
import Pinmap from '../components/Icon/pinmap-icon'

export default function contact() {
  return (
    <>
      <div className="contact" id="contact">
        <div className="container">
          <div className="container">
            <div className="contact__title">
              <p className="contact__title--first">Travaillons</p>
              <p className="contact__title--second">ensemble</p>
            </div>
            <p className="contact__subtitle">
              Un projet en tête ? Discutons-en !
            </p>
            <div className="contact__content">
              <div className="contact__content--left">
                <h2 className="contact__content--title">Contactez-moi</h2>
                <p className="contact__content--description">
                  Je suis toujours ouvert à discuter de nouveaux projets,
                  d'idées créatives ou d'opportunités de collaboration.
                  N'hésitez pas à me contacter !
                </p>
                <div className="contact__content--list">
                  <Card
                    Icone={Email}
                    info="nolhan.marteau@gmail.com"
                    titre="Email"
                  ></Card>
                  <Card
                    Icone={Pinmap}
                    info="Tours, France"
                    titre="Localisation"
                  ></Card>
                </div>
              </div>
              <div className="contact__content--right">
                <div className="contact__content--right-input">
                  <label>Nom</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Votre Nom..."
                  ></input>
                </div>
                <div className="contact__content--right-input">
                  <label>Email</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Votre Email..."
                  ></input>
                </div>
                <div className="contact__content--right-input">
                  <label>Message</label>
                  <textarea
                    className="input"
                    placeholder="Votre Message..."
                  ></textarea>
                </div>
                <Bouton variant="validation">Envoyer le Message</Bouton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
