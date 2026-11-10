export default function CardServices({
  type,
  icon,
  title,
  Description,
  variant,
}) {
  const Icon = icon

  return (
    <div className={`card-services card-services--${variant}`}>
      <div className="card-services__header">
        <p className="card-services__type">{type}</p>
        <div className="card-services__icon">{Icon && <Icon />}</div>
      </div>
      <h1 className="card-services__title">{title}</h1>
      <p className="card-services__description">{Description}</p>
    </div>
  )
}
