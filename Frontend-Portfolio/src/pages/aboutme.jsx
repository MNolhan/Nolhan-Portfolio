import Card from "../components/ui/card";

export default function Aboutme(){
    return(
        <>
            <div className="Aboutme" id="Aboutme">
                <div className="container">
                    <div className="Aboutme__title">
                        <p className="Aboutme__title--first">À propos de</p>
                        <p className="Aboutme__title--second">moi</p>
                    </div>
                    <p className="Aboutme__description">
                        Passionné par le développement web depuis plusieurs années, je me suis progressivement spécialisé dans
                        la conception d'applications web modernes, performantes et évolutives. Mon parcours m'a amené à explorer
                        aussi bien le front-end que le back-end, ce qui me permet aujourd'hui d'avoir une vision globale d'un
                        projet et de concevoir des solutions complètes, robustes et bien structurées.<br></br><br></br>

                        Je travaille principalement avec des technologies telles que React, Node.js et Laravel, qui me permettent
                        de développer des interfaces dynamiques et des architectures backend solides. J'accorde une importance 
                        particulière à la qualité du code, à la maintenabilité des projets et à la mise en place de bonnes 
                        pratiques de développement. Pour moi, un bon produit ne se limite pas à fonctionner : il doit être clair, 
                        performant et agréable à utiliser.<br></br><br></br>

                        Au-delà de l'aspect technique, je suis convaincu que la réussite d'une application repose également sur 
                        l'expérience utilisateur. C'est pourquoi je m'efforce toujours de créer des interfaces simples, intuitives 
                        et efficaces, tout en conservant un design moderne et cohérent.<br></br><br></br>

                        Curieux et toujours en quête d'amélioration, je prends plaisir à découvrir de nouvelles technologies, à 
                        approfondir mes compétences et à relever des défis techniques. J'aime également travailler sur des projets 
                        qui demandent de la réflexion, de l'architecture et de la créativité.
                    </p>
                    <div className="Aboutme__list">
                        <Card Description="Projet(s) réalisé(s) ">1</Card>
                        <Card Description="Année(s) d'expérience(s)">3</Card>
                        <Card Description="Client(s)">0</Card>
                    </div>
                </div>
            </div>
        </>
    );
}