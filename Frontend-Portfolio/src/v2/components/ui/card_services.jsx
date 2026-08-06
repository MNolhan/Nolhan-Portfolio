export default function CardServices({ 
    type,
    icon,
    title, 
    Description,
    variant 
}) {
    const Icon = icon;

    return (
        <div className={`cardservices cardservices-${variant}`}>
            <div className="cardservices-header">
                <p className="cardservices-type">{type}</p>
                <div className="cardservices-icon">
                    {Icon && <Icon />}
                </div>
            </div>
            <h1 className="cardservices-title">{title}</h1>
            <p className="cardservices-description">{Description}</p>
        </div>
    )
}