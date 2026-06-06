import { useState } from "react";
import Bouton from "../../ui/button";

export default function UpdateProject() {
    return (
        <dialog className="panel panel--popup" id="UpdateProject">
            <h1 className="panel__title">Modifier un Project</h1>
            <div className="panel__content">
                <div className="panel__buttons">
                    

                </div>
                <Bouton variant="primary" type="button" 
                    onClick={() => 
                        document.getElementById("UpdateProject").close()
                    }>
                    Fermer
                </Bouton>
            </div>
        </dialog>
    );
}
