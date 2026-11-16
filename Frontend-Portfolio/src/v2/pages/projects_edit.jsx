import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import HeaderBack from '../components/layouts/headerback'
import Bouton from '../components/ui/bouton'

const API_URL = import.meta.env.VITE_API_URL

export default function UpdateProject() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [technologies, setTechnologies] = useState([])
  const [techInput, setTechInput] = useState('')
  const [message, setMessage] = useState('')

  // -- Lecture du Projet

  useEffect(() => {
    if (!id) return

    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/projects/${id}`)
        const data = await response.json()

        if (response.status === 404) {
          navigate('/Projet-non-trouve')
          return
        }

        if (response.ok) {
          setProject(data)
          setTechnologies(data.technologies ?? [])
          return
        }

        setMessage(data.message)
      } catch (error) {
        console.error(error)
        setMessage('Impossible de contacter le serveur.')
      }
    }

    fetchProjectDetails()
  }, [id])

  // -- Technologies

  const addTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()])
      setTechInput('')
    }
  }

  const removeTech = (tech) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  // -- Modification du Projet

  const handleSubmit = async (e) => {
    e.preventDefault()

    // On n'envoie que les champs remplis
    const payload = {}

    if (name.trim()) payload.name = name.trim()
    if (type) payload.type = type
    if (status) payload.status = status
    if (description.trim()) payload.description = description.trim()
    if (thumbnail.trim()) payload.thumbnail = thumbnail.trim()
    if (githubUrl.trim()) payload.github_url = githubUrl.trim()
    if (liveUrl.trim()) payload.live_url = liveUrl.trim()
    payload.technologies = technologies

    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Projet mis à jour avec succès !')
        setTimeout(() => {
          navigate(`/projects/${id}`)
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
      <title>NolhanDev - Modifier un projet</title>
      <div className="authcontainer">
        <HeaderBack />

        <div className="update-project">
          <div className="update-project__header">
            <h1 className="update-project__title">
              Modifier le <span className="update-project__title-accent">projet</span>.
            </h1>
          </div>

          <form className="update-project__form" onSubmit={handleSubmit}>
            <section className="update-project__section">
              <h2 className="update-project__section-title">Informations</h2>

              <div className="update-project__group">
                <label htmlFor="name" className="update-project__label">Nom du projet</label>
                <input type="text" id="name" className="update-project__input" placeholder={project?.name || ''} value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="update-project__row">
                <div className="update-project__group">
                  <label htmlFor="type" className="update-project__label">Type</label>
                  <select id="type" className="update-project__input" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">{project?.type || 'Type'} (actuel)</option>
                    <option value="Développement Web">Développement Web</option>
                    <option value="Développement Application">Développement Application</option>
                    <option value="Autres">Autres</option>
                  </select>
                </div>
                <div className="update-project__group">
                  <label htmlFor="status" className="update-project__label">Statut</label>
                  <select id="status" className="update-project__input" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">{project?.status || 'Statut'} (actuel)</option>
                    <option value="Terminé">Terminé</option>
                    <option value="En cours">En cours</option>
                    <option value="Archivé">Archivé</option>
                  </select>
                </div>
              </div>

              <div className="update-project__group">
                <label htmlFor="description" className="update-project__label">Description</label>
                <textarea id="description" rows="5" className="update-project__input update-project__input--textarea" placeholder={project?.description || ''} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </section>

            <section className="update-project__section">
              <h2 className="update-project__section-title">Liens et image</h2>

              <div className="update-project__media">
                <div className="update-project__group update-project__group--grow">
                  <label htmlFor="thumbnail" className="update-project__label">Image de présentation (URL)</label>
                  <input type="text" id="thumbnail" className="update-project__input" placeholder={project?.thumbnail || ''} value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
                </div>
              </div>

              <div className="update-project__row">
                <div className="update-project__group">
                  <label htmlFor="github_url" className="update-project__label">Lien GitHub</label>
                  <input type="url" id="github_url" className="update-project__input" placeholder={project?.github_url || ''} value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                </div>
                <div className="update-project__group">
                  <label htmlFor="live_url" className="update-project__label">Site en ligne</label>
                  <input type="url" id="live_url" className="update-project__input" placeholder={project?.live_url || ''} value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
                </div>
              </div>
            </section>

            <section className="update-project__section">
              <h2 className="update-project__section-title">Technologies</h2>

              <div className="update-project__techs">
                {technologies.map((tech) => (
                  <span key={tech} className="update-project__tech">
                    {tech}
                    <button type="button" className="update-project__tech-remove" aria-label="Retirer" onClick={() => removeTech(tech)}>X</button>
                  </span>
                ))}
              </div>

              <div className="update-project__add">
                <input
                  type="text"
                  id="techno"
                  className="update-project__input"
                  placeholder="Ajouter une technologie"
                  aria-label="Ajouter une technologie"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                />
                <button type="button" className="update-project__add-button" onClick={addTech}>+ Ajouter</button>
              </div>
            </section>

            {message && <p className="update-project__message">{message}</p>}

            <div className="update-project__actions">
              <Bouton as="a" href="/" variant="secondary">
                Annuler
              </Bouton>
              <Bouton type="submit" variant="primary">
                Enregistrer les modifications
              </Bouton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}