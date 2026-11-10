export default function CardApropos({ children, Description, variant }) {
  return (
    <div className={`card-apropos card-apropos--${variant}`}>
      <h2 className={`card-apropos__title card-apropos__title--${variant}`}>
        {children}
      </h2>
      <p
        className={`card-apropos__description card-apropos__description--${variant}`}
      >
        {Description}
      </p>
    </div>
  )
}
