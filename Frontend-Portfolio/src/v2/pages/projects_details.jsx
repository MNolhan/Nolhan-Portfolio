import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL

export default function ProjectDetails({ projectId }) {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!id) return;

        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/ReadProject/${id}`);
                const data = await response.json();
                if (response.ok){
                    setProject(data);
                }
                else setMessage(data.message);
            } catch (error) {
                setMessage(error.message);
            }
        };

        fetchProjectDetails();
    }, [id]);

    return (
        <div>
            {project ? (
                <div>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                    <p>Technologies: {project.technologies}</p>
                    <p>Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>
                </div>
            ) : (
                <p>Loading project details...</p>
            )}
            {message && <p>{message}</p>} 
        </div>
    );
}