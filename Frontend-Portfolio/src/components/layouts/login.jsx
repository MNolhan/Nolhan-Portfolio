import { useState } from "react";
import Bouton from "../ui/button";
import Input from "../ui/input";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                setMessage("Connexion réussie !");
                setEmail("");
                setPassword("");
                setTimeout(() => { window.location.reload(); }, 1000);
                return;
            }

            setPassword("");
            setMessage(data.message);

        } catch (error) {
            console.error("Error during login:", error);
            setMessage("Impossible de contacter le serveur.");
        }
    };

    return (
        <dialog className="auth-popup auth-popup--login" id="Login">
            <h1 className="auth-popup__title">Connexion</h1>

            <form className="auth-popup__content" onSubmit={handleSubmit}>
                <div className="auth-popup__inputs">
                    <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {message && <p className="auth-popup__message">{message}</p>}

                <div className="auth-popup__buttons">
                    <Bouton variant="secondary" type="submit">Se connecter</Bouton>
                    <Bouton variant="primary" type="button" onClick={() => {
                        document.getElementById("Login").close();
                        setMessage("");
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
