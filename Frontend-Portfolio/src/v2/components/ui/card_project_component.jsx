export default function CardProjectComponent({ 
    type
}){
    return(
        <div className="CardProjectComponent">
            <div className="CardProjectComponent__header">
                <div className="CardProjectComponent__header--dot"></div>
                <div className="CardProjectComponent__header--dot"></div>
                <div className="CardProjectComponent__header--dot"></div>
            </div>
            <div className="CardProjectComponent__content">
                <p className="CardProjectComponent__type">{type}</p>
                <div className="CardProjectComponent__main-card"></div>
                <div className="CardProjectComponent__card">
                    <div className="CardProjectComponent__card-sub"></div>
                    <div className="CardProjectComponent__card-sub"></div>
                    <div className="CardProjectComponent__card-sub"></div>     
                </div>
            </div>
        </div>
    );
}