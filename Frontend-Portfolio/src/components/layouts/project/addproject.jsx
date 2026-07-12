import { useState } from 'react'
import Bouton from '../../ui/button'

const API_URL = import.meta.env.VITE_API_URL

export default function AddProject() {
  const [name, setName] = useState('')
  const [type, setType] = useState('Autres')
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

    try {
      const response = await fetch(`${API_URL}/CreateProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          description,
          thumbnail: thumbnail,
          github_url: githubUrl,
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
        setTechnologies([])
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
    <dialog className="panel panel--popup" id="AddProject">
      <h1 className="panel__title">Ajouter un Projet</h1>
      <div className="panel__content">
        <form className="panel__inputs--project" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Nom du Projet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
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
            required
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
            Ajouter
          </Bouton>
          <Bouton
            variant="primary"
            type="button"
            onClick={() => {
              document.getElementById('AddProject').close()
              setMessage('')
              setName('')
              setType('Autres')
              setDescription('')
              setThumbnail('')
              setGithubUrl('')
              setLiveUrl('')
              setTechnologies([])
            }}
          >
            Fermer
          </Bouton>
        </div>
      </div>
    </dialog>
  )
}
