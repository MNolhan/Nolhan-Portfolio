import Card from "../components/ui/serviceCard";
import DevWebIcon from "../components/Icon/devweb-icon";
import BackendApiIcon from "../components/Icon/backendapi-icon";
import EcommerceIcon from "../components/Icon/ecommerce-icon";
import MobileAppIcon from "../components/Icon/mobiledev-icon";
import OptimizationIcon from "../components/Icon/optimisation-icon";
import WebDesignIcon from "../components/Icon/webdesign-icon";

export default function service() {
  return (
    <>
      <div class="service" id="service">
        <div class="container">
          <div className="service__title">
            <p className="service__title--first">Mes</p>
            <p className="service__title--second">Services</p>
          </div>
          <p className="service__subtitle">
            Des compétences variées pour donner vie à tous vos projets digitaux
          </p>
          <div className="service__card-list">
            <Card
              Icone={DevWebIcon}
              description="Création d'application web modernes et performantes avec React, Laravel ou NodeJS."
            >
              Développement Web
            </Card>
            <Card
              Icone={WebDesignIcon}
              description="Conception d'interfaces utilisateur élégantes et intuitives qui captivent vos visiteurs."
            >
              Web Design
            </Card>
            <Card
              Icone={MobileAppIcon}
              description="Développement d'apps mobiles natives et cross-platform pour Android."
            >
              Applications Mobiles
            </Card>
            <Card
              Icone={BackendApiIcon}
              description="Architecture de bases de données robustes et développement d'API REST"
            >
              Backend & API
            </Card>
            <Card
              Icone={EcommerceIcon}
              description="Création de scripts pour automatiser vos tâches répétitives et gagner en productivité."
            >
              Automatisation
            </Card>
            <Card
              Icone={OptimizationIcon}
              description="Amélioration des performances SEO et accessibilité de vos sites webs"
            >
              Optimisation
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
