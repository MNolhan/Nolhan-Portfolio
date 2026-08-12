import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL

export default function ProjectDetails({ projectId }) {
    const [project, setProject] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/ReadProject/${projectId}`);
                const data = await response.json();
                if (response.ok) {
                    setProject(data);
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                setMessage(error.message);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    if (message) {
        return <div>{message}</div>;
    }

    return (
        <div>
            <h1>{project?.title}</h1>
            <p>{project?.description}</p>
        </div>
    );
}