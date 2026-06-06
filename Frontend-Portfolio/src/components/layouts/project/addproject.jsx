import { useState } from "react";
import Bouton from "../../ui/button";

export default function AddProject() {
    return (
        <dialog className="panel panel--popup" id="AddProject">
            <h1 className="panel__title">Ajouter un Project</h1>
            <div className="panel__content">
                <div className="panel__buttons">
                    

                </div>
                <Bouton variant="primary" type="button" 
                    onClick={() => 
                        document.getElementById("AddProject").close()
                    }>
                    Fermer
                </Bouton>
            </div>
        </dialog>
    );
}
