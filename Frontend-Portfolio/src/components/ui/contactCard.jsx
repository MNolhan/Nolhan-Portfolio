export default function contactCard({ Icone, titre, info }) {
  return (
    <div className="contactCard">
      <div className="contactCard__icone">
        <Icone />
      </div>
      <div className="contactCard__content">
        <p className="contactCard__title">{titre}</p>
        <p className="contactCard__description">{info}</p>
      </div>
    </div>
  )
}
