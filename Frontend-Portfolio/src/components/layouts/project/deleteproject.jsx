import { useState } from "react";
import Bouton from "../../ui/button";

export default function DeleteProject() {
    return (
        <dialog className="panel panel--popup" id="DeleteProject">
            <h1 className="panel__title">Supprimer un Project</h1>
            <div className="panel__content">
                <div className="panel__buttons">
                    

                </div>
                <Bouton variant="primary" type="button" 
                    onClick={() => 
                        document.getElementById("DeleteProject").close()
                    }>
                    Fermer
                </Bouton>
            </div>
        </dialog>
    );
}
