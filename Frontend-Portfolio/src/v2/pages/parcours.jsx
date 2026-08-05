import CardParcours from "../components/ui/card_parcours";

export default function Parcours(){
    return(
        <div className="container--small">
            <div className="parcours" id="parcours">

                <div className="parcours__header">
                    <span className="parcours__header-title">- Parcours</span>
                    <p className="parcours__header-subtitle"> Parcours<span className="parcours__header-subtitle--red">.</span></p>
                </div>

                <div className="parcours__timeline">
                    <CardParcours
                        date="2023 - 2025"
                        title="Bac+1 & Bac+2"
                        sub="ESGI - Nantes"
                        description="Formation aux fondamentaux du développement informatique : algorithmique, programmation orientée objet, bases de données et premiers projets web en groupe."
                    />
                    <CardParcours
                        date="2025 - 2026"
                        title="Bachelor Ingénierie du Web"
                        sub="ESGI - Nantes"
                        description="Spécialisation en développement web full-stack : architectures modernes, frameworks front-end et back-end, méthodologies de gestion de projet."
                    />
                    <CardParcours
                        date="2024 - 2026"
                        title="Développeur Low-Code"
                        sub="SKF Saint-Cyr-sur-Loire"
                        description="Alternance en développement d'applications métier low-code, au service d'un environnement industriel — automatisation de processus internes et intégration avec les systèmes existants."
                    />
                </div>
            </div>
        </div>
    );
}