import { useState } from 'react'
import Bouton from '../../ui/button'

const API_URL = import.meta.env.VITE_API_URL

export default function DeleteProject() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/DeleteProject`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Suppression du Projet Réussi')
        setName('')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        return
      }

      setMessage(data.message)
    } catch (error) {
      console.error(error)
      setMessage('Impossible de contacter le serveur.')
    }
  }

  return (
    <dialog className="panel panel--popup" id="DeleteProject">
      <h1 className="panel__title">Supprimer un Project</h1>
      <form className="panel__content" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Nom du Projet"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        {message && <p className="panel__message">{message}</p>}

        <div className="panel__buttons">
          <Bouton variant="secondary" type="submit">
            Supprimer
          </Bouton>
          <Bouton
            variant="primary"
            type="button"
            onClick={() => {
              document.getElementById('DeleteProject').close()
              setName('')
              setMessage('')
            }}
          >
            Fermer
          </Bouton>
        </div>
      </form>
    </dialog>
  )
}
