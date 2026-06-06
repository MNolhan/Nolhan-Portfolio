import { useState, useEffect } from "react";
import Card from "../components/ui/projectCard";

export default function Project() {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {

                const response = await fetch("http://localhost:3000/ReadProject");
                const data = await response.json();

                if (response.ok) {
                    setProjects(data);
                } else {
                    setMessage("Erreur lors du chargement des projets");
                }
                
            } catch (error) {
                console.error(error);
                setMessage("Impossible de contacter le serveur.");
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="project" id="project">
            <div className="container">
                <div className="project__title">
                    <p className="project__title--first">Mes</p>
                    <p className="project__title--second">Projets</p>
                </div>

                <p className="project__subtitle">
                    Une sélection de mes réalisations
                </p>

                <div className="project__message">
                    {message && <p>{message}</p>}
                </div>

                <div className="project__card-list">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            github_url={project.github_url}
                            live_url={project.live_url}
                            type={project.type}
                            titre={project.name}
                            description={project.description}
                            thumbnail={project.thumbnail}
                            technologies={project.technologies}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}