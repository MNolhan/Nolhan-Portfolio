import Bouton from '../ui/bouton'
import ArrowRightIcon from '../Icon/arrowright-icon'

export default function PagenotFound() {
  return (
    <div className="page-not-found">
      <h2 className="page-not-found__logo">
        Nolhan<span className="page-not-found__logo-accent">Dev</span>.
      </h2>
      <h1 className="page-not-found__title">ERREUR 404</h1>
      <p className="page-not-found__message">Aucune Page n'a été trouvée</p>
      <Bouton as="a" href="/" variant="primary">
        Retourner à l'accueil
        <ArrowRightIcon />
      </Bouton>
    </div>
  )
}
