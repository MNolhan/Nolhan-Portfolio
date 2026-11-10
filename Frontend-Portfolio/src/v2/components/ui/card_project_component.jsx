export default function CardProjectComponent({ type }) {
  return (
    <div className="card-project-component">
      <div className="card-project-component__header">
        <div className="card-project-component__dot"></div>
        <div className="card-project-component__dot"></div>
        <div className="card-project-component__dot"></div>
      </div>
      <div className="card-project-component__content">
        <p className="card-project-component__type">{type}</p>
        <div className="card-project-component__main"></div>
        <div className="card-project-component__card">
          <div className="card-project-component__card-sub"></div>
          <div className="card-project-component__card-sub"></div>
          <div className="card-project-component__card-sub"></div>
        </div>
      </div>
    </div>
  )
}
