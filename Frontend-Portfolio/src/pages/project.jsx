import Card from '../components/ui/projectCard';

export default function project(){
    return(
        <>
            <div className="project" id="project">
                <div className="container">
                    <div className="project__title">
                        <p className="project__title--first">Mes</p>
                        <p className="project__title--second">Projets</p>
                    </div>
                    <p className="project__subtitle">Une sélection de mes réalisations</p>
                    <div className="project__card-list">
                        <Card type="Web Development" description="Portfolio présentant mes projets, mes compétences et mon expérience en développement web." titre="Portfolio" url="https://github.com/MNolhan/Nolhan-Portfolio"></Card>
                    </div>
                </div>
            </div>
        </>
    );
}