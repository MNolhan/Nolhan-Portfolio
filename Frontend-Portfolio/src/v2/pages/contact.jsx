import CardContact from '../components/ui/card_contact'
import { CopyIcon } from '../components/Icon/copy-icon'
import ArrowRightIcon from '../components/Icon/arrowright-icon'
import DownloadIcon from '../components/Icon/download-icon'
import CV from '../../assets/CV.pdf'
import Bouton from '../components/ui/bouton'
import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function Contact() {
  const [nom, SetNom] = useState('')
  const [email, SetEmail] = useState('')
  const [message, SetMessage] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const [submit, ISSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    ISSubmitting(true)

    const data = { nom, email, message }

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        SetNom('')
        SetEmail('')
        SetMessage('')
        setResponseMessage('Message envoyé avec succès !')
      } else {
        setResponseMessage("Erreur lors de l'envoi du message.")
      }
    } catch (err) {
      console.error(err)
    } finally {
      ISSubmitting(false)
    }
  }

  return (
    <div className="container--small" id="contact">
      <div className="contact">
        <div className="contact__header">
          <span className="contact__label">- Contact</span>
          <p className="contact__title">
            Un projet en tête ? <br></br> Travaillons{' '}
            <span className="contact__title-accent">ensemble</span>.
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__left">
            <div className="contact-card">
              <p className="contact-card__header">
                <span className="contact-card__dot"></span>
                Disponible
              </p>
              <p className="contact-card__info">
                Ouvert aux missions freelance et de nouvelles opportunitées.
              </p>
              <hr className="contact-card__divider"></hr>
              <p className="contact-card__location">Tours, France</p>
            </div>

            <CardContact
              Title="Email"
              information="mrt.nolhan@gmail.com"
              Icon={<CopyIcon />}
            />
            <CardContact
              Title="Linkedin"
              information="Nolhan Marteau"
              href="https://www.linkedin.com/in/nolhan-marteau/"
              Icon={<ArrowRightIcon />}
            />
            <CardContact
              Title="Github"
              information="@MNolhan"
              href="https://github.com/MNolhan"
              Icon={<ArrowRightIcon />}
            />
            <CardContact
              Title="CV"
              information="Télécharger Mon CV"
              href={CV}
              Icon={<DownloadIcon />}
            />
          </div>
          <div className="contact__right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="contact-form__title">Envoyez-moi un message</h2>
              <h4 className="contact-form__subtitle">
                Quelques lignes suffisent, je reviens vers vous rapidement.
              </h4>

              <div className="contact-form__fields">
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="name">
                      Nom
                    </label>
                    <input
                      className="contact-form__input"
                      type="text"
                      id="name"
                      maxLength={20}
                      name="name"
                      placeholder="Votre nom"
                      required
                      value={nom}
                      onChange={(e) => SetNom(e.target.value)}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="contact-form__input"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Votre email"
                      required
                      value={email}
                      onChange={(e) => SetEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="contact-form__input--textarea"
                    id="message"
                    maxLength={250}
                    name="message"
                    placeholder="Maximum 250 caractères"
                    rows="5"
                    required
                    value={message}
                    onChange={(e) => SetMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={submit}
                className="contact-form__submit"
              >
                <span className="contact-form__button-text">
                  Envoyer le message
                </span>
                <ArrowRightIcon />
              </button>

              {responseMessage && (
                <p className="contact-form__response">{responseMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
