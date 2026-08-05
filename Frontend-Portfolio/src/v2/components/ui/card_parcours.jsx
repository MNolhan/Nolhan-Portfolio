export default function CardParcours({ date, title, sub, description }){
    return(
        <div className="CardParcours">
            <p className="CardParcours__date">{date}</p>
            <h3 className="CardParcours__title">{title}</h3>
            <span className="CardParcours__sub">{sub}</span>
            <p className="CardParcours__description">{description}</p>
        </div>
    );
}