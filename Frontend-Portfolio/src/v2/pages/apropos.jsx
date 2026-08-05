import CardApropos from "../components/ui/card_apropos";

export default function apropos() {
    return (
        <div className="container--small" id="apropos">

            <div className="apropos__header">
                <h1 className="apropos__header-title">- À Propos</h1>
                <p className="apropos__header-subtitle"> Je rends <span className="apropos__header-subtitle--red">simple</span> ce qui est <br></br> complexe à construire.</p>
            </div>

            <div className="apropos__content">
                <div className="apropos__content--left">
                    <p className="apropos__content--left-description">
                        Passionné par le développement web depuis plusieurs années, je
                        me suis spécialisé dans la conception d'applications modernes,
                        performantes et évolutives — en explorant aussi bien le front-end
                        que le back-end.<br></br><br></br>
                        Je travaille principalement avec <strong className="Strong">React</strong>, <strong className="Strong">Node.js</strong> et <strong className="Strong">Laravel</strong>, avec
                        une attention constante portée à la qualité du code, à la 
                        maintenabilité et aux bonnes pratiques. Un bon produit ne se 
                        limite pas à fonctionner : il doit être clair, rapide et agréable à 
                        utiliser.<br></br><br></br>
                        Curieux et toujours en quête d'amélioration, j'aime relever des 
                        défis techniques et travailler sur des projets qui demandent de la 
                        réflexion, de l'architecture et de la créativité.
                    </p>
                </div>
                <div className="apropos__content--right">
                    <CardApropos Description="Projet(s) réalisé(s) ">10</CardApropos>
                    <CardApropos Description="Année(s) d'expérience">2</CardApropos>
                    <CardApropos Description="Client(s)">0</CardApropos>
                    <CardApropos variant="red" Description="Full-Stack">Focus</CardApropos>
                </div>
            </div>
        </div>
    );
}