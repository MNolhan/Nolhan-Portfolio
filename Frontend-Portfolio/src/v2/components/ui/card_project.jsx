import Bouton from "./bouton";
import CardProjectComponent from "./card_project_component";
import StarsIcon from "../Icon/stars-icons";
import { useEffect, useState } from "react";

export default function CardProject({ type, title, description, live_url, github_url,}){

    const NomUtilisateur_Github = github_url.split("/")[3];
    const NomProjet_Github = github_url.split("/")[4];

    const repository = `https://api.github.com/repos/${NomUtilisateur_Github}/${NomProjet_Github}`;
    const [repositoryData, setRepositoryData] = useState(null);

    const fetchRepositoryData = async () => {
        try {
            const response = await fetch(repository);

            if (!response.ok) {
                throw new Error('Impossible de récupérer les données du dépôt GitHub.');
            } else {
                const data = await response.json();
                setRepositoryData(data);
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des données du dépôt GitHub: ', error);
        }
    };

    useEffect(() => {
        fetchRepositoryData();
    }, [repository]);

    return(
        <div className="CardProject">

            <CardProjectComponent type={type} />

            <div className="CardProject__header">
                <h3 className="CardProject__title">{title}</h3>
                <p className="CardProject__stars">
                    <StarsIcon /> {repositoryData ? repositoryData.stargazers_count : 0}
                </p>
            </div>

            <p className="CardProject__description">{description}</p>

            <div className="CardProject__buttons">

                {live_url ? (
                    <Bouton variant="primary" as="a" href={live_url}>
                        Découvrez le projet
                    </Bouton>
                ) : null}

                {github_url ? (
                    <Bouton variant="secondary" as="a" href={github_url}>
                        Github
                    </Bouton>
                ) : null}

            </div>

        </div>
    );
}