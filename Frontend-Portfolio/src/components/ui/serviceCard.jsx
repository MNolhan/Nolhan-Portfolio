import Icone from './serviceIcone'

export default function serviceCard({children, description}){
    return(
        <div className="serviceCard">
            <Icone />
            <h3 className="serviceCard__title">{children}</h3>
            <p className="serviceCard__description">{description}</p>
        </div>
    );
}