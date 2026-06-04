import { useState } from "react";
import Bouton from "../ui/button";

export default function AdminPanel() {
    return (
        <dialog className="admin-panel admin-panel--popup" id="AdminPanel">
            <h2 className="admin-panel__title">Admin Panel</h2>
            <div className="admin-panel__content">
                <div className="admin-panel__buttons">
                    <Bouton variant="secondary">Ajout Projet</Bouton>
                    <Bouton variant="secondary">Modifier Projet</Bouton>
                    <Bouton variant="secondary">Supprimer Projet</Bouton>
                </div>
                <Bouton variant="primary" type="button" 
                    onClick={() => 
                        document.getElementById("AdminPanel").close()
                    }>
                    Fermer
                </Bouton>
            </div>
        </dialog>
    );
}
