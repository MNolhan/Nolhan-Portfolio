import Bouton from "./bouton";
import CardProjectComponent from "./card_project_component";

export default function CardProject({ 
    type,
    title,
    description,
    live_url,
    github_url,
}){
    return(
        <div className="CardProject">

            <CardProjectComponent type={type} />

            <h3 className="CardProject__title">{title}</h3>
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