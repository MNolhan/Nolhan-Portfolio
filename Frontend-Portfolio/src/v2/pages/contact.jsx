import CopyIcon from "../components/Icon/copy-icon";
import Notification from "../components/ui/notification";
import { useState } from "react";

export default function Contact(){
    const [showNotification, setShowNotification] = useState(false);

    const copyToClipboard = async (text) => {
        await navigator.clipboard.writeText(text);

        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 5000);
    };

    return(
        <div className="container--small" id="contact">

            <Notification
                title="Adresse Email Copiée !"
                message="Vous pouvez maintenant coller l'adresse email dans votre client de messagerie."
                show={showNotification}
            />

            <div className="contact">

                <div className="contact__header">
                    <span className="contact__header-title">- Contact</span>
                    <p className="contact__header-subtitle">Un Projet en tête ? <br></br> Travaillons <span className="contact__header-subtitle--red">ensemble</span>.</p>
                </div>

                <div className="contact__content">
                    <p className="contact__content-text">Je suis toujours ouvert à discuter de nouveaux projets, <br></br> d'idées créatives ou d'opportunités de collaboration.</p>
                    <button id="showNotification" className="contact__content-email" onClick={() => copyToClipboard("mrt.nolhan@gmail.com")}>
                        <h2 className="contact__content-email-title">mrt.nolhan@gmail.com</h2>
                    </button>
                    <hr></hr>
                    <p className="contact__content-text--small">Tours, France · Disponible pour missions freelance</p>
                </div>

            </div>
        </div>
    );
}
