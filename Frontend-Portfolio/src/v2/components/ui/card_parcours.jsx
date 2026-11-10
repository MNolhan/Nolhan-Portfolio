export default function CardParcours({ date, title, sub, description }) {
  return (
    <>
      <div className="card-parcours">
        <div className="card-parcours__left">
          <p className="card-parcours__date">{date}</p>
          <span className="card-parcours__sub">{sub}</span>
        </div>
        <div className="card-parcours__right">
          <h3 className="card-parcours__title">{title}</h3>
          <p className="card-parcours__description">{description}</p>
        </div>
      </div>
      <hr className="card-parcours__divider"></hr>
    </>
  )
}
