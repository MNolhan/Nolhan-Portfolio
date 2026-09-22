import CardParcours from "../components/ui/card_parcours";

export default function Parcours(){
    return(
        <div className="container--small" id="parcours">
            <div className="parcours">

                <div className="parcours__header">
                    <span className="parcours__header-title">- Parcours</span>
                    <p className="parcours__header-subtitle"> Mon parcours dans <span className="parcours__header-subtitle--red">l'informatique</span>.</p>
                </div>

                <div className="parcours__timeline">
                    <CardParcours
                        date="2023 - 2025"
                        title="Tronc commun informatique"
                        sub="1re & 2e année à l'ESGI"
                        description="Formation aux fondamentaux du développement informatique : algorithmique, programmation orientée objet, bases de données et premiers projets web en groupe."
                    />
                    <CardParcours
                        date="2024 - 2026"
                        title="Développeur Low-Code"
                        sub="SKF Saint-Cyr-sur-Loire"
                        description="Alternance en développement d'applications métier low-code, au service d'un environnement industriel — automatisation de processus internes et intégration avec les systèmes existants."
                    />
                    <CardParcours
                        date="2025 - 2026"
                        title="Spécialisation Ingénierie du Web"
                        sub="3e année à l'ESGI"
                        description="Spécialisation en développement web full-stack : architectures modernes, frameworks front-end et back-end, méthodologies de gestion de projet."
                    />
                </div>
            </div>
        </div>
    );
}