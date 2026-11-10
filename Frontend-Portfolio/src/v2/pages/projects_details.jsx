import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArrowRightIcon from '../components/Icon/arrowright-icon'
import HeaderBack from '../components/layouts/headerback'
import Bouton from '../components/ui/bouton'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Footer from '../components/layouts/footer'

const API_URL = import.meta.env.VITE_API_URL

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [readme, setReadme] = useState(null)
  const [message, setMessage] = useState('')

  // -- Récupération des détails du projet

  useEffect(() => {
    if (!id) return

    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/projects/${id}`, {
          method: 'GET',
        })
        const data = await response.json()
        if (response.ok) {
          setProject(data)
        } else {
          setMessage(data.message)
        }
      } catch (error) {
        setMessage(error.message)
      }
    }

    fetchProjectDetails()
  }, [id])

  // -- Récupération du README du projet depuis GitHub

  useEffect(() => {
    if (!project) return

    const NomUtilisateur_Github = project.github_url.split('/')[3]
    const NomProjet_Github = project.github_url.split('/')[4]

    const repository = `https://api.github.com/repos/${NomUtilisateur_Github}/${NomProjet_Github}/readme`

    const fetchReadme = async () => {
      try {
        const response = await fetch(repository, {
          headers: { Accept: 'application/vnd.github.raw+json' },
        })
        if (response.ok) {
          setReadme(await response.text())
        } else {
          setMessage('README introuvable')
        }
      } catch (error) {
        setMessage(error.message)
      }
    }

    fetchReadme()
  }, [project])

  return (
    <>
      <title>NolhanDev - Projet</title>
      <div className="detailsprojectcontainer">
        <HeaderBack />

        <div className="container--small-2">
          {project ? (
            <div className="project-details__content">
              <p className="project-details__badge">
                <span className="project-details__badge-dot"></span>
                Disponible
              </p>

              <h1 className="project-details__title">
                {project.name}{' '}
                <span className="project-details__title-accent">
                  - {project.type}
                </span>
              </h1>

              <p className="project-details__description">
                {project.description}
              </p>

              <div className="project-details__actions">
                {project.live_url ? (
                  <Bouton variant="primary" as="a" href={project.live_url}>
                    Découvrez le projet <ArrowRightIcon />
                  </Bouton>
                ) : null}

                {project.github_url ? (
                  <Bouton variant="secondary" as="a" href={project.github_url}>
                    Github <ArrowRightIcon />
                  </Bouton>
                ) : null}
              </div>

              <div className="project-details__techs">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="project-details__tech">
                    {tech}
                  </span>
                ))}
              </div>

              <hr></hr>

              <div className="project-image">
                <div className="project-image__header">
                  <div className="project-image__dot"></div>
                  <div className="project-image__dot"></div>
                  <div className="project-image__dot"></div>
                </div>
                <img
                  className="project-image__image"
                  src={project.thumbnail}
                  alt={`Image du projet ${project.name}`}
                />
              </div>

              <div className="project-details__details">
                <div className="project-details__detail">
                  <h3 className="project-details__detail-title">
                    Date d'ajout sur le site
                  </h3>
                  <p className="project-details__detail-text">
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="project-details__detail project-details__detail--last">
                  <h3 className="project-details__detail-title">
                    Date de la dernière Mise à jour
                  </h3>
                  <p className="project-details__detail-text">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="project-details__readme">
                <div className="project-details__readme-header">
                  <h2 className="project-details__readme-title">
                    README du projet
                  </h2>
                  <hr className="project-details__readme-hr"></hr>
                </div>

                <div className="project-details__readme-content">
                  {readme ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {readme}
                    </ReactMarkdown>
                  ) : (
                    <p>Loading README...</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading project details...</p>
          )}

          {message && <p>{message}</p>}
        </div>
        <Footer />
      </div>
    </>
  )
}
