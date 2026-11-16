import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useParams } from 'react-router-dom'
import ArrowRightIcon from '../components/Icon/arrowright-icon'
import HeaderBack from '../components/layouts/headerback'
import Bouton from '../components/ui/bouton'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Footer from '../components/layouts/footer'
import UpdateIcon from '../components/Icon/update-icon'
import TrashIcon from '../components/Icon/trash-icon'
import ArrowLeftIcon from '../components/Icon/arrowleft-icon'

const API_URL = import.meta.env.VITE_API_URL

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [readme, setReadme] = useState(null)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const dialogRef = useRef(null)
  const contentRef = useRef(null)
  const confirmRef = useRef(null)

  // Test pour savoir si l'utilisateur est admin
  
  const { isAdmin } = useAuth()

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
        } else if (response.status === 404) {
          navigate('/Projet-non-trouve')
          return
        } 

        console.log(data.message)

      } catch (error) {
        setMessage(error.message)
      }
    }

    fetchProjectDetails()
  }, [id])

  // -- Suppression du projet

  const deleteProject = async () => {
    try {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })

        if (response.ok) {
            contentRef.current.style.display = "none";
            confirmRef.current.style.display = "flex";
            setTimeout(() => {
              dialogRef.current.close()
              navigate("/")
            }, 2000);
            return;
        }

        const data = await response.json()
        console.log(data.message)

    } catch (error) {
        console.log(error.message)
    } 
  }

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
          setReadme("Aucun README disponible pour ce projet.")
        }

      } catch (error) {
        console.log(error.message)
        setReadme("Impossible de charger le README.")
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

          {project && (
            <div className="project-details__content">

              <div className="project-details__toolbar">
                <p className="project-details__badge">
                  <span className="project-details__badge-dot"></span>
                  Disponible
                </p>
                {isAdmin && (
                  <div className="project-details__admin">
                    <a href={`/projects/${project.id}/edit`} className="project-details__admin-button project-details__update"><UpdateIcon /> Mettre à jour le projet</a>
                    <button command="show-modal" commandfor="delete-dialog" className="project-details__admin-button project-details__delete"><TrashIcon /> Supprimer le projet</button>
                  </div>
                )}
              </div>

              <dialog ref={dialogRef} className="project-details__dialog" id="delete-dialog">
                <div ref={contentRef}>
                  <div className="project-details__dialog-icon"> <TrashIcon /> </div>
                  <h1 className="project-details__dialog-title">Supprimer le <span className="project-details__dialog-title--accent">projet</span> ?</h1>
                  <p className="project-details__dialog-text">"{project.name}" sera définitivement supprimé supprimé du site. Cette action est irréversible.</p>
                  <div className="project-details__dialog-actions">
                    <Bouton variant="secondary" commandfor="delete-dialog" command="close">
                      <ArrowLeftIcon /> Annuler
                    </Bouton>
                    <Bouton variant="primary" onClick={deleteProject}>
                      <TrashIcon /> Supprimer définitivement
                    </Bouton>
                  </div>
                </div>
                <div ref={confirmRef} className="project-details__delete-confirmation">
                  <div className="project-details__dialog-icon"> <TrashIcon /> </div>
                  <p className="project-details__dialog-text">Le projet a été supprimé avec succès.</p>
                </div>
              </dialog>

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
                <div className="project-details__detail">
                  <h3 className="project-details__detail-title">
                    Nombre de technologies utilisées
                  </h3>
                  <p className="project-details__detail-text">
                    {project.technologies.length}
                  </p>
                </div>
                <div className="project-details__detail project-details__detail--last">
                  <h3 className="project-details__detail-title">
                    Statut du projet
                  </h3>
                  <p className="project-details__detail-text">
                    {project.status}
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
                  {readme && (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {readme}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            </div>
          )}

          <p className="project-details__message">{message}</p>

        </div>
        <Footer />
      </div>
    </>
  )
}
