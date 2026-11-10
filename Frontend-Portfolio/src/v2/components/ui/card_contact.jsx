export default function CardContact({ Title, information, Icon, href }) {
  const content = (
    <>
      <div className="card-contact__left">
        <span className="card-contact__label">{Title}</span>
        <span className="card-contact__value">{information}</span>
      </div>
      {Icon && (
        <div className="card-contact__right">
          <span className="card-contact__icon">{Icon}</span>
        </div>
      )}
    </>
  )

  if (href) {
    return (
      <a
        className="card-contact"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className="card-contact"
      onClick={() => navigator.clipboard.writeText(information)}
    >
      {content}
    </button>
  )
}
