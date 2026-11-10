import Bouton from './bouton'
import CardProjectComponent from './card_project_component'
import StarsIcon from '../Icon/stars-icons'
import { useEffect, useState } from 'react'

export default function CardProject({
  id,
  type,
  title,
  description,
  live_url,
  github_url,
}) {
  const NomUtilisateur_Github = github_url.split('/')[3]
  const NomProjet_Github = github_url.split('/')[4]

  const repository = `https://api.github.com/repos/${NomUtilisateur_Github}/${NomProjet_Github}`
  const [repositoryData, setRepositoryData] = useState(null)

  const fetchRepositoryData = async () => {
    try {
      const response = await fetch(repository)

      if (!response.ok) {
        throw new Error('Impossible de récupérer les données du dépôt GitHub.')
      } else {
        const data = await response.json()
        setRepositoryData(data)
      }
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des données du dépôt GitHub: ',
        error
      )
    }
  }

  useEffect(() => {
    fetchRepositoryData()
  }, [repository])

  return (
    <div className="card-project">
      <CardProjectComponent type={type} />

      <div className="card-project__header">
        <h3 className="card-project__title">{title}</h3>
        <p className="card-project__stars">
          <StarsIcon /> {repositoryData ? repositoryData.stargazers_count : 0}
        </p>
      </div>

      <p className="card-project__description">{description}</p>

      <div className="card-project__buttons">
        {live_url ? (
          <Bouton variant="primary" as="a" href={live_url}>
            Découvrez le projet
          </Bouton>
        ) : null}

        {github_url ? (
          <Bouton variant="secondary" as="a" href={`/projects/${id}`}>
            Détails
          </Bouton>
        ) : null}
      </div>
    </div>
  )
}
