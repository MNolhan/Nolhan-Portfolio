import { useEffect, useState } from "react";
import CardProject from "../components/ui/card_project";

const API_URL = import.meta.env.VITE_API_URL

export default function Projects(){
    const [projects, setProjects] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchProjects = async () => {
        try {
            const response = await fetch(`${API_URL}/ReadProject`)
            const data = await response.json()

            if (response.ok) {
            setProjects(data)
            } else {
            setMessage('Erreur lors du chargement des projets')
            }
        } catch (error) {
            console.error(error)
            setMessage('Impossible de contacter le serveur.')
        }
        }

        fetchProjects()
    }, [])
    
    return(
        <div className="container--small">
            <div className="projects" id="projects">

                <div className="projects__header">
                    <span className="projects__header-title">- Projets</span>
                    <p className="projects__header-subtitle">Une sélection de mes <span className="projects__header-subtitle--red">réalisations</span></p>
                </div>

                <div className="projects__cards">
                    {projects.map((project) => (
                        <CardProject
                            key={project.id}
                            github_url={project.github_url}
                            live_url={project.live_url}
                            type={project.type}
                            title={project.name}
                            description={project.description}
                        />
                    ))}
                </div>
                
            </div>
        </div>
    );
}