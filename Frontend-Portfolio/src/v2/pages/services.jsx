import CardServices from "../components/ui/card_services";
import Automatisation from '../components/Icon/automatisation-icon'
import Backend from '../components/Icon/backendapi-icon'
import Design from '../components/Icon/webdesign-icon'
import Developpement from '../components/Icon/devweb-icon'
import Optimisation from '../components/Icon/optimisation-icon'
import Mobile from '../components/Icon/mobiledev-icon'


export default function services(){
    return(
        <div className="container--small" id="services">
            <div className="services">

                <div className="services__header">
                    <h1 className="services__header-title">- Mes Services</h1>
                    <p className="services__header-subtitle"> Une expertise <span className="services__header-subtitle--red">complète</span>,<br></br> du design au déploiment.</p>
                </div>

                <div className="services__content">
                    <CardServices 
                        type="Front-end"
                        icon={Developpement}
                        title="Développement Web"
                        Description="Création d'applications web modernes et performantes avec React, Laravel ou Node.js - interfaces rapides et bien structurées."
                        variant="red"
                    />
                    <CardServices 
                        type="Interface"
                        icon={Design}
                        title="Web Design"
                        Description="Conception d'interfaces utilisateur élégantes et intuitives, pensées pour capter et retenir l'attention de vos visiteurs."
                        variant="purple"
                    />
                    <CardServices 
                        type="Mobile"
                        icon={Mobile}
                        title="Applications Mobiles"
                        Description="Développement d'applications mobiles natives et cross-platform, pensées pour offrir une expérience fluide sur Android et iOS."
                        variant="blue"
                    />
                    <CardServices 
                        type="API & Données"
                        icon={Backend}
                        title="Backend & API"
                        Description="Architecture de bases de données robustes et développement d'API REST solides, pensées pour évoluer avec votre projet."
                        variant="green"
                    />
                    <CardServices 
                        type="Productivité"
                        icon={Automatisation}
                        title="Automatisation"
                        Description="Création de scripts sur mesure pour automatiser vos tâches répétitives et gagner un temps précieux au quotidien."
                        variant="amber"
                    />
                    <CardServices 
                        type="Qualité"
                        icon={Optimisation}
                        title="Optimisation"
                        Description="Amélioration des performances, du SEO et de l'accessibilité pour des sites web plus rapides et mieux référencés."
                        variant="red-strong"
                    />
                </div>

            </div>
        </div>
    );
}