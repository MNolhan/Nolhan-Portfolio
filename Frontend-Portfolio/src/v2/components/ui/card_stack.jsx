export default function CardStack({ 
    children
}) {
    return (
        <div className={`cardstack`}>
            <h3 className={`cardstack-title`}>{children}</h3>
        </div>
    )
}
