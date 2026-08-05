export default function CardApropos({ 
    children, 
    Description,
    variant }) {
  return (
    <div className={`card card-${variant}`}>
      <h2 className={`card-title card-${variant}-title`}>{children}</h2>
      <p className={`card-description card-${variant}-description`}>{Description}</p>
    </div>
  )
}
