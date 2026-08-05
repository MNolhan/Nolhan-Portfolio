export default function CardApropos({ 
    children, 
    Description,
    variant 
}) {
    return (
        <div className={`cardapropos cardapropos-${variant}`}>
            <h2 className={`cardapropos-title cardapropos-${variant}-title`}>{children}</h2>
            <p className={`cardapropos-description cardapropos-${variant}-description`}>{Description}</p>
        </div>
    )
}
