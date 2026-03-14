import Imagetest from '../../assets/Portfolio-test.jpg'

export default function projectCard({url, type, titre, description}){
    return(
        <div className="projectCard">
            <div className="projectCard__image">
                <img src={Imagetest} alt="image test en attendant la base de donnée"></img>
                <a href={url} class="projectCard__badge">Github</a>
            </div>
            <p className="projectCard__type">{type}</p>
            <h3 className="projectCard__title">{titre}</h3>
            <p className="projectCard__description">{description}</p>
            <div className="projectCard__langages-list">
                <p className="projectCard__langage">ReactJS</p>
                <p className="projectCard__langage">NodeJS</p>
                <p className="projectCard__langage">MySQL</p>
                <p className="projectCard__langage">MongoDB</p>
                <p className="projectCard__langage">Redis</p>
                <p className="projectCard__langage">Git</p>
                <p className="projectCard__langage">Figma</p>
            </div>
        </div>
    );
}