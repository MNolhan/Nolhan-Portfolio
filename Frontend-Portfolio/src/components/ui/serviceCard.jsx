export default function serviceCard({Icone, children, description}){
    return(
        <div className="serviceCard">
            <div className="icone">
                <p>{Icone}</p>
            </div>
            <h3 className="serviceCard__title">{children}</h3>
            <p className="serviceCard__description">{description}</p>
        </div>
    );
}