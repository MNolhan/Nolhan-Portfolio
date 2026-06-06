export default function ProjectCard({
  github_url,
  live_url,
  type,
  titre,
  description,
  thumbnail,
  technologies = [],
  status,
}) {
  return (
    <div className="projectCard">
      <div className="projectCard__image">
        <img src={thumbnail} alt={titre} loading="lazy" />

        {github_url && (
          <a
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="projectCard__badge"
          >
            Github
          </a>
        )}
      </div>

      <p className="projectCard__type">{type}</p>
      <h3 className="projectCard__title">{titre}</h3>
      <p className="projectCard__description">{description}</p>

      <div className="projectCard__langages-list">
        {technologies.map((tech) => (
          <p key={tech} className="projectCard__langage">
            {tech}
          </p>
        ))}
      </div>

      {live_url && (
        <a
          href={live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="projectCard__website"
        >
          Voir le site
        </a>
      )}
    </div>
  );
}
