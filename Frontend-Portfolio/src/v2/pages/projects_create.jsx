import HeaderBack from '../components/layouts/headerback'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bouton from '../components/ui/bouton.jsx'

const API_URL = import.meta.env.VITE_API_URL


export default function CreateProject() {
  const [name, setName] = useState("")
  const [type, setType] = useState('Autres')
  const [status, setStatus] = useState("")
  const [description, setDescription] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [newTechnology, setNewTechnology] = useState("")
  const [technologies, setTechnologies] = useState([])
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const addTechnology = () => {
    if (newTechnology.trim() !== "") {
      setTechnologies([...technologies, newTechnology.trim()])
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          description,
          thumbnail: thumbnail,
          github_url: githubUrl,
          live_url: liveUrl,
          status,
          technologies,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Projet créé avec succès !')
        setName('')
        setType('Autres')
        setDescription('')
        setThumbnail('')
        setGithubUrl('')
        setLiveUrl('')
        setStatus('')
        setTechnologies([])
        setTimeout(() => {
          navigate(`/projects/${data.id}`)
        }, 1500)
        return
      }

      setMessage(data.message)
    } catch (error) {
      console.error('Erreur:', error)
      setMessage('Impossible de contacter le serveur.')
    }
  }


  return (
    <>
      <title>NolhanDev - Ajouter un projet</title>
      <div className="authcontainer">
        <HeaderBack />

        <div className="create-project">
          <div className="create-project__header">
            <h1 className="create-project__title">
              Ajouter un <span className="create-project__title-accent">projet</span>.
            </h1>
            <p className="create-project__subtitle">
              Remplissez les informations du projet, il apparaîtra directement sur le site.
            </p>
          </div>

          <form className="create-project__form" onSubmit={handleSubmit}>
            <section className="create-project__section">
              <h2 className="create-project__section-title">Informations</h2>

              <div className="create-project__group">
                <label htmlFor="name" className="create-project__label">Nom du projet</label>
                <input type="text" id="name" name="name" className="create-project__input" placeholder="Ex. : Portfolio" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="create-project__row">
                <div className="create-project__group">
                  <label htmlFor="type" className="create-project__label">Type</label>
                  <select id="type" name="type" className="create-project__input" value={type} onChange={(e) => setType(e.target.value)}>
                    <option>Développement Web</option>
                    <option>Développement Application</option>
                    <option>Autres</option>
                  </select>
                </div>
                <div className="create-project__group">
                  <label htmlFor="status" className="create-project__label">Statut</label>
                  <select id="status" name="status" className="create-project__input" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Terminé</option>
                    <option>En cours</option>
                    <option>Archivé</option>
                  </select>
                </div>
              </div>

              <div className="create-project__group">
                <label htmlFor="description" className="create-project__label">Description</label>
                <textarea id="description" name="description" rows="5" className="create-project__input create-project__input--textarea" placeholder="Présentez le projet en quelques lignes : son but, ce que vous avez fait, ce que vous avez appris." value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </section>

            <section className="create-project__section">
              <h2 className="create-project__section-title">Liens et image</h2>

              <div className="create-project__group">
                <label htmlFor="thumbnail" className="create-project__label">Image de présentation (URL)</label>
                <input type="url" id="thumbnail" name="thumbnail" className="create-project__input" placeholder="https://…" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
              </div>

              <div className="create-project__row">
                <div className="create-project__group">
                  <label htmlFor="github_url" className="create-project__label">Lien GitHub</label>
                  <input type="url" id="github_url" name="github_url" className="create-project__input" placeholder="https://github.com/…" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                </div>
                <div className="create-project__group">
                  <label htmlFor="live_url" className="create-project__label">Site en ligne</label>
                  <input type="url" id="live_url" name="live_url" className="create-project__input" placeholder="https://…" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
                </div>
              </div>
            </section>

            <section className="create-project__section">
              <h2 className="create-project__section-title">Technologies</h2>

              <div className="create-project__techs">
                {technologies.map((tech, index) => (
                  <span key={index} className="create-project__tech">
                    {tech}
                    <button type="button" className="create-project__tech-remove" aria-label={`Retirer ${tech}`} onClick={() => removeTechnology(index)}>X</button>
                  </span>
                ))}
              </div>

              <div className="create-project__add">
                <input type="text" id="techno" className="create-project__input" placeholder="Ajouter une technologie (ex. : Docker)" aria-label="Ajouter une technologie" value={newTechnology} onChange={(e) => setNewTechnology(e.target.value)} />
                <button type="button" className="create-project__add-button" onClick={addTechnology}>+ Ajouter</button>
              </div>

              {message && <p className="create-project__message">{message}</p>}

            </section>

            <div className="create-project__actions">
              <Bouton as="a" href="/" variant="secondary">
                Annuler
              </Bouton>
              <Bouton type="submit" variant="primary">
                Ajouter le projet
              </Bouton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}