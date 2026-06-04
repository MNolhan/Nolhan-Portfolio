import { useState } from "react";
import Bouton from "../ui/button";
import Input from "../ui/input";

export default function Register() {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/CreateUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, firstname, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Inscription réussie !");
                setName("");
                setFirstname("");
                setEmail("");
                setPassword("");
                setTimeout(() => { window.location.reload(); }, 1000);
                return;
            }

            setPassword("");
            setMessage(data.message);

        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("Impossible de contacter le serveur.");
        }
    };

    return (
        <dialog className="auth-popup auth-popup--signup" id="Signup">
            <h2 className="auth-popup__title">Créer un compte</h2>

            <form className="auth-popup__content" onSubmit={handleSubmit}>
                <div className="auth-popup__inputs">
                    <Input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="text" placeholder="Prenom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {message && <p className="auth-popup__message">{message}</p>}

                <div className="auth-popup__buttons">
                    <Bouton variant="secondary" type="submit">S'inscrire</Bouton>
                    <Bouton variant="primary" type="button" onClick={() => {
                        document.getElementById("Signup").close();
                        setMessage("");
                        setName("");
                        setFirstname("");
                        setEmail("");
                        setPassword("");
                    }}>
                        Fermer
                    </Bouton>
                </div>
            </form>
        </dialog>
    );
}
