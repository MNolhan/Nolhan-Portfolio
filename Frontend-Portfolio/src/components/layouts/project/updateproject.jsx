import { useState } from 'react'
import Bouton from '../../ui/button'

const API_URL = import.meta.env.VITE_API_URL;

export default function UpdateProject() {
  const [name, setName] = useState('')
  const [newName, setNewName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [technologies, setTechnologies] = useState([])
  const [techInput, setTechInput] = useState('')
  const [message, setMessage] = useState('')

  const addTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()])
      setTechInput('')
    }
  }

  const removeTech = (tech) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setMessage('Indiquez le nom du projet à modifier.')
      return
    }

    const payload = { name }

    if (newName.trim()) payload.newName = newName.trim()
    if (type) payload.type = type
    if (description.trim()) payload.description = description.trim()
    if (thumbnail.trim()) payload.thumbnail = thumbnail.trim()
    if (githubUrl.trim()) payload.github_url = githubUrl.trim()
    if (technologies.length > 0) payload.technologies = technologies

    try {
      const response = await fetch(`${API_URL}/UpdateProject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Projet mis à jour avec succès !')
        setName('')
        setNewName('')
        setType('')
        setDescription('')
        setThumbnail('')
        setGithubUrl('')
        setTechnologies([])
        setTechInput('')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        return
      }

      setMessage(data.message)
    } catch (error) {
      console.error('Erreur:', error)
      setMessage('Impossible de contacter le serveur.')
    }
  }

  return (
    <dialog className="panel panel--popup" id="UpdateProject">
      <h1 className="panel__title">Modifier un Projet</h1>
      <div className="panel__content">
        <form className="panel__inputs--project" onSubmit={handleSubmit}>
          <div className="panel__1grid">
            <input
              className="input"
              type="text"
              placeholder="Nom du projet à modifier"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <hr></hr>
          </div>
          <input
            className="input"
            type="text"
            placeholder="Nouveau nom (optionnel)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <select
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option className="input__option" value="">
              Type (inchangé)
            </option>
            <option className="input__option" value="Développement Web">
              Développement Web
            </option>
            <option className="input__option" value="Développement Application">
              Développement Application
            </option>
            <option className="input__option" value="Autres">
              Autres
            </option>
          </select>

          <textarea
            className="input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={255}
          />

          <input
            className="input"
            type="url"
            placeholder="URL de la miniature"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
          <input
            className="input"
            type="url"
            placeholder="URL GitHub"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />

          <div className="panel__1grid">
            <div className="panel__1grid--input">
              <input
                className="input"
                type="text"
                placeholder="Ajouter une technologie"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addTech())
                }
              />
              <Bouton variant="secondary" type="button" onClick={addTech}>
                +
              </Bouton>
            </div>
            <div className="panel__1grid-list">
              {technologies.map((tech) => (
                <span key={tech} className="panel__1grid-item">
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)}>
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>

        {message && <p className="panel__message">{message}</p>}

        <div className="panel__buttons">
          <Bouton variant="secondary" type="button" onClick={handleSubmit}>
            Mettre à Jour
          </Bouton>
          <Bouton
            variant="primary"
            type="button"
            onClick={() => {
              document.getElementById('UpdateProject').close()
              setName('')
              setNewName('')
              setType('')
              setDescription('')
              setThumbnail('')
              setGithubUrl('')
              setTechnologies([])
              setTechInput('')
              setMessage('')
            }}
          >
            Fermer
          </Bouton>
        </div>
      </div>
    </dialog>
  )
}
