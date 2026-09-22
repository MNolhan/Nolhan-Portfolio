export default function CardParcours({ date, title, sub, description }){
    return(
        <>
            <div className="CardParcours">
                <div className="CardParcours__left">
                    <p className="CardParcours__date">{date}</p>
                    <span className="CardParcours__sub">{sub}</span>
                </div>
                <div className="CardParcours__right">
                    <h3 className="CardParcours__title">{title}</h3>
                    <p className="CardParcours__description">{description}</p>
                </div>
            </div>
            <hr></hr>
        </>
    );
}