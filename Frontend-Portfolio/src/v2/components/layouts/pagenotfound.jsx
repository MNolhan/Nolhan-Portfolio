import Bouton from "../ui/bouton"
import ArrowRightIcon from "../Icon/arrowright-icon"

export default function PagenotFound() {
    return (
        <div className="pagenotfound">
            <h2 className="pagenotfound__Logo">Nolhan<span className="pagenotfound__Logo--red">Dev</span>.</h2>
            <h1 className="pagenotfound__title">ERREUR 404</h1>
            <p className="pagenotfound__message">Aucune Page n'a été trouvée</p>
            <Bouton as="a"href="/" variant="primary">Retourner à l'accueil<ArrowRightIcon /></Bouton>
        </div>
    )
}